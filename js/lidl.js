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
    }

    async fetch() {
        try {
            const data = await genericGet('https://raw.githubusercontent.com/ANicon111/lidl-json/data/data.json', {}, lang.errors.failedLeaflet(this.name));

            for (const week of data.campaignGroups.groups) {
                const campaigns = [];
                for (const campaign of week.campaigns)
                    if (!this.settings.promotionCategoryBlacklist.some(blacklisted => campaign.title.toLowerCase().includes(blacklisted.toLowerCase())))
                        if (data.campaigns[campaign.id])
                            campaigns.push(data.campaigns[campaign.id]);

                for (const campaign of campaigns) {
                    for (const promotion of campaign.products) {
                        if (promotion.isOnline) continue; // skip the lidl online products
                        const prod = new Product();
                        prod.n = promotion.title;
                        prod.b = this.id();
                        prod.c = campaign.title;

                        prod.i = promotion.imageUrl;
                        prod.zi = promotion.imageUrl;

                        const dateBadge = promotion.badges?.find(b => b.type === "AvailableInStoreFrom")?.title;
                        const extractedDates = parseLidlDate(dateBadge);
                        prod.sd = extractedDates.start.toISOString();
                        prod.ed = extractedDates.end?.toISOString();

                        prod.p = promotion.mainPrice?.price != null ? promotion.mainPrice.price.toFixed(2) : null;
                        prod.op = promotion.mainPrice?.oldPrice != null ? promotion.mainPrice.oldPrice.toFixed(2) : null;

                        // Parse "15 x 300 ml | Pr. l 10,00"
                        // Parse "350 g | Pr. kg 71,43"
                        // Parse "Stk. | Pr. stk. 1,00"
                        // Parse "5/Stk. | Pr. stk. 2,40"
                        // Parse "20 Stk. | Pr. stk. 0,25"
                        // Regex breakdown:
                        // ^(?:(\d+)\s*[\/x]\s*)?  --> Optional multiplier prefix: "15 x " or "5/"
                        // (?:(\d+)\s+)?           --> Optional quantity before unit: "20 "
                        // ([a-zA-ZæøåÆØÅ]+)?      --> Optional unit: "ml", "g", "Stk."
                        const regex = /^(?:([\d.,]+)\s*[\/x]\s*)?(?:([\d.,]+)\s+)?([a-zA-ZæøåÆØÅ.]+)?$/i;
                        const match = promotion.additionalInfo.split('|')[0].trim().match(regex);

                        if (match) {
                            const multiplier = match[1] ? parseFloat(match[1].replace(',', '.')) : null;
                            const value = match[2] ? parseFloat(match[2].replace(',', '.')) : null;
                            const unit = match[3] || null;

                            let size = null;

                            if (multiplier !== null && value !== null) {
                                // Case: "15 x 300 ml" -> 15 * 300 = 4500
                                size = multiplier * value;
                            } else if (multiplier !== null && value === null) {
                                // Case: "5/Stk." -> 5
                                size = multiplier;
                            } else if (value !== null) {
                                // Case: "350 g" or "20 Stk." -> 350 or 20
                                size = value;
                            } else {
                                // Case: "Stk." -> 1
                                size = 1;
                            }
                            prod.ls = size;
                            prod.u = unit;
                        }

                        addProduct(productSetValue(productSetCategory(productSetUnit(prod))));
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
