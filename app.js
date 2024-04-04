import express from 'express';
import cors from 'cors';
import diaryRouter from './router/diary.js';

let userStorage = [
  {
    id: 'abc123',
    password: 'abc123',
    name: '창한',
    nickname: '홍길동',
    url: 'https://images.unsplash.com/photo-1710942499889-71f233dae342?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8',
  },
  {
    id: 'ab12',
    password: 'ab12',
    name: '동현',
    nickname: '동태',
    url: 'https://images.unsplash.com/photo-1710942499889-71f233dae342?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8',
  },
  {
    id: 'momo0170',
    password: 'momo0170',
    name: '민성',
    nickname: 'queit',
    url: 'https://images.unsplash.com/photo-1707343843344-011332037abb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
  },
  {
    id: 'h33265571',
    password: 'h33265571',
    name: '지현',
    nickname: '지효니',
    url: 'https://images.unsplash.com/photo-1711843250893-21a3f56624ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D',
  },
]; // 임시 사용자 DB

const app = express();
app.use(express.json()); // req.body를 읽기 위함
app.use(cors());
app.use('/diary', diaryRouter);
app.post('/sign-up', (req, res, next) => {
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
