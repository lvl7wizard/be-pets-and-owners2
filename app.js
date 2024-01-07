// app.js is our server
const express = require('express')
const app = express()
app.use(express.json());

const { getOwnerById, getOwners, patchOwner, postOwner, deleteOwner } = require('./controllers/owners.controllers.js')
const { getPetsOfOwner, getPets, getPetFromId, postPet, deletePet } = require('./controllers/pets.controllers.js')


// responds with the relevant owner's data
app.get('/api/owners/:id', getOwnerById);

// responds with an array containing the data of every owner 
app.get('/api/owners', getOwners)

// responds with an array containing the data of all pets belonging to the relevant owner
app.get('/api/owners/:id/pets', getPetsOfOwner)

// responds with an array containing all pets.
// accepts a query of temperament so that users can filter pets by their temperament, 
//e.g. GET /api/pets?temperament=grumpy responds with an array containing all the pets with a temperament of grumpy
app.get('/api/pets', getPets)

// responds with the data of the relevant pet
app.get(`/api/pets/:id`, getPetFromId)

// updates an owners name and age
// e.g. {"key": "age", "value": "40"} or {"key": "name", "value": "Bob"}
app.patch(`/api/owners/:id`, patchOwner)

// creates a new owner
// e.g. {"name": "Dave","age": 34}. The id will be generated using Data.now() to avoid overwriting data
app.post(`/api/owners`, postOwner)

// POST: add a pet to an owner - /owners/:id/pets
/* e.g. {
  "name": "Alan Turin",
  "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjOqKI0kZG7nIV2w7AFRWfPUGiqeM0J26TbCp8irR1jZiNG556",
  "favouriteFood": "Digestive Biscuits",
  "age": 10,
  "temperament": "aggressive"
} 
object properties of owner will be taken from :id and a new pet id will be generated
*/
app.post(`/api/owners/:id/pets`, postPet)

// delete pet
app.delete('/api/pets/:id', deletePet)

// delete owner. this will also delete all pets associated with this owner
app.delete(`/api/owners/:id`, deleteOwner)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})