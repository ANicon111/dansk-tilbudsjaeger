const lang = {
    currentLangCode: "de",
    selectLanguage: "Sprache auswählen",
    close: "Schließen",
    storeInstructionsTitle: "Geschäftsinformationen",
    settingsHelpTitle: "Anleitung zu den Einstellungen",
    helpTitle(brandName) {
        return `Hilfe für ${brandName}`;
    },
    helpSettingsPlaceholder(settingName) {
        return `Anweisungen für die Einstellung "${settingName}" werden in einem zukünftigen Update hinzugefügt.`;
    },
    helpStoreInstructions: {
        default: "Dieses Geschäft bündelt Angebote aus Prospekten oder lokalen Abverkaufsartikeln. Bitte beachten Sie, dass alle Produktnamen, Kategorien und Details stets auf Dänisch abgerufen werden.",
        "Brug": "Zeigt aktuelle Angebote für Brugsen-Filialen (auf Dänisch abgerufen).",
        "SB&K": "Zeigt aktuelle Aktionen für SuperBrugsen und Kvickly (auf Dänisch abgerufen).",
        "365": "Zeigt Discount-Angebote für 365 discount (auf Dänisch abgerufen).",
        "Lidl": "Ruft aktuelle Kampagnenangebote von Lidl auf Dänisch ab. Online-Artikel werden ausgeschlossen.",
        "Rema": "Ruft aktive Aktionsartikel und Kampagnen für Rema 1000 auf Dänisch ab.",
        "Netto": "Zeigt Netto-Wochenprospekte sowie lokale Reduzierungen für ausgewählte Filialen (auf Dänisch).",
        "Bilka": "Zeigt Bilka-Wochenprospekte sowie lokale Reduzierungen für ausgewählte Filialen (auf Dänisch).",
        "Føtex": "Zeigt Føtex-Wochenprospekte sowie lokale Reduzierungen für ausgewählte Filialen (auf Dänisch)."
    },
    helpSettings: {
        enabled: "Aktiviert/Deaktiviert das Laden dieses Geschäfts.",
        loyaltyCode: "Speichert Ihre Mitgliedsnummer für den scannbaren Barcode.",
        updatePeriodMinutes: "Wie oft (in Minuten) Angebote aktualisiert werden.",
        ignoreThreshold: "Mindestpunktzahl. Angebote unter diesem Wert werden ausgeblendet.",
        leafletBlacklist: "Kommagetrennte dänische Begriffe. Prospekte mit diesen Wörtern werden ignoriert.",
        dataSaver: "Lädt kleinere Bilder, um Datenvolumen zu sparen.",
        enabledStoreList: "Kommagetrennte Liste von Geschäftsnamen oder Städten. Ein spezifischer Geschäftsname (zu finden auf <a href=\"https://netto.dk/find-butik/\">netto.dk</a>, <a href=\"https://foetex.dk/kundeservice/find-din-foetex/\">foetex.dk</a> oder <a href=\"https://bilka.dk/kundeservice/info/find-din-bilka/c/find-din-bilka/\">bilka.dk</a>) fragt nur dieses eine Geschäft nach lokalen Angeboten ab. Ein Stadtname fragt Geschäfte in der Stadt bis zum Limit „Max. Geschäfte pro Eintrag“ ab.",
        maxStoresPerEnabled: "Maximale Anzahl physischer Geschäfte, die pro Eintrag in Ihrer Liste abgefragt werden.",
        promotionCategoryBlacklist: "Kommagetrennte dänische Kategorien, die ausgeblendet werden sollen.",
        printReceipt: "Weist die Kasse an, einen Papierbon zu drucken (nur Lidl)."
    },
    errorPrefix: "FEHLER",
    search: "Suche",
    searching: "Suchen...",
    lastUpdate: "Letzte Aktualisierung",
    availableProducts(count, countColor, store, location) {
        return `<span style="color: ${countColor}; font-weight: bold;">${count}</span> verfügbar in <strong>${store}${location != null ? ` (${location})` : ''}</strong>.`
    },
    errors: {
        failedStoreList(brand) {
            return `Filialliste für ${brand} konnte nicht abgerufen werden.`
        },
        failedLocal(store, location) {
            return `Lokale Preise für ${store}${location != null ? ` (${location})` : ''} konnten nicht abgerufen werden.`
        },
        failedLeaflet(brand) {
            return `Prospekt für ${brand} konnte nicht abgerufen werden.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Ungültiges Geschäft in Zeile "${lineText}" (Nummer ${lineNumber}).`
        }
    },
    warningPrefix: "Warnung",
    warnings: {
        noPromotions(brand, keywords) {
            return `Keine Angebote für ${brand} gefunden, die zu ${keywords} passen.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Keine passende lokale Filiale für "${lineText}" in Zeile ${lineNumber} gefunden.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `${promotionCount} Angebote für ${brandCount} Marken` + (storeCount > 0 ? ` in ${storeCount} Filialen gefunden.` : '.');
        },
        noPromotions: "Keine Angebote gefunden.",
    },
    categories: {
        "fruitsandvegetables": "Obst & Gemüse",
        "meat": "Fleisch & Fisch",
        "dairy": "Molkerei",
        "eggs": "Eier",
        "drinks": "Getränke",
        "bread": "Brot & Backwaren",
        "cupboard": "Vorratsschrank",
        "semiprepared": "Fertiggerichte",
        "dessert": "Dessert & Süßes",
        "misc": "Sonstiges",
    },
    dkk: "DKK",
    perUnit: "DKK /",
    stock: "auf Lager",
    from: "Von",
    to: "bis",
    productKeywords: "Produkt-Schlüsselwörter (Dänische Begriffe)",
    keywordsPlaceholder: "z.B. mælk, smør, kaffe",
    apply: "Anwenden",
    loading: "Laden...",
    disabled: "Deaktiviert",
    nothingFound: "Nichts gefunden",
    availableFromTo(startDate, endDate) {
        return `Von ${startDate}${endDate ? ` bis ${endDate}` : ''}`;
    },
    pricePerUnit(lpu, upu, unit) {
        return `${lpu !== upu ? `${lpu} - ` : ''}${upu} ${this.dkk} / ${unit}`;
    },
    stockCount(count) {
        return `${count}+ ${this.stock}`;
    },
    enableStore: "Filiale Aktivieren",
    loyaltyCode: "Treuecode",
    invalidLoyaltyCode: "Ungültiger Treuecode",
    enterLoyaltyCode: "Treuecode eingeben",
    updatePeriod: "Aktualisierung (Min)",
    ignoreThreshold: "Ignorieren-Limit",
    applySettings: "Speichern & Anwenden",
    settingsTitle(brandName) {
        return `${brandName} Einstellungen`;
    },
    enterSetting(settingName) {
        return `${settingName} eingeben`;
    },
    leafletBlacklist: "Prospekt-Blacklist",
    leafletBlacklistPlaceholder: "z.B. nonfood, Prosonic",
    enabledStores: "Filialnamen/Städte",
    enabledStoresPlaceholder: "z.B. Sønderborg, Lufthavn",
    maxStoresPerEnabled: "Max. Filialen pro Stadt",
    dataSaverMode: "Datensparmodus",
    promotionCategoryBlacklist: "Kategorie-Blacklist",
    promotionCategoryBlacklistPlaceholder: "z.B. parkside, Frugt og Grønt",
    printReceipt: "Kassenbon Drucken",
};