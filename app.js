import express from 'express';
import cors from 'cors';
import diaryRouter from './router/diary.js';

const app = express();

app.use(express.json()); // req.body를 읽기 위함
app.use(cors());
app.use('/diary', diaryRouter);

// 모든 라우터가 처리가 안될 시
app.use((req, res, next) => {
  res.status(404).send('콘텐츠를 찾을 수 없습니다.');
});

app.use((error, req, res, next) => {
  res.sendStatus(500);
});
app.listen(8081);
