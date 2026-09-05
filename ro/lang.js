const lang = {
    errorPrefix: "EROARE",
    search: "Caută",
    searching: "Se caută...",
    lastUpdate: "Ultima actualizare",
    availableProducts(count, countColor, store, location) {
        return `<span style="color: ${countColor}; font-weight: bold;">${count}</span> disponibile în <strong>${store}${location != null ? ` (${location})` : ''}</strong>.`
    },
    errors: {
        failedStoreList(brand) {
            return `Nu s-a putut obține lista de magazine pentru ${brand}.`
        },
        failedLocal(store, location) {
            return `Nu s-au putut obține prețurile locale pentru ${store}${location != null ? ` (${location})` : ''}.`
        },
        failedLeaflet(brand) {
            return `Nu s-au putut obține ofertele din catalog pentru ${brand}.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Marcă nevalidă pe linia "${lineText}" (numărul ${lineNumber}).`
        }
    },
    warningPrefix: "Avertisment",
    warnings: {
        noPromotions(brand, keywords) {
            return `Nu s-au găsit oferte pentru ${brand} care să se potrivească cu ${keywords}.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Nu s-au găsit potriviri de magazine locale pentru "${lineText}" pe linia ${lineNumber}.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `S-au găsit ${promotionCount} oferte pentru ${brandCount} mărci` + (storeCount > 0 ? ` în ${storeCount} magazine.` : '.');
        },
        noPromotions: "Nu s-au găsit oferte.",
    },
    categories: {
        "fruitsandvegetables": "Fructe și Legume",
        "meat": "Carne și Pește",
        "dairy": "Lactate",
        "eggs": "Ouă",
        "drinks": "Băuturi",
        "bread": "Pânită și Panificație",
        "cupboard": "Cămară",
        "semiprepared": "Semipreparate",
        "dessert": "Desert",
        "misc": "Altele",
    },
    dkk: "DKK",
    perUnit: "DKK /",
    stock: "în stoc",
    from: "De la",
    to: "până la",
    productKeywords: "Cuvinte cheie produs (separate prin virgulă)",
    keywordsPlaceholder: "ex. lapte, unt, cafea",
    apply: "Aplică",
    loading: "Se încarcă...",
    disabled: "Dezactivat",
    nothingFound: "Nu s-a găsit nimic",
    availableFromTo(startDate, endDate) {
        return `De la ${startDate}${endDate ? ` până la ${endDate}` : ''}`;
    },
    pricePerUnit(lpu, upu, unit) {
        return `${lpu !== upu ? `${lpu} - ` : ''}${upu} ${this.dkk} / ${unit}`;
    },
    stockCount(count) {
        return `${count}+ ${this.stock}`;
    },
    enableStore: "Activează magazinul",
    loyaltyCode: "Cod de fidelitate",
    invalidLoyaltyCode: "Cod de fidelitate invalid",
    enterLoyaltyCode: "Introdu codul de fidelitate",
    updatePeriod: "Perioadă de actualizare (minute)",
    ignoreThreshold: "Ignoră pragul",
    applySettings: "Aplică",
    settingsTitle(brandName) {
        return `Setări ${brandName}`;
    },
    enterSetting(settingName) {
        return `Introdu ${settingName}`;
    },
    leafletBlacklist: "Lista neagră cataloage (separate prin virgulă)",
    leafletBlacklistPlaceholder: "ex. nonfood, Prosonic",
    enabledStores: "Magazine/Locații activate (separate prin virgulă)",
    enabledStoresPlaceholder: "ex. Sønderborg, Lufthavn",
    maxStoresPerEnabled: "Nr. max. de magazine preluate per intrare activată",
    dataSaverMode: "Mod economisire date",
    promotionCategoryBlacklist: "Lista neagră categorii oferte (separate prin virgulă)",
    promotionCategoryBlacklistPlaceholder: "ex. parkside, Fructe și Legume",
    printReceipt: "Tipărește bonul",
};