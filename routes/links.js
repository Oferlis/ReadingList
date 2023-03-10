const fetch = require('node-fetch')
const getTitle = require('get-url-title')
const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Link = require('../models/links')

//Get all
router.get('/', async (req, res) => {
    try {
        const links = await Link.find()
        res.json(links)
        //res.json({message: "blabla"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get one
router.get('/:id',getLink, (req, res) => {
    res.send(res.link)
})

//Creating one 
router.post('/', async (req, res) => {
    const linkTitle =await getTitle(req.body.link)
    const link = new Link({
        name: linkTitle,
        link: req.body.link,
    })
    try {
        const newLink = await link.save()
        res.status(201).json(newLink)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Updating one
router.patch('/:id', getLink, async (req, res) => {
    if(req.body.isRead != null) {
        res.link.isRead = req.body.isRead 
    }
    try {
        const updatedLink = await res.link.save()
        res.json(updatedLink)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})

//Deleting one
router.delete('/:id', getLink, async (req, res) => {
    try {
        await res.link.remove()
        res.json({message: "Deleted link"})
    } catch (error) {
        res.status(500).json({message: error.message})        
    }
})

async function getLink(req, res, next) {
    try {
        link = await Link.findById(req.params.id)
        if (link == null) {
            return res.status(404).json({message: "Could not find link"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.link = link
    next()
}

module.exports = router

