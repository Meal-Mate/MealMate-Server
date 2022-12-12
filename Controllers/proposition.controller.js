import * as PropositionService from '../service/propostion.service.js'

export const addProposition = async (req, res) => {
    const proposition = await PropositionService.addProposition(req.body)
    res.status(200).send(proposition)
}
export const updateProposition = async (req, res) => {
    const proposition = await PropositionService.updateProposition(
        req.params.id,
        req.body
    )
    res.status(200).send(proposition)
}

export const getProposition = async (req, res) => {
    const proposition = await PropositionService.getPropositionById(
        req.params.id
    )
    if (!proposition) {
        throw new Error('proposition not found')
    }
    res.send(proposition)
}

export const getAllProposition = async (req, res) => {
    const proposition = await PropositionService.getAllProposition()
    res.status(200).send(proposition)
}



export const deleteProposition = async (req, res) => {
    const id = req.params.id
    try {
        await PropositionService.deleteProposition(id)
        res.status(200).json({ message: 'Proposition deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack })
    }
}
