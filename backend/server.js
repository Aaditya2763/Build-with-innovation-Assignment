if(process.env.Node_Env !=='production'){
    require('dotenv').config();
}
//initialising express
const express=require('express');
const cors = require('cors');

//importing dbconnect file to connect database
const dbConnect=require('./database/dbConnect');
//error handler middleware
const{ errorHandler,notFound}=require('./middleware/errorHandler')

//assigning express toapp variable
const app =express();

//connecting database
dbConnect();



// Enable CORS for a specific origin
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable cookies and credentials
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));


//middleware use to provide json data to a request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//importing all auth routes to authroutesroutes
const authRoutes=require('./routes/auth/authRoutes')
const userRoutes=require('./routes/users/userRoutes')
const postRoutes=require('./routes/posts/postRoutes')
 const commentRoutes=require("./routes/comments/commentsRoutes")
//allowing app to use routes

app.use(authRoutes); 
app.use('/users',userRoutes);
app.use('/api',postRoutes);
app.use('/api',commentRoutes)



// always use middleware velow your all routes
app.use(notFound);
//As error handler middleware dependent on notfound middleware to receive  error message 
//that is why we are using it before errorHandler
app.use(errorHandler);

//dynamic port allocation in addition with a constat port 
const PORT=process.env.PORT || 5000;

//Server
app.listen(PORT, console.log(`server running at ${PORT}`));

