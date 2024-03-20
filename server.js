const express = require('express');

const app = express();

const dotenv = require('dotenv');

dotenv.config();

const userRoutes = require('./routers/user.routes')



//Allows us read request body
app.use(express.json())


app.use('/api', userRoutes)

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})