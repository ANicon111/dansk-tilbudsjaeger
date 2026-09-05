class Coop extends Brand {
    /**
     * 
     * @param {string} name 
     * @param {string} shorthand 
     * @param {string} apiName 
     * @param {string} accentColor 
     * @param {string[]} leafletBlacklist 
     */
    constructor(name, shorthand, apiName, accentColor, leafletBlacklist) {
        super();
        this.name = name;
        this.shorthand = shorthand;
        this.apiName = apiName;
        this.accentColor = accentColor;
        this.settingConfigs.loyaltyCode = new SettingConfig(
            (settings) => {
                return `
                <div class="settingRow">
                <label>Coop Loyalty Code</label>
                <input class="setting-loyaltyCode" type="text" value="${this.settings.loyaltyCode ?? ''}" placeholder="Enter loyalty code">
                </div>
                `;
            },
            (settings) => {
                const code = document.getElementsByClassName("setting-loyaltyCode")[0].value.trim();
                if (code != this.settings.loyaltyCode) {
                    const b = getBrandById("brand-Brugsen");
                    const sb = getBrandById("brand-SuperBrugsen%20%26%20Kvickly");
                    const d = getBrandById("brand-365%20discount");
                    b.settings.loyaltyCode = code;
                    sb.settings.loyaltyCode = code;
                    d.settings.loyaltyCode = code;
                    document.getElementById(b.id()).getElementsByClassName("brandLoyalty")[0].innerHTML = b.loyaltyHtml();
                    document.getElementById(sb.id()).getElementsByClassName("brandLoyalty")[0].innerHTML = sb.loyaltyHtml();
                    document.getElementById(d.id()).getElementsByClassName("brandLoyalty")[0].innerHTML = d.loyaltyHtml();
                    b.store();
                    sb.store();
                    d.store();
                    emptyCallbackQueue();
                }
                return true;
            }
        );
        this.settings.leafletBlacklist = leafletBlacklist;
        this.settingConfigs.leafletBlacklist = new SettingConfig(
            (settings) => {
                return `
                    <div class="settingRow">
                        <label>Leaflet Blacklist (comma-separated)</label>
                        <input class="setting-leafletBlacklist" type="text" value="${(settings.leafletBlacklist || []).join(', ')}" placeholder="e.g. nonfood, Prosonic">
                    </div>
                `;
            },
            (settings) => {
                this.settings.leafletBlacklist = document.getElementsByClassName("setting-leafletBlacklist")[0].value?.split(',').map(item => item.trim()).filter(item => item.length > 0) ?? [];
                return true;
            }
        );
        this.settings.dataSaver = false;
        this.settingConfigs.dataSaver = new SettingConfig(
            (settings) => {
                return `
                    <div class="settingRow checkboxRow">
                        <label class="settingLabelCheckbox">
                            <input class="setting-dataSaver" type="checkbox" ${settings.dataSaver ? 'checked' : ''}>
                            <span>Data Saver Mode</span>
                        </label>
                    </div>
                `;
            },
            (settings) => {
                this.settings.dataSaver = document.getElementsByClassName("setting-dataSaver")[0].checked ?? false;
                return true;
            }
        );

        this.settings.updatePeriodMinutes = 30; //This should account for local prices that may change often
        this.stored.stores = [];
        this.stored.storesLastUpdate = null;
    }

    async fetch() {
        try {
            const rawData = await genericGet('https://raw.githubusercontent.com/ANicon111/coop-json/data/data.json', {}, this.id(), lang.errors.failedLeaflet(this.name));
            const chainsOrder = rawData?.chains ?? [];
            const leafletsOrder = rawData?.catalogs ?? [];
            // 1. Find the target chain by matching the coop store name
            const matchingChain = chainsOrder.find(chain => chain.name.toLowerCase().includes(this.apiName));
            const targetChainId = matchingChain ? matchingChain.id : null;

            // 2. Filter leaflets where chainId matches and extract their unique id
            const filteredLeaflets = targetChainId
                ? leafletsOrder
                    .filter(leaflet => leaflet.chainId === targetChainId)
                    .map(leaflet => leaflet.id)
                : [];

            const leafletPromises = [];
            for (const leaflet of filteredLeaflets) {
                leafletPromises.push({
                    info: sallingGet(`https://squid-api.tjek.com/v2/catalogs/${leaflet}`, this.id(), lang.errors.failedLeaflet(this.name)),
                    pages: sallingGet(`https://squid-api.tjek.com/v2/catalogs/${leaflet}/pages`, this.id(), lang.errors.failedLeaflet(this.name)),
                    promotions: sallingGet(`https://squid-api.tjek.com/v2/catalogs/${leaflet}/hotspots`, this.id(), lang.errors.failedLeaflet(this.name)),
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
                    prod.c = null;

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
        }
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
                    console.log(error);
                    document.getElementById(`${this.id()}-svg`).style.display = "none";
                    addWarning(this.id(), lang.invalidLoyaltyCode);
                }
            });
            return `<svg id="${this.id()}-svg" class="coopBarcode"></svg>`;
        }
    }
}

addBrand(new Coop("Brugsen", "Brug", "brugsen", [195, 20, 20], []));
addBrand(new Coop("SuperBrugsen & Kvickly", "SB&K", "superbrugsen", [195, 20, 20], []));
addBrand(new Coop("365 discount", "365", "discount", [0, 170, 70], []));
