const { nanoid } = require('nanoid');
const URL = require('../models/url');
const shortid = require('shortid');

async function handleNewShortUrl(req,res){
    const shortId = shortid.generate();
    if(!req.body.redirectUrl){
        return res.status(400).json({error: "redirectUrl is required"});
    }
    await URL.create({shortId, redirectUrl: req.body.redirectUrl, visitHistory: []});
    return res.status(201).json({shortId});
}

async function handleGetShortUrl(req,res){
    const { shortId } = req.params;
    const url = await URL.findOneAndUpdate({shortId}, 
        {$push: {visitHistory: {timestamp: new Date().toISOString()}}},
        {new: true});
    if(!url){
        return res.status(404).json({error: "URL not found"});
    }
    return res.status(200).redirect(url.redirectUrl);
}

module.exports = { handleNewShortUrl, handleGetShortUrl };