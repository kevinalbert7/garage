const express = require("express")
const app = express()

const Car = require("../models/car")

//----Création d'une nouvelle voiture---

app.post('/', (req, res) => {
    console.log(req.body)
    const car = new Car({
        ...req.body
    })

    car.save((err, car) => {
        if (err) {
            res.status(500).json({ error: err })
            return
        }

        res.json(car)
    })
})

//----Liste toutes les voitures---

app.get('/', async (req, res) => {
    try {
        const cars = await Car.find().exec()
        res.json(cars)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//----Selection d'une voiture par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const car = await Car.findById({ _id: id }).exec()
        res.json(car)
    } catch (err) {
            res.status(500).json({ error: err })
    }
})

//----Modification d'une voiture---

app.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const car = await Car.updateOne({ _id: id }, { ...req.body, _id: id })
        res.json(car)
    } catch (err) {
            res.status(500).json({ error: err })
    }
})

//----Suppression d'une voiture---

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const car = await Car.deleteOne({ _id: id }, { ...req.body, _id: id })
        res.json(car)
    } catch (err) {
            res.status(500).json({ error: err })
    }
})

module.exports = app