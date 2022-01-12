const express = require("express")
const app = express()

const Garage = require("../models/garage")

app.get('/', (req, res) => {
    console.log(garage)
    res.json(garage)
})

//---Création d'un nouveau garage---

app.post('/', (req, res) => {
    const garage = new Garage({
        ...req.body
    })

    garage.save((err, car) => {
        if (err) {
            res.status(500).json({ error: err })
            return
        }

        res.json(garage)
    })
})

module.exports = app