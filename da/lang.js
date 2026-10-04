const lang = {
    currentLangCode: "da",
    selectLanguage: "Vælg sprog",
    close: "Luk",
    storeInstructionsTitle: "Butiksinformation",
    settingsHelpTitle: "Indstillinger forklaret",
    helpTitle(brandName) {
        return `${brandName} Hjælp`;
    },
    helpSettingsPlaceholder(settingName) {
        return `Vejledning til indstillingen "${settingName}" tilføjes i en kommende opdatering.`;
    },
    helpStoreInstructions: {
        default: "Denne butik samler tilbud fra sin tilbudsavis eller lokale restpartier. Bemærk at alle produkttitler, kategorier og detaljer altid hentes på dansk.",
        "Brug": "Viser aktive tilbud for Brugsen-butikker. Produktdetaljer hentes på dansk.",
        "SB&K": "Viser aktive tilbud for SuperBrugsen og Kvickly. Produktdetaljer hentes på dansk.",
        "365": "Viser rabattilbud for 365discount-butikker. Produktdetaljer hentes på dansk.",
        "Lidl": "Henter aktuelle kampagnetilbud fra Lidl (på dansk). Online-varer udelades automatisk.",
        "Rema": "Henter aktive kampagnevarer og tilbud for Rema 1000 (på dansk).",
        "Netto": "Viser Nettos ugentlige tilbudsavis samt lokale gul-mærke datovarer for bestemte butikker (på dansk).",
        "Bilka": "Viser Bilkas ugentlige tilbudsavis samt lokale datovarer for bestemte butikker (på dansk).",
        "Føtex": "Viser Føtex' ugentlige tilbudsavis samt lokale datovarer for bestemte butikker (på dansk)."
    },
    settings: {
        enabled: {
            name: "Aktiver butik",
            description: "Tænder eller slukker for, om denne butik er aktiv og indlæses i det samlede tilbudsfeed."
        },
        loyaltyCode: {
            name: "Lokalitets-/Medlemskode",
            placeholder: "Indtast medlemskode",
            description: "Gemmer dit medlemsnummer for at generere en scanningsklar stregkode i appen."
        },
        updatePeriodMinutes: {
            name: "Opdatering (Min)",
            description: "Hvor ofte (i minutter) applikationen genopfrisker tilbud."
        },
        ignoreThreshold: {
            name: "Ignorer grænseværdi",
            description: "Minimum tilbudsscore påkrævet. Tilbud under denne grænse skjules."
        },
        leafletBlacklist: {
            name: "Tilbudsavis blackliste",
            placeholder: "f.eks. nonfood, Prosonic",
            description: "Kommaseparerede søgeord (på dansk). Tilbudsaviser, der matcher disse ord, springes over."
        },
        dataSaver: {
            name: "Databesparelse",
            description: "Aktiverer lavopløselige billeder for at reducere mobildataforbrug."
        },
        enabledStoreList: {
            name: "Butiksnavne/Byer",
            placeholder: "f.eks. Sønderborg, Lufthavn",
            description: "Kommasepareret liste over butiksnavne eller byer. Et specifikt butiksnavn (fundet på <a href=\"https://netto.dk/find-butik/\">netto.dk</a>, <a href=\"https://foetex.dk/kundeservice/find-din-foetex/\">foetex.dk</a> eller <a href=\"https://bilka.dk/kundeservice/info/find-din-bilka/c/find-din-bilka/\">bilka.dk</a>) vil kun forespørge den enkelte butik. Et bynavn vil søge efter butikker i byen op til grænsen 'Maks butikker pr. postering'."
        },
        maxStoresPerEnabled: {
            name: "Maks butikker pr. by",
            description: "Maksimalt antal fysiske butikker der forespørges pr. postering på din liste."
        },
        promotionCategoryBlacklist: {
            name: "Kategori blackliste",
            placeholder: "f.eks. parkside, Frugt og Grønt",
            description: "Kommasepareret liste over kampagnekategorier (på dansk), der skal skjules."
        },
        printReceipt: {
            name: "Udskriv kvittering",
            description: "Instruerer kassescanneren til at udskrive en fysisk papirkvittering (kun Lidl)."
        }
    },
    errorPrefix: "FEJL",
    search: "Søg",
    searching: "Søger...",
    lastUpdate: "Seneste opdatering",
    availableProducts(count, countColor, store, location) {
        return `<span style="color: ${countColor}; font-weight: bold;">${count}</span> tilgængelig i <strong>${store}${location != null ? ` (${location})` : ''}</strong>.`
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
        "semiprepared": "Færdigretter",
        "dessert": "Dessert",
        "misc": "Andre",
    },
    dkk: "DKK",
    perUnit: "DKK /",
    stock: "på lager",
    from: "Fra",
    to: "til",
    productKeywords: "Produktnøgleord (danske termer)",
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
    invalidLoyaltyCode: "Ugyldig medlemskode",
    applySettings: "Gem",
    settingsTitle(brandName) {
        return `${brandName} Indstillinger`;
    },
    enterSetting(settingName) {
        return `Indtast ${settingName}`;
    }
};