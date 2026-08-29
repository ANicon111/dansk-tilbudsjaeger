/**
 * 
 * @param {string} url 
 * @param {string | null} errorMessage 
 * @returns {* | null}
 */
function sallingGet(url, errorMessage) {
    return genericGet(
        url,
        {
            "Accept-Encoding": "text/json",
        },
        errorMessage
    );
}

/**
 * @param {string} url 
 * @param {string} tenantAlias 
 * @param {string | null} errorMessage 
 * @returns {* | null}
 */
function sallingTenantGet(url, tenantAlias, errorMessage) {
    return genericGet(
        url,
        {
            "Accept-Encoding": "text/json",
            "X-tenantAlias": tenantAlias,
        },
        errorMessage
    );
}

/**
 * Parses a Salling date string: "09.37, 25. april 2026"
 * @param {string} dateString 
 * @returns {Date|null}
 */
function parseSallingDate(dateString) {
    // 1. Define Danish month mapping (lowercase for safety)
    const months = {
        'januar': 0, 'februar': 1, 'marts': 2, 'april': 3, 'maj': 4, 'juni': 5,
        'juli': 6, 'august': 7, 'september': 8, 'oktober': 9, 'november': 10, 'december': 11
    };

    try {
        // 2. Clean and split the string using Regex
        // Matches digits and words, ignoring the comma and periods
        const parts = dateString.toLowerCase().match(/(\d+)\.(\d+),\s+(\d+)\.\s+(\w+)\s+(\d+)/);

        if (!parts) return null;

        // parts[1] = hours, [2] = minutes, [3] = day, [4] = monthName, [5] = year
        const hours = parseInt(parts[1], 10);
        const minutes = parseInt(parts[2], 10);
        const day = parseInt(parts[3], 10);
        const monthIndex = months[parts[4]];
        const year = parseInt(parts[5], 10);

        // 3. Construct the Date object
        // Note: monthIndex is 0-based in JS
        return new Date(year, monthIndex, day, hours, minutes);

    } catch (e) {
        console.log("Invalid date format", e);
        return null;
    }
}

class Salling extends Brand {
    /**
     * 
     * @param {string} name 
     * @param {string} tenantAlias 
     * @param {string} accentColor 
     * @param {string[]} leafletBlacklist 
     */
    constructor(name, tenantAlias, accentColor, leafletBlacklist) {
        super();
        this.name = name;
        this.shorthand = name;
        this.tenantAlias = tenantAlias;
        this.accentColor = accentColor;
        this.settings.leafletBlacklist = leafletBlacklist;
        this.settings.enabledStoreList = [];
        this.settings.maxStoresPerEnabled = 3;
        this.settings.dataSaver = false;
        this.stored.stores = [];
        this.stored.storesLastUpdate = null;
        this.settings.updatePeriodMinutes = 30; //This should account for local prices that may change often
    }

    async fetch() {
        const leafletPromise = this.fetchLeaflet();
        const localPromise = this.fetchLocal();
        await Promise.allSettled([leafletPromise, localPromise]);
    }

    async fetchLeaflet() {
        try {
            const leafletsOrder = await sallingTenantGet('https://p-club.dsgapps.dk/api/cp/leafletsOrder', this.tenantAlias, lang.errors.failedLeaflet(this.name));
            const leafletPromises = [];
            for (const leaflet of leafletsOrder.leafletIds) {
                leafletPromises.push({
                    info: sallingGet(`https://squid-api.tjek.com/v2/catalogs/${leaflet}`, lang.errors.failedLeaflet(this.name)),
                    pages: sallingGet(`https://squid-api.tjek.com/v2/catalogs/${leaflet}/pages`, lang.errors.failedLeaflet(this.name)),
                    promotions: sallingGet(`https://squid-api.tjek.com/v2/catalogs/${leaflet}/hotspots`, lang.errors.failedLeaflet(this.name)),
                });

            }
            for (const leafletPromise of leafletPromises) {
                const leafletInfo = await leafletPromise.info;


                if (this.settings.leafletBlacklist.some(e => leafletInfo?.label?.includes(e))) continue;

                const leafletPages = await leafletPromise.pages;

                const promotions = await leafletPromise.promotions;

                for (const promotion of promotions) {
                    const points = Object.values(promotion.locations)[0];
                    const width = leafletInfo?.dimensions?.width ?? 1;
                    const height = leafletInfo?.dimensions?.height ?? Math.SQRT2;
                    let top = points[0][1];
                    let right = width - points[2][0];
                    let bottom = height - points[2][1];
                    let left = points[0][0];

                    const runFrom = new Date(promotion.offer.run_from);
                    runFrom.setHours(runFrom.getHours() + 12);
                    runFrom.setHours(0);
                    const runTill = new Date(promotion.offer.run_till);
                    runTill.setHours(runTill.getHours() + 12);
                    runTill.setHours(0);

                    let prod = new Product();
                    prod.n = promotion.offer.heading;
                    prod.b = this.id();
                    prod.c = null; //TODO maybe get some category info somehow

                    prod.i = this.settings.dataSaver ? leafletPages[Object.keys(promotion.locations)[0] - 1]?.thumb : leafletPages[Object.keys(promotion.locations)[0] - 1]?.view;
                    prod.ic = [width, height, top, right, bottom, left];
                    prod.zi = leafletPages[Object.keys(promotion.locations)[0] - 1]?.view;

                    prod.sd = runFrom.toISOString();
                    prod.ed = runTill.toISOString();

                    prod.p = promotion.offer.pricing.price.toFixed(2);
                    prod.op = promotion.offer.pricing.pre_price?.toFixed(2);

                    prod.ls = promotion.offer.quantity.size.from;
                    if (promotion.offer.quantity.size.to != promotion.offer.quantity.size.from)
                        prod.us = promotion.offer.quantity.size.to;
                    prod.u = promotion.offer.quantity.unit.symbol;

                    prod = productSetValue(productSetCategory(productSetUnit(prod)));

                    addProduct(prod);
                }
            }
        } catch (e) {
            console.log(e);
            // addError(lang.errors.failedLeaflet(this.name)); TODO
        }
    }

