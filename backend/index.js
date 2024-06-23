const express = require("express");
const connectDb = require('./utils/db');
const dotenv = require('dotenv');
const rootRouter = require('./routes/index')
const cors = require('cors');
dotenv.config();

const PORT = process.env.PORT || 3001

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/',rootRouter)

connectDb();

app.listen(PORT,()=>{
    console.log(`Server listening on PORT ${PORT}`)
})


