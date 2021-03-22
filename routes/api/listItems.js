const { Router } = require('express')
const ListItem = require('../../models/ListItem')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const ListItems = await ListItem.find()
        if (!ListItems) throw new Error('No ListItems')
        const sorted = ListItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newListItem = new ListItem(req.body)
    try {
        const ListItem = await newListItem.save()
        if (!ListItem) throw new Error('[Post Method]Something went wrong while saving ListItem...')
        res.status(200).json(ListItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const responce = await ListItem.findByIdAndUpdate(id, req.body)
        if (!responce) throw Error('[Put Method] Something went wrong...')
        const updated = { ...responce._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const removed = await ListItem.findByIdAndDelete(id)
        if (!removed) throw Error('[Delete Method] Something went wrong...')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router
