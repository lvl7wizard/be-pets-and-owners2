// - responsible for handling the request, invoking the model, and sending the response
const { selectOwnerById, getOwnersFromArray, patchOwnerFromId, createOwner, removeOwner } = require('../models/owners.models.js')
const fs = require('fs/promises')

exports.getOwnerById = (req, res) => {
    // handling the request
    const ownerId = req.params.id;
    // invoking the model
    selectOwnerById(ownerId)
    .then((ownerInfo) => {
    // sending the response
      res.status(200).send({ owner: ownerInfo });
    });
  };

  exports.getOwners = (req, res) => {
    // handling the request
    return ownersDirectories = fs.readdir("./data/owners")
    // invoking the model
    .then((ownersDirectories) => {
        return getOwnersFromArray(ownersDirectories)
    // sending the response
    }).then((data) => {
        res.status(200).send({data: data})
    })
  }

  exports.patchOwner = async (req, res) => {
    const id = req.params.id
    const key = req.body.key
    const value = req.body.value
    const patch = await patchOwnerFromId(id, key, value)
    res.status(200).send({patch: patch})
  }

exports.postOwner = async (req, res) => {
  newUser = req.body
  const post = await createOwner(newUser)
  res.status(201).send({post: post})
}

exports.deleteOwner = async (req, res) => {
  try {
    ownerId = req.params.id
    await removeOwner(ownerId)
    res.status(200).send()
  } catch {
    res.status(404).send()
  }
}