const express=require('express');
require ('dotenv').config()
const workoutRoutes=require('./routes/workouts')
const mongoose=require('mongoose')
const userRoutes =  require('./routes/user')

// App
const app = express();
const port=process.env.PORT
const database=process.env.DATABASE

// middleware
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})


// routes
app.use('/api/workouts', workoutRoutes)

app.use('/api/user', userRoutes)


// connecting to mongoDB
mongoose.connect(database)
    .then(()=> {
        // listen to requests
        app.listen(port, ()=> {
            console.log('connection to mongoDB has been established successfully on port',port)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
