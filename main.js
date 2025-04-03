const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const port = 8000
let users = []
let counter = 1

// GET
app.get('/users', (req, res) => {
    res.json(users)
})

// GET by ID
app.get('/user/:id', (req, res) => {
    let id = req.params.id

    let user = users.find(user => {
        return user.id == id
    })

    res.json(user)
})

// POST
app.post('/user', (req, res) => {
    let user = req.body
    user.id = counter
    counter += 1

    users.push(user)
    res.json({
        message: "add ok",
        user : user
    })
})

// PUT
app.put('/user/:id', (req, res) => {
    let id = req.params.id
    let updateUser = req.body
    
    let selectedIndex = users.findIndex(user => {
        return user.id == id
    })

    users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
    users[selectedIndex].id = updateUser.id || users[selectedIndex].id

    res.json({
        message: "update user complete!",
        data: {
            user: updateUser,
            indexUpdate : selectedIndex
        }
    })

})

// PATCH
app.patch('/user/:id', (req, res) => {
    let id = req.params.id
    let updateUser = req.body
    
    let selectedIndex = users.findIndex(user => {
        return user.id == id
    })

    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname
    }

    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname
    }


    res.json({
        message: "update user complete!",
        data: {
            user: updateUser,
            indexUpdate : selectedIndex
        }
    })

})

// DELETE
app.delete('/user/:id', (req,res) => {
    let id = req.params.id

    let selectedIndex = users.findIndex(user => {
        return user.id == id
    })

    users.splice(selectedIndex, 1)

    res.json({
        message: "delete complete!",
        indexDeleted: selectedIndex
    })
})

// Listen
app.listen(port, (req, res) => {
    console.log('sever run at port :' + port)
})