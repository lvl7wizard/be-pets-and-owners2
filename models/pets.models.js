const fs = require('fs/promises')

exports.getPetsFromOwner = async (owner_id) => {
    // get list of directory names
    const petDirectories = await fs.readdir("./data/pets");
    // create an array containing all the pets data
    const petData = [];
    for (directory of petDirectories) {
        petData.push(await fs.readFile(`./data/pets/${directory}`, "utf-8"))
    }
    // convert the all items in the array into objects
    const parsedfilteredPetData = []
    petData.forEach((element) => {
        element = JSON.parse(element)
    // push include them in new array if they have matching owner ids
        if (element.owner === owner_id) {
            parsedfilteredPetData.push(element)
        }
    })

    return parsedfilteredPetData;
}

exports.getAllPets = async (query) => {
    // get list of directory names
    const petDirectories = await fs.readdir("./data/pets");
   // create an array containing all the pets data
   const petData = [];
   for (directory of petDirectories) {
       petData.push(await fs.readFile(`./data/pets/${directory}`, "utf-8"))
   }
    // convert the all items in the array into objects
      const parsedPetData = []
      petData.forEach((element) => {
          element = JSON.parse(element)
          parsedPetData.push(element)
      })

    // if there is a query then we will use this to filter the results
    if (Object.keys(query).length > 0) {
        // key to check
        const queryKey = Object.keys(query)[0]
        // value to check
        const queryValue = query[queryKey]
        // filter the results and return these results
        const filteredParsedPetData = []
        parsedPetData.forEach((element) => {
            if (element[queryKey] === queryValue) {
                filteredParsedPetData.push(element)
            }
        })
        return filteredParsedPetData
    }
    // otherwise return unfiltered results
    return parsedPetData;
}

exports.getPetWithId = (petId) => {
    return fs.readFile(`./data/pets/${petId}.json`, "utf-8")
}


exports.createPet = async (newPet, ownerId) => {
    petId = 'p' + Date.now()
    newPet.id = petId
    newPet.owner = ownerId
    stringifiedNewPet = JSON.stringify(newPet, null, 2)
    await fs.writeFile(`./data/pets/${petId}.json`, stringifiedNewPet)
    return JSON.parse(await fs.readFile(`./data/pets/${petId}.json`, "utf-8"))
}

exports.deletePetWithId = async (petId) => {
    const deletedPet = JSON.parse(await fs.readFile(`./data/pets/${petId}.json`, "utf-8"))
    await fs.unlink(`./data/pets/${petId}.json`)
    return deletedPet
}