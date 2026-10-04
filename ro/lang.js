const lang = {
    currentLangCode: "ro",
    selectLanguage: "Selectează limba",
    close: "Închide",
    storeInstructionsTitle: "Informații magazin",
    settingsHelpTitle: "Explicații setări",
    helpTitle(brandName) {
        return `Ajutor ${brandName}`;
    },
    helpSettingsPlaceholder(settingName) {
        return `Instrucțiunile pentru setarea "${settingName}" vor fi adăugate într-o actualizare viitoare.`;
    },
    helpStoreInstructions: {
        default: "Acest magazin agregă oferte cu reducere din cataloagele sale sau din lichidările locale de stoc. Rețineți că toate titlurile, categoriile și detaliile produselor sunt preluate întotdeauna în daneză.",
        "Brug": "Afișează promoțiile active pentru magazinele Brugsen. Detaliile produselor sunt preluate în daneză.",
        "SB&K": "Afișează promoțiile active pentru SuperBrugsen și Kvickly. Detaliile produselor sunt preluate în daneză.",
        "365": "Afișează ofertele de reducere pentru magazinele 365 discount. Detaliile produselor sunt preluate în daneză.",
        "Lidl": "Prelucrează ofertele curente din campaniile Lidl (în daneză). Articolele exclusive online sunt excluse automat.",
        "Rema": "Prelucrează articolele de promovare active și ofertele din campanii pentru Rema 1000 (în daneză).",
        "Netto": "Afișează cataloagele săptămânale Netto, precum și produsele locale cu etichetă galbenă la reducere (în daneză).",
        "Bilka": "Afișează cataloagele săptămânale Bilka, precum și produsele locale la reducere (în daneză).",
        "Føtex": "Afișează cataloagele săptămânale Føtex, precum și produsele locale la reducere (în daneză)."
    },
    settings: {
        enabled: {
            name: "Activează magazinul",
            description: "Comută dacă acest magazin este activ și încărcat în fluxul principal de oferte."
        },
        loyaltyCode: {
            name: "Cod de fidelitate",
            placeholder: "Introdu codul de fidelitate",
            description: "Salvează numărul tău de membru pentru a genera un cod de bare scanabil în aplicație."
        },
        updatePeriodMinutes: {
            name: "Actualizare (Min)",
            description: "Cât de frecvent (în minute) aplicația reîmprospătează ofertele."
        },
        ignoreThreshold: {
            name: "Prag de ignorare",
            description: "Punctajul minim necesar pentru valoarea ofertei. Ofertele sub acest prag sunt ascunse."
        },
        leafletBlacklist: {
            name: "Lista neagră cataloage",
            placeholder: "ex. nonfood, Prosonic",
            description: "Cuvinte cheie separate prin virgulă (în daneză). Cataloagele care se potrivesc cu aceste cuvinte vor fi omise."
        },
        dataSaver: {
            name: "Economisire date",
            description: "Activează miniaturile la rezoluție mică pentru a reduce consumul de date mobile."
        },
        enabledStoreList: {
            name: "Nume magazine / Orașe",
            placeholder: "ex. Sønderborg, Lufthavn",
            description: "Listă separată prin virgulă de nume de magazine sau orașe. Un nume specific de magazin (găsit pe <a href=\"https://netto.dk/find-butik/\">netto.dk</a>, <a href=\"https://foetex.dk/kundeservice/find-din-foetex/\">foetex.dk</a> sau <a href=\"https://bilka.dk/kundeservice/info/find-din-bilka/c/find-din-bilka/\">bilka.dk</a>) va interoga doar acel magazin. Un nume de oraș va interoga magazinele din oraș până la limita 'Max. magazine per intrare'."
        },
        maxStoresPerEnabled: {
            name: "Max. magazine per oraș",
            description: "Numărul maxim de magazine fizice interogate per intrare din lista ta."
        },
        promotionCategoryBlacklist: {
            name: "Lista neagră categorii",
            placeholder: "ex. parkside, Frugt og Grønt",
            description: "Listă separată prin virgulă de categorii de campanie (în daneză) de ascuns."
        },
        printReceipt: {
            name: "Tipărește bonul",
            description: "Instruiește scannerul de la casă să tipărească un bon fizic pe hârtie (doar Lidl)."
        }
    },
    errorPrefix: "EROARE",
    search: "Caută",
    searching: "Se caută...",
    lastUpdate: "Ultima actualizare",
    availableProducts(count, countColor, store, location) {
        return `<span style="color: ${countColor}; font-weight: bold;">${count}</span> disponibile în <strong>${store}${location != null ? ` (${location})` : ''}</strong>.`
    },
    errors: {
        failedStoreList(brand) {
            return `Preluarea listei de magazine pentru ${brand} a eșuat.`
        },
        failedLocal(store, location) {
            return `Preluarea prețurilor locale pentru ${store}${location != null ? ` (${location})` : ''} a eșuat.`
        },
        failedLeaflet(brand) {
            return `Preluarea ofertelor din catalog pentru ${brand} a eșuat.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Brand nevalid pe linia "${lineText}" (numărul ${lineNumber}).`
        }
    },
    warningPrefix: "Avertisment",
    warnings: {
        noPromotions(brand, keywords) {
            return `Nu s-au găsit promoții pentru ${brand} care să se potrivească cu ${keywords}.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Nu s-au găsit potriviri de magazine locale pentru "${lineText}" pe linia ${lineNumber}.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `S-au găsit ${promotionCount} promoții pentru ${brandCount} branduri` + (storeCount > 0 ? ` în ${storeCount} magazine.` : '.');
        },
        noPromotions: "Nu s-au găsit promoții.",
    },
    categories: {
        "fruitsandvegetables": "Fructe și Legume",
        "meat": "Carne și Pește",
        "dairy": "Lactate",
        "eggs": "Ouă",
        "drinks": "Băuturi",
        "bread": "Pâine",
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
    productKeywords: "Cuvinte cheie produs (termeni în daneză)",
    keywordsPlaceholder: "ex. mælk, smør, kaffe",
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
    invalidLoyaltyCode: "Cod de fidelitate nevalid",
    applySettings: "Aplică",
    settingsTitle(brandName) {
        return `Setări ${brandName}`;
    },
    enterSetting(settingName) {
        return `Introdu ${settingName}`;
    }
};