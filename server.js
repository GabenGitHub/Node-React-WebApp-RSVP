const express = require('express');
const app = express();
const testData = require('./data');

// let testData = [
//     { "id": 1, "name": "Geza", "participate": false },
//     { "id": 2, "name": "Bela", "participate": false },
//     { "id": 3, "name": "Miklos", "participate": false },
//     { "id": 4, "name": "Tibor", "participate": false }
// ];

app.get('/api/participants', (req, res) => {
    res.json(testData);
});

const port = 5001;
app.listen(
    port, 
    () => console.log(`server is listening on port ${port}`)
);