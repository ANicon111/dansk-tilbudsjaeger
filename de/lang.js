const lang = {
    currentLangCode: "de",
    selectLanguage: "Sprache auswählen",
    close: "Schließen",
    storeInstructionsTitle: "Geschäftsinformationen",
    settingsHelpTitle: "Einstellungen erklärt",
    helpTitle(brandName) {
        return `${brandName} Hilfe`;
    },
    helpSettingsPlaceholder(settingName) {
        return `Anweisungen für die Einstellung "${settingName}" werden in einem zukünftigen Update hinzugefügt.`;
    },
    helpStoreInstructions: {
        default: "Dieses Geschäft sammelt Angebote aus seinen Prospekten oder lokalen Restposten. Bitte beachten Sie, dass alle Produkttitel, Kategorien und Details immer auf Dänisch abgerufen werden.",
        "Brug": "Zeigt aktuelle Angebote für Brugsen-Märkte an. Produktdetails werden auf Dänisch abgerufen.",
        "SB&K": "Zeigt aktuelle Angebote für SuperBrugsen und Kvickly an. Produktdetails werden auf Dänisch abgerufen.",
        "365": "Zeigt Rabattangebote für 365discount-Märkte an. Produktdetails werden auf Dänisch abgerufen.",
        "Lidl": "Ruft aktuelle Aktionsangebote von Lidl ab (auf Dänisch). Nur-Online-Artikel werden automatisch ausgeschlossen.",
        "Rema": "Ruft aktuelle Aktionsartikel und Angebote für Rema 1000 ab (auf Dänisch).",
        "Netto": "Zeigt die wöchentlichen Netto-Prospekte sowie lokale Ausverkaufsware für bestimmte Märkte an (auf Dänisch).",
        "Bilka": "Zeigt die wöchentlichen Bilka-Prospekte sowie lokale Ausverkaufsware für bestimmte Märkte an (auf Dänisch).",
        "Føtex": "Zeigt die wöchentlichen Føtex-Prospekte sowie lokale Ausverkaufsware für bestimmte Märkte an (auf Dänisch)."
    },
    settings: {
        enabled: {
            name: "Geschäft aktivieren",
            description: "Schaltet um, ob dieses Geschäft aktiv ist und in den Hauptangebots-Feed geladen wird."
        },
        loyaltyCode: {
            name: "Treuecode / Mitgliedsnummer",
            placeholder: "Treuecode eingeben",
            description: "Speichert Ihre Mitgliedsnummer, um einen scannbaren Barcode in der App zu generieren."
        },
        updatePeriodMinutes: {
            name: "Aktualisierung (Min)",
            description: "Wie oft (in Minuten) die Anwendung Angebote aktualisiert."
        },
        ignoreThreshold: {
            name: "Schwellenwert ignorieren",
            description: "Mindestpunktzahl für den Angebotswert erforderlich. Angebote unter diesem Schwellenwert werden ausgeblendet."
        },
        leafletBlacklist: {
            name: "Prospekt-Blacklist",
            placeholder: "z.B. nonfood, Prosonic",
            description: "Kommagetrennte Schlüsselwörter (auf Dänisch). Prospekte, die diesen Wörtern entsprechen, werden übersprungen."
        },
        dataSaver: {
            name: "Datensparmodus",
            description: "Aktiviert Miniaturansichten mit geringer Auflösung, um den mobilen Datenverbrauch zu reduzieren."
        },
        enabledStoreList: {
            name: "Filialnamen / Städte",
            placeholder: "z.B. Sønderborg, Lufthavn",
            description: "Kommagetrennte Liste von Filialnamen oder Städten. Ein spezifischer Filialname (zu finden auf <a href=\"https://netto.dk/find-butik/\">netto.dk</a>, <a href=\"https://foetex.dk/kundeservice/find-din-foetex/\">foetex.dk</a> oder <a href=\"https://bilka.dk/kundeservice/info/find-din-bilka/c/find-din-bilka/\">bilka.dk</a>) fragt nur diese eine Filiale ab. Ein Stadtname fragt Filialen in der Stadt bis zum Limit 'Max. Filialen pro Eintrag' ab."
        },
        maxStoresPerEnabled: {
            name: "Max. Filialen pro Stadt",
            description: "Maximale Anzahl physischer Filialen, die pro Eintrag in Ihrer Liste abgefragt werden."
        },
        promotionCategoryBlacklist: {
            name: "Kategorie-Blacklist",
            placeholder: "z.B. parkside, Frugt og Grønt",
            description: "Kommagetrennte Liste von Aktionskategorien (auf Dänisch), die ausgeblendet werden sollen."
        },
        printReceipt: {
            name: "Kassenbon drucken",
            description: "Weist den Kassenscanner an, einen physischen Papierbon zu drucken (nur Lidl)."
        }
    },
    errorPrefix: "FEHLER",
    search: "Suchen",
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
            return `Prospektangebote für ${brand} konnten nicht abgerufen werden.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Ungültiges Geschäft in Zeile "${lineText}" (Nummer ${lineNumber}).`
        }
    },
    warningPrefix: "Warnung",
    warnings: {
        noPromotions(brand, keywords) {
            return `Es wurden keine Angebote für ${brand} gefunden, die ${keywords} entsprechen.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Es wurden keine passenden lokalen Filialen für "${lineText}" in Zeile ${lineNumber} gefunden.`
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
        "dairy": "Molkerei",
        "eggs": "Eier",
        "drinks": "Getränke",
        "bread": "Brot",
        "cupboard": "Vorratsschrank",
        "semiprepared": "Fertiggerichte",
        "dessert": "Dessert",
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
        return `Vom ${startDate}${endDate ? ` bis ${endDate}` : ''}`;
    },
    pricePerUnit(lpu, upu, unit) {
        return `${lpu !== upu ? `${lpu} - ` : ''}${upu} ${this.dkk} / ${unit}`;
    },
    stockCount(count) {
        return `${count}+ ${this.stock}`;
    },
    invalidLoyaltyCode: "Ungültiger Treuecode",
    applySettings: "Anwenden",
    settingsTitle(brandName) {
        return `${brandName} Einstellungen`;
    },
    enterSetting(settingName) {
        return `${settingName} eingeben`;
    }
};