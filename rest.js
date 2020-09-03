const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Tutorial = require('./models/tutorials');

app.use(express.json());

require('dotenv/config');

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () =>{console.log('DB connected')});




app.get('/api/tutorials', async (req, res) => {
    try {
        if(req.query.title){
            const tutorial = await Tutorial.find({ title : {$regex: `.*${req.query.title}.*`} })
            res.send(tutorial)
        } else{
            const Tutorials = await Tutorial.find();
            res.send(Tutorials);
        }
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

app.get('/api/tutorials/published', async (req, res) =>{
    try{
        const tutorial = await Tutorial.find({published : true});
        res.send(tutorial)
    } catch (err) {
        res.status(400).send(err.message);
    }
});



app.get('/api/tutorials/:id', async (req, res) =>{
    try{
        const tutorial = await Tutorial.findById(req.params.id);
        res.send(tutorial)
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.post('/api/tutorials', (req, res) =>{
    const tutorial =  new Tutorial({
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
    })
    tutorial.save().then(doc => {
        res.send(doc);
    }).catch(err =>{
        res.status(400).send(err);
    });
});

app.put('/api/tutorials/:id', async (req, res) =>{
    try{
        const result = await Tutorial.update({_id: req.params.id},{$set: req.body});
        res.send(result);
   } catch (err) {
       res.status(400).send(err.message);
   }
});

app.delete('/api/tutorials/:id',async (req, res) =>{
    try{
         const result = await Tutorial.deleteMany({_id: req.params.id});
         res.send(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
 });

 app.delete('/api/tutorials',async (req, res) =>{
    try{
         const result = await Tutorial.deleteMany({});
         res.send(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
 });














// app.patch('/Tutorial/:id',async (req, res) =>{
//     try{
//          const result = await Tutorial.update({_id: req.params.id},{$set: {title: 'moti shmoti'}});
//          res.send(result);
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
//  });

 app.patch('/Tutorial/:id',async (req, res) =>{
    try{
         const result = await Tutorial.update({_id: req.params.id},{$set: req.body});
         res.send(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
 });

 





app.get('/TutorialsBytitle/:title', async (req, res) =>{
    try{
        const Tutorial = await Tutorial.findOne({title: req.params.title});
        res.send(Tutorial)
    } catch (err) {
        res.status(400).send(err.message);
    }
});



app.get('/searchTutorials/:title', async (req, res) =>{
    try{
        const Tutorial = await Tutorial.find({title: {$regex:`.*${req.params.title}.*`}});
        res.send(Tutorial)
    } catch (err) {
        res.status(400).send(err.message);
    }
});






app.get('/', (req, res) => {
    res.send('Hello');
});


app.listen(3001);