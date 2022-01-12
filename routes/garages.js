const express = require("express")
const app = express()

const Garage = require("../models/garage")

app.get('/', async (req, res) => {
    try {
        const garages = await Garage.find().exec()
        res.json(garages)
    } catch (err) {
        res.status(500).json({ error: err })
    }
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

//---Lie une voiture à son garage---

// app.get('/:garage_id/:id', async (req, res) => {
//     const 
// })

//---Renvoie un garage selon son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const garage = await Garage.findOne({ _id: id })
        res.json(garage)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Renvoie toutes les voitures d'un garage---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const garage = await Garage.findOne({ _id: id }).exec()
        res.json(garage)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = app