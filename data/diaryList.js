// 임시 DB
let diaryList = [
  {
    id: '1',
    name: '창한',
    nickname: '홍길동',
    text: '새로운 텍스트를 적어봤어',
    createdAt: Date(),
    url: 'https://images.unsplash.com/photo-1710942499889-71f233dae342?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8',
  },
];

export async function getByNickname(nickname) {
  return diaryList.filter((diary) => diary.nickname === nickname);
}
export async function getAll() {
  return diaryList;
}
export async function getById(id) {
  return diaryList.find((diary) => diary.id === id);
}
export async function create(text, name, nickname, url) {
  const newDiary = {
    id: Date.now().toString(),
    name,
    nickname,
    text,
    createdAt: Date(),
    url,
  };
  diaryList = [newDiary, ...diaryList]; // 새로 만든 일기를 임시 DB에 추가
  return newDiary;
}
export async function update(updatedText, id) {
  const diary = diaryList.find((diary) => diary.id === id); // id가 같은 다이어리의 여부를 확인
  if (diary) {
    diary.text = updatedText;
  }
  return diary;
}
export async function remove(id) {
  diaryList = diaryList.filter((diary) => diary.id !== id); // id가 일치하는 것은 제외
}
