var express = require('express');
var router = express.Router();

let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let lorem2 = lorem + lorem;

let cardInfo = [
    {
        name: "helene aquilla",
        img: "/pfp.jpg",
        filters: ["morning"],
        bio: {
            about: lorem,
            looking: lorem2,
            location: "NYC"
        }
    },
];

router.get("/", function(req, res, next) {
    //res.send("API is working properly");
    res.json({
        name: "helene aquilla",
        img: "/pfp.jpg",
        filters: [
            "morning",
            "both/neither",
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
    });
});

module.exports = router;