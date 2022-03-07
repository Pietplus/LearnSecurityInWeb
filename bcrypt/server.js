const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

const users = [
    { 
    name: "Piet"
    }
];

// Routes

app.get("/users",(req,res) => {
    res.json(users);
});

app.post("/users",async (req,res) => {

    try {
        const salt =  await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const user = {
            name: req.body.name,
            password: hashedPassword }
        console.log(salt);
        console.log(hashedPassword);
        users.push(user);
        res.status(201).send();
    }
    catch {
        res.status(500).send();
    }
})

// configure server

app.listen(3000);

