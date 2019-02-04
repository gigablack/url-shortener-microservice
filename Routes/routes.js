const express = require('express')
const routes = express.Router()
const urlModel = require('../Models/url')
const regexMiddleware = require('../Middlewares/regexMiddleware')

routes.get('/',(req,res)=>{
    res.send('Hello Express')
})

routes.post('/api/shorturl/new',regexMiddleware, async (req,res)=>{
    try{
        const url = req.body.url
        const documentNumber = await urlModel.estimatedDocumentCount()
        const newUrl = new urlModel({
            original_url:url,
            short_url: documentNumber
        })
        const data = await newUrl.save()
        res.json({original_url:data.original_url,short_url:data.short_url})
    } catch(err){
        console.log(err)
    }
})

routes.get('/api/shorturl/:number',async (req,res)=>{
    try{
        const numberUrl = parseInt(req.params.number)
        const requestedUrl = await urlModel.findOne({short_url:numberUrl})
        res.redirect(`https://${requestedUrl.original_url}`)
    } catch(err){
        console.log(err)
    }
    
})

module.exports = routes