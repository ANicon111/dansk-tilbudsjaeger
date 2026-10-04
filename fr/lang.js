const lang = {
    currentLangCode: "fr",
    selectLanguage: "Choisir la langue",
    close: "Fermer",
    storeInstructionsTitle: "Informations sur le magasin",
    settingsHelpTitle: "Explication des paramètres",
    helpTitle(brandName) {
        return `Aide ${brandName}`;
    },
    helpSettingsPlaceholder(settingName) {
        return `Les instructions pour le paramètre "${settingName}" seront ajoutées dans une future mise à jour.`;
    },
    helpStoreInstructions: {
        default: "Ce magasin regroupe les offres de ses prospectus ou les déstockages locaux. Notez que tous les titres de produits, catégories et détails sont toujours récupérés en danois.",
        "Brug": "Affiche les promotions actives pour les magasins Brugsen. Les détails des produits sont récupérés en danois.",
        "SB&K": "Affiche les promotions actives pour SuperBrugsen et Kvickly. Les détails des produits sont récupérés en danois.",
        "365": "Affiche les réductions pour les magasins 365 discount. Les détails des produits sont récupérés en danois.",
        "Lidl": "Récupère les offres de campagne actuelles de Lidl (en danois). Les articles exclusivement en ligne sont automatiquement exclus.",
        "Rema": "Récupère les articles en promotion active et les offres de campagne pour Rema 1000 (en danois).",
        "Netto": "Affiche les prospectus hebdomadaires de Netto ainsi que les articles en déstockage local avec étiquette jaune (en danois).",
        "Bilka": "Affiche les prospectus hebdomadaires de Bilka ainsi que les articles en déstockage local (en danois).",
        "Føtex": "Affiche les prospectus hebdomadaires de Føtex ainsi que les articles en déstockage local (en danois)."
    },
    settings: {
        enabled: {
            name: "Activer le magasin",
            description: "Active ou désactive la présence de ce magasin dans le flux principal des offres."
        },
        loyaltyCode: {
            name: "Code de fidélité",
            placeholder: "Entrez le code de fidélité",
            description: "Enregistre votre numéro de membre pour générer un code-barres scannable dans l'application."
        },
        updatePeriodMinutes: {
            name: "Mise à jour (Min)",
            description: "Fréquence (en minutes) à laquelle l'application rafraîchit les offres."
        },
        ignoreThreshold: {
            name: "Seuil d'ignorance",
            description: "Score de valeur d'offre minimal requis. Les offres inférieures à ce seuil sont masquées."
        },
        leafletBlacklist: {
            name: "Liste noire de prospectus",
            placeholder: "ex. nonfood, Prosonic",
            description: "Mots-clés séparés par des virgules (en danois). Les prospectus correspondant à ces mots seront ignorés."
        },
        dataSaver: {
            name: "Économiseur de données",
            description: "Active les vignettes basse résolution pour réduire l'utilisation des données mobiles."
        },
        enabledStoreList: {
            name: "Noms de magasins / Villes",
            placeholder: "ex. Sønderborg, Lufthavn",
            description: "Liste de noms de magasins ou de villes séparés par des virgules. Un nom de magasin spécifique (trouvé sur <a href=\"https://netto.dk/find-butik/\">netto.dk</a>, <a href=\"https://foetex.dk/kundeservice/find-din-foetex/\">foetex.dk</a> ou <a href=\"https://bilka.dk/kundeservice/info/find-din-bilka/c/find-din-bilka/\">bilka.dk</a>) ne requêtera que ce magasin. Un nom de ville requêtera les magasins de la ville jusqu'à la limite 'Max magasins par entrée'."
        },
        maxStoresPerEnabled: {
            name: "Max magasins par ville",
            description: "Nombre maximum de magasins physiques interrogés par entrée dans votre liste."
        },
        promotionCategoryBlacklist: {
            name: "Liste noire de catégories",
            placeholder: "ex. parkside, Frugt og Grønt",
            description: "Liste séparée par des virgules de catégories de campagne (en danois) à masquer."
        },
        printReceipt: {
            name: "Imprimer le reçu",
            description: "Indique au scanner de caisse d'imprimer un reçu papier physique (Lidl uniquement)."
        }
    },
    errorPrefix: "ERREUR",
    search: "Rechercher",
    searching: "Recherche...",
    lastUpdate: "Dernière mise à jour",
    availableProducts(count, countColor, store, location) {
        return `<span style="color: ${countColor}; font-weight: bold;">${count}</span> disponibles chez <strong>${store}${location != null ? ` (${location})` : ''}</strong>.`
    },
    errors: {
        failedStoreList(brand) {
            return `Échec de la récupération de la liste des magasins pour ${brand}.`
        },
        failedLocal(store, location) {
            return `Échec de la récupération des prix locaux pour ${store}${location != null ? ` (${location})` : ''}.`
        },
        failedLeaflet(brand) {
            return `Échec de la récupération des offres de prospectus pour ${brand}.`
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
            return `Impossible de trouver des correspondances de magasins locaux pour "${lineText}" à la ligne ${lineNumber}.`
        },
    },
    messages: {
        foundPromotions(promotionCount, brandCount, storeCount) {
            return `Trouvé ${promotionCount} promotions pour ${brandCount} marques` + (storeCount > 0 ? ` dans ${storeCount} magasins.` : '.');
        },
        noPromotions: "Aucune promotion trouvée.",
    },
    categories: {
        "fruitsandvegetables": "Fruits & Légumes",
        "meat": "Viandes & Poissons",
        "dairy": "Produits laitiers",
        "eggs": "Œufs",
        "drinks": "Boissons",
        "bread": "Pain",
        "cupboard": "Épicerie",
        "semiprepared": "Plats préparés",
        "dessert": "Dessert",
        "misc": "Autres",
    },
    dkk: "DKK",
    perUnit: "DKK /",
    stock: "en stock",
    from: "Du",
    to: "au",
    productKeywords: "Mots-clés de produits (termes danois)",
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
    invalidLoyaltyCode: "Code de fidélité non valide",
    applySettings: "Appliquer",
    settingsTitle(brandName) {
        return `Paramètres de ${brandName}`;
    },
    enterSetting(settingName) {
        return `Entrer ${settingName}`;
    }
};