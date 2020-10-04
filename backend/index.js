const express = require('express');
const cors = require('cors');
const flightsRouter = require('./routes/flights')

const app = express();
const port = 3000;

app.use(cors());

app.use("/flights", flightsRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})