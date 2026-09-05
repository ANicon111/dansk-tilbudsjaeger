const lang = {
    errorPrefix: "FEJL",
    search: "Søg",
    searching: "Søger...",
    lastUpdate: "Sidst opdateret",
    availableProducts(count, countColor, store, location) {
        return `<span style="color: ${countColor}; font-weight: bold;">${count}</span> tilgængelige i <strong>${store}${location != null ? ` (${location})` : ''}</strong>.`
    },
    errors: {
        failedStoreList(brand) {
            return `Kunne ikke hente butiksliste for ${brand}.`
        },
        failedLocal(store, location) {
            return `Kunne ikke hente lokale priser for ${store}${location != null ? ` (${location})` : ''}.`
        },
        failedLeaflet(brand) {
            return `Kunne ikke hente tilbudsavis-tilbud for ${brand}.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Ugyldigt mærke på linje "${lineText}" (nummer ${lineNumber}).`
        }
    },
    warningPrefix: "Advarsel",
    warnings: {
        noPromotions(brand, keywords) {
            return `Kunne ikke finde nogen tilbud for ${brand}, der matcher ${keywords}.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Kunne ikke finde nogen lokale butiksmatch for "${lineText}" på linje ${lineNumber}.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `Fandt ${promotionCount} tilbud for ${brandCount} mærker` + (storeCount > 0 ? ` i ${storeCount} butikker.` : '.');
        },
        noPromotions: "Kunne ikke finde nogen tilbud.",
    },
    categories: {
        "fruitsandvegetables": "Frugt & Grønt",
        "meat": "Kød & Fisk",
        "dairy": "Mejeri",
        "eggs": "Æg",
        "drinks": "Drikkevarer",
        "bread": "Brød",
        "cupboard": "Kolonial",
        "semiprepared": "Nemt & Hurtigt",
        "dessert": "Dessert",
        "misc": "Andre",
    },
    dkk: "kr.",
    perUnit: "kr. /",
    stock: "på lager",
    from: "Fra",
    to: "til",
    productKeywords: "Søgeord (kommasepareret)",
    keywordsPlaceholder: "f.eks. mælk, smør, kaffe",
    apply: "Anvend",
    loading: "Indlæser...",
    disabled: "Deaktiveret",
    nothingFound: "Intet fundet",
    availableFromTo(startDate, endDate) {
        return `Fra ${startDate}${endDate ? ` til ${endDate}` : ''}`;
    },
    pricePerUnit(lpu, upu, unit) {
        return `${lpu !== upu ? `${lpu} - ` : ''}${upu} ${this.dkk} / ${unit}`;
    },
    stockCount(count) {
        return `${count}+ ${this.stock}`;
    },
    enableStore: "Aktivér butik",
    loyaltyCode: "Loyalitetskode",
    enterLoyaltyCode: "Indtast loyalitetskode",
    updatePeriod: "Opdateringsinterval (minutter)",
    ignoreThreshold: "Ignorer grænseværdi",
    applySettings: "Anvend",
    settingsTitle(brandName) {
        return `${brandName} Indstillinger`;
    },
    enterSetting(settingName) {
        return `Indtast ${settingName}`;
    },
    leafletBlacklist: "Tilbudsavis Blacklist (kommasepareret)",
    leafletBlacklistPlaceholder: "f.eks. nonfood, Prosonic",
    enabledStores: "Aktiverede butiksnavne/placeringer (kommasepareret)",
    enabledStoresPlaceholder: "f.eks. Sønderborg, Lufthavn",
    maxStoresPerEnabled: "Maks hentede butikker pr. aktiveret post",
    dataSaverMode: "Databesparende tilstand",
    promotionCategoryBlacklist: "Tilbudskategori Blacklist (kommasepareret)",
    promotionCategoryBlacklistPlaceholder: "f.eks. parkside, Frugt og Grønt",
    printReceipt: "Udskriv kvittering",
};