function imageCrop(ic) {
    if (ic == null) return '';
    let w = ic[0];
    let h = ic[1];
    let t = ic[2];
    let r = ic[3];
    let b = ic[4];
    let l = ic[5];
    const square = Math.max(w - r - l, h - t - b);
    deltaW = square + r + l - w;
    deltaH = square + t + b - h;
    l -= deltaW / 2;
    r -= deltaW / 2;
    t -= deltaH / 2;
    b -= deltaH / 2;
    if (l + square > w) { l = w - square; r = 0; }
    if (t + square > h) { t = h - square; b = 0; }
    if (r + square > w) { r = w - square; l = 0; }
    if (b + square > h) { b = h - square; t = 0; }
    const dimension = 100 / square;
    const width = w * dimension;
    const height = h * dimension;
    const top = t * dimension;
    const right = r * dimension;
    const bottom = b * dimension;
    const left = l * dimension;
    return `style="width:${width}%; height:${height}%; margin:${-top}% ${-right}% ${-bottom}% ${-left}%;"`;
}

/**
 * @param {string} id product id
 */
function productHtml(id) {
    const prod = products[id];
    const currentTime = new Date();
    const available = prod.sd <= currentTime && currentTime <= (prod.ed ?? currentTime);
    const sizeGuess = prod.ls < 0;
    const endDate = prod.ed?.split("T")[0];
    return `
        <div class="prod" id="${id}">
            <div class="prodImage" style="${brandBackground(getBrandById(prod.b))}" onclick="zoomImage('${id}')"${prod.i == null ? ` disabled="true"` : ''}>
                <img class="prodImageImage" ${imageCrop(prod.ic)} src="${prod.i ?? assets.placeholderProduct}" onerror="onErrorImage('${id}');">
            </div>
            <div class="prodText">
                <h2 class="prodName">${prod.n}</h2>
                <span class="prodPrice">${prod.p} DKK</span>
                ${prod.op ? `<small class="prodOldPrice">${prod.op} DKK</small>` : ''}
                <br>
                ${prod.sn ? `<p class="prodStore">${prod.sn}</p>` : ''}
                <span class="prodSize">${sizeGuess ? `~ ${-prod.ls}` : prod.ls}${prod.us != null ? ` - ${prod.us}` : ''} ${prod.u}, </span>
                <span class="prodPricePerUnit">${prod.lpu != prod.upu ? `${prod.lpu} - ` : ''}${prod.upu} DKK / ${unitToSI(prod.u)}</span>
                <br>
                <p class="prodAvailability"${available ? '' : ' style="color: #888;font-style:italic;"'}>From ${prod.sd.split("T")[0]}${endDate ? ` to ${endDate}` : ''}</p>
                ${prod.st ? `<p class="prodStock">${prod.st}+ in stock</p>` : ''}
            </div>
        </div>
    `;
}

/**
 * @param {string} brandId 
 * @param {string} category 
 */
function categoryHtml(brandId, category) {
    const brandKeywords = getBrandById(brandId).settings.productKeywords;
    let idList = productIdsByBrandAndCategory[brandId]?.[category];
    if (brandKeywords != null && brandKeywords.length > 0) idList = idList?.filter(id => brandKeywords.some(keyword => productSearchString(products[id] ?? "").includes(keyword.toLowerCase())));
    idList?.sort((a, b) => products[b].v - products[a].v);
    if (idList != null && idList.length > 0) {
        let productsHtml = "";
        for (const pid of idList) {
            productsHtml += productHtml(pid);
        }
        return `
            <div class="cat" id="${categoryId(brandId, category)}">
                <div class="catHeader" onclick="expandCategory('${categoryId(brandId, category)}');"><div class="catArrow"></div><span class="catTitle">${category}</span></div>
                <div class="catList">
                    ${productsHtml}
                </div>  
            </div>
        `;
    }
    return null;
}

/**
 * @param {Brand} brand 
 */
