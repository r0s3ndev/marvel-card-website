const crypto = require('crypto');
const { connectToDatabase } = require('../config/mongdbconfig');
const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const {checkLoggedIn} = require("../middleware/checkUserSession");

function generateSessionId() {
    return crypto.randomBytes(16).toString('hex');
}

router.post("/getUser", async (req, res) => {
    try {
        const {username} = req.body;
        const db = await connectToDatabase(); 
        const user = await db.collection('users_list').findOne({ username: username});
        res.json(user); 
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users.");
    }
});

//check user before the next page in the registration form
router.post("/check_user", async (req, res) =>  {
    try{
        const db = await connectToDatabase(); 
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Fields must not be empty." });
        }

        //check if user exist
        const checkUser = await db.collection("users_list").find({
            $or: [
                { username },
                { email }
            ]
        }).toArray();

        if(checkUser.length > 0){
            const isUsernameTaken = checkUser.some(user => user.username === username);
            const isEmailTaken = checkUser.some(user => user.email === email);
            let message = "The following are already taken: username or email";
            return res.status(409).json({ message });      
        } 

        return res.status(200).json({ message: "Username and email are available" });
        
    } catch (error) {
        console.error("Error during the user registration:", error);
        return res.status(500).send("Error during the user registration.");
    }
})


router.post("/register", async (req, res) =>  {
    try{
        const db = await connectToDatabase(); 
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userData = {
            credits: 100, //default credits
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            friends: [],
            items: [],
            cards: req.body.cards
        } 
        // const userData = req.body;
        const result = await db.collection('users_list').insertOne(userData);
        return res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
    } catch (error) {
        console.error("Error during the user registration:", error);
        return res.status(500).send("Error during the user registration.");
    }
})

router.post("/login", async (req, res) => {
    try{
        const db = await connectToDatabase(); 
        const {username, password} = req.body;

        //check if user exists
        const check_if_username_exist = await db.collection("users_list").findOne({username});
        if(check_if_username_exist && await bcrypt.compare(password, check_if_username_exist.password)){
            //create session based authentication
            // const sessionId = generateSessionId();
            // const uid = check_if_username_exist._id.toString();
            // sessions[sessionId] = { uid };
            req.session.userSession = {id: check_if_username_exist._id.toString(), username: check_if_username_exist.username};
            // res.cookie('sessionId', sessionId, { httpOnly: true });
            return res.status(200).json({ message: "Loggin in...", user: check_if_username_exist});      
        } else {
            return res.status(404).json({ message: "Username and email are not valid!" });
        }
        
    } catch (error) {
        console.error("Error during loggin in:", error);
        return res.status(500).send("Error during loggin in:.");
    }
})


router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ message: "Logout failed!" });
        } 

        res.clearCookie('PWM_sid');
        return res.status(200).send({ message: 'Logged out successfully.' });
        
    });
})


//check user session
router.get("/check_user_session", (req, res) => {
    if(req.session.userSession){
        return res.status(200).send({ message: "authenticated", userid: req.session.userid });
    } else {
        
        console.log("not auth");
        return res.status(401).send({ message: "unauthorized", loggedIn: false });
    }
})

router.post("/update_security", async (req, res) => {
    try {
        const db = await connectToDatabase(); 
        const {oldPass, newPass, username} = req.body;
        console.log("username", username);
        console.log("oldPass", oldPass);
        console.log("newPass", newPass);

        const check_password = await db.collection("users_list").findOne({username});
        if(check_password && await bcrypt.compare(oldPass, check_password.password)){
            const newHashedPassword = await bcrypt.hash(newPass, 10);
            await db.collection("users_list").updateOne(
                { username: username }, 
                { $set: { password: newHashedPassword } } 
            );
            
            res.status(200).send({ message: 'password updated' });
        } else {
            res.status(406).send({ message: 'Old password do not match' });
        }


    } catch (error) {
        console.error("Error updating security & data:", error);
        return res.status(500).send("Error updating security & data");
    }
    
})

//update data on db
router.post("/update_credits_and_data", async (req, res) => {
    try{
        const db = await connectToDatabase(); 
        const {username, pack, amount} = req.body;
        
        var updateUser = await db.collection('users_list').findOneAndUpdate(
            {
                username: username,
                "items.id": pack.id,
            },
            {
                $inc: {
                    credits : - pack.price,
                    "items.$.amount": + amount
                },
            },
            {returnDocument: "after"}
        );

        if(updateUser === null){
            updateUser = await db.collection("users_list").findOneAndUpdate(
                {
                    username: username
                },
                {
                    $inc: { credits: - pack.price },
                    $push: {
                        items: {
                            id: pack.id,
                            amount: + amount,
                            src: pack.src
                        },
                    },
                },
                {returnDocument: "after"}
            )
            console.log("added pack");
        }
        res.json(updateUser);


    } catch (error) {
        console.error("Error updating credits & data:", error);
        return res.status(500).send("Error updating credits & data");
    }
})  

router.post("/update_pack_and_data", async (req, res) => {
    try{
        const db = await connectToDatabase(); 
        const {username, pack_id, amount, cards} = req.body;
        console.log("username", username);
        console.log("pack_id", pack_id);
        console.log("amount", amount);
        // console.log("cards", cards);

        
        var updateUser = await db.collection("users_list").findOneAndUpdate(
            {
                username: username,
                "items.id": pack_id
            },
            {
                $inc: {
                    "items.$.amount": - amount
                },
                $push :{
                    cards: cards[0]//{$each: cards}
                }
            },
            {returnDocument: "after"}
        )

        const check_amount = await db.collection("users_list").findOne(
            {
                username: username,
                "items.id": pack_id
            },
            {
                projection: {
                    _id: 0,
                    items: { $elemMatch: {id: pack_id}}
                }
            }
        );

        if(check_amount.items[0].amount < 1){
            await db.collection("users_list").updateOne(
                { 
                    username: username,
                    "items.id": pack_id
                },
                {
                    $pull: {
                        items: { amount: { $lte: 0 } }
                    }
                }
            );
        } 

        const get_recent_update = await db.collection("users_list").findOne({username});

        res.json(get_recent_update);
        
    } catch (error) {
        console.error("Error updating pack & data:", error);
        return res.status(500).send("Error updating pack & data");
    }
})

router.delete("/delete_user", async (req, res) => {
    try{
        const db = await connectToDatabase(); 
        const {userData} = req.body;
        const username = userData.username;
        
        const result = await db.collection("users_list").deleteOne({ username });

        if (result.deletedCount === 1) {
            return res.status(200).send({ message: "User deleted successfully" });
        } else {
            return res.status(500).send({ message: "Failed to delete user" });
        }

    } catch (error) {
        console.error("Error updating pack & data:", error);
        return res.status(500).send("Error updating pack & data");
    }
})

router.post("/update_data")

module.exports = router;
