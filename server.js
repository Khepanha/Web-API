const {Client} = require("pg")
const express = require("express")
const app = express();

const client = new Client({
    "user":"lens_of_reality",
    "password":"{%lor2020%^postgresql*%}",
    "host":"192.168.7.92",
    "post":5432,
    "database":"vr_vocabulary"
})
app.get("/test", async (req,res) => {
    const rows = await readTodos();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.post("/todos", async (req,res) => {
    const rows = await readTodos();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.listen(8080, () => console.log("Web server is listening...on port 8080"))

start()

async function start() {
    await connect();

    const todos = await readTodos();
    console.log(todos)
    // const successCreate = await createTodo("Go to trader joes")
    // console.log(`Creating was ${successCreate}`)
    // const successDelete = await deleteTodo(1)
    // console.log(`Deleting was ${successDelete}`)
}

async function connect() {
    try {
        await client.connect();
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }
}

async function readTodos() {
    try {
    const results = await client.query("select * from test");
    return results.rows;
    }
    catch(e){
        return [e];
    }
}

async function createTodo(todoText){

    try {
        await client.query("insert into todos (text) values ($1)", [todoText]);
        return true
        }
        catch(e){
            return false;
        }
}

async function deleteTodo(id){

    try {
        await client.query("delete from todos where id = $1", [id]);
        return true
        }
        catch(e){
            return false;
        }
}