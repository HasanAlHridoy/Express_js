const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'course1', age: 12 },
];
//Functions

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        age: Joi.number().min(1).required()
    });
    return schema.validate(course);
}



// Get Methods
app.get('/', (req, res) => {
    res.send('Hello World Hasan!!!!!!!!')
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send(`ID not found ${req.params.id}`);
    }
    res.send(course)
});

app.get('/api/posts/:year/:month', (req, res) => {
    // res.send(req.query); //when want to query params
    res.send(req.params);
})

// POST Methods

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        //Bad Request 400
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        age: req.body.age
    }
    courses.push(course);
    res.send(course);
})

// PUT Methods

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //if not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('ID not found')
        return;
    }
    //Validate the course
    const { error } = validateCourse(req.body);

    if (error) {
        //Bad Request 400
        res.status(400).send(error.details[0].message);
        return;
    }
    //Update the course
    course.name = req.body.name;
    course.age = req.body.age;
    res.send(course);
})

// DELETE Methods
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('ID not found')
        return;
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

const port = process.env.PORT || 3000;
// if you want to use env port, write in terminal this command "$env:PORT=5000". then the app will run on PORT 5000
app.listen(port, () => console.log(`Listen on port ${port}...`));