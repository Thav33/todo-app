const express = require('express')
const app = express()
const PORT = 1000

const MongoClient = require('mongodb').MongoClient

//load content of the .env file. it aloows us use "process.env.DB_STRING"
require('dotenv').config() 
const connString = process.env.DB_STRING

MongoClient.connect(connString)
.then((client) => {
    console.log(`CONNECTED TO MONGO DB`)
    const db = client.db('todo')
    const todocollection = db.collection('todolist')
    
// })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {

    const todoItem = todocollection.find().toArray()
    .then((data) => {
        console.log(data)
        res.render('index.ejs', {todoItem: data})
    })
    .catch((err) => {
        console.error(`THIS IS AN ERROR MSG: ${err}`)
    })

})


app.post('/todoapp', (req, res) => {
    console.log(req.body)

    todocollection.insertOne({
        todolist: req.body.todo
    })
    .then((result) => {
        console.log(`todo-list added`)
        res.redirect('/')
    })
    .catch((error) => {
        console.error(error)
    })

})

app.delete('/deleteItem', (req, res) => {
    todocollection.deleteOne({
        todolist: req.body.todoTextFromJS
    })
    .then((result) => {
        res.send(`TodoList Deleted`)

        // console.log('TodoList Deleted')
    })
    .catch((error) => {
        res.send(`ERROR MESSAGE: ${error}`)

        // console.log(`ERROR MESSAGE: ${error}`)
    })
})


}) //MongoClient end

app.listen(PORT, () => {
    console.log(`SERVER CONNECTED TO PORT ${1000}`)
})