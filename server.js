const express = require('express');
const app = express();
// const testData = require('./data');

let testData = [
    { id: 1, name: 'Geza', age: 32 },
    { id: 2, name: 'Bela', age: 12 },
    { id: 3, name: 'Miklos', age: 34 },
    { id: 4, name: 'Tibor', age: 65 }
];

app.get('/api/participants', (req, res) => {
    res.json(testData);
});

const port = 5001;
app.listen(
    port, 
    () => console.log(`server is listening on port ${port}`)
);