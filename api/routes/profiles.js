var express = require('express');
const { route } = require('.');
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

// get data for all profiles - don't get until "submitted" is true 
router.get("/all", function(req, res, next) {
    //res.send("API is working properly");
    // const myJSON = JSON.stringify(cardInfo);
    // res.json(myJSON);
    const snakeToCamel = snakeCaseString => snakeCaseString.replace(/([-_]\w)/g, g => g[1].toUpperCase());
    User.getAll("user_profile")
        .then(data => {
            let profiles = data.map(profile => {
                let newProfile = {};
                Object.keys(profile).map(key => {
                  newProfile[snakeToCamel(key)] = profile[key] 
                  if (profile[key] == null) {
                    if (key == "filters") {
                      newProfile[snakeToCamel(key)] = [];
                    } else {
                      newProfile[snakeToCamel(key)] = "";
                    }
                  }
                })
                return newProfile;
            }).filter(profile => profile.isPosted);
            res.status(200).json({data: profiles});
            console.log(profiles)
            console.log("sent all profile data!");
            return data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
        // must convert everything to camelcase...
});

// testing api
router.get("/test", function(req, res, next) {
    const arr = [
        {name: "obj 1"},
        {name: "obj 2"}
    ];
    const myJSON = JSON.stringify(arr);
    res.json(myJSON);
})

// add user_account and create row in user_profile with user_id
router.post("/addUser", function(req, res, next) {
    const { email } = req.body;
    User.exists(email)
        .then(email => {
            const exists = email;
            if (exists) {
                res.status(500).json({ error: "A profile with this email already exists. Maybe you meant to edit your profile?" }); // check that these error status are correct
                console.log("error registering - exists");
                return email;
            } else {
                User.add(req.body)
                    .then(userid => {
                        res.status(200).json({ message: "Welcome!", userid: userid });
                        console.log("user added!");
                        return userid;
                    });
            }
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
})

// add or edit data in profile 
router.post("/update", function(req, res, next) {
    const { userId, data } = req.body;
    // User.testUpdate(userid)
    //     .then(data => {
    //         console.log(data);
    //         return data;
    //     })
    User.updateProfile(userId, data)
        .then(data => {
            res.status(200).json({ message: "info saved!" });
            console.log("info added!");
            return data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
})

// get data for a specified profile
router.get("/", function(req, res, next) {
    const email = req.query.email; 
    const cols = ["user_id", "first_name", "last_name", "about", "basics", "filters", "social"];
    User.exists(email)
        .then(exists => {
            if (exists) {
                User.getData(cols, "user_profile", email)
                    .then(data => {
                        res.status(200).json(data);
                        console.log("we got the profile data!");
                        return data;
                    })
                    .catch(err => {
                        res.status(0).json({ error: "an unknown error has occured" });
                        console.log(err);
                        throw err;
                    })
            } else {
                res.status(500).json({ error: "There is no profile associated with this email." });
                return email;
            }
        })
        .catch(err => {
            res.status(0).json({ error: "an unknown error has occured" });
            console.log(err);
            throw err;
        })
})

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