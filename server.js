try {
    const express = require('express');
    const cors = require('cors');
    const mongoose = require('mongoose');
    
    const app = express();
    const PORT = 3001;

    // middleware setup
    app.use(cors());
    app.use(express.json());
    
    // Database connection
    mongoose.connect(
        'MONGOURLHERE', 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    
    .then(console.log('Connected to MongoDB database.'))
    .catch(() => console.log('Error connecting to MongoDB database.'));
    
    // Schema and model
    const schema = new mongoose.Schema({
        title: String,
        description: String,
        completed: Boolean
    });
    
    const Task = mongoose.model('Task', schema);
    
    // endpoints
    app.get('/api/v1/tasks/get', async (req, res) => {
        try {
            const data = await Task.find();
            res.send(data);
          } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
          }
    });

    app.delete('/api/v1/tasks/delete/:id', async (req, res) => {
        let taskToDelete;
        try {
            taskToDelete = await Task.findOne({_id: req.params.id}).deleteOne();
        } catch(err) {
            console.error(err);
        }
        console.log(taskToDelete);
        res.status(200).send(taskToDelete);
        console.log(req.method + ' / ' + req.ip);
    });

    app.put('/api/v1/tasks/updateContent/:id', async (req, res) => {
        const { title, description } = req.body.data;
        const updatedTask = await Task.findOneAndUpdate({_id: req.params.id},{ title: title, description: description }, {new: true});
        console.log(updatedTask);
        res.status(200).send(updatedTask);
        console.log(req.method + ' / ' + req.ip);
    });

    app.put('/api/v1/tasks/updateState/:id', async (req, res) => {
        const { completed } = req.body.data;
        const updatedTask = await Task.findOneAndUpdate({_id: req.params.id},{ completed: completed }, {new: true});
        console.log(updatedTask);
        res.status(200).send(updatedTask);
        console.log(req.method + ' / ' + req.ip);
    });

    app.post('/api/v1/tasks/create', async (req, res) => {
        const newTask = new Task({
            title: 'New task',
            description: 'Set a description',
            completed: false
        });

        try {
            const savedTask = await newTask.save();

            res.status(201).send(savedTask);
        } catch (err) {
            res.status(500).send('Error creating task: ' + err);
        }
        console.log(req.method + ' / ' + req.ip);
    }); 

    // listen to port 3001
    app.listen(PORT, console.log(`Listening on port ${PORT}...`));

} catch(error) {
    console.log(error);
}