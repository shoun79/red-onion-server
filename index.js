const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json({ limit: 2000000 }));



//Database Connection
const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});


const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connect DB');
    } catch (error) {
        console.log(error.message);
    }
}

connectDB();

const mealsCollection = client.db('redOnionDB').collection('meals');


//Get all meals
app.get('/meals', async (req, res) => {
    const meals = await mealsCollection.find().toArray();
    res.json(meals)
})
//Get  meals category wise
app.get('/meals/:category', async (req, res) => {
    const { category } = req.params;
    const meals = await mealsCollection.find({ category }).toArray();
    res.json(meals)
})
//Get  meal by id
app.get('/meal/:id', async (req, res) => {
    const { id } = req.params;
    const meal = await mealsCollection.findOne({ _id: new ObjectId(id) });
    res.json(meal)
})












app.get('/', (req, res) => {
    res.send('Server Running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})