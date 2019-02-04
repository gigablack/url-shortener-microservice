const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const urlModel = require('./Models/url')
const routes = require('./Routes/routes')
const mongoose = require('mongoose')
const {DATABASE} = require('./env')

app.set('port',process.env.PORT || 3000)

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect(DATABASE,{useNewUrlParser:true},(err)=>{
    if(err) return console.log('ERROR DATABASE',err)
    console.log('DATABASE IS CONNECTED')

    app.use(routes)

    app.listen(app.get('port'),(err)=>{
        if(err){
            console.log('SERVER ERROR:',err)
            process.exit(1)
        }

        console.log(`Server listening on http://localhost:${app.get('port')}`)
    })
})