const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

//set Static path
app.use(express.static(path.join(__dirname,'client')))

app.use(bodyParser.json())

const publicVapidKey= "BLlikZ_RIn9QsZGwPOg322pI60I7sjH1f6eDTrhrq2ReJi01u23IIOpKLpy8v6R-h2Ptgp_swcCy47fJscmqTu8";
const privateVapidKey= "2ZbwOKzYEKVW7GUT_-RNnoHox8Fcuh_BTK8UpRNCpaw";


webPush.setVapidDetails('mailto:ajinkya.wan@gmail.com' , publicVapidKey, privateVapidKey);


//subscribe route

app.post('/subscribe', (req, res)=>{
    //Get Push Subscription object
    const subscription =req.body;

    //send 201 -resource created
    res.status(201).json({});

    //create payload
    const payload =JSON.stringify({title : 'Push Notis'})

    //pass object to sendNotifications
    webPush.sendNotification(subscription, payload).catch(err => console.log(err));

})

const PORT = 5002;

app.listen(PORT , ()=>console.log(`Server startted on ${PORT}`))
