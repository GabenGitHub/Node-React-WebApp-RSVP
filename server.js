const express = require('express');
const app = express();

const testData = [
    { id: 1, name: 'Geza', age: 32 },
    { id: 2, name: 'Bela', age: 12 },
    { id: 3, name: 'Miklos', age: 34 },
    { id: 4, name: 'Tibor', age: 65 }
];

app.get('/', (req, res) => {
    res.json(testData);
});

app.listen(5001, () => console.log('server is listening on port 5001'));