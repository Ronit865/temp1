const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3000;//or any other port you prefer


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//MongoDB Models should be importes from models directory




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});