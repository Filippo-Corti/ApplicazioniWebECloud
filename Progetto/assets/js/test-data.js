/*let r = []
for (let i = 97; i <= 122; i++) {
    let meals = await searchByFirstLetter(String.fromCharCode(i));
    for (let meal of meals) {
        r.push(meal.idMeal)
    }
    console.log(i);
}
console.log(r.sort((a, b) => a - b));*/

// Id's go from 52764 to 53083, skipping some numbers

/*
[
  {
    "email": "john.doe@example.com",
    "username": "johndoe",
    "password": "P@ssw0rd!",
    "interests": {
      "areas": [],
      "categories": [],
      "ingredients": []
    },
    "cookbook": []
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
    "cookbook": []
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
    "cookbook": []
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
    "cookbook": []
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
    "cookbook": []
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
    "cookbook": []
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
    "cookbook": []
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
    "cookbook": []
  },
  {
    "email": "ellen.ripley@example.com",
    "username": "ellenripley",
    "password": "N0st0m@",
    "interests": {
      "areas": [],
      "categories": [],
      "ingredients": []
    },
    "cookbook": []
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
    "cookbook": []
  }
]
*/

/*
{
  "52764": [
    {
      "recipe_id": 52764,
      "author": "john.doe@example.com",
      "content": "This recipe is amazing! I loved every bite of it.",
      "difficulty": 4,
      "taste": 5,
      "timestamp": 1704063600000
    },
    {
      "recipe_id": 52764,
      "author": "jane.smith@example.com",
      "content": "Simple and delicious. Will definitely make again.",
      "difficulty": 2,
      "taste": 4,
      "timestamp": 1704137200000
    }
  ],
  "52765": [
    {
      "recipe_id": 52765,
      "author": "alice.wonder@example.com",
      "content": "This recipe exceeded my expectations. Highly recommend!",
      "difficulty": 3,
      "taste": 5,
      "timestamp": 1704210800000
    },
    {
      "recipe_id": 52765,
      "author": "bob.jackson@example.com",
      "content": "Not bad, but I've had better.",
      "difficulty": 3,
      "taste": 3,
      "timestamp": 1704284400000
    }
  ],
  "52766": [
    {
      "recipe_id": 52766,
      "author": "alice.wonder@example.com",
      "content": "Delicious and easy to make. A new favorite!",
      "difficulty": 2,
      "taste": 5,
      "timestamp": 1704358000000
    },
    {
      "recipe_id": 52766,
      "author": "david.bowie@example.com",
      "content": "Outstanding flavors. Definitely a must-try.",
      "difficulty": 3,
      "taste": 5,
      "timestamp": 1704431600000
    }
  ],
  "52767": [
    {
      "recipe_id": 52767,
      "author": "ellen.ripley@example.com",
      "content": "Perfect for a quick weeknight dinner. Loved it!",
      "difficulty": 2,
      "taste": 4,
      "timestamp": 1704505200000
    }
  ],
  "52768": [
    {
      "recipe_id": 52768,
      "author": "bruce.wayne@example.com",
      "content": "Amazing dish. Will impress even the pickiest eaters!",
      "difficulty": 5,
      "taste": 5,
      "timestamp": 1704578800000
    }
  ],
  "52769": [
    {
      "recipe_id": 52769,
      "author": "harry.potter@example.com",
      "content": "Magical flavors! Definitely adding this to my favorites list.",
      "difficulty": 3,
      "taste": 5,
      "timestamp": 1704652400000
    }
  ],
  "52770": [
    {
      "recipe_id": 52770,
      "author": "sara.connor@example.com",
      "content": "Good recipe, but needed a bit more seasoning for my taste.",
      "difficulty": 3,
      "taste": 3,
      "timestamp": 1704726000000
    }
  ],
  "52771": [
    {
      "recipe_id": 52771,
      "author": "laura.palmer@example.com",
      "content": "Decadent dessert! Loved every bite.",
      "difficulty": 4,
      "taste": 5,
      "timestamp": 1704799600000
    }
  ],
  "52772": [
    {
      "recipe_id": 52772,
      "author": "ellen.ripley@example.com",
      "content": "Simple and tasty. Perfect for a quick lunch.",
      "difficulty": 2,
      "taste": 4,
      "timestamp": 1704873200000
    }
  ],
  "52773": [
    {
      "recipe_id": 52773,
      "author": "david.bowie@example.com",
      "content": "Unique flavors. Will make again!",
      "difficulty": 3,
      "taste": 4,
      "timestamp": 1704946800000
    }
  ],
  "52774": [
    {
      "recipe_id": 52774,
      "author": "harry.potter@example.com",
      "content": "Absolutely delicious! A new favorite in my household.",
      "difficulty": 4,
      "taste": 5,
      "timestamp": 1705020400000
    }
  ],
  "52775": [
    {
      "recipe_id": 52775,
      "author": "sara.connor@example.com",
      "content": "Simple and satisfying. Perfect for busy weeknights.",
      "difficulty": 2,
      "taste": 4,
      "timestamp": 1705094000000
    }
  ],
  "52776": [
    {
      "recipe_id": 52776,
      "author": "bruce.wayne@example.com",
      "content": "Incredible dish. Will definitely impress guests!",
      "difficulty": 5,
      "taste": 5,
      "timestamp": 1705167600000
    }
  ],
  "52777": [
    {
      "recipe_id": 52777,
      "author": "ellen.ripley@example.com",
      "content": "This recipe is a game-changer! So flavorful.",
      "difficulty": 3,
      "taste": 5,
      "timestamp": 1705241200000
    }
  ],
  "52778": [
    {
      "recipe_id": 52778,
      "author": "john.doe@example.com",
      "content": "Decadent dessert. Perfect for special occasions.",
      "difficulty": 4,
      "taste": 5,
      "timestamp": 1705314800000
    }
  ],
  "52779": [
    {
      "recipe_id": 52779,
      "author": "jane.smith@example.com",
      "content": "Easy to make and delicious. Will make again!",
      "difficulty": 2,
      "taste": 4,
      "timestamp": 1705388400000
    }
  ],
  "52780": [
    {
      "recipe_id": 52780,
      "author": "alice.wonder@example.com",
      "content": "Simple yet elegant. Loved it!",
      "difficulty": 3,
      "taste": 5,
      "timestamp": 1705462000000
    }
  ],
  "52781": [
    {
      "recipe_id": 52781,
      "author": "bob.jackson@example.com",
      "content": "Not my favorite, but still enjoyable.",
      "difficulty": 3,
      "taste": 3,
      "timestamp": 1705535600000
    }
  ],
  "52782": [
    {
      "recipe_id": 52782,
      "author": "david.bowie@example.com",
      "content": "Unique flavors. Worth trying!",
      "difficulty": 3,
      "taste": 4,
      "timestamp": 1705609200000
    }
  ],
  "52783": [
    {
      "recipe_id": 52783,
      "author": "laura.palmer@example.com",
      "content": "Delicious and comforting. A new family favorite.",
      "difficulty": 2,
      "taste": 5,
      "timestamp": 1705682800000
    }
  ],
  "52784": [
    {
      "recipe_id": 52784,
      "author": "john.doe@example.com",
      "content": "Excellent recipe! The flavors blend perfectly.",
      "difficulty": 4,
      "taste": 5,
      "timestamp": 1705756400000
    },
    {
      "recipe_id": 52784,
      "author": "jane.smith@example.com",
      "content": "Simple to make and delicious. A new favorite!",
      "difficulty": 3,
      "taste": 4,
      "timestamp": 1705830000000
    }
  ],
  "52785": [
    {
      "recipe_id": 52785,
      "author": "alice.wonder@example.com",
      "content": "Delightful recipe! Will definitely make again.",
      "difficulty": 3,
      "taste": 5,
      "timestamp": 1705903600000
    },
    {
      "recipe_id": 52785,
      "author": "bob.jackson@example.com",
      "content": "Decent dish, but could use a bit more flavor.",
      "difficulty": 3,
      "taste": 3,
      "timestamp": 1705977200000
    }
  ],
  "52786": [
    {
      "recipe_id": 52786,
      "author": "david.bowie@example.com",
      "content": "Fantastic flavors! A true culinary delight.",
      "difficulty": 5,
      "taste": 5,
      "timestamp": 1706050800000
    },
    {
      "recipe_id": 52786,
      "author": "sara.connor@example.com",
      "content": "Incredible recipe. Will definitely make again!",
      "difficulty": 4,
      "taste": 5,
      "timestamp": 1706124400000
    }
  ],
  "52787": [
    {
      "recipe_id": 52787,
      "author": "ellen.ripley@example.com",
      "content": "Absolutely delicious! A new family favorite.",
      "difficulty": 4,
      "taste": 5,
      "timestamp": 1706198000000
    },
    {
      "recipe_id": 52787,
      "author": "harry.potter@example.com",
      "content": "Fantastic dish! Will definitely make again.",
      "difficulty": 3,
      "taste": 5,
      "timestamp": 1706271600000
    }
  ],
  "52788": [
    {
      "recipe_id": 52788,
      "author": "bruce.wayne@example.com",
      "content": "Excellent recipe. Perfect for special occasions.",
      "difficulty": 5,
      "taste": 5,
      "timestamp": 1706345200000
    },
    {
      "recipe_id": 52788,
      "author": "ellen.ripley@example.com",
      "content": "Outstanding flavors. Highly recommended!",
      "difficulty": 4,
      "taste": 5,
      "timestamp": 1706418800000
    }
  ],
  "52789": [
    {
      "recipe_id": 52789,
      "author": "david.bowie@example.com",
      "content": "Incredible dish. Perfect balance of flavors.",
      "difficulty": 5,
      "taste": 5,
      "timestamp": 1706492400000
    },
    {
      "recipe_id": 52789,
      "author": "sara.connor@example.com",
      "content": "Delicious and satisfying. Will make again!",
      "difficulty": 3,
      "taste": 4,
      "timestamp": 1706566000000
    }
  ],
  "52790": [
    {
      "recipe_id": 52790,
      "author": "laura.palmer@example.com",
      "content": "Wonderful recipe. A new favorite in my household.",
      "difficulty": 3,
      "taste": 5,
      "timestamp": 1706639600000
    },
    {
      "recipe_id": 52790,
      "author": "john.doe@example.com",
      "content": "Simple yet delicious. Will definitely make again.",
      "difficulty": 2,
      "taste": 4,
      "timestamp": 1706713200000
    }
  ]

}

*/