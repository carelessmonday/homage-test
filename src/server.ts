import 'dotenv/config';

import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import clinicsRouter from './routes/clinics.router';

if (!process.env.SESSION_SECRET) {
  process.exit(1);
}

const app = express();

app.use(
  expressSession({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 120,
    },
    rolling: true,
  }),
);

app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Ready to build something awesome?',
  });
});

app.use('/api/clinics', clinicsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running at http://localhost:${port}`));
