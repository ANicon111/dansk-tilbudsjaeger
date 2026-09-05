const lang = {
    errorPrefix: "ERROR",
    search: "Search",
    searching: "Searching...",
    lastUpdate: "Last update",
    availableProducts(count, countColor, store, location) {
        return `<span style="color: ${countColor}; font-weight: bold;">${count}</span> available in <strong>${store}${location != null ? ` (${location})` : ''}</strong>.`
    },
    errors: {
        failedStoreList(brand) {
            return `Failed to get list of stores for ${brand}.`
        },
        failedLocal(store, location) {
            return `Failed to get local prices for ${store}${location != null ? ` (${location})` : ''}.`
        },
        failedLeaflet(brand) {
            return `Failed to get leaflet promotions for ${brand}.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Invalid brand on line "${lineText}" (number ${lineNumber}).`
        }
    },
    warningPrefix: "Warning",
    warnings: {
        noPromotions(brand, keywords) {
            return `Couldn't find any promotions for ${brand} matching ${keywords}.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Couldn't find any local store matches for "${lineText}" on line ${lineNumber}.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `Found ${promotionCount} promotions for ${brandCount} brands` + (storeCount > 0 ? ` in ${storeCount} stores.` : '.');
        },
        noPromotions: "Couldn't find any promotions.",
    },
    categories: {
        "fruitsandvegetables": "Fruits & Vegetables",
        "meat": "Meat & Fish",
        "dairy": "Dairy",
        "eggs": "Eggs",
        "drinks": "Drinks",
        "bread": "Bread",
        "cupboard": "Cupboard",
        "semiprepared": "Semi-prepared",
        "dessert": "Dessert",
        "misc": "Others",
    },
    dkk: "DKK",
    perUnit: "DKK /",
    stock: "in stock",
    from: "From",
    to: "to",
    productKeywords: "Product Keywords (comma-separated)",
    keywordsPlaceholder: "e.g. milk, butter, coffee",
    apply: "Apply",
    loading: "Loading...",
    disabled: "Disabled",
    nothingFound: "Nothing found",
    availableFromTo(startDate, endDate) {
        return `From ${startDate}${endDate ? ` to ${endDate}` : ''}`;
    },
    pricePerUnit(lpu, upu, unit) {
        return `${lpu !== upu ? `${lpu} - ` : ''}${upu} ${this.dkk} / ${unit}`;
    },
    stockCount(count) {
        return `${count}+ ${this.stock}`;
    },
    enableStore: "Enable Store",
    loyaltyCode: "Loyalty Code",
    enterLoyaltyCode: "Enter loyalty code",
    updatePeriod: "Update Period (Minutes)",
    ignoreThreshold: "Ignore Threshold",
    applySettings: "Apply",
    settingsTitle(brandName) {
        return `${brandName} Settings`;
    },
    enterSetting(settingName) {
        return `Enter ${settingName}`;
    },
    leafletBlacklist: "Leaflet Blacklist (comma-separated)",
    leafletBlacklistPlaceholder: "e.g. nonfood, Prosonic",
    enabledStores: "Enabled Store Names/Locations (comma-separated)",
    enabledStoresPlaceholder: "e.g. Sønderborg, Lufthavn",
    maxStoresPerEnabled: "Max Fetched Stores per Enabled Entry",
    dataSaverMode: "Data Saver Mode",
    promotionCategoryBlacklist: "Promotion Category Blacklist (comma-separated)",
    promotionCategoryBlacklistPlaceholder: "e.g. parkside, Frugt og Grønt",
    printReceipt: "Print Receipt",
};