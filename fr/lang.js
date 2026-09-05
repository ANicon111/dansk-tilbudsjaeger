const lang = {
    errorPrefix: "ERREUR",
    search: "Rechercher",
    searching: "Recherche en cours...",
    lastUpdate: "Dernière mise à jour",
    availableProducts(count, countColor, store, location) {
        return `<span style="color: ${countColor}; font-weight: bold;">${count}</span> disponibles chez <strong>${store}${location != null ? ` (${location})` : ''}</strong>.`
    },
    errors: {
        failedStoreList(brand) {
            return `Impossible d'obtenir la liste des magasins pour ${brand}.`
        },
        failedLocal(store, location) {
            return `Impossible d'obtenir les prix locaux pour ${store}${location != null ? ` (${location})` : ''}.`
        },
        failedLeaflet(brand) {
            return `Impossible d'obtenir les promotions du prospectus pour ${brand}.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Marque non valide à la ligne "${lineText}" (numéro ${lineNumber}).`
        }
    },
    warningPrefix: "Avertissement",
    warnings: {
        noPromotions(brand, keywords) {
            return `Impossible de trouver des promotions pour ${brand} correspondant à ${keywords}.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Impossible de trouver des magasins locaux correspondant à "${lineText}" à la ligne ${lineNumber}.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `${promotionCount} promotions trouvées pour ${brandCount} marques` + (storeCount > 0 ? ` dans ${storeCount} magasins.` : '.');
        },
        noPromotions: "Aucune promotion trouvée.",
    },
    categories: {
        "fruitsandvegetables": "Fruits & Légumes",
        "meat": "Viande & Poisson",
        "dairy": "Produits laitiers",
        "eggs": "Œufs",
        "drinks": "Boissons",
        "bread": "Boulangerie",
        "cupboard": "Épicerie",
        "semiprepared": "Plats préparés",
        "dessert": "Desserts",
        "misc": "Autres",
    },
    dkk: "DKK",
    perUnit: "DKK /",
    stock: "en stock",
    from: "Du",
    to: "au",
    productKeywords: "Mots-clés de produits (séparés par des virgules)",
    keywordsPlaceholder: "ex. lait, beurre, café",
    apply: "Appliquer",
    loading: "Chargement...",
    disabled: "Désactivé",
    nothingFound: "Rien trouvé",
    availableFromTo(startDate, endDate) {
        return `Du ${startDate}${endDate ? ` au ${endDate}` : ''}`;
    },
    pricePerUnit(lpu, upu, unit) {
        return `${lpu !== upu ? `${lpu} - ` : ''}${upu} ${this.dkk} / ${unit}`;
    },
    stockCount(count) {
        return `${count}+ ${this.stock}`;
    },
    enableStore: "Activer le magasin",
    loyaltyCode: "Code de fidélité",
    enterLoyaltyCode: "Entrer le code de fidélité",
    updatePeriod: "Période de mise à jour (minutes)",
    ignoreThreshold: "Ignorer le seuil",
    applySettings: "Appliquer",
    settingsTitle(brandName) {
        return `Paramètres de ${brandName}`;
    },
    enterSetting(settingName) {
        return `Entrer ${settingName}`;
    },
    leafletBlacklist: "Liste noire des prospectus (séparée par des virgules)",
    leafletBlacklistPlaceholder: "ex. non-alimentaire, Prosonic",
    enabledStores: "Magasins/Emplacements activés (séparés par des virgules)",
    enabledStoresPlaceholder: "ex. Sønderborg, Lufthavn",
    maxStoresPerEnabled: "Max. de magasins récupérés par entrée activée",
    dataSaverMode: "Mode économie de données",
    promotionCategoryBlacklist: "Liste noire des catégories de promotion (séparée par des virgules)",
    promotionCategoryBlacklistPlaceholder: "ex. parkside, Fruits et Légumes",
    printReceipt: "Imprimer le reçu",
};