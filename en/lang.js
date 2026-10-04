const lang = {
    currentLangCode: "en",
    selectLanguage: "Select Language",
    close: "Close",
    storeInstructionsTitle: "Store Information",
    settingsHelpTitle: "Settings Explained",
    helpTitle(brandName) {
        return `${brandName} Help`;
    },
    helpSettingsPlaceholder(settingName) {
        return `Instructions for setting "${settingName}" will be added in a future update.`;
    },
    helpStoreInstructions: {
        default: "This store aggregates discount deals from its leaflets or local store clearance items. Note that all product titles, categories, and details are always fetched in Danish.",
        "Brug": "Displays active promotions for Brugsen stores. Product details are fetched in Danish.",
        "SB&K": "Displays active promotions for SuperBrugsen and Kvickly. Product details are fetched in Danish.",
        "365": "Displays discount offers for 365 discount stores. Product details are fetched in Danish.",
        "Lidl": "Fetches current campaign deals from Lidl (in Danish). Online-only items are automatically excluded.",
        "Rema": "Fetches active promotion items and campaign offers for Rema 1000 (in Danish).",
        "Netto": "Displays Netto weekly leaflets as well as local yellow-sticker clearance items for specified stores (in Danish).",
        "Bilka": "Displays Bilka weekly leaflets as well as local clearance items for specified stores (in Danish).",
        "Føtex": "Displays Føtex weekly leaflets as well as local clearance items for specified stores (in Danish)."
    },
    helpSettings: {
        enabled: "Toggles whether this store is active and loaded into the main deals feed.",
        loyaltyCode: "Stores your loyalty membership number to generate a scannable barcode in the app.",
        updatePeriodMinutes: "How frequently (in minutes) the application refreshes deals.",
        ignoreThreshold: "Minimum deal value score required. Offers below this threshold are hidden.",
        leafletBlacklist: "Comma-separated keywords (in Danish). Leaflets matching these words will be skipped.",
        dataSaver: "Enables low-resolution thumbnails to reduce mobile data usage.",
        enabledStoreList: "Comma-separated list of store names or cities. A specific store name (found at <a href=\"https://netto.dk/find-butik/\">netto.dk</a>, <a href=\"https://foetex.dk/kundeservice/find-din-foetex/\">foetex.dk</a>, or <a href=\"https://bilka.dk/kundeservice/info/find-din-bilka/c/find-din-bilka/\">bilka.dk</a>) will only query that one store for local promotions. A city name will query stores in the city up to the 'Max Stores per Entry' limit.",
        maxStoresPerEnabled: "Maximum number of physical stores queried per entry in your list.",
        promotionCategoryBlacklist: "Comma-separated list of campaign categories (in Danish) to hide.",
        printReceipt: "Instructs the checkout scanner to print a physical paper receipt (Lidl only)."
    },
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
    productKeywords: "Product Keywords (Danish terms)",
    keywordsPlaceholder: "e.g. mælk, smør, kaffe",
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
    invalidLoyaltyCode: "Invalid loyalty code",
    enterLoyaltyCode: "Enter loyalty code",
    updatePeriod: "Update (Min)",
    ignoreThreshold: "Ignore Threshold",
    applySettings: "Apply",
    settingsTitle(brandName) {
        return `${brandName} Settings`;
    },
    enterSetting(settingName) {
        return `Enter ${settingName}`;
    },
    leafletBlacklist: "Leaflet Blacklist",
    leafletBlacklistPlaceholder: "e.g. nonfood, Prosonic",
    enabledStores: "Store Names/Cities",
    enabledStoresPlaceholder: "e.g. Sønderborg, Lufthavn",
    maxStoresPerEnabled: "Max Stores per City",
    dataSaverMode: "Data Saver",
    promotionCategoryBlacklist: "Category Blacklist",
    promotionCategoryBlacklistPlaceholder: "e.g. parkside, Frugt og Grønt",
    printReceipt: "Print Receipt",
};