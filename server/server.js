import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';

import router from './routes/index.js';

const __dirname = path.resolve();
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// 서버 실행
app.listen(4000, () => {
  console.log('listening on 4000');
});
