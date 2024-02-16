//My User + 10 Demo Users
const USERS =
  [
    {
      "email": "corti.filippo03@gmail.com",
      "username": "Filippo",
      "password": "Filippo123!",
      "interests": {
        "areas": ["American", "Italian"],
        "categories": ["Beef"],
        "ingredients": ["Avocado", "Basil"]
      },
      "cookbook": [
        {
          "id": "53070",
          "note": "Questa è una nota"
        },
        {
          "id": "53013",
          "note": ""
        },
        {
          "id": "52958",
          "note": ""
        },
        {
          "id": "52861",
          "note": "Questa è un'altra nota"
        },
        {
          "id": "52876",
          "note": "Tempo di Preparazione: 25min"
        },
        {
          "id": "52981",
          "note": ""
        },
        {
          "id": "52927",
          "note": "Molto buono"
        }
      ],
      "color": "#9F5DD5"
    },
    {
      "email": "john.doe@example.com",
      "username": "johndoe",
      "password": "P@ssw0rd!",
      "interests": {
        "areas": [],
        "categories": [],
        "ingredients": []
      },
      "cookbook": [],
      "color": "#B69DDB"
    },
    {
      "email": "jane.smith@example.com",
      "username": "janesmith",
      "password": "Secur3P@ss",
      "interests": {
        "areas": [],
        "categories": [],
        "ingredients": []
      },
      "cookbook": [],
      "color": "#E7A59A"
    },
    {
      "email": "alice.wonder@example.com",
      "username": "alicewonderland",
      "password": "Saf3P@ssword!",
      "interests": {
        "areas": [],
        "categories": [],
        "ingredients": []
      },
      "cookbook": [],
      "color": "#6FE56F"
    },
    {
      "email": "bob.jackson@example.com",
      "username": "bobjackson",
      "password": "B0bP@ssword",
      "interests": {
        "areas": [],
        "categories": [],
        "ingredients": []
      },
      "cookbook": [],
      "color": "#D27A51"
    },
    {
      "email": "sara.connor@example.com",
      "username": "saraconnor",
      "password": "T3rmin@t0r",
      "interests": {
        "areas": [],
        "categories": [],
        "ingredients": []
      },
      "cookbook": [],
      "color": "#71BBF3"
    },
    {
      "email": "david.bowie@example.com",
      "username": "davidbowie",
      "password": "St@rman1972",
      "interests": {
        "areas": [],
        "categories": [],
        "ingredients": []
      },
      "cookbook": [],
      "color": "#1EB06E"
    },
    {
      "email": "laura.palmer@example.com",
      "username": "laurapalmer",
      "password": "TwinP3aks!234",
      "interests": {
        "areas": [],
        "categories": [],
        "ingredients": []
      },
      "cookbook": [],
      "color": "#FA899E"
    },
    {
      "email": "bruce.wayne@example.com",
      "username": "brucewayne",
      "password": "B@tman1969",
      "interests": {
        "areas": [],
        "categories": [],
        "ingredients": []
      },
      "cookbook": [],
      "color": "#09C094"
    },
    {
      "email": "ellen.ripley@example.com",
      "username": "ellenripley",
      "password": "N0st0m@e",
      "interests": {
        "areas": [],
        "categories": [],
        "ingredients": []
      },
      "cookbook": [],
      "color": "#D4B2E3"
    },
    {
      "email": "harry.potter@example.com",
      "username": "harrypotter",
      "password": "Muggl3@ver",
      "interests": {
        "areas": [],
        "categories": [],
        "ingredients": []
      },
      "cookbook": [],
      "color": "#EE5361"
    }
  ];


//Contents for the reviews
const CONTENTS = [
  "This recipe is amazing! I loved every bite of it.",
  "Simple and delicious. Will definitely make again.",
  "Delicious and easy to make. A new favorite!",
  "Outstanding flavors. Definitely a must-try.",
  "Perfect for a quick weeknight dinner. Loved it!",
  "Amazing dish. Will impress even the pickiest eaters!",
  "Magical flavors! Definitely adding this to my favorites list.",
  "Good recipe, but needed a bit more seasoning for my taste.",
  "Decadent dessert! Loved every bite.",
  "Simple and tasty. Perfect for a quick lunch.",
  "Absolutely delicious! A new favorite in my household.",
  "Simple to make and delicious. A new favorite!",
  "Delightful recipe! Will definitely make again.",
  "Decent dish, but could use a bit more flavor.",
  "Fantastic flavors! A true culinary delight.",
  "Incredible recipe. Will definitely make again!",
  "Absolutely delicious! A new family favorite.",
  "Fantastic dish! Will definitely make again.",
  "Excellent recipe. Perfect for special occasions.",
  "Outstanding flavors. Highly recommended!",
  "Incredible dish. Perfect balance of flavors.",
  "Delicious and satisfying. Will make again!",
  "Wonderful recipe. A new favorite in my household.",
  "Simple yet delicious. Will definitely make again.",
  "This recipe blew my mind! It's so flavorful and satisfying. The combination of spices and textures creates a culinary experience unlike any other. From the first bite to the last, I was completely enthralled. This recipe will definitely be a regular in my meal rotation.",
  "Absolutely divine! This recipe is a masterpiece. The complex flavors and harmonious blend of ingredients create an unforgettable dining experience. It's a bit time-consuming to prepare, but the end result is well worth the effort. I can't wait to share this with friends and family!",
  "I'm blown away by how delicious this dish is! The layers of flavor are incredible, and each bite is a delight to the senses. It's a bit challenging to make, but the end result is so rewarding. This recipe has definitely earned a permanent spot in my cookbook.",
  "",
];

const TIMESTAMP_MIN = 1704063600000; //January 1st 2024
const TIMESTAMP_MAX = 1707990030991; //February 15th 2024

const RECIPE_ID_MIN = 52764;
const RECIPE_ID_MAX = 53083;

//Load AI generated Data into the Storage and Reload the page
function loadDemoData() {
  clearStorage();
  localStorage.setItem("users", JSON.stringify(USERS));

  let reviews = {};

  for (let recipe_id = RECIPE_ID_MIN; recipe_id <= RECIPE_ID_MAX; recipe_id++) {
    let number_of_reviews = getRandomInt(10); //0 to 9
    let reviews_for_recipe = [];
    for (let i = 0; i < number_of_reviews; i++) {
      reviews_for_recipe.push({
        recipe_id: recipe_id,
        author: pickRandom(USERS).email,
        content: pickRandom(CONTENTS),
        difficulty: getRandomInt(5) + 1,
        taste: getRandomInt(5) + 1,
        timestamp: getRandomInt(TIMESTAMP_MAX - TIMESTAMP_MIN) + TIMESTAMP_MIN,
      });
    }
    reviews[recipe_id] = reviews_for_recipe;
  }
  localStorage.setItem("reviews", JSON.stringify(reviews));

  location.reload();
}

function pickRandom(array) {
  return array[getRandomInt(array.length)];
}
