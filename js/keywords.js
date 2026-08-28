// spell-checker:disable
class Keyword {
    constructor(category, sizeGuess, unit, combined = true) {
        this.category = category;
        this.sizeGuess = sizeGuess;
        this.unit = unit;
        this.combined = combined;
    }
}

const keywords = {
    // --- Lexical Singletons (Alphabetical) ---
    "aalborg": new Keyword("drinks", 700, "ml"),
    "agurk": new Keyword("fruitsandvegetables", 300, "g"),
    "akvavit": new Keyword("drinks", 700, "ml"),
    "albani": new Keyword("drinks", 330, "ml"),
    "appelsiner": new Keyword("fruitsandvegetables", 200, "g"),
    "arla": new Keyword("dairy", 500, "ml"),
    "arnbitter": new Keyword("drinks", 700, "ml"),
    "aubergine": new Keyword("fruitsandvegetables", 300, "g"),
    "avocado": new Keyword("fruitsandvegetables", 150, "g"),
    "banan": new Keyword("fruitsandvegetables", 120, "g"),
    "broccoli": new Keyword("fruitsandvegetables", 350, "g"),
    "budding": new Keyword("dairy", 200, "g", false),
    "burger": new Keyword("semiprepared", 200, "g"),
    "carlsberg": new Keyword("drinks", 330, "ml"),
    "ceres": new Keyword("drinks", 330, "ml"),
    "champignon": new Keyword("fruitsandvegetables", 15, "g"),
    "chokoladebar": new Keyword("dessert", 50, "g"),
    "cider": new Keyword("drinks", 330, "ml"),
    "citron": new Keyword("fruitsandvegetables", 100, "g"),
    "curry": new Keyword("cupboard", 300, "g"),
    "druer": new Keyword("fruitsandvegetables", 6, "g"),
    "egelykke": new Keyword("dairy", 200, "g"),
    "entrecote": new Keyword("meat", 1, "kg"),
    "falafel": new Keyword("semiprepared", 200, "g"),
    "fiskefilet": new Keyword("fish", 500, "g"),
    "gammeldansk": new Keyword("drinks", 700, "ml"),
    "gin": new Keyword("drinks", 700, "ml", false),
    "græskar": new Keyword("fruitsandvegetables", 1.5, "kg"),
    "grøntsag": new Keyword("fruitsandvegetables", 100, "g"),
    "gulerød": new Keyword("fruitsandvegetables", 75, "g"),
    "guacamole": new Keyword("cupboard", 200, "g"),
    "hamburgerryg": new Keyword("meat", 2, "kg"),
    "harboe": new Keyword("drinks", 1, "l"),
    "havregryn": new Keyword("cupboard", 1, "kg"),
    "hummus": new Keyword("cupboard", 200, "g"),
    "juice": new Keyword("drinks", 1, "l"),
    "kalveculotte": new Keyword("meat", 1, "kg"),
    "kebab": new Keyword("meat", 400, "g"),
    "kefir": new Keyword("dairy", 1, "kg"),
    "kiks": new Keyword("cupboard", 250, "g"),
    "kiwi": new Keyword("fruitsandvegetables", 75, "g"),
    "kohberg": new Keyword("bread", 500, "g"),
    "kopnudler": new Keyword("cupboard", 65, "g"),
    "laks": new Keyword("fish", 600, "g"),
    "lasagne": new Keyword("semiprepared", 500, "g"),
    "lunchbite": new Keyword("bread", 100, "g"),
    "mango": new Keyword("fruitsandvegetables", 200, "g"),
    "margarine": new Keyword("dairy", 500, "ml", false),
    "medister": new Keyword("meat", 1, "kg"),
    "mokai": new Keyword("drinks", 330, "ml"),
    "mozzarella": new Keyword("dairy", 125, "g"),
    "müslibar": new Keyword("cupboard", 50, "g"),
    "nakkefilet": new Keyword("meat", 2, "kg"),
    "nudler": new Keyword("cupboard", 250, "g"),
    "nødder": new Keyword("cupboard", 200, "g"),
    "oksemørbrad": new Keyword("meat", 1.5, "kg"),
    "pandekager": new Keyword("dessert", 300, "g"),
    "parmesan": new Keyword("dairy", 150, "g"),
    "peber": new Keyword("cupboard", 50, "g"),
    "peberfrugt": new Keyword("fruitsandvegetables", 150, "g"),
    "pesto": new Keyword("cupboard", 130, "g"),
    "pomme": new Keyword("semiprepared", 500, "g", false),
    "pork": new Keyword("meat", 500, "g", false),
    "porrer": new Keyword("fruitsandvegetables", 150, "g"),
    "pølser": new Keyword("meat", 350, "g"),
    "pærer": new Keyword("fruitsandvegetables", 150, "g"),
    "radiser": new Keyword("fruitsandvegetables", 10, "g"),
    "rejer": new Keyword("fish", 200, "g"),
    "ribbenssteg": new Keyword("meat", 2, "kg"),
    "ribeye": new Keyword("meat", 1, "kg"),
    "ris": new Keyword("cupboard", 1, "kg"),
    "roastbeef": new Keyword("meat", 1, "kg"),
    "rom": new Keyword("drinks", 700, "ml", false),
    "royal": new Keyword("drinks", 330, "ml"),
    "rødbeder": new Keyword("fruitsandvegetables", 100, "g"),
    "salami": new Keyword("meat", 20, "g", false),
    "salt": new Keyword("cupboard", 500, "g"),
    "schulstad": new Keyword("bread", 500, "g"),
    "selleri": new Keyword("fruitsandvegetables", 500, "g"),
    "slik": new Keyword("dessert", 100, "g"),
    "smoothie": new Keyword("drinks", 250, "ml"),
    "snaps": new Keyword("drinks", 700, "ml"),
    "sodavand": new Keyword("drinks", 330, "ml"),
    "somersby": new Keyword("drinks", 330, "ml"),
    "spareribs": new Keyword("meat", 500, "g"),
    "spinat": new Keyword("fruitsandvegetables", 5, "g"),
    "squash": new Keyword("fruitsandvegetables", 200, "g"),
    "sukker": new Keyword("cupboard", 1, "kg"),
    "survarer": new Keyword("fruitsandvegetables", 400, "g"),
    "sushi": new Keyword("semiprepared", 300, "g"),
    "tacos": new Keyword("cupboard", 150, "g"),
    "tapas": new Keyword("semiprepared", 300, "g"),
    "thisted": new Keyword("drinks", 500, "ml"),
    "tomater": new Keyword("fruitsandvegetables", 80, "g"),
    "tortilla": new Keyword("bread", 300, "g"),
    "tuborg": new Keyword("drinks", 330, "ml"),
    "whisky": new Keyword("drinks", 700, "ml"),
    "wienerschnitzel": new Keyword("meat", 1, "kg"),
    "wings": new Keyword("meat", 2, "kg", false),
    "wok": new Keyword("semiprepared", 500, "g"),
    "yoghurt": new Keyword("dairy", 1, "kg"),
    "æbler": new Keyword("fruitsandvegetables", 150, "g"),

    // --- Blomme family ---
    "blommeabrikoser": new Keyword("fruitsandvegetables", 40, "g"),
    "blommer": new Keyword("fruitsandvegetables", 50, "g"),

    // --- Brød family ---
    "franskbrød": new Keyword("bread", 500, "g"),
    "knækbrød": new Keyword("bread", 250, "g"),
    "rugbrød": new Keyword("bread", 500, "g"),
    "brød": new Keyword("bread", 500, "g", false),

    // --- Bær family ---
    "blåbær": new Keyword("fruitsandvegetables", 2, "g"),
    "hindbær": new Keyword("fruitsandvegetables", 5, "g"),
    "jordbær": new Keyword("fruitsandvegetables", 15, "g"),
    "bær": new Keyword("fruitsandvegetables", 5, "g", false),

    // --- Drik family ---
    "energidrik": new Keyword("drinks", 500, "ml"),
    "proteindrik": new Keyword("dairy", 500, "ml"),
    "drikkeyoghurt": new Keyword("dairy", 330, "ml"),

    // --- Flæsk family ---
    "flæskesteg": new Keyword("meat", 1.5, "kg"),
    "flæskesvær": new Keyword("meat", 100, "g"),
    "flæsk": new Keyword("meat", 1, "kg", false),

    // --- Frugt family ---
    "frugtstænger": new Keyword("cupboard", 100, "g"),
    "frugter": new Keyword("fruitsandvegetables", 150, "g"),

    // --- Is family ---
    "isbar": new Keyword("dessert", 250, "ml"),
    "iskasse": new Keyword("dessert", 500, "g"),
    "is": new Keyword("dessert", 500, "g", false),

    // --- Kage family ---
    "chokoladekage": new Keyword("dessert", 400, "g"),
    "lagkagebunde": new Keyword("dessert", 400, "g"),
    "lagkage": new Keyword("dessert", 800, "g"),
    "citronmåne": new Keyword("dessert", 350, "g"),
    "brownie": new Keyword("dessert", 200, "g"),
    "kage": new Keyword("dessert", 350, "g"),

    // --- Kaffe family ---
    "instantkaffe": new Keyword("cupboard", 100, "g"),
    "kaffebønner": new Keyword("cupboard", 1, "kg"),
    "kaffe": new Keyword("cupboard", 500, "g", false),

    // --- Kartoffel family ---
    "flødekartofler": new Keyword("semiprepared", 1, "kg"),
    "kartofler": new Keyword("fruitsandvegetables", 100, "g"),

    // --- Kylling family ---
    "kyllingebrystfilet": new Keyword("meat", 1, "kg"),
    "kyllingeinderfilet": new Keyword("meat", 1, "kg"),
    "kyllingekød": new Keyword("meat", 1, "kg"),
    "kylling": new Keyword("meat", 1.4, "kg", false),

    // --- Kål family ---
    "blomkål": new Keyword("fruitsandvegetables", 800, "g"),
    "hvidkål": new Keyword("fruitsandvegetables", 1.2, "kg"),
    "rødkål": new Keyword("fruitsandvegetables", 1.2, "kg"),
    "spidskål": new Keyword("fruitsandvegetables", 500, "g"),
    "kål": new Keyword("fruitsandvegetables", 500, "g", false),

    // --- Kød family ---
    "grisekød": new Keyword("meat", 1.5, "kg"),
    "oksekød": new Keyword("meat", 1, "kg"),
    "kødboller": new Keyword("meat", 1.5, "kg"),

    // --- Leverpostej family ---
    "baconleverpostej": new Keyword("meat", 200, "g"),
    "franskleverpostej": new Keyword("meat", 200, "g"),
    "grovleverpostej": new Keyword("meat", 200, "g"),
    "leverpostej": new Keyword("meat", 200, "g", false),

    // --- Løg family ---
    "forårsløg": new Keyword("fruitsandvegetables", 15, "g"),
    "hvidløg": new Keyword("fruitsandvegetables", 50, "g"),
    "rødløg": new Keyword("fruitsandvegetables", 100, "g"),
    "zittauerløg": new Keyword("fruitsandvegetables", 100, "g"),
    "løg": new Keyword("fruitsandvegetables", 100, "g", false),

    // --- Majs family ---
    "majskolbe": new Keyword("fruitsandvegetables", 200, "g"),
    "majs": new Keyword("fruitsandvegetables", 200, "g", false),

    // --- Mel family ---
    "hvedemel": new Keyword("cupboard", 1, "kg"),
    "rugmel": new Keyword("cupboard", 1, "kg"),
    "mel": new Keyword("cupboard", 1, "kg", false),

    // --- Melon family ---
    "vandmelon": new Keyword("fruitsandvegetables", 5, "kg"),
    "melon": new Keyword("fruitsandvegetables", 1, "kg"),

    // --- Mælk family ---
    "kærnemælk": new Keyword("dairy", 1, "l"),
    "letmælk": new Keyword("dairy", 1, "l"),
    "minimælk": new Keyword("dairy", 1, "l"),
    "skummetmælk": new Keyword("dairy", 1, "l"),
    "sødmælk": new Keyword("dairy", 1, "l"),
    "mælke": new Keyword("dessert", 100, "g"),
    "mælk": new Keyword("dairy", 1, "l", false),

    // --- Olie family ---
    "olivenolie": new Keyword("cupboard", 500, "ml"),
    "rapsolie": new Keyword("cupboard", 1, "l"),
    "olie": new Keyword("cupboard", 500, "ml", false),

    // --- Ost family ---
    "dessertost": new Keyword("dairy", 150, "g"),
    "flødeost": new Keyword("dairy", 200, "g"),
    "hytteost": new Keyword("dairy", 300, "g"),
    "ost": new Keyword("dairy", 300, "g", false),

    // --- Pasta family ---
    "fusilli": new Keyword("cupboard", 500, "g"),
    "lasagnebunde": new Keyword("cupboard", 500, "g"),
    "macaroni": new Keyword("cupboard", 500, "g"),
    "penne": new Keyword("cupboard", 500, "g"),
    "spaghetti": new Keyword("cupboard", 500, "g"),
    "pasta": new Keyword("cupboard", 500, "g", false),

    // --- Pizza family ---
    "pizzasauce": new Keyword("cupboard", 400, "g"),
    "pizza": new Keyword("semiprepared", 350, "g", false),

    // --- Pålæg family ---
    "pålægschokolade": new Keyword("dessert", 400, "g"),
    "pålæg": new Keyword("semiprepared", 100, "g"),

    // --- Salat family ---
    "salatost": new Keyword("dairy", 200, "g"),
    "icebergsalat": new Keyword("fruitsandvegetables", 200, "g", false),
    "isbjergsalat": new Keyword("fruitsandvegetables", 200, "g", false),
    "salat": new Keyword("fruitsandvegetables", 200, "g", false),

    // --- Te family ---
    "tebreve": new Keyword("cupboard", 50, "g"),
    "te": new Keyword("cupboard", 100, "g", false),

    // --- Vin family ---
    "hvidvin": new Keyword("drinks", 750, "ml"),
    "rosévin": new Keyword("drinks", 750, "ml"),
    "rødvin": new Keyword("drinks", 750, "ml"),
    "vin": new Keyword("drinks", 750, "ml", false),

    // --- Æg family ---
    "frilandsæg": new Keyword("eggs", 1, "piece"),
    "skrabeæg": new Keyword("eggs", 1, "piece"),
    "buræg": new Keyword("eggs", 1, "piece"),
    "økoæg": new Keyword("eggs", 1, "piece"),
    "æg": new Keyword("eggs", 1, "piece", false),

    // --- Øl family ---
    "specialøl": new Keyword("drinks", 500, "ml"),
    "øl": new Keyword("drinks", 330, "ml", false)
};