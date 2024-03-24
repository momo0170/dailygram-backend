import express from 'express';
import cors from 'cors';
import diaryRouter from './router/diary.js';

let userStorage = []; // 임시 사용자 DB

const app = express();
app.use(express.json()); // req.body를 읽기 위함
app.use(cors());
app.use('/diary', diaryRouter);
app.post('/sign-up', (req, res, next) => {
  console.log(req.body);
  const { id, name, password, nickname, url } = req.body;
  const newUser = {
    id,
    password,
    name,
    nickname,
    url,
  };
  // 새로운 사용자를 userStorage에 추가
  userStorage = [...userStorage, newUser];
  console.log(userStorage);
  res.status(201).json(userStorage);
});

// 모든 라우터가 처리가 안될 시
app.use((req, res, next) => {
  res.status(404).send('콘텐츠를 찾을 수 없습니다.');
});

app.use((error, req, res, next) => {
  res.sendStatus(500);
});
app.listen(8081);
