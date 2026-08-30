// spell-checker:disable
class Store {
    id = "";
}

class SettingConfig {
    constructor(html = null, parseAndStore = null) {
        if (typeof html === 'function') this.html = html;
        if (typeof parseAndStore === 'function') this.parseAndStore = parseAndStore;
    }
    /**
     * @param {*} settings 
     * @returns {string}
     * @abstract
     */
    html(settings) {
        return null;
    }

    /**
     * @param {*} settings 
     * @returns {bool} true if succeded
     * @abstract
     */
    parseAndStore(settings) {
        return false;
    }
}

/**
 * 
 * @param {string} name 
 * @returns {SettingConfig}
 */
function defaultSettingConfig(name) {
    return {
        name: name,
        html(settings) {
            return `
            <div class="settingRow">
                <label>${this.name}</label>
                <input class="setting-${this.name}" type="text" value="${JSON.stringify(settings[this.name]).replaceAll("\"", "&quot;")}" placeholder="Enter ${this.name}">
            </div>
        `;
        },
        parseAndStore(settings) {
            try {
                settings[this.name] = JSON.parse(document.getElementsByClassName(`setting-${this.name}`)[0].value)
            } catch (e) {
                console.log(e);
                return false;
            }
            return true;
        },
    };
}

class Brand {
    name = "";
    /** Must be at most 5 characters long */
    shorthand = "";
    accentColor = [0, 0, 0];


    //these are stored in localStorage
    settings = {
        enabled: true,
        loyaltyCode: null,
        productKeywords: [],
        updatePeriodMinutes: 120, //Should be a sane default for leaflet-only stores
        ignoreThreshold: 200,
    };
    stored = {};

    /** @type {Object<string,SettingConfig>} */
    settingConfigs = {
        enabled: new SettingConfig(
            (settings) => {
                return `
                    <div class="settingRow checkboxRow">
                        <label class="settingLabelCheckbox">
                            <input class="setting-enabled" type="checkbox" ${settings.enabled ? 'checked' : ''}>
                            <span>Enable Store</span>
                        </label>
                    </div>
                `;
            },
            (settings) => {
                settings.enabled = document.getElementsByClassName("setting-enabled")[0].checked;
                return true;
            }
        ),
        loyaltyCode: new SettingConfig(
            (settings) => {
                return `
                    <div class="settingRow">
                        <label>Loyalty Code</label>
                        <input class="setting-loyaltyCode" type="text" value="${settings.loyaltyCode ?? ''}" placeholder="Enter loyalty code">
                    </div>
                `;
            },
            (settings) => {
                const code = document.getElementsByClassName("setting-loyaltyCode")[0].value.trim();
                settings.loyaltyCode = code.length > 0 ? code : null;
                return true;
            }
        ),
        productKeywords: new SettingConfig(
            (settings) => {
                return `
                    <div class="settingRow">
                        <label>Product Keywords (comma-separated)</label>
                        <input class="setting-productKeywords" type="text" value="${(settings.productKeywords || []).join(', ')}" placeholder="e.g. milk, butter, coffee">
                    </div>
                `;
            },
            (settings) => {
                this.settings.productKeywords = document.getElementsByClassName("setting-productKeywords")[0].value?.split(',').map(item => item.trim()).filter(item => item.length > 0) ?? [];
                return true;
            }
        ),
        updatePeriodMinutes: new SettingConfig(
            (settings) => {
                return `
                    <div class="settingRow">
                        <label>Update Period (Minutes)</label>
                        <input class="setting-updatePeriodMinutes" type="number" min="1" value="${settings.updatePeriodMinutes}">
                    </div>
                `;
            },
            (settings) => {
                const val = parseInt(document.getElementsByClassName("setting-updatePeriodMinutes")[0].value, 10);
                if (!isNaN(val) && val > 0) {
                    this.settings.updatePeriodMinutes = val;
                } else {
                    return false;
                }
                return true;
            }
        ),
        ignoreThreshold: new SettingConfig(
            (settings) => {
                return `
                    <div class="settingRow">
                        <label>Ignore Threshold</label>
                        <input class="setting-ignoreThreshold" type="number" min="0" value="${settings.ignoreThreshold}">
                    </div>
                `;
            },
            (settings) => {
                const val = parseInt(document.getElementsByClassName("setting-ignoreThreshold")[0].value, 10);
                if (!isNaN(val) && val >= 0) {
                    this.settings.ignoreThreshold = val;
                } else {
                    return false;
                }
                return true;
            }
        ),
    }

