const { getPetsFromOwner, createPet, getAllPets, getPetWithId, deletePetWithId } = require('../models/pets.models.js')
const fs = require('fs/promises')

exports.getPetsOfOwner = async (req, res) => {
  const owner_id = req.params.id
      res.status(200).send(await getPetsFromOwner(owner_id))
}

exports.getPets = async (req, res) => {
    res.status(200).send(await getAllPets(req.query))
  }

exports.getPetFromId = async (req, res) => {
const petId = req.params.id
try {
    res.status(200).send(await getPetWithId(petId))
} catch {
    res.status(404).send()
}
}

exports.postPet = async (req, res) => {
    newPet = req.body
    ownerId = req.params.id
    const owners = await fs.readdir("./data/owners")
    if (owners.includes(ownerId + '.json')) {
      const post = await createPet(newPet, ownerId)
      res.status(201).send({post: post})
    } else {
      res.status(403).send({post: "invalid owner id"})
    }
}

exports.deletePet = async (req, res) => {
try {
    await deletePetWithId(req.params.id)
    res.status(200).send()
} catch {
    res.status(404).send()
}
}