function brandBackground(brand) {
    const r = brand.accentColor[0];
    const g = brand.accentColor[1];
    const b = brand.accentColor[2];
    return `color:${(r + g + b) / 3 > 127 ? "rgb(0,0,0)" : "rgb(255,255,255)"};background-color:rgb(${r}, ${g}, ${b});`
}

/**
 * @param {Brand} brand 
 */
function loadingBrandHtml(brand) {
    const loyaltyHtml = brand.loyaltyHtml();
    const brandId = brand.id();
    return `
            <div class="brandTitle" style="${brandBackground(brand)}">${brand.name}<img class="settingsButton" ${(brand.accentColor[0] + brand.accentColor[1] + brand.accentColor[2]) / 3 > 127 ? `style="filter: invert();"` : ''} src="../assets/configure.webp" onclick="openSettings('${brand.id()}')"></div>
            ${loyaltyHtml != null ? `<div class="brandLoyalty">${loyaltyHtml}</div>` : ''}
            <div id="${brand.id()}-list" class="brandList">${brand.settings.enabled ? "Loading..." : "Disabled"}</div>
        `;
}

/**
 * @param {Brand} brand 
 */
async function loadBrand(brand) {
    if (!brand.settings.enabled) {
        return;
    }
    const brandId = brand.id();

    const currentTimeMinusUpdatePeriod = new Date();
    currentTimeMinusUpdatePeriod.setMinutes(currentTimeMinusUpdatePeriod.getMinutes() - brand.settings.updatePeriodMinutes);
    const lastUpdate = JSON.parse(localStorage.getItem(brandId));

    if (brand.forceNextReload || lastUpdate == null || currentTimeMinusUpdatePeriod.toISOString() > lastUpdate) {
        brand.forceNextReload = false;
        Object.values(productIdsByBrandAndCategory[brandId] ?? {})?.forEach((cat) => cat.forEach((id) => delete products[id]));
        delete productIdsByBrandAndCategory[brandId];
        await brand.fetch();
        localStorage.setItem(brandId, JSON.stringify(new Date()));
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("productIds", JSON.stringify(productIdsByBrandAndCategory));
    }
    const brandList = document.getElementById(`${brandId}-list`);
    brandList.innerHTML = "";
    for (const category of categories) {
        html = categoryHtml(brandId, category);
        if (html != null) {
            brandList.innerHTML += html;
        }
    }
    if (brandList.innerHTML == "") brandList.innerHTML = "Nothing found";
    if (previousSelectedBrand == brand.id()) updateCategoryDimensions();
}

let previousExpandedId = null;

/**
 * @param {string} catId 
 */
function expandCategory(catId) {
    if (previousExpandedId != null) {
        const prevCatList = document.getElementById(previousExpandedId).getElementsByClassName("catList")[0];
        document.getElementById(previousExpandedId).getElementsByClassName("catArrow")[0].style.transform = null;
        prevCatList.style.maxHeight = `${prevCatList.children[0].offsetHeight}px`;
    }
    if (previousExpandedId == catId) {
        previousExpandedId = null;
        return;
    }
    const catList = document.getElementById(catId).getElementsByClassName("catList")[0];
    catList.style.maxHeight = `${catList.scrollHeight}px`;
    document.getElementById(catId).getElementsByClassName("catArrow")[0].style.transform = "rotate(225deg)";
    previousExpandedId = catId;
}

function updateCategoryDimensions() {
    for (const catList of document.getElementsByClassName("catList")) {
        const offsetHeight = catList.children[0].offsetHeight;
        catList.style.maxHeight = offsetHeight > 0 ? `${offsetHeight}px` : null;
    }
    if (previousExpandedId != null) {
        const prevCatList = document.getElementById(previousExpandedId).getElementsByClassName("catList")[0];
        prevCatList.style.maxHeight = `${prevCatList.scrollHeight + 5}px`;
    }
}
addEventListener("resize", (e) => { updateCategoryDimensions(); })

