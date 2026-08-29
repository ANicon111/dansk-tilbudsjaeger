/**
 * @param {string} url 
 * @param {string | null} errorMessage 
 * @returns {* | null}
 */
async function lidlGet(url, errorMessage) {
    try {
        //TODO replace 3rd party dependency
        const response = await fetch(`https://corsproxy.io/?key=2bef9221&url=${encodeURIComponent(url)}`, {
            method: "GET",
            headers: {
                "Accept-Encoding": "text/json",
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return (await response.json());
    } catch (e) {
        console.log(e);
        // if (errorMessage!=null) addError(errorMessage); TODO error message support
        return null;
    }
}

/**
 * Parses a Lidl date string: "23.08. - 29.08.", "28.08." and "fra 27.08."
 * Handles year transitions (e.g., December offers spanning into January).
 * 
 * @param {string} dateString 
 * @returns {{start: Date, end: Date|null}|null}
 */
function parseLidlDate(dateString) {
    if (!dateString || typeof dateString !== 'string') return null;

    // Clean up input: trim and normalize whitespace/dashes
    const cleaned = dateString.trim().replace(/[\u2013\u2014]/g, '-');

    // Match pattern: optional "fra", followed by DD.MM., optionally followed by - DD.MM.
    const regex = /^(?:fra\s+)?(\d{1,2})\.(\d{1,2})\.(?:\s*-\s*(\d{1,2})\.(\d{1,2})\.)?$/i;
    const match = cleaned.match(regex);

    if (!match) return null;

    const [, startDay, startMonth, endDay, endMonth] = match;
    const currentYear = new Date().getFullYear();

    // JavaScript months are zero-indexed (0 = Jan, 11 = Dec)
    const start = new Date(currentYear, parseInt(startMonth, 10) - 1, parseInt(startDay, 10));
    let end = null;

    if (endDay && endMonth) {
        let yearForEnd = currentYear;

        // Handle year boundary edge case (e.g., offer starts in Dec and ends in Jan)
        if (parseInt(startMonth, 10) === 12 && parseInt(endMonth, 10) === 1) {
            yearForEnd += 1;
        }

        end = new Date(yearForEnd, parseInt(endMonth, 10) - 1, parseInt(endDay, 10));
    }

    return { start, end };
}

class Lidl extends Brand {
    constructor() {
        super();
        this.name = "Lidl";
        this.shorthand = this.name;
        this.accentColor = [2, 64, 136];
        this.settings.promotionCategoryBlacklist = [];
        this.settingConfigs.promotionCategoryBlacklist = new SettingConfig(
            (settings) => {
                return `
                    <div class="settingRow">
                        <label>Promotion Category Blacklist (comma-separated)</label>
                        <input class="setting-promotionCategoryBlacklist" type="text" value="${(settings.promotionCategoryBlacklist || []).join(', ')}" placeholder="e.g. parkside, Frugt og Grønt">
                    </div>
                `;
            },
            (settings) => {
                this.settings.promotionCategoryBlacklist = document.getElementsByClassName("setting-promotionCategoryBlacklist")[0].value?.split(',').map(item => item.trim()).filter(item => item.length > 0) ?? [];
                return true;
            }
        );
        this.settings.printReceipt = false;
        this.settingConfigs.printReceipt = new SettingConfig(
            (settings) => {
                return `
                    <div class="settingRow checkboxRow">
                        <label class="settingLabelCheckbox">
                            <input class="setting-printReceipt" type="checkbox" ${settings.printReceipt ? 'checked' : ''}>
                            <span>Print Receipt</span>
                        </label>
                    </div>
                `;
            },
            (settings) => {
                settings.printReceipt = document.getElementsByClassName("setting-printReceipt")[0].checked;
                return true;
            }
        );

        this.settings.updatePeriodMinutes = 1440; //TODO default daily updates until I remove cors proxy
    }

    async fetch() {
        try {
            const leafletOrder = await lidlGet('https://digital-leaflet.lidlplus.com/api/v1/DK/campaignGroups', lang.errors.failedLeaflet(this.name));
            for (const week of leafletOrder.groups) {
                const promotionPromises = [];
                for (const campaign of week.campaigns)
                    if (!this.settings.promotionCategoryBlacklist.some(blacklisted => campaign.title.toLowerCase().includes(blacklisted.toLowerCase())))
                        promotionPromises.push(lidlGet(`https://digital-leaflet.lidlplus.com/api/v1/DK/campaigns/${campaign.id}`, lang.errors.failedLeaflet(this.name)));

                for (const promotionPromise of promotionPromises) {
                    const promotions = await promotionPromise;

                    for (const promotion of promotions.products) {
                        if (promotion.isOnline) continue; // skip the lidl online products
                        let prod = new Product();
                        prod.n = promotion.title;
                        prod.b = this.id();
                        prod.c = promotions.title;

                        prod.i = promotion.imageUrl;
                        prod.zi = promotion.imageUrl;

                        const dateBadge = promotion.badges?.find(b => b.type === "AvailableInStoreFrom")?.title;
                        const extractedDates = parseLidlDate(dateBadge);
                        prod.sd = extractedDates.start.toISOString();
                        prod.ed = extractedDates.end?.toISOString();

                        prod.p = promotion.mainPrice?.price != null ? promotion.mainPrice.price.toFixed(2) : null;
                        prod.op = promotion.mainPrice?.oldPrice != null ? promotion.mainPrice.oldPrice.toFixed(2) : null;

                        // Parse "1 l" using string splitting instead of regex
                        const unitInfo = promotion.additionalInfo || promotion.mainPrice?.disclaimers?.[0] || "";
                        const parts = unitInfo.trim().split(" ");

                        if (parts.length >= 2) {
                            const parsedSize = parseFloat(parts[0].replace(",", "."));
                            if (!isNaN(parsedSize)) {
                                prod.ls = parsedSize;
                                prod.u = parts[1];
                            }
                        }

                        prod = productSetValue(productSetCategory(productSetUnit(prod)));
                        addProduct(prod);
                    }
                }
            }
        } catch (e) {
            console.log(e);
            // addError(lang.errors.failedLeaflet(this.name)); TODO
        }
    }

    loyaltyHtml() {
        if (this.settings.loyaltyCode != null) {
            // Force Version 1 (21x21) and Error Correction 'L'
            const qr = qrcode(1, 'L');

            // Explicit Numeric Mode for 18 digits
            qr.addData(`${this.settings.loyaltyCode}${this.settings.printReceipt ? '0' : '1'}`, 'Numeric');
            qr.make();

            return qr.createSvgTag(8, 2).replace('<svg', '<svg class="lidlQR"');
        }
    }
}

addBrand(new Lidl());
