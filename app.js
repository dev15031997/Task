const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const express = require('express')
const app = express()
const path = require('path')

require('./DB/conn')
const { User, Address } = require('./model/userInfo')
const port = process.env.PORT

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



/********************************-Routes-**************************************/
// Home
app.get('/', (req, res) => {
    res.send('home')
})


//User 
app.post('/user', async (req, res) => {
    const username = req.body.username
    console.log(username)

    if (!username) {
        res.status(400).json({ error: 'Please fill username Field' })
    }

    try {
        const user = new User({ username })
        await user.save()
        res.status(201).send(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
})

// Address 
app.post('/address', async (req, res) => {
    const { house, street, city, pin, state, userId } = req.body
    console.log(req.body)

    if (!house || !street || !city || !pin || !state) {
        res.status(400).json({ error: 'Please fill all the Fields' })
    }

    try {
        const address = new Address({ house, street, city, pin, state, userId })
        await address.save()
        res.status(201).send(address)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
})


app.listen(port, () => {
    console.log(`Server working at port ${port}`)
})