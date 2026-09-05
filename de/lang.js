const lang = {
    errorPrefix: "FEHLER",
    search: "Suchen",
    searching: "Suche...",
    lastUpdate: "Letztes Update",
    availableProducts(count, countColor, store, location) {
        return `<span style="color: ${countColor}; font-weight: bold;">${count}</span> verfügbar bei <strong>${store}${location != null ? ` (${location})` : ''}</strong>.`
    },
    errors: {
        failedStoreList(brand) {
            return `Filialliste für ${brand} konnte nicht geladen werden.`
        },
        failedLocal(store, location) {
            return `Lokale Preise für ${store}${location != null ? ` (${location})` : ''} konnten nicht geladen werden.`
        },
        failedLeaflet(brand) {
            return `Prospektangebote für ${brand} konnten nicht geladen werden.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Ungültige Marke in Zeile "${lineText}" (Nummer ${lineNumber}).`
        }
    },
    warningPrefix: "Warnung",
    warnings: {
        noPromotions(brand, keywords) {
            return `Keine Angebote für ${brand} gefunden, die auf ${keywords} passen.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Keine passende Filiale für "${lineText}" in Zeile ${lineNumber} gefunden.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `${promotionCount} Angebote für ${brandCount} Marken gefunden` + (storeCount > 0 ? ` in ${storeCount} Filialen.` : '.');
        },
        noPromotions: "Keine Angebote gefunden.",
    },
    categories: {
        "fruitsandvegetables": "Obst & Gemüse",
        "meat": "Fleisch & Fisch",
        "dairy": "Molkereiprodukte",
        "eggs": "Eier",
        "drinks": "Getränke",
        "bread": "Brot & Backwaren",
        "cupboard": "Vorratsschrank",
        "semiprepared": "Fertiggerichte",
        "dessert": "Dessert",
        "misc": "Sonstiges",
    },
    dkk: "DKK",
    perUnit: "DKK /",
    stock: "auf Lager",
    from: "Vom",
    to: "bis",
    productKeywords: "Produkt-Schlüsselwörter (kommagetrennt)",
    keywordsPlaceholder: "z. B. Milch, Butter, Kaffee",
    apply: "Anwenden",
    loading: "Laden...",
    disabled: "Deaktiviert",
    nothingFound: "Nichts gefunden",
    availableFromTo(startDate, endDate) {
        return `Vom ${startDate}${endDate ? ` bis ${endDate}` : ''}`;
    },
    pricePerUnit(lpu, upu, unit) {
        return `${lpu !== upu ? `${lpu} - ` : ''}${upu} ${this.dkk} / ${unit}`;
    },
    stockCount(count) {
        return `${count}+ ${this.stock}`;
    },
    enableStore: "Geschäft aktivieren",
    loyaltyCode: "Treuecode",
    enterLoyaltyCode: "Treuecode eingeben",
    invalidLoyaltyCode: "Ungültiger treuecode",
    updatePeriod: "Aktualisierungsintervall (Minuten)",
    ignoreThreshold: "Toleranzgrenze ignorieren",
    applySettings: "Anwenden",
    settingsTitle(brandName) {
        return `${brandName}-Einstellungen`;
    },
    enterSetting(settingName) {
        return `${settingName} eingeben`;
    },
    leafletBlacklist: "Prospekt-Blacklist (kommagetrennt)",
    leafletBlacklistPlaceholder: "z. B. Non-Food, Prosonic",
    enabledStores: "Aktivierte Filialnamen/Standorte (kommagetrennt)",
    enabledStoresPlaceholder: "z. B. Sønderborg, Lufthavn",
    maxStoresPerEnabled: "Max. abgerufene Filialen pro aktivem Eintrag",
    dataSaverMode: "Datensparmodus",
    promotionCategoryBlacklist: "Angebotskategorie-Blacklist (kommagetrennt)",
    promotionCategoryBlacklistPlaceholder: "z. B. Parkside, Obst und Gemüse",
    printReceipt: "Kassenbon drucken",
};