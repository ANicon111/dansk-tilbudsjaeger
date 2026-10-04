const lang = {
    currentLangCode: "fr",
    selectLanguage: "Choisir la langue",
    close: "Fermer",
    storeInstructionsTitle: "Informations sur le magasin",
    settingsHelpTitle: "Guide des paramètres",
    helpTitle(brandName) {
        return `Aide ${brandName}`;
    },
    helpSettingsPlaceholder(settingName) {
        return `Les instructions pour le paramètre "${settingName}" seront ajoutées lors d'une future mise à jour.`;
    },
    helpStoreInstructions: {
        default: "Ce magasin regroupe les promotions de ses prospectus ou ses déstockages locaux. Notez que tous les noms de produits, catégories et détails sont toujours récupérés en danois.",
        "Brug": "Affiche les offres actuelles pour les magasins Brugsen (récupérées en danois).",
        "SB&K": "Affiche les promotions actuelles pour SuperBrugsen et Kvickly (récupérées en danois).",
        "365": "Affiche les offres à prix réduit pour 365 discount (récupérées en danois).",
        "Lidl": "Affiche les offres Lidl en danois. Les articles en ligne sont automatiquement exclus.",
        "Rema": "Affiche les articles et offres Rema 1000 en danois.",
        "Netto": "Affiche les prospectus hebdomadaires Netto ainsi que les déstockages locaux (en danois).",
        "Bilka": "Affiche les prospectus hebdomadaires Bilka ainsi que les déstockages locaux (en danois).",
        "Føtex": "Affiche les prospectus hebdomadaires Føtex ainsi que les déstockages locaux (en danois)."
    },
    helpSettings: {
        enabled: "Active ou désactive ce magasin dans le flux principal.",
        loyaltyCode: "Votre numéro de membre pour générer le code-barres dans l'application.",
        updatePeriodMinutes: "Fréquence (en minutes) de mise à jour des offres.",
        ignoreThreshold: "Score minimum. Les offres en dessous sont masquées.",
        leafletBlacklist: "Mots-clés en danois (séparés par des virgules). Les prospectus les contenant seront ignorés.",
        dataSaver: "Charge de petites images pour économiser les données mobiles.",
        enabledStoreList: "Liste séparée par des virgules de noms de magasins ou de villes. Un nom de magasin spécifique (trouvé sur <a href=\"https://netto.dk/find-butik/\">netto.dk</a>, <a href=\"https://foetex.dk/kundeservice/find-din-foetex/\">foetex.dk</a> ou <a href=\"https://bilka.dk/kundeservice/info/find-din-bilka/c/find-din-bilka/\">bilka.dk</a>) ne recherchera des promotions locales que pour ce magasin. Un nom de ville recherchera les magasins de la ville dans la limite du « Nombre max de magasins par entrée ».",
        maxStoresPerEnabled: "Nombre maximal de magasins physiques interrogés par entrée dans votre liste.",
        promotionCategoryBlacklist: "Catégories en danois (séparées par des virgules) à masquer.",
        printReceipt: "Demande l'impression du reçu papier en caisse (Lidl uniquement)."
    },
    errorPrefix: "ERREUR",
    search: "Recherche",
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
            return `Impossible d'obtenir le prospectus pour ${brand}.`
        },
        invalidBrand(lineText, lineNumber) {
            return `Marque invalide à la ligne "${lineText}" (numéro ${lineNumber}).`
        }
    },
    warningPrefix: "Avertissement",
    warnings: {
        noPromotions(brand, keywords) {
            return `Aucune promotion trouvée pour ${brand} correspondant à ${keywords}.`
        },
        noStoreMatches(lineText, lineNumber) {
            return `Aucun magasin local correspondant à "${lineText}" à la ligne ${lineNumber}.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `Trouvé ${promotionCount} promotions pour ${brandCount} enseignes` + (storeCount > 0 ? ` dans ${storeCount} magasins.` : '.');
        },
        noPromotions: "Aucune promotion trouvée.",
    },
    categories: {
        "fruitsandvegetables": "Fruits & Légumes",
        "meat": "Viandes & Poissons",
        "dairy": "Produits laitiers",
        "eggs": "Œufs",
        "drinks": "Boissons",
        "bread": "Pains & Pâtisseries",
        "cupboard": "Épicerie",
        "semiprepared": "Plats préparés",
        "dessert": "Desserts & Confiseries",
        "misc": "Divers",
    },
    dkk: "DKK",
    perUnit: "DKK /",
    stock: "en stock",
    from: "Du",
    to: "au",
    productKeywords: "Mots-clés (termes en danois)",
    keywordsPlaceholder: "ex. mælk, smør, kaffe",
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
    enableStore: "Activer Magasin",
    loyaltyCode: "Code Fidélité",
    invalidLoyaltyCode: "Code de fidélité invalide",
    enterLoyaltyCode: "Saisir le code de fidélité",
    updatePeriod: "Mise à jour (Min)",
    ignoreThreshold: "Seuil d'ignorance",
    applySettings: "Enregistrer & Appliquer",
    settingsTitle(brandName) {
        return `Paramètres de ${brandName}`;
    },
    enterSetting(settingName) {
        return `Saisir ${settingName}`;
    },
    leafletBlacklist: "Filtre Prospectus",
    leafletBlacklistPlaceholder: "ex. nonfood, Prosonic",
    enabledStores: "Noms Magasins/Villes",
    enabledStoresPlaceholder: "ex. Sønderborg, Lufthavn",
    maxStoresPerEnabled: "Max Magasins par Ville",
    dataSaverMode: "Éco de Données",
    promotionCategoryBlacklist: "Filtre Catégories",
    promotionCategoryBlacklistPlaceholder: "ex. parkside, Frugt og Grønt",
    printReceipt: "Imprimer Reçu",
};