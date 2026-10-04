const lang = {
    currentLangCode: "da",
    selectLanguage: "Vælg sprog",
    close: "Luk",
    storeInstructionsTitle: "Butiksinformation",
    settingsHelpTitle: "Vejledning til indstillinger",
    helpTitle(brandName) {
        return `Hjælp til ${brandName}`;
    },
    helpSettingsPlaceholder(settingName) {
        return `Instruktioner til indstillingen "${settingName}" tilføjes i en fremtidig opdatering.`;
    },
    helpStoreInstructions: {
        default: "Denne butik samler tilbud fra sine tilbudsaviser eller lokale datokritiske tilbud. Bemærk at alle produktnavne og kategorier hentes på dansk.",
        "Brug": "Viser aktuelle tilbud og kampagner for Brugsen (hentes på dansk).",
        "SB&K": "Viser aktuelle tilbud og kampagner for SuperBrugsen og Kvickly (hentes på dansk).",
        "365": "Viser lavpristilbud for 365 discount (hentes på dansk).",
        "Lidl": "Henter aktuelle kampagnetilbud for Lidl på dansk. Online-varer udelades automatisk.",
        "Rema": "Henter aktive varer og kampagnetilbud for Rema 1000 på dansk.",
        "Netto": "Viser Nettos tilbudsaviser samt lokale datovarer for valgte butikker (på dansk).",
        "Bilka": "Viser Bilkas tilbudsaviser samt lokale datovarer for valgte delivered butikker (på dansk).",
        "Føtex": "Viser Føtex' tilbudsaviser samt lokale datovarer for valgte delivered butikker (på dansk)."
    },
    helpSettings: {
        enabled: "Slår til/fra om denne butik indlæses i feedet.",
        loyaltyCode: "Dit medlemsnummer til at generere en stregkode i appen.",
        updatePeriodMinutes: "Hvor ofte (i minutter) appen opdaterer tilbud.",
        ignoreThreshold: "Minimumsscore for tilbud. Tilbud under dette skjules.",
        leafletBlacklist: "Kommaseparerede danske nøgleord. Tilbudsaviser med disse ord springes over.",
        dataSaver: "Indlæser mindre billeder for at spare data.",
        enabledStoreList: "Kommasepareret liste over butiksnavne eller byer. Et specifikt butiksnavn (fundet på <a href=\"https://netto.dk/find-butik/\">netto.dk</a>, <a href=\"https://foetex.dk/kundeservice/find-din-foetex/\">foetex.dk</a> eller <a href=\"https://bilka.dk/kundeservice/info/find-din-bilka/c/find-din-bilka/\">bilka.dk</a>) vil kun søge i den enkelte butik efter lokale tilbud. Et bynavn vil søge efter butikker i byen op til grænsen 'Maks. butikker pr. indtastning'.",
        maxStoresPerEnabled: "Maksimalt antal fysiske butikker der søges efter pr. indtastning på din liste.",  
        promotionCategoryBlacklist: "Kommasepareret liste af kampagnekategorier der skal skjules.",
        printReceipt: "Beder kassen om at udskrive en papirbon (kun Lidl)."
    },
    errorPrefix: "FEJL",
    search: "Søg",
    searching: "Søger...",
    lastUpdate: "Seneste opdatering",
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
            return `Kunne ikke hente tilbudsavis for ${brand}.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Ugyldig butik på linje "${lineText}" (nummer ${lineNumber}).`
        }
    },
    warningPrefix: "Advarsel",
    warnings: {
        noPromotions(brand, keywords) {
            return `Kunne ikke finde nogen tilbud for ${brand} der matcher ${keywords}.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Kunne ikke finde nogen lokale butiksmatch for "${lineText}" på linje ${lineNumber}.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `Fandt ${promotionCount} tilbud hos ${brandCount} kæder` + (storeCount > 0 ? ` i ${storeCount} butikker.` : '.');
        },
        noPromotions: "Kunne ikke finde nogen tilbud.",
    },
    categories: {
        "fruitsandvegetables": "Frugt & Grønt",
        "meat": "Kød & Fisk",
        "dairy": "Mejeri",
        "eggs": "Æg",
        "drinks": "Drikkevarer",
        "bread": "Brød & Bageri",
        "cupboard": "Kolonial",
        "semiprepared": "Nemt & Hurtigt",
        "dessert": "Dessert & Slik",
        "misc": "Diverse",
    },
    dkk: "DKK",
    perUnit: "DKK /",
    stock: "på lager",
    from: "Fra",
    to: "til",
    productKeywords: "Produktnøgleord (danske ord)",
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
    enableStore: "Aktivér Butik",
    loyaltyCode: "Medlemskode",
    invalidLoyaltyCode: "Ugyldig medlemskode",
    enterLoyaltyCode: "Indtast medlemskode",
    updatePeriod: "Opdatering (Min)",
    ignoreThreshold: "Ignorer Grænse",
    applySettings: "Gem og anvend",
    settingsTitle(brandName) {
        return `${brandName} indstillinger`;
    },
    enterSetting(settingName) {
        return `Indtast ${settingName}`;
    },
    leafletBlacklist: "Avis Blacklist",
    leafletBlacklistPlaceholder: "f.eks. nonfood, Prosonic",
    enabledStores: "Butiksnavne/Byer",
    enabledStoresPlaceholder: "f.eks. Sønderborg, Lufthavn",
    maxStoresPerEnabled: "Maks Butikker pr. By",
    dataSaverMode: "Data Saver",
    promotionCategoryBlacklist: "Kategori Blacklist",
    promotionCategoryBlacklistPlaceholder: "f.eks. parkside, Frugt og Grønt",
    printReceipt: "Udskriv Bon",
};