    /**
     * @param {Brand} brand 
     * @returns {string}
    */
    id() {
        return encodeURIComponent(`brand-${this.name}`);
    }


    forceNextReload = false;
    /**
     * @abstract
     */
    async fetch() {
        throw new Error(`Fetch isn't implemented for ${this.name}`);
    }

    /**
     * @abstract
     * @returns {string | undefined} returns null if there is no loyalty program
     */
    loyaltyHtml() {
        return null;
    }

    store() {
        localStorage.setItem(`settings-${this.id()}`, JSON.stringify(this.settings));
        localStorage.setItem(`stored-${this.id()}`, JSON.stringify(this.stored));
    }
    load() {
        try {
            const storedSettings = localStorage.getItem(`settings-${this.id()}`);
            const storedValues = localStorage.getItem(`stored-${this.id()}`);
            if (storedSettings != null) Object.entries(JSON.parse(storedSettings)).forEach((keyVal) => { if (Object.hasOwn(this.settings, keyVal[0])) this.settings[keyVal[0]] = keyVal[1]; });
            if (storedValues != null) Object.entries(JSON.parse(storedValues)).forEach((keyVal) => { if (Object.hasOwn(this.stored, keyVal[0])) this.stored[keyVal[0]] = keyVal[1]; });
        } catch {
            localStorage.clear();
            location.reload();
        }
    }

    setSettings() {
        let success = true;
        for (const property in this.settings) {
            console.log(`setting-${property}`);
            document.getElementsByClassName(`setting-${property}`)[0].style.backgroundColor = null;
            if (!(this.settingConfigs[property]?.parseAndStore(this.settings) ?? defaultSettingConfig(property).parseAndStore(this.settings))) {
                document.getElementsByClassName(`setting-${property}`)[0].style.backgroundColor = "rgb(160,40,40)";
                success = false;
            }
        }
        if (success) this.store();
        return success;
    }

    settingsHtml() {
        let html = `
            <div class="sallingSettingsContainer" onclick="event.stopPropagation();">
                <h2 class="sallingSettingsTitle">${this.name} Settings</h2>
        `;
        for (const property in this.settings) {
            html += this.settingConfigs[property]?.html(this.settings) ?? defaultSettingConfig(property).html(this.settings);
        }
        html += `
                <div class="settingActions">
                    <button class="settingsApplyBtn" onclick="applyAndCloseSettings('${this.id()}');">Apply</button>
                </div>
            </div>
        `;
        return html;
    }
}
/**
 * @type {Map<string, Brand>}
 */
const supportedBrands = new Map();

/**
 * @param {Brand} brand 
 */
function addBrand(brand) {
    supportedBrands.set(brand.id(), brand);
}

/**
 * @param {string} id 
 */
function getBrandById(id) {
    return supportedBrands.get(id);
}

// cross-store standardized product
// I'm not sure if this does anything to the serialized object, but I kept the functions out just in categories
class Product {
    /**@type {string} name*/
    n = null;
    /**@type {string} brand*/
    b = null;
    /**@type {string | null} store name, null for leaflet items*/
    sn = null;
    /**@type {string | null} category, null means miscellaneous or non-food*/
    c = null;

