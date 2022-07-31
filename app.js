const express = require('express');
const router = require('./routes/index.route')

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));

app.use(router)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})