import express from 'express';

// 임시 DB
let diaryList = [
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
const router = express.Router();

// GET /diary or /diary?nickname:nickname
router.get('/', (req, res) => {
  const nickname = req.query.nickname;
  const data = nickname
    ? diaryList.filter((diary) => diary.nickname === nickname)
    : diaryList;
  res.status(200).json(data);
});

// GET /diary/:id
router.get('/:id', (req, res) => {
  const id = req.params.id; // url params에서 id를 가져옴
  const diary = diaryList.find((diary) => diary.id === id); // 임시 DB에서 해당 id의 다이어리의 여부 확인
  diary
    ? res.status(200).json(diary) // 다이어리가 존재하면 찾은 다이어리 전달
    : res.status(404).json({ message: `diary id(${id})가 존재하지 않습니다.` }); // 다이어리가 존재하지 않으면 객체 전달
});

// POST /diary
router.post('/', (req, res) => {
  const { text, name, nickname, url } = req.body;
  const newDiary = {
    id: Date.now().toString(),
    name,
    nickname,
    text,
    createdAt: Date(),
    url,
  };
  diaryList = [newDiary, ...diaryList]; // 새로 만든 일기를 임시 DB에 추가
  res.status(201).json(newDiary);
});

// PUT /diary/:id
router.put('/:id', (req, res) => {
  let { text } = req.body; // 수정된 텍스트를 받아옴
  const id = req.params.id; // id를 받아옴
  const diary = diaryList.find((diary) => diary.id === id); // id가 같은 다이어리의 여부를 확인
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
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  diaryList = diaryList.filter((diary) => diary.id !== id); // id가 일치하는 것은 제외
  res.sendStatus(204);
});
export default router;
