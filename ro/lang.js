const lang = {
    currentLangCode: "ro",
    selectLanguage: "Selectează limba",
    close: "Închide",
    storeInstructionsTitle: "Informații magazin",
    settingsHelpTitle: "Ghid setări",
    helpTitle(brandName) {
        return `Ajutor ${brandName}`;
    },
    helpSettingsPlaceholder(settingName) {
        return `Instrucțiunile pentru setarea "${settingName}" vor fi adăugate într-o actualizare viitoare.`;
    },
    helpStoreInstructions: {
        default: "Acest magazin adună oferte din cataloagele sale sau din lichidările locale de stoc. Rețineți că toate denumirile și categoriile produselor sunt preluate întotdeauna în limba daneză.",
        "Brug": "Afișează promoțiile curente pentru magazinele Brugsen (preluate în daneză).",
        "SB&K": "Afișează promoțiile curente pentru SuperBrugsen și Kvickly (preluate în daneză).",
        "365": "Afișează ofertele de discount pentru 365 discount (preluate în daneză).",
        "Lidl": "Prelucrează ofertele Lidl în limba daneză. Produsele exclusiv online sunt excluse.",
        "Rema": "Prelucrează produsele și ofertele Rema 1000 în limba daneză.",
        "Netto": "Afișează cataloagele săptămânale Netto și produsele cu reducere din magazinele selectate (în daneză).",
        "Bilka": "Afișează cataloagele săptămânale Bilka și produsele cu reducere din magazinele selectate (în daneză).",
        "Føtex": "Afișează cataloagele săptămânale Føtex și produsele cu reducere din magazinele selectate (în daneză)."
    },
    helpSettings: {
        enabled: "Activează dacă acest magazin este încărcat în flux.",
        loyaltyCode: "Numărul de membru pentru a genera un cod de bare în aplicație.",
        updatePeriodMinutes: "Cât de des (în minute) se actualizează ofertele.",
        ignoreThreshold: "Scorul minim al ofertei. Ofertele sub acest prag sunt ascunse.",
        leafletBlacklist: "Cuvinte cheie în daneză (separate prin virgulă). Cataloagele care le conțin vor fi sărite.",
        dataSaver: "Încarcă imagini mici pentru a economisi date mobile.",
        enabledStoreList: "Listă separată prin virgulă de nume de magazine sau orașe. Un nume specific de magazin (găsit pe <a href=\"https://netto.dk/find-butik/\">netto.dk</a>, <a href=\"https://foetex.dk/kundeservice/find-din-foetex/\">foetex.dk</a> sau <a href=\"https://bilka.dk/kundeservice/info/find-din-bilka/c/find-din-bilka/\">bilka.dk</a>) va interoga doar acel magazin pentru promoții locale. Un nume de oraș va interoga magazinele din oraș până la limita „Max. magazine per intrare”.",
        maxStoresPerEnabled: "Numărul maxim de magazine fizice interogate per intrare din lista ta.",
        promotionCategoryBlacklist: "Categorii de campanie în daneză (separate prin virgulă) de ascuns.",
        printReceipt: "Solicită imprimarea bonului fizic la casă (doar Lidl)."
    },
    errorPrefix: "EROARE",
    search: "Căutare",
    searching: "Se caută...",
    lastUpdate: "Ultima actualizare",
    availableProducts(count, countColor, store, location) {
        return `<span style="color: ${countColor}; font-weight: bold;">${count}</span> disponibile în <strong>${store}${location != null ? ` (${location})` : ''}</strong>.`
    },
    errors: {
        failedStoreList(brand) {
            return `Eroare la preluarea listei de magazine pentru ${brand}.`
        },
        failedLocal(store, location) {
            return `Eroare la preluarea prețurilor locale pentru ${store}${location != null ? ` (${location})` : ''}.`
        },
        failedLeaflet(brand) {
            return `Eroare la preluarea catalogului pentru ${brand}.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Marcă invalidă pe linia "${lineText}" (numărul ${lineNumber}).`
        }
    },
    warningPrefix: "Avertisment",
    warnings: {
        noPromotions(brand, keywords) {
            return `Nu s-au găsit promoții pentru ${brand} care să se potrivească cu ${keywords}.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Nu s-a găsit niciun magazin local potrivit pentru "${lineText}" pe linia ${lineNumber}.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `S-au găsit ${promotionCount} promoții pentru ${brandCount} mărci` + (storeCount > 0 ? ` în ${storeCount} magazine.` : '.');
        },
        noPromotions: "Nu s-au găsit promoții.",
    },
    categories: {
        "fruitsandvegetables": "Fructe & Legume",
        "meat": "Carne & Pește",
        "dairy": "Lactate",
        "eggs": "Ouă",
        "drinks": "Băuturi",
        "bread": "Pâine & Patiserie",
        "cupboard": "Băcănie",
        "semiprepared": "Semipreparate",
        "dessert": "Desert & Dulciuri",
        "misc": "Altele",
    },
    dkk: "DKK",
    perUnit: "DKK /",
    stock: "în stoc",
    from: "De la",
    to: "până la",
    productKeywords: "Cuvinte cheie (termeni în daneză)",
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
    enableStore: "Activează Magazin",
    loyaltyCode: "Cod Fidelitate",
    invalidLoyaltyCode: "Cod de fidelitate invalid",
    enterLoyaltyCode: "Introdu codul de fidelitate",
    updatePeriod: "Actualizare (Min)",
    ignoreThreshold: "Prag Ignorare",
    applySettings: "Salvează și aplică",
    settingsTitle(brandName) {
        return `Setări ${brandName}`;
    },
    enterSetting(settingName) {
        return `Introdu ${settingName}`;
    },
    leafletBlacklist: "Filtru Cataloage",
    leafletBlacklistPlaceholder: "ex. nonfood, Prosonic",
    enabledStores: "Nume Magazine/Orașe",
    enabledStoresPlaceholder: "ex. Sønderborg, Lufthavn",
    maxStoresPerEnabled: "Magazine Max per Oraș",
    dataSaverMode: "Mod Eco Date",
    promotionCategoryBlacklist: "Filtru Categorii",
    promotionCategoryBlacklistPlaceholder: "ex. parkside, Frugt og Grønt",
    printReceipt: "Imprimă Bon",
};