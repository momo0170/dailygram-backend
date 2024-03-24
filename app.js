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
  res.status(201).json({ users: userStorage, currentUser: newUser });
});

app.post('/sign-in', (req, res, next) => {
  const { id, password } = req.body;
  // userStorage에 해당 id와 password가 있는지 확인
  const isIncludeId = userStorage.find((info) => info.id === id);

  // 일치하는 id가 있다면 비밀번호가 같은지 확인
  if (isIncludeId) {
    const isMatchPassword = userStorage.find(
      (info) => info.password === password
    );
    if (isMatchPassword) {
      const loginedUser = userStorage.filter((item) => item.id === id);
      return res
        .status(201)
        .json({ message: '로그인 성공!', user: loginedUser });
    }
    return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
  }
  res.status(401).json({ message: '가입되지 않은 사용자입니다.' });
});

// 모든 라우터가 처리가 안될 시
app.use((req, res, next) => {
  res.status(404).send('콘텐츠를 찾을 수 없습니다.');
});

app.use((error, req, res, next) => {
  res.sendStatus(500);
});
app.listen(8081);
