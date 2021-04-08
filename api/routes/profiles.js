var express = require('express');
var router = express.Router();

const User = require('../db/user');

let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let lorem2 = lorem + lorem;

let cardInfo = [
    {
        name: "helene aquilla",
        // pronouns
        img: "/pfp.jpg",
        filters: [
            "morning",
            "no campus preference",
            "INFJ",
            "Mid-Atlantic",
            "Questbridge",
            "cleanliness: 5",
            "partying: 1"
        ],
        bio: {
            about: lorem,
            looking: lorem2,
            major: "computer science",
            location: "NYC",
        },
        social: {
            ig: "dklarachel",
            snap: "lechar.mai",
            phone: "917 392 1992"
        }
    },
    {
        name: "maven calore",
        img: "https://i.imgur.com/8NOcnwx.png",
        filters: [
            "night",
            "south",
            "INFJ",
            "Mid-Atlantic",
            "International",
            "cleanliness: 5",
            "partying: 3"
        ],
        bio: {
            about: lorem,
            looking: lorem2,
            major: "psychology",
            location: "NYC",
        },
        social: {
            ig: "dklarachel",
            snap: "lechar.mai",
            phone: "917 392 1992"
        }
    },
    {
        name: "lila bard",
        img: "https://i.imgur.com/8d3uzkw.png",
        filters: [
            "night",
            "north",
            "INFJ",
            "West Coast",
            //"International",
            "cleanliness: 3",
            "partying: 1"
        ],
        bio: {
            about: lorem,
            looking: lorem2,
            major: "psychology",
            location: "NYC",
        },
        social: {
            ig: "dklarachel",
            snap: "lechar.mai",
            phone: "917 392 1992"
        }
    },
];

router.get("/", function(req, res, next) {
    //res.send("API is working properly");
    const myJSON = JSON.stringify(cardInfo);
    res.json(myJSON);
});

router.get("/test", function(req, res, next) {
    const arr = [
        {name: "obj 1"},
        {name: "obj 2"}
    ];
    const myJSON = JSON.stringify(arr);
    res.json(myJSON);
})

router.post("/addUser", function(req, res, next) {
    const { email } = req.body;
    User.exists(email)
        .then(email => {
            const exists = email;
            if (exists) {
                res.status(500).json({ error: "account with this email already exists" }); // check that these error status are correct
                console.log("error registering - exists");
                return email;
            } else {
                User.add(req.body)
                    .then(data => {
                        res.status(200).json({ message: "welcome!" });
                        console.log("user added!");
                        return data;
                    });
                return email;
            }
        })
        .catch(err => {
            console.log(err);
            //throw err;
        })
})

// router.post("/make", function(req, res, next) {
    
// })

const account = {
    firstName: "",
    lastName: "",
    email: ""
}

const profile = {
    about: {
      bio: "",
      looking: ""
    },
    basics: {
      location: "",
      major: "",
      mbti: "",
      pronouns: ""
    },
    filters: [],
    social: {
      instagram: "",
      phone: "", // or int? 
      snapchat: ""
    }
  }

//router.post("/submit")

module.exports = router;