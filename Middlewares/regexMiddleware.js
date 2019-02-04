const regex = /(http(s)?:\/\/)?[\w|-]*\.[a-z]{2,}(\/)?/
const dns = require('dns')


const regexMiddleware = (req,res,next) => {
    if(regex.test(req.body.url)){
        req.body.url = req.body.url.replace(/http(s)?:\/\//,'')
        dns.lookup(req.body.url,(err)=>{
            if(err) return res.json({error:'Invalid URL'})
            next()
        })
    } else {
        res.json({error: 'Invalid URL'})
    }
}

module.exports = regexMiddleware