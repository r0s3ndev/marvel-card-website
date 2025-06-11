const crypto = require('crypto');
const { connectToDatabase } = require('../config/mongdbconfig');
const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const {checkLoggedIn} = require("../middleware/checkUserSession");
const { ObjectId } = require("bson");

function generateSessionId() {
    return crypto.randomBytes(16).toString('hex');
}

router.get("/getUser", async (req, res) => {
    try {
        const {username} = req.query;
        const db = await connectToDatabase(); 
        const user = await db.collection('users_list').findOne({ username: username});
        res.status(200).json(user); 
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

//check user session
router.get("/check_user_session", (req, res) => {
    if(req.session.userSession){
        return res.status(200).send({ message: "authenticated", userid: req.session.userid });
    } else { 
        console.log("not authenticated");
        return res.status(401).send({ message: "unauthorized", loggedIn: false });
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
            activeTrade: [],
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
        return res.status(200).send({ message: 'Logged out successfully.' });
        
    });
})

//trade api
router.post("/create_trade", async (req, res) => {
    try{
        const db = await connectToDatabase(); 
        const {userdata, request, cards} = req.body;
        console.log("userdata", userdata);
        console.log("request", request);
        console.log("cards", cards);
        const trade_data = {
            listing_owner: {
                user : userdata,
                card: cards,
                request: request
            },
            bidder_user: [],
            status: "active"
        };

        const result = await db.collection('trade_list').insertOne(trade_data);

        const tradeId = result.insertedId.toString();

        await db.collection('users_list').findOneAndUpdate(
            {
                username: userdata.username
            },
            {
                $push: {
                    activeTrade : {
                        trade_id : tradeId,
                        cards : cards
                    }
                },
            },
            {returnDocument: "after"}
        );
        return res.status(201).json({ message: 'Trade created successfully', userId: result.insertedId });

    } catch (error) {
        console.error("Error while creating a trade:", error);
        return res.status(500).send("Error while creating a trade");
    }
})

router.get("/get_trades", async(req, res) => {
    try{
        console.log("fetching cards..");
        const db = await connectToDatabase(); 
        const trades = await db.collection('trade_list').find().toArray();
        res.status(200).json({message: "fetching trades successfully", item: trades});

    } catch (error) {
        console.error("Error while fetching trade:", error);
        return res.status(500).send("Error while fetching trad");
    }
})

router.post("/send_trade_offer", async(req, res) => {
    try{
        const db = await connectToDatabase(); 
        const {trade_id, userdata, cards} = req.body;
        var tid = new ObjectId(trade_id);
        
        const res = await db.collection('trade_list').findOneAndUpdate(
            {
                _id: tid
            },
            {
                $push: {
                    bidder_user : {
                        trade_id: "cards.0.id",
                        userdata,
                        cards
                    }
                },
            },
            {returnDocument: "after"}
        );
        
        return res.status(200).json({ message: 'Sent successfully'});
        
    } catch (error) {
        console.error("Error sending your offer trade:", error);
        return res.status(500).send("EError sending your offer trade:");
    }
})

router.post("/delete_active_trade", async(req, res) => {
    try{
        const db = await connectToDatabase(); 
        const {username, trade} = req.body;
        const _id = trade._id;
        var oid = new ObjectId(trade._id)

        console.log(_id);

        const tradeExists = await db.collection("trade_list").findOne({_id : oid});

        if(tradeExists){
            await db.collection('users_list').updateOne(
                {
                    username: username
                },
                {
                    $pull: {
                        activeTrade : {
                            trade_id : trade._id
                        }
                    }
                },
                {returnDocument: "after"}
            );
            await db.collection("trade_list").deleteOne({ _id : oid });
        } else {
            return res.status(404).json({ message: "Trade not found" });
        }
        return res.status(200).json({ message: 'Delete created successfully'});

    } catch (error) {
        console.error("Error while fetching trade:", error);
        return res.status(500).send("Error while fetching trad");
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

//buy packs in the shop
router.post("/single_pack_purchase", async (req, res) => {
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
            console.log("purchase successfully");
        }
        return res.status(200).json({
            message: "Purchase successfully",
            user: updateUser
        });


    } catch (error) {
        console.error("Error updating credits & data:", error);
        return res.status(500).send("Error updating credits & data");
    }
})  

router.post("/buy_credit", async (req, res) => {
    try{
        const db = await connectToDatabase(); 
        const {username} = req.body;
        
        var updateUser = await db.collection('users_list').findOneAndUpdate(
            {
                username: username,
            },
            {
                $inc: {
                    credits : 250
                },
            },
            {returnDocument: "after"}
        );

        return res.status(200).json({
            message: "Purchase credit successfully",
            user: updateUser
        });


    } catch (error) {
        console.error("Error credits purchase:", error);
        return res.status(500).send("Error credits purchase");
    }

})


router.post("/open_pack", async (req, res) => {
    try{
        const db = await connectToDatabase(); 
        const {username, pack_id, amount, cards} = req.body;
        console.log("username", username);
        console.log("pack_id", pack_id);
        console.log("amount", amount);
        // console.log("cards", cards);

        
        await db.collection("users_list").updateOne(
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

        res.status(200).json({
            message: "pack opened successfully",
            updatedData: get_recent_update
        });
        
    } catch (error) {
        console.error("Error updating pack & data:", error);
        return res.status(500).send("Error updating pack & data");
    }
})


router.post("/sell_card", async (req, res) => {
    try{
        const db = await connectToDatabase(); 
        const {c_id, username, isCardTraded} = req.body;
        var updateUser;

        if(isCardTraded){
            const cardTraded = await db.collection("trade_list").findOne({ "listing_owner.card.id" : c_id});
            const cardBidded = await db.collection("trade_list").findOne({ "bidder_user.cards.id" : c_id});
            
            if(cardTraded != null){
                const oid = new ObjectId(cardTraded._id);
                updateUser = await db.collection('users_list').updateOne(
                    {
                        username: username
                    },
                    {
                        $pull: {
                            activeTrade : {
                                trade_id : cardTraded._id
                            }
                        },
                        $inc: {
                            credits: 10
                        },
                        $pull :{
                            cards: {id: c_id}
                        }
                    },
                    { returnDocument: "after"}
                );
                await db.collection("trade_list").deleteOne({ _id : oid });
            }

            if(cardBidded != null){
               
                await db.collection("trade_list").findOne(
                    { 
                        "bidder_user.cards.id" : c_id
                    },
                    {
                        $pull: {
                            bidder_user: {
                                "cards.id": c_id
                            }
                        }
                    },
                    { returnDocument: "after"}
                );

                updateUser = await db.collection("users_list").findOneAndUpdate(
                    {
                        username: username,
                        "cards.id": c_id
                    },
                    {
                        $inc: {
                            credits: 10
                        },
                        $pull :{
                            cards: {id: c_id}
                        }
                    },
                    { returnDocument: "after"}
                )
            }
        }

        res.status(200).json({
            message: "card sold successfully",
            updatedData: updateUser});
        
    } catch (error) {
        console.error("Error selling pack & updating data:", error);
        return res.status(500).send("Error  selling pack & updating data");
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

module.exports = router;