    async fetchLocal() {
        //update store list daily
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (this.stored.storesLastUpdate == null || this.stored.storesLastUpdate < yesterday.toISOString()) {
            this.stored.stores = await sallingTenantGet("https://p-club.dsgapps.dk/api/cp/stores", this.tenantAlias, lang.errors.failedStoreList(this.name));
            this.stored.storesLastUpdate = (new Date()).toISOString();
        }
        this.store();

        const filteredStores = [];
        for (const enabledStore of this.settings.enabledStoreList) {
            const keyword = enabledStore.toLowerCase();
            let count = 0;

            for (const store of this.stored.stores) {
                if (count >= this.settings.maxStoresPerEnabled) break;
                if (JSON.stringify(store).toLowerCase().includes(keyword) && !filteredStores.includes(store)) {
                    filteredStores.push(store);
                    count++;
                }
            }
        }

        const storePromises = [];
        for (const store of filteredStores)
            storePromises.push(sallingTenantGet(`https://p-club.dsgapps.dk/api/cp/lpr/clearanceItems?id=${store.id}`, this.tenantAlias, lang.errors.failedLocal(store.name, store.address.city)));

        for (const storePromise of storePromises) {
            try {
                const storeData = await storePromise;

                for (const promotion of storeData.clearanceItems ?? []) {
                    let prod = new Product();

                    prod.n = promotion.titleTxt;
                    prod.b = this.id();
                    prod.sn = storeData.storeNameTxt;
                    prod.c = promotion.categories.da;

                    prod.i = promotion.imageUrl;

                    prod.sd = parseSallingDate(promotion.lastUpdateTxt.split(':')[1].trim()).toISOString();

                    prod.p = promotion.discountedPrice.toFixed(2);
                    prod.op = promotion.regularPrice.toFixed(2);

                    prod.st = promotion.availabilityRangeTxt.split('-')[0].trim().replace('Over ', '').split(' ')[0];
                    prod = productSetValue(productSetCategory(productSetUnit(prod)));

                    addProduct(prod);
                }
            } catch (e) {
                console.log(e);
                // addError(lang.errors.failedLocal(store.name, store.address.city)); TODO
            }
        }
    }

    /**
     * Validates and updates settings from the custom form UI
     * @returns {boolean} Success status
     */
    setSettings() {
        let success = true;

        const getEl = (className) => document.getElementsByClassName(className)[0];
        const clearErr = (el) => el && (el.style.backgroundColor = "");
        const setErr = (el) => el && (el.style.backgroundColor = "rgb(160,40,40)");

        const elements = {
            enabled: getEl('settingEnabled'),
            dataSaver: getEl('settingDataSaver'),
            loyaltyCode: getEl('settingLoyaltyCode'),
            updatePeriodMinutes: getEl('settingUpdatePeriodMinutes'),
            ignoreThreshold: getEl('settingIgnoreThreshold'),
            productKeywords: getEl('settingProductKeywords'),
            leafletBlacklist: getEl('settingLeafletBlacklist'),
            enabledStoreList: getEl('settingEnabledStoreList'),
            maxStoresPerEnabled: getEl('settingMaxStoresPerEnabled'),
        };

        // Reset error styling
        Object.values(elements).forEach(clearErr);

        // Parse & Validate Booleans
        this.settings.enabled = elements.enabled.checked;
        this.settings.dataSaver = elements.dataSaver.checked;

        // Parse Loyalty Code
        const code = elements.loyaltyCode.value.trim();
        this.settings.loyaltyCode = code.length > 0 ? code : null;

        // Parse Numbers
        let val = parseInt(elements.updatePeriodMinutes.value, 10);
        if (!isNaN(val) && val > 0) {
            this.settings.updatePeriodMinutes = val;
        } else {
            setErr(elements.updatePeriodMinutes);
            success = false;
        }

        val = parseInt(elements.maxStoresPerEnabled.value, 10);
        if (!isNaN(val) && val > 0) {
            if (val != this.settings.maxStoresPerEnabled) this.forceNextReload = true;
            this.settings.maxStoresPerEnabled = val;
        } else {
            setErr(elements.maxStoresPerEnabled);
            success = false;
        }

        val = parseInt(elements.ignoreThreshold.value, 10);
        if (!isNaN(val) && val >= 0) {
            this.settings.ignoreThreshold = val;
        } else {
            setErr(elements.ignoreThreshold);
            success = false;
        }

        // Helper to turn comma-separated text into array
        const parseList = (inputEl) => {
            if (!inputEl) return [];
            return inputEl.value
                .split(',')
                .map(item => item.trim())
                .filter(item => item.length > 0);
        };

        // Parse Array Fields
        this.settings.productKeywords = parseList(elements.productKeywords);

        this.settings.leafletBlacklist = parseList(elements.leafletBlacklist);

        const newList = parseList(elements.enabledStoreList);
        if (JSON.stringify(this.settings.enabledStoreList) !== JSON.stringify(newList)) {
            this.forceNextReload = true;
        }
        this.settings.enabledStoreList = newList;

        if (success) {
            this.store();
        }

        return success;
    }

