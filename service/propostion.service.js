import Proposition from '../Models/proposition.model.js'

export const getPropositionById = async (id) => {
    return Proposition.findById(id)
}

export const addProposition = async (userBody) => {
    return Proposition.create(userBody)
}
export const getProposition = async () => {
    return Proposition.find()
}

export const updateProposition = async (id, updatebody) => {
    const proposition = await getPropositionById(id)
    if (!proposition) {
        throw new Error('no proposition found')
    } 

    Object.assign(proposition, updatebody)
    return await proposition.save()
}

export async function deleteProposition(id) {
    if (!id) {
        throw new Error('no id found')
    }
    return await Proposition.findOneAndDelete({ _id: id })
}
