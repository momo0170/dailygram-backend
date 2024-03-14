import express from 'express';
import cors from 'cors';
const app = express();

// 임시 DB
let diaries = [
  {
    id: '1',
    name: '창한',
    nickname: '심심하네진짜로',
    text: '새로운 텍스트를 적어봤어',
    createdAt: Date(),
    url: 'https://plus.unsplash.com/premium_photo-1709143101238-ed5c82ada0fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
  },
  {
    id: '2',
    name: '민성',
    nickname: 'quiet',
    text: '반가워',
    createdAt: Date(),
    url: 'https://images.unsplash.com/3/www.madebyvadim.com.jpg?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVFQiU4MiVBOCVFQyU4NCVCMXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '3',
    name: '창한',
    nickname: '심심하네진짜로',
    text: '이건 내 두번째 텍스트야',
    createdAt: Date(),
    url: 'https://plus.unsplash.com/premium_photo-1709143101238-ed5c82ada0fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
  },
];

app.use(express.json()); // req.body를 읽기 위함
app.use(cors());
// GET /diary or /diary?nickname:nickname
app.get('/diary', (req, res, next) => {
  const nickname = req.query.nickname;
  const data = nickname
    ? diaries.filter((diary) => diary.nickname === nickname)
    : diaries;
  res.status(200).json(data);
});

// GET /diary/:id
app.get('/diary/:id', (req, res, next) => {
  const id = req.params.id; // url params에서 id를 가져옴
  const diary = diaries.find((diary) => diary.id === id); // 임시 DB에서 해당 id의 다이어리의 여부 확인
  diary
    ? res.status(200).json(diary) // 다이어리가 존재하면 찾은 다이어리 전달
    : res.status(404).json({ message: `diary id(${id})가 존재하지 않습니다.` }); // 다이어리가 존재하지 않으면 객체 전달
});

// POST /diary
app.post('/diary', (req, res, next) => {
  const { text, name, nickname, url } = req.body;
  const newDiary = {
    id: Date.now().toString(),
    name,
    nickname,
    text,
    createdAt: Date(),
    url,
  };
  diaries = [...diaries, newDiary]; // 새로 만든 일기를 임시 DB에 추가
  res.status(201).send('일기 생성 완료!');
});

// PUT /diary/:id
app.put('/diary/:id', (req, res, next) => {
  let { text } = req.body; // 수정된 텍스트를 받아옴
  const id = req.params.id; // id를 받아옴
  const diary = diaries.find((diary) => diary.id === id); // id가 같은 다이어리의 여부를 확인
  if (diary) {
    // 다이어리가 있다면
    diary.text = text; // 해당 다이어리의 텍스를 새로운 텍스르로 바꿈
    res.status(200).json(diary); // 수정된 다이어리를 보냄
  } else {
    // 다이어리가 없다면
    res.status(404).json({ message: `diary id(${id})가 존재하지 않습니다.` });
  }
});

// DELETE /diary/:id
app.delete('/diary/:id', (req, res, next) => {
  const id = req.params.id;
  diaries = diaries.filter((diary) => diary.id !== id); // id가 일치하는 것은 제외
  res.sendStatus(204);
});

// 모든 라우터가 처리가 안될 시
app.use((req, res, next) => {
  res.status(404).send('콘텐츠를 찾을 수 없습니다.');
});

app.use((error, req, res, next) => {
  res.sendStatus(500);
});
app.listen(8081);