    /**@type {string | null} image link, null means placeholder will be used*/
    i = null;
    /**@type {number[] | null} image crop, stored as a floating value array: [width, height, top, right, bottom, left], null for no crop */
    ic = null;
    /**@type {string | null} zoom image link, null means same as image link*/
    zi = null;

    /**@type {string} start date, as ISO string*/
    sd = null;
    /**@type {string | null} end date, as ISO string, null for unknown or as long as it's available*/
    ed = null;

    /**@type {number} current price*/
    p = null;
    /**@type {number | null} old price, null means unknown*/
    op = null;
    /**@type {number | null} stock, null means unknown*/
    st = null;
    /**@type {number | null} lower size, null means not given*/
    ls = null;
    /**@type {number} upper size, negative means guessed*/
    us = null;

    /**@type {string} unit*/
    u = null;
    /**@type {number} upper price per unit, SI adjusted*/
    upu = null;
    /**@type {number} lower price per unit, SI adjusted*/
    lpu = null;

    /**@type {number} value score, for sorting*/
    v = null;
}
/**
 * @type {{string:{string:string[]}}}
 */
let productIdsByBrandAndCategory = {};

/**
 * @type {{string:Product}}
 */
let products = {};

/**
 * @param {Product} prod 
 */
function productId(prod) {
    return encodeURIComponent(`prod-${prod.b}${prod.sn ?? ""}${prod.n}${prod.p}`);
}

/**
 * @param {Product} prod 
 */
function productSearchString(prod) {
    return `${prod.n} ${prod.c}`.toLowerCase();
}

/**
 * 
 * @param {string} brandId 
 * @param {string} category 
 * @returns 
 */
function categoryId(brandId, category) {
    return encodeURIComponent(`cat-${brandId}${category}`);
}

/**
 * @param {Product} prod 
 */
function cloneProduct(prod) {
    const prodClone = new Product();
    for (const entry of Object.entries(prod)) prodClone[entry[0]] = entry[1];
    return prodClone;
}

/**
 * @param {Product} prod 
 */
function productSetCategory(prod) {
    // flatten stage (for eventual existing categories)
    switch (prod.c) { //TODO
        case "fruitsandvegetables":
        case "Frugt og Grønt - Dyrk Prisen!":
            prod.c = "fruitsandvegetables";
            break;
        case "meat":
        case "Kød & fisk":
        case "Ugens kød og fisk":
            prod.c = "meat";
            break;
        case "dairy":
        case "Mejeri & køl":
            prod.c = "dairy";
            break;
        case "eggs":
            prod.c = "eggs";
            break;
        case "drinks":
            prod.c = "drinks";
            break;
        case "bread":
        case "Brød & kager":
            prod.c = "bread";
            break;
        case "cupboard":
            prod.c = "cupboard";
            break;
        case "semiprepared":
            prod.c = "semiprepared";
            break;
        case "dessert":
            prod.c = "dessert";
            break;
        default:
            prod.c = null;
            break;
    }

    // guess stage, based on name
    if (prod.c == null) {
        const productName = prod.n.toLowerCase();
        for (const key in keywords) {
            if (productContainsKeyword(prod, key)) {
                const category = keywords[key].category;
                prod.c = category;
                break;
            }
        }
    }
    prod.c ??= "misc";

    return prod;
}

/**
 * @param {Product} prod 
 */
