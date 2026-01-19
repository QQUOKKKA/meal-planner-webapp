import fs from 'fs';

// menu.json 파일 경로
const filePath = './src/data/menu.json'; // 실제 위치에 맞춰서 수정

// JSON 읽기
const rawData = fs.readFileSync(filePath, 'utf8');
const menuData = JSON.parse(rawData);

// season을 배열로 변환
const updatedMenu = menuData.map(item => {
  return {
    ...item,
    season: item.season.split(',').map(s => s.trim()) // 문자열을 ',' 기준으로 나누고 공백 제거
  };
});

// JSON으로 다시 저장
fs.writeFileSync(filePath, JSON.stringify(updatedMenu, null, 2), 'utf8');

console.log('season 배열 변환 완료!');
