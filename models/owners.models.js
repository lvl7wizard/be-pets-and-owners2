// - responsible for interacting with the data and sending data back to the controller 
// (in this case using return). It then catches any error and returns it by using a 'catch' block.

const fs = require('fs/promises')
const { getPetsFromOwner, deletePetWithId } = require('./pets.models')

exports.selectOwnerById = (owner_id) => {
    return fs.readFile(`./data/owners/${owner_id}.json`, "utf-8")
    .then((ownerString, err) => {
        const parsedOwner = JSON.parse(ownerString);
        return parsedOwner
      }).catch((err) => {
        return err
      })
}

exports.getOwnersFromArray = (ownersDirectories) => {
    const arrayOfOwnersInfo = []
    ownersDirectories.forEach((element) => {
        arrayOfOwnersInfo.push(this.selectOwnerById(element.slice(0, -5)))
    })
    return Promise.all(arrayOfOwnersInfo)
    .then((resolvedArray) => {
        return resolvedArray
    }).catch((err) => {
        return err
    })
}

exports.patchOwnerFromId = async (id, key, value) => {
    let ownerData = JSON.parse(await fs.readFile(`./data/owners/${id}.json`, "utf-8"))
    ownerData[key] = value
    ownerData = JSON.stringify(ownerData, null, 2)
    await fs.writeFile(`./data/owners/${id}.json`, ownerData)
    let updatedData = JSON.parse(await fs.readFile(`./data/owners/${id}.json`, "utf-8"))
    return updatedData
}

exports.createOwner = async (newUser) => {
    id = 'o' + Date.now()
    newUser.id = id
    stringifiedNewUser = JSON.stringify(newUser, null, 2)
    await fs.writeFile(`./data/owners/${id}.json`, stringifiedNewUser)
    return JSON.parse(await fs.readFile(`./data/owners/${id}.json`, "utf-8"))
}

exports.removeOwner = async (ownerId) => {
    const ownersPets = await getPetsFromOwner(ownerId)
    // create a list of all the pets files to be deleted
    const petsToBeDeleted = []
    ownersPets.forEach((element) => {
        petsToBeDeleted.push(element.id)
    })
    //
    petsToBeDeleted.forEach((element) => {
        deletePetWithId(element)
    })
    await fs.unlink(`./data/owners/${ownerId}.json`)
}