function productSetUnit(prod) {
    // flatten stage (for different names for the same unit)
    switch (prod.u) {
        case "pcs":
        case "Stk.":
            prod.u = "piece"
            break;
    }

    // guess stage, based on name
    if (prod.u == null || prod.u == "piece") {
        const productName = prod.n.toLowerCase();
        for (const key in keywords) {
            if (productContainsKeyword(prod, key)) {
                prod.u = keywords[key].unit;
                prod.ls = -keywords[key].sizeGuess * (prod.ls ?? 1) * (prod.u == "piece" ? -1 : 1);
                break;
            }
        }
        prod.ls ??= 1;
        prod.u ??= "piece";
    }

    // price per (SI) unit calc
    let pricePerUnitAdjustment = 1;
    switch (prod.u) {
        case "dl":
        case "hg":
            pricePerUnitAdjustment = 10;
        case "cl":
        case "dag":
            pricePerUnitAdjustment = 100;
        case "ml":
        case "g":
            pricePerUnitAdjustment = 1000;
            break;
    }
    prod.upu = (prod.p / Math.abs(prod.ls) * pricePerUnitAdjustment).toFixed(2);
    prod.lpu = (prod.p / Math.abs(prod.us ?? prod.ls) * pricePerUnitAdjustment).toFixed(2);

    return prod;
}


/**
 * @param {Product} prod 
 */
function productSetValue(prod) {
    const base = 1 / prod.lpu;                                          // based on the price per unit, giving the best initial value
    const existingModifier = prod.v ?? 1;                               // this allows for modifiers set by fetch scripts
    const discountModifier = Math.sqrt((prod.op ?? prod.p) / prod.p);   // sqrt because discount %s only roughly indicate value
    const sizeGuessModifier = prod.us < 0 ? 0.5 : 1;                    // guessed size means less certain knowledge

    const currentTime = new Date().toISOString();                       // if a product is not available, value is very small
    const notAvailableModifier = (prod.sd > currentTime || currentTime > (prod.ed ?? currentTime)) ? 0.0001 : 1;

    let unitModifier = 1;                                               // some units imply worse values, or for piece prices, less knowledge
    switch (prod.u) {
        case "piece":
            unitModifier = 0.5;
            break;
        case "l":
            unitModifier = 0.33;
            break;
        case "dl":
            unitModifier = 0.5;
            break;
        case "cl":
            unitModifier = 0.5;
            break;
        case "ml":
            unitModifier = 0.66;
            break;
    }

    const stock = prod.st ?? 6;
    let stockModifier = 1;                                              // a higher stock gives a higher chance to find it in store
    if (stock >= 10) stockModifier = 1.25;
    if (stock < 5) stockModifier = 0.66;

    // console.log(base, notAvailableModifier, existingModifier, discountModifier, unitModifier, stockModifier, sizeGuessModifier, prod);
    prod.v = base * notAvailableModifier * existingModifier * discountModifier * unitModifier * stockModifier * sizeGuessModifier;
    return prod;
}

/**
 * @param {Product} prod 
 */
function addProduct(prod) {
    const product = cloneProduct(prod);
    let pid = productId(product);
    products[pid] = product;
    if (productIdsByBrandAndCategory[product.b] == null)
        productIdsByBrandAndCategory[product.b] = {};
    if (productIdsByBrandAndCategory[product.b][product.c] == null)
        productIdsByBrandAndCategory[product.b][product.c] = [];
    if (!productIdsByBrandAndCategory[product.b][product.c].includes(pid))
        productIdsByBrandAndCategory[product.b][product.c].push(pid);
}

/**
 * @param {string} id 
 */
function deleteProduct(pid) {
    const prod = products[pid];
    delete products[pid];
    delete productIdsByBrandAndCategory[product.b][product.c][pid];
}

function regroupProducts() {
    productIdsByBrandAndCategory = {};
    for (const prod of Object.values(products)) {
        addProduct(prod);
    }
}

const categories = ["fruitsandvegetables", "meat", "dairy", "eggs", "drinks", "bread", "cupboard", "semiprepared", "dessert", "misc"];
// keywords for guessing categories and price per unit

/**
 * 
 * @param {Product} prod 
 * @param {Keyword} keyword 
 */
function productContainsKeyword(prod, keyword) {
    if (keywords[keyword].combined) {
        return productSearchString(prod).includes(keyword);
    }
    return productSearchString(prod).replaceAll('-', ' ').split(' ').includes(keyword);
}


const assets = {
    placeholderProduct: "../assets/product.png",
};