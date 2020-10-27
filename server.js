const {Client} = require("pg")
const express = require("express")
const app = express();
const https = require("https")

const client = new Client({
    "user":"lens_of_reality",
    "password":"{%lor2020%^postgresql*%}",
    "host":"192.168.7.92",
    "post":5432,
    "database":"vr_vocabulary"
})
// const server = https.createServer("/api/test", async(req,res) => {
//     const rows = await readTest();
//     res.setHeader("content-type", "application/json")
//     res.send(JSON.stringify(rows))
//     res.end(rows)
// });

app.get("/api/test", async (req,res) => {
    const rows = await readTest();//must need await for the async function
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})
app.get("/api/users", async (req,res) => {
    const rows = await readUsers();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})
app.get("/api/bookmark", async (req,res) => {
    const rows = await readBookmark();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})
app.get("/api/dialog", async (req,res) => {
    const rows = await readDialog();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})
app.get("/api/not_understood", async (req,res) => {
    const rows = await readNot_Understood();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})
app.get("/api/understood", async (req,res) => {
    const rows = await readUnderstood();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})
app.get("/api/recommendation", async (req,res) => {
    const rows = await readRecommendation();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})
app.get("/api/scene", async (req,res) => {
    const rows = await readScene();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})
app.get("/api/word", async (req,res) => {
    const rows = await readWord();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.get("/api/sceneLevel/:id", async (req,res) => {
    const level = req.params.id;
    const rows = await readSceneLevel(level);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})
app.get("/api/wordInScene/:id", async (req,res) => {
    const scene = req.params.id;
    const rows = await readWordInScene(scene);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.get("/api/percentage/:id", async (req,res) => {
    const user_id = req.params.id;
    const rows = await readPercentage_id(user_id);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.listen(8080, () => console.log("Web server is listening...on port 8080"))
// server.listen(8080, () => console.log("Web server is listening...on port 8080"))

start()

async function start() {
    await connect();

    const test = await readTest();
    const users = await readUsers();
    // console.log(users)
    // console.log(test)
}

async function connect() {
    try {
        await client.connect();
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }
}

async function readTest() {
    try {
    const results = await client.query("select * from test");
    return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function readBookmark(){
    try{
        const results = await client.query("select * from bookmark");
        return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function readDialog(){
    try{
        const results = await client.query("select * from dialog");
        return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function readNot_Understood(){
    try{
        const results = await client.query("select * from not_understood");
        return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function readUnderstood(){
    try{
        const results = await client.query("select * from understood");
        return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function readRecommendation(){
    try{
        const results = await client.query("select * from recommendation");
        return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function readScene(){
    try{
        const results = await client.query("select * from scene");
        return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function readWord(){
    try{
        const results = await client.query("select * from word");
        return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function readUsers(){
    try{
        const results = await client.query("select * from users");
        return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function readSceneLevel(lvl){
    try{
        console.log(lvl);
        const results = await client.query("select * from scene where level = '"+lvl+"'");
        return results.rows;
    }
    catch(e){
        return [e.message];
    }
}

async function readWordInScene(scn){
    try{
        const results = await client.query(`select * from word where scene_id = ${scn}`);
        return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function readPercentage_id(pct){
    try{
        const results = await client.query(`select * from scene_percentage where user_id = ${pct}`)
        return results.rows;
    }
    catch(e){
        return [e];
    }
}