    settingsHtml() {
        const s = this.settings;
        return `
            <div class="sallingSettingsContainer">
                <h2 class="sallingSettingsTitle">${this.name} Settings</h2>

                <div class="settingRow checkboxRow">
                    <label class="settingLabelCheckbox">
                        <input class="settingEnabled" type="checkbox" ${s.enabled ? 'checked' : ''}>
                        <span>Enable Store</span>
                    </label>
                </div>

                <div class="settingRow checkboxRow">
                    <label class="settingLabelCheckbox">
                        <input class="settingDataSaver" type="checkbox" ${s.dataSaver ? 'checked' : ''}>
                        <span>Data Saver Mode</span>
                    </label>
                </div>

                <div class="settingRow">
                    <label>Loyalty Code</label>
                    <input class="settingLoyaltyCode" type="text" value="${s.loyaltyCode ?? ''}" placeholder="Enter loyalty code">
                </div>

                <div class="settingRow">
                    <label>Update Period (Minutes)</label>
                    <input class="settingUpdatePeriodMinutes" type="number" min="1" value="${s.updatePeriodMinutes}">
                </div>

                <div class="settingRow">
                    <label>Ignore Threshold</label>
                    <input class="settingIgnoreThreshold" type="number" min="0" value="${s.ignoreThreshold}">
                </div>

                <div class="settingRow">
                    <label>Product Keywords (comma-separated)</label>
                    <input class="settingProductKeywords" type="text" value="${(s.productKeywords || []).join(', ')}" placeholder="e.g. milk, butter, coffee">
                </div>

                <div class="settingRow">
                    <label>Leaflet Blacklist (comma-separated)</label>
                    <input class="settingLeafletBlacklist" type="text" value="${(s.leafletBlacklist || []).join(', ')}" placeholder="e.g. wine, electronics">
                </div>

                <div class="settingRow">
                    <label>Enabled Store Names/Locations (comma-separated)</label>
                    <input class="settingEnabledStoreList" type="text" value="${(s.enabledStoreList || []).join(', ')}" placeholder="e.g. Sønderborg, Lufthavn">
                </div>

                <div class="settingRow">
                    <label>Max Fetched Stores per Enabled Entry</label>
                    <input class="settingMaxStoresPerEnabled" type="number" min="1" value="${s.maxStoresPerEnabled}">
                </div>

                <div class="settingActions">
                    <button class="settingsApplyBtn" onclick="applyAndCloseSettings('${this.id()}');">Apply</button>
                </div>
            </div>
            `;
    }

    loyaltyHtml() {
        if (this.settings.loyaltyCode != null) {
            postRenderCallbacks.push(() => {
                try {
                    JsBarcode(document.getElementById(`${this.id()}-svg`), this.settings.loyaltyCode, {
                        format: "ean13",
                        flat: true,
                        fontSize: 0
                    });
                } catch (error) {
                    document.getElementById(`${this.id()}-svg`).style.display = "none";
                    //addError(error);
                }
            });
            return `<svg id="${this.id()}-svg" class="sallingBarcode"></svg>`;
        }
    }
}

//TODO fix colors
addBrand(new Salling("Netto", "TID-2Y7JRG", [255, 212, 69], ["Nonfood"]));
addBrand(new Salling("Bilka", "TID-BZ929S", [162, 215, 246], ["Have", "Trend", "Outdoor", "Prosonic"]));
addBrand(new Salling("Føtex", "TID-F86K6Y", [0, 0, 55], ["Inspiration", "føtex ud af huset"]));