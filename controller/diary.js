import * as diaryStorage from '../data/diaryList.js';

export async function get(req, res) {
  const nickname = req.query.nickname;
  const data = nickname
    ? await diaryStorage.getByNickname(nickname)
    : await diaryStorage.getAll();
  res.status(200).json(data);
}

export async function getById(req, res) {
  const id = req.params.id; // url params에서 id를 가져옴
  const diary = await diaryStorage.getById(id); // 임시 DB에서 해당 id의 다이어리의 여부 확인
  diary
    ? res.status(200).json(diary) // 다이어리가 존재하면 찾은 다이어리 전달
    : res.status(404).json({ message: `diary id(${id})가 존재하지 않습니다.` }); // 다이어리가 존재하지 않으면 객체 전달
}

export async function create(req, res) {
  const { text, name, nickname, url } = req.body;
  const newDiary = await diaryStorage.create(text, name, nickname, url);
  res.status(201).json(newDiary);
}

export async function modify(req, res) {
  let { text } = req.body; // 수정된 텍스트를 받아옴
  const id = req.params.id; // id를 받아옴
  const diary = await diaryStorage.update(text, id);
  if (diary) {
    res.status(200).json(diary); // 수정된 다이어리를 보냄
  } else {
    res.status(404).json({ message: `diary id(${id})가 존재하지 않습니다.` });
  }
}

export async function remove(req, res) {
  const id = req.params.id;
  await diaryStorage.remove(id);
  res.sendStatus(204);
}
