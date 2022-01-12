const express = require("express")
const app = express()

const Car = require("../models/car")

//----Création d'une voiture---

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

app.get('/', (req, res) => {
    Car.find((err, cars) => {
        if (err) {
            res.status(500).json({ error: err })
            return
        }
    res.json(cars)
    })
})

//----Selection d'une voiture par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const car = await Car.findById({ _id: id })
        res.json(car)
    } catch (err) {
            res.status(500).json({ error: err })
    }
})

//----Modification d'une voiture---

app.post('/', (req, res) => {
    const { id } = req.body
    Car.updateOne({ _id: id })
})

//----Suppression d'une voiture---

app.delete('/:id', (req, res) => {
    console.log(req.body)
})

module.exports = app