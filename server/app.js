const express = require('express');
const cors = require('cors');
const app = express();
const shortid = require('shortid');
const Url = require('./models/Url');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use(cors()) //enlève les erreurs liées aux CORS
app.use(express.urlencoded({ extended: true }));

app.get('/getUrls', async(req, res) => {
  Url.find()
  .then(urls => res.status(200).json(urls))
  .catch(error => res.status(400).json(error));
});

app.post('/createShortUrl',async(req,res)=>{
  let urlShort;

  const body = JSON.stringify({"url":req.body.urlLong});
  const token = process.env.TINYURL_KEY;
  const requestOptions = {
    method:'POST',
    redirect:'follow',
    headers:{
      'Content-Type':'application/json',
    },
    body:body,
  };


  const response = await fetch(`https://api.tinyurl.com/create?api_token=${token}`,requestOptions);

  if(!response.ok){
    throw new Error('Erreur lors de la création du lien');
  }else{
    console.log('ok');
    const res = (JSON.parse(await response.text()));
    urlShort = res.data.tiny_url;
  }


  const urlLong = req.body.urlLong;
  

  const newUrl = new Url({
    urlShort:urlShort,
    urlLong:urlLong
  })
  await newUrl.save();

  res.json({ result: 'success', url: newUrl });
})

app.get('/:urlShort',async(req,res)=>{
  const urlShort = req.params.urlShort;
  const url = await Url.findOne({ urlShort });

  if (url) {
    res.json({result: 'success',urlLong:url.urlLong});
  } else {
    res.status(404).send('URL not found');
  }
})

mongoose.connect(process.env.MONGODB_URL,
  { dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  module.exports = app;