
reelgames = {
  reelgamesHeight : 0,
  reelgamesWidth : 0,
  main () {
    self = this.context;
  },

  populateKAGamesList() {
    let container = $('.reelgames-list.kagaming').show();
    container.empty();

    let next_row = 0;
    let col = 0;
    let con_height = 0;
    let width = 0;
    let height = 0;

    var url = `${window.ka_url}?p=${window.ka_partner_name}&`;

    let ka_games = [{
      "gameId": "Dreamcatcher",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Dreamcatcher",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 30,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Dreamcatcher&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": true,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "FormosanBirds",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Formosan Birds",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 25,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=FormosanBirds&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": true,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Mahjong",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Mahjong Master",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Mahjong&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": true,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Polynesian",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Polynesian",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Polynesian&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": true,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "WildAlaska",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Wild Alaska",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 25,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=WildAlaska&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": true,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "KungFu",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "KungFu Kash",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 30,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=KungFu&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "ThreeLittlePigs",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Three Little Pigs",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 40,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=ThreeLittlePigs&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Jungle",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Jungle",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 30,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Jungle&lang=en",
      "availableFeatures": [
        "br"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        90,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "FairyDust",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Fairy Dust",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=FairyDust&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Giants",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Giants",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Giants&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "DragonGate",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Dragon Gate",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 60,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=DragonGate&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "GoldRush",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "California Gold Rush",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=GoldRush&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "CrazyCircus",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Crazy Circus",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 25,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=CrazyCircus&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "ImperialGuards",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Ming Imperial Guards",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 25,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=ImperialGuards&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "BaWangBieJi",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Ba Wang Bie Ji",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=BaWangBieJi&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Space",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Spinning In Space",
      "numReels": 6,
      "numRows": 4,
      "numSelections": 6,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Space&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        95,
        98
      ]
    },
    {
      "gameId": "Vampire",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Vampire's Tale",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Vampire&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "ChineseOpera",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Chinese Opera",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=ChineseOpera&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Mushrooms",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Trippy Mushrooms",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 25,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Mushrooms&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Wizardry",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Wizardry",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 38,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Wizardry&lang=en",
      "availableFeatures": [
        "bp",
        "fg",
        "wl"
      ],
      "newGame": false,
      "popular": true,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "RedRidingHood",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Red Riding Hood",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 35,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=RedRidingHood&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": true,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Neanderthals",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Neanderthals",
      "numReels": 6,
      "numRows": 4,
      "numSelections": 6,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Neanderthals&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        95,
        98
      ]
    },
    {
      "gameId": "EgyptianEmpress",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Egyptian Empress",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 20,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=EgyptianEmpress&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Ares",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Ares God of War",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Ares&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "FourBeauties",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Four Beauties",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 100,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=FourBeauties&lang=en",
      "availableFeatures": [
        "bp",
        "fg",
        "sk"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "DeepSea",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Deep Sea Adventure",
      "numReels": 5,
      "numRows": 5,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=DeepSea&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Stonehenge",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Stonehenge",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Stonehenge&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "PirateKing",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Pirate King",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=PirateKing&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Gem",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "A Girl's Best Friend",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Gem&lang=en",
      "availableFeatures": [
        "bp",
        "fg",
        "br"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        89,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "SuperKeno",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Super Keno",
      "numReels": 8,
      "numRows": 10,
      "numSelections": 10,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=SuperKeno&lang=en",
      "availableFeatures": [],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        95
      ]
    },
    {
      "gameId": "LeagueOfGods",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Daji",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=LeagueOfGods&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "FortuneGod",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Fortune God",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=FortuneGod&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "FlowersFruitMountain",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Fruit Mountain",
      "numReels": 1,
      "numRows": 1,
      "numSelections": 8,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=FlowersFruitMountain&lang=en",
      "availableFeatures": [],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Nezha",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Nezha",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Nezha&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Kitty",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Kitty Living",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Kitty&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Leprechauns",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Leprechauns",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Leprechauns&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Bakery",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Bakery Sweetness",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Bakery&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "MayanGold",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Mayan Gold",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 20,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=MayanGold&lang=en",
      "availableFeatures": [
        "bp",
        "fg",
        "sk"
      ],
      "newGame": false,
      "popular": true,
      "availableRTP": [
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "StockedBar",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Stocked Bar",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=StockedBar&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "TaiwanBlackBear",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Taiwan Black Bear",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=TaiwanBlackBear&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "777Vegas",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "777 Vegas",
      "numReels": 3,
      "numRows": 3,
      "numSelections": 20,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=777Vegas&lang=en",
      "availableFeatures": [],
      "newGame": false,
      "popular": true,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Mermaid",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Mermaid Seas",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 60,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Mermaid&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": true,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Egypt",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Mysterious Pyramid",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 30,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Egypt&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Cinderella",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Glass Slipper",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 30,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Cinderella&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        96,
        96,
        98
      ]
    },
    {
      "gameId": "Poseidon",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Poseidon's Treasure",
      "numReels": 5,
      "numRows": 5,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Poseidon&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "DimSum",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Dim Sum",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 20,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=DimSum&lang=en",
      "availableFeatures": [
        "bp",
        "fg",
        "sk"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "ZombieLand",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Zombie Land",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 35,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=ZombieLand&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        81,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Samurai",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Samurai Way",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Samurai&lang=en",
      "availableFeatures": [
        "bp",
        "fg",
        "sk"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "DayOfDead",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Dia De Muertos",
      "numReels": 5,
      "numRows": 5,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=DayOfDead&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "HappyFarm",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Farm Mania",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=HappyFarm&lang=en",
      "availableFeatures": [
        "bp",
        "fg",
        "sk"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "HuaMulan",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Hua Mulan",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=HuaMulan&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "SuperVideoPoker",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Super Video Poker",
      "numReels": 5,
      "numRows": 1,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=SuperVideoPoker&lang=en",
      "availableFeatures": [],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        96
      ]
    },
    {
      "gameId": "TRex",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "The King of Dinosaurs",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=TRex&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "SuperShot",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "SuperShot",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 20,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=SuperShot&lang=en",
      "availableFeatures": [],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Safari",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Safari Slots",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 100,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Safari&lang=en",
      "availableFeatures": [
        "bp",
        "fg",
        "sk"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Cowboys",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Cowboys",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 40,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Cowboys&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Flaming7",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Flaming 7's",
      "numReels": 3,
      "numRows": 3,
      "numSelections": 1,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Flaming7&lang=en",
      "availableFeatures": [],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "LostRealm",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Lost Realm",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 30,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=LostRealm&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "LotusLamp",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "The Lotus Lamp",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=LotusLamp&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Mythic",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Mythic",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 36,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Mythic&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        90,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "SilkRoad",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Silk Road",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 35,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=SilkRoad&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Viking",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Age of Vikings",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 50,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Viking&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": true,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "DaVinci",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "da Vinci",
      "numReels": 5,
      "numRows": 4,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=DaVinci&lang=en",
      "availableFeatures": [
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "Knights",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Medieval Knights",
      "numReels": 5,
      "numRows": 6,
      "numSelections": 100,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=Knights&lang=en",
      "availableFeatures": [
        "bp",
        "fg",
        "sk"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "DragonsLegend",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Legend of Dragons",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 5,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=DragonsLegend&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    },
    {
      "gameId": "FantasyPark",
      "gameType": "slots",
      "variantType": "ways",
      "gameName": "Fantasy Park",
      "numReels": 5,
      "numRows": 3,
      "numSelections": 35,
      "availableBets": [
        1,
        2,
        5,
        7,
        10
      ],
      "maxBet": 10,
      "availableDenoms": [
        1,
        2,
        5,
        10
      ],
      "iconURLPrefix": "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=FantasyPark&lang=en",
      "availableFeatures": [
        "bp",
        "fg"
      ],
      "newGame": false,
      "popular": false,
      "availableRTP": [
        82,
        84,
        86,
        88,
        90,
        92,
        94,
        96,
        98
      ]
    }
  ];

    if(!ka_games) return;

    if(window.innerWidth <  window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
      this.reelgamesWidth = 167;
      this.reelgamesHeight = 167;
    } else {
      this.reelgamesWidth = 170;
      this.reelgamesHeight = 170;
    }
    
    for(let i = 0; i < ka_games.length; i++) {
      let kaGames = ka_games[i];
      let imgSrc = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+kaGames.gameId+'&lang=en&type=square';

      if (col == 7) {
        next_row++;
        col = 0;
      }

      var dom = document.createElement("div");
      $(dom).css({
        'width'           : `${this.reelgamesWidth}px`,
        'height'          : `${this.reelgamesHeight}px`,
        'display'         : 'inline-block',
        'margin'          : '6px' ,
        'border-radius'   : '8px',
        'background'      : 'url('+imgSrc+')',
        'background-size' : ' 100%',
        'cursor'          : 'pointer'
      });

      container.append(dom);

      $(dom).on("click", () => {
        $.post('/kaga/token', {}, (response) => {
          var username = window.username;
          let tempUrl = `${url}g=${kaGames.gameId}`;
          tempUrl += '&t=' + response.payload + '&u=' + username;
          tempUrl += '&ak=' + response.access + `&cr=${window.currencyAbbrev}`;
          tempUrl += '&m=' + this.isDemo();
          tempUrl += '&loc=' + this.getLoc();
          console.log(tempUrl);

          if (window.reel_yn === 0) {
            $('.ka-wrap, .ka-prompt-reel').addClass('active');
          } else {
            var checkPopup = window.open("about:blank","","directories=no,height=100,width=100,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,top=0,location=no");

            if (!checkPopup) {
              $('.ka-wrap, .ka-prompt').addClass('active');
              $('.ka-prompt-reel').removeClass('active');
            } else {
              checkPopup.close();
              $('.ka-wrap, .ka-prompt').removeClass('active');

              var new_window = window.open(
                tempUrl,
                'newwindow',
                'height=670,width=1400,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no'
              );

              var timer = setInterval(checkChild, 500);

              function checkChild() {
                if (new_window.closed) {
                  $.post('/getUserMoney', (response) => {
                    window.money = response;
                  });
                  clearInterval(timer);
                }
              }
            }
          }
        });
      });
      col++;
    } // end for
  }, // populateKAGamesList

  isDemo () {
    if(window.vendor_type == 'live') return '0';
    if(window.vendor_type == 'demo') return '1';
  },

  getLoc () {
    let loc = "en";
    switch (window.language.locale) {
      case "zh":
      loc = "zh";
      break;
      case "jp":
      loc = "ja";
      break;
      case "kr":
      loc = "ko";
      break;
    }
    return loc;
  }

}

export default {
  reelgames
}
