var express = require('express');
var router = express.Router();

const User = require('../db/user');

// get data for all profiles and filter profiles where is_posted is false 
router.get("/all", function(req, res, next) {
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

            if (data.length == 0) {
                res.status(200).json({ data: profiles, message: "no profiles found" });
                console.log("no data found")
                return data;
            }

            console.log(data.length)

            res.status(200).json({data: profiles});
            console.log(profiles)
            console.log("sent all profile data!");
            return data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
});

// add user_account and create row in user_profile with user_id
router.post("/addUser", function(req, res) {
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
router.post("/update", function(req, res) {
    const { userId, data } = req.body;
    User.updateProfile(userId, data)
        .then(data => {
            User.updateLastUpdate(userId)
                .then(data => {
                    res.status(200).json({ message: "profile data saved!" });
                    console.log("info added!");
                    return data;
                })
            return data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
})

// update last_login
router.post("/update/last_login", function(req, res) {
    const { userId } = req.body;
    User.updateLastLogin(userId)
        .then(data => {
            res.status(200).json({ message: "last_login updated!" });
            return data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
})

// get data for a specified profile
router.get("/", function(req, res) {
    const email = req.query.email; 
    const cols = [
        "user_id", "first_name", "last_name", "about", "basics", "filters", "social", "roommate", "img", "img_delete", "is_posted"
    ];
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

// delete profile
router.delete("/delete", function(req, res) {
    const userId = req.query.userId;
    User.delete(userId)
        .then(data => {
            res.status(200).json({ message: "profile deleted" });
            return data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
})

module.exports = router;