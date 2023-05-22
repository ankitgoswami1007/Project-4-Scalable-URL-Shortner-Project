const UrlModel = require('../models/UrlModel')
const shortid = require('shortid')
//const redis = require('redis')
const {promisify} = require('util')

//============================ Connect to redis ================================

// const redisClient = redis.createClient(
//     18854,
//     "redis-18854.c301.ap-south-1-1.ec2.cloud.redislabs.com",
//     { no_ready_check : true}
// );
// redisClient.auth("7FalTv7YIuISH7Sxn5XRdA3WfuNKgY9B", function (err){
//     if (err) throw err;
// });

// redisClient.on("connect", async function () {
//     console.log('Connected to Redis...');
// });

//1. connect to the server
//2. use the commands :

//Connection setup for redis

// const SETEX_ASYNC = promisify(redisClient.SETEX).bind(redisClient);
// const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

//======================================= validation =========================================

 const isValidURL = function(url) {
    return (/^(ftp|http|https):\/\/[^ "]+$/).test(url);
 }

 const isValidLongURL = function(url) {
    return (/^([hH][tT][tT][pP]([sS])?:\/\/.)(www\.)?[-a-zA-Z0-9@:%.\+#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.#?&//=_]*$)/g).test(url)
 }

//==================================== Create Short URL =======================================

const createShortURL = async function(req, res){
    try {

        const data = req.body
        //console.log(data +"data from frontend")
        const longUrl = data.longUrl
        let dataObj = {}

        //const baseUrl = 'http://localhost:5000/apiV1'
        const baseUrl = "https://project-4-scalable-url-shortner-project.vercel.app/apiV1"

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Feild Can't Empty.Please Enter Some Details" });
        }

        if (!isValidURL(baseUrl)){
            return res.status(400).send({status:false , message: 'Invalid base URL'})
        }

        if(!data.longUrl ) { 
            return res.status(400).send({status:false , message: 'please Enter long URL'})    
        }

        if(!isValidLongURL (data.longUrl) ) { 
            return res.status(400).send({status:false , message: 'Invalid long URL'})    
        }

    //    let cachedData = await GET_ASYNC(`${longUrl}`)
    //     if( cachedData ) {
    //        let changeToOriginal = JSON.parse( cachedData )
    //        return res.status(200).send({ status: true, data: changeToOriginal })
    //    }

        const findUrl = await UrlModel.findOne({longUrl: longUrl}).select({  _id: 0, createdAt: 0, updatedAt: 0, __v: 0});
        if(findUrl) {
           // await SETEX_ASYNC(`${longUrl}`, 60 * 10,  JSON.stringify(findUrl))
            return res.status(200).send({ status: true, data: findUrl });
        }

        dataObj.longUrl = longUrl

        const urlCode = shortid.generate().toLowerCase()
        if(urlCode){
            dataObj.urlCode = urlCode
        }

        const shortUrl = baseUrl + '/' + urlCode
        if(shortUrl){
            dataObj.shortUrl = shortUrl
        }

        const urlData = await UrlModel.create(dataObj)
        let newObj = {}
        newObj.longUrl = urlData.longUrl
        newObj.shortUrl = urlData.shortUrl
        newObj.urlCode = urlData.urlCode

      
         return res.status(201).send({status: true, data: newObj})

    } 
    catch (err) 
    {
        res.status(500).send({status: false , error: err.message})    
    }
}

//====================================== fetch URL ========================================


const redirectToOriginalURL =  async function(req, res){

    try {
        const code = req.params.urlCode
        console.log(code)

        if(!shortid.isValid(code)){
            return res.status(400).send({status:false , message: 'Invalid UrlCode'})    
        }

        // let cachedData = await GET_ASYNC(`${code}`)

        // if(cachedData) {
        //     let changeToOriginalUrl = JSON.parse(cachedData)
        //     return res.status(302).redirect(changeToOriginalUrl)
        // }
        
        const url = await UrlModel.findOne({urlCode: code})

        if(!url){
            return res.status(404).send({status: false, message:'Url not found with this UrlCode...'})
        }

        //await SETEX_ASYNC(`${code}`, 60 * 10,  JSON.stringify(url.longUrl))
        return res.status(302).redirect(url.longUrl)
    } 
    catch (err) 
    {
        res.status(500).send({status: false , error: err.message}) 
    }
}

module.exports = {createShortURL, redirectToOriginalURL}