let previousSelectedBrand = null;
/**
 * @param {string} id 
 */
function selectBrand(id) {
    if (previousSelectedBrand != null) {
        if (id == previousSelectedBrand) {
            const brandElem = document.getElementById(id);
            brandElem.scroll({
                top: 0,
                behavior: "smooth",
            });
            return;
        }
        document.getElementById(previousSelectedBrand).style.display = null;
        document.getElementById(`${previousSelectedBrand}-button`).style.color = null;
        document.getElementById(`${previousSelectedBrand}-button`).style.backgroundColor = null;
    }
    const brand = getBrandById(id);
    document.getElementById(`${id}-button`).style = brandBackground(brand);
    document.getElementById(id).style.display = "block";
    updateCategoryDimensions();
    previousSelectedBrand = id;
    localStorage.setItem("selected-brand", previousSelectedBrand);
}

/**
 * @param {string} productId 
 */
function zoomImage(productId) {
    const prod = products[productId];
    if (prod?.i != null) {
        const zoom = document.getElementById("zoom");
        zoom.src = prod.zi ?? prod.i;
        zoom.style.display = "block";
    }
}

function closeZoomImage() {
    const zoom = document.getElementById("zoom");
    document.getElementById("zoom").style.display = null;
}

/**
 * @param {string} brandId 
 */
function openSettings(brandId) {
    const brand = getBrandById(brandId);
    const brandSettings = document.getElementById("brandSettings");
    brandSettings.innerHTML = brand.settingsHtml();
    brandSettings.style.display = "block";
}

/**
 * @param {string} brandId 
 */
function applyAndCloseSettings(brandId) {
    const brand = getBrandById(brandId);
    if (brand.setSettings()) {
        document.getElementById(brandId).innerHTML = loadingBrandHtml(brand);
        loadBrand(brand);
        document.getElementById("brandSettings").style.display = null;
        emptyCallbackQueue();
    }
}

/**
 * @param {string} productId 
 */
function onErrorImage(productId) {
    document.getElementById(productId).getElementsByClassName("prodImageImage")[0].src = assets.placeholderProduct;
    products[productId].i = null;
}

/**
 * @param {string} unit 
 */
function unitToSI(unit) {
    switch (unit) {
        case "g":
        case "dag":
        case "hg":
            return "kg";
        case "ml":
        case "cl":
        case "dl":
            return "l";
        default:
            return unit;
    }
}

/**
 * 
 * @param {string} url 
 * @param {*} headers 
 * @param {string | null} errorMessage 
 * @returns {* | null}
 */
async function genericGet(url, headers, errorMessage) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return (await response.json());
    } catch (e) {
        console.log(e);
        // if (errorMessage!=null) addError(errorMessage); TODO error message support
        return null;
    }
}

let postRenderCallbacks = [];
function emptyCallbackQueue() {
    for (callback of postRenderCallbacks) {
        callback();
    }
    postRenderCallbacks = [];
}

async function main() {
    const frame = document.getElementById("frame");
    const brandSelector = document.getElementById("brandSelector");
    const loadPromises = [];
    frame.innerHTML = "";
    for (const keyVal of supportedBrands) {
        const brand = keyVal[1];
        brand.load();
        frame.innerHTML += `
            <div id="${brand.id()}" class="brand" style="border-color:rgb(${brand.accentColor[0]}, ${brand.accentColor[1]}, ${brand.accentColor[2]});">
                ${loadingBrandHtml(brand)}
            </div>
        `;
        brandSelector.innerHTML += `<span class="brandButton" id="${brand.id()}-button" onclick="selectBrand('${brand.id()}')">${brand.shorthand}</span>`
        loadPromises.push(loadBrand(brand));
    }
    selectBrand(localStorage.getItem("selected-brand") ?? supportedBrands.entries().next().value[0]);
    emptyCallbackQueue();
    await loadPromises[0];
    await Promise.all(loadPromises);
}
