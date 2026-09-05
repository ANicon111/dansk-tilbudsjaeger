class Rema extends Brand {
    constructor() {
        super();
        this.name = "Rema 1000";
        this.shorthand = "Rema";
        this.accentColor = [22, 54, 96];
        delete this.settings.loyaltyCode;
    }

    async fetch() {
        try {
            const response = await genericGet('https://raw.githubusercontent.com/ANicon111/rema-json/data/data.json', {}, this.id(), lang.errors.failedLeaflet(this.name));

            const items = response?.data ?? [];

            for (const item of items) {
                let prod = new Product();
                prod.n = item.name;
                prod.b = this.id();
                prod.c = item.department?.name ?? "";

                // Image handling
                const img = item.images?.[0]?.large || item.images?.[0]?.medium || item.images?.[0]?.small;
                prod.i = img;
                prod.zi = img;

                // Price and Date extraction
                const offerPrice = item.prices?.find(p => p.is_advertised || p.is_campaign) ?? item.prices?.[0];
                const regularPrice = item.prices?.find(p => !p.is_campaign && !p.is_advertised);

                if (offerPrice) {
                    prod.p = offerPrice.price != null ? offerPrice.price.toFixed(2) : null;
                    prod.sd = offerPrice.starting_at ? new Date(offerPrice.starting_at).toISOString() : null;
                    prod.ed = offerPrice.ending_at ? new Date(offerPrice.ending_at).toISOString() : null;

                    const oldPriceVal = regularPrice?.price ?? offerPrice.price_over_max_quantity;
                    if (oldPriceVal != null) {
                        prod.op = oldPriceVal.toFixed(2);
                    }
                }

                // Extract unit size and unit from the first price object
                const firstPrice = item.prices?.[0];
                if (firstPrice) {
                    if (firstPrice.consumption_quantity != null && firstPrice.consumption_unit) {
                        prod.ls = parseFloat(firstPrice.consumption_quantity);
                        prod.u = firstPrice.consumption_unit;
                    } else if (firstPrice.price && firstPrice.compare_unit_price && firstPrice.compare_unit) {
                        // Derives total size (e.g., 20 / 55.56 = 0.36 kg)
                        const calculatedSize = firstPrice.price / firstPrice.compare_unit_price;
                        prod.ls = parseFloat(calculatedSize.toFixed(3));
                        prod.u = firstPrice.compare_unit;
                    }
                }

                prod = productSetValue(productSetCategory(productSetUnit(prod)));
                addProduct(prod);
            }
        } catch (e) {
            console.log(e);
            addError(this.id(), lang.errors.failedLeaflet(this.name));
        }
    }
}

addBrand(new Rema());