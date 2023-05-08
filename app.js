
require("dotenv").config();
require('express-async-errors')
const express = require("express");
const connectDB = require('./db/connect')
const authenticateUser = require('./middlewares/authentication')
const authRouter  = require('./routes/auth')
const contactRoute = require('./routes/contact')
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');


//EXTRA SECURITY PACKAGES
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


//@Middlewares
// app.set('trust proxy', 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );
const app = express();
app.use(express.json());
// extra packages
app.use(helmet()) 
app.use(cors())
app.use(xss())

//ROUTE MIDDLEWARE
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contact', authenticateUser, contactRoute)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



//PORT from env file and alternative port
const port = process.env.PORT || 3000;

//Server Start
const start = async () => {
  try {
    //connect to database
    await connectDB(process.env.MONGO_URI)

    //listen to port
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {

    //display error
    console.log(error);
  }
};

start();