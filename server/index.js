import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) =>
    console.log(`Did not connect. Caught following error: ${error}`)
  );

/** Notes:
---

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
- the two lines above are body parsing middleware, to parse raw JSON
and to be able to send/receive form data. 
- without these two lines requests (req) will be undefined. with them
you get an object body.

---

- express:        our framework for this API
- body-parser:    parsing data coming in, like from requests 
- cors:           handles cross origin resource sharing requests so that 
                  you can call from a different URL
- helmet:	        api endpoint security
- morgan:	        handles console logs, so that anytime we hit an endpoint 
                  its going to console log information
- dotenv:         for env variables, secrets
- mongoose:       ODM, handles mongoDB calls
- nodemon:        live server reload

*/
