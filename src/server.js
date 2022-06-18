import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

export const app = express();
const router = express.Router();
app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', router);

router
  .route('/data')
  .get((req, res) => {
    const obj = {
      someData: 'some data',
      someOtherData: 'some other data'
    };
    res.send({ status: true, message: 'Successful request', data: { ...obj } });
  })
  .post((req, res) => {
    if (!isEmpty(req.body)) {
      res.send({
        status: true,
        message: 'Successful request',
        data: { ...req.body }
      });
      return;
    }
    res.send({ status: false, message: 'No data provided' });
  });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.post('/', (req, res) => {
//   console.log(req.body);
//   res.json(req.body);
// });

export const start = () => {
  app.listen(2020, () => {
    console.log('Server started on port 2000');
  });
};

function isEmpty(object) {
  for (var prop in object) {
    return false;
  }
  return true;
}
