const fs = require("fs");
const path = require("path");

// CSV 파일 경로
const csvPath = path.join(__dirname, "menu.csv");

// CSV 존재 확인
if (!fs.existsSync(csvPath)) {
  console.error("menu.csv 파일이 프로젝트 루트에 없습니다!");
  process.exit(1);
}

// CSV 읽기
const csv = fs.readFileSync(csvPath, "utf8");

// 줄 단위로 나누기
const lines = csv.trim().split(/\r?\n/);

// CSV → JSON 변환
const data = lines
  .slice(1) // 헤더 제외
  .filter(line => line.trim() !== "")
  .map(line => {
    // CSV 안에 쉼표 포함된 값 안전하게 처리
    // 예: "봄,여름,가을" → 하나의 필드로 처리 후 split
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
    const cols = line.split(regex).map(c => c.replace(/^"|"$/g, "").trim());

    if (cols.length < 6) return null;

    // season 배열 생성
    let seasonArray = [];
    if (cols[4]) {
      seasonArray = cols[4]
        .split(",")
        .map(s => s.trim())
        .filter(s => s !== "");
    }

    return {
      id: Number(cols[0]) || null,
      name: cols[1],
      role_code: Number(cols[3]) || null,
      season: seasonArray,
      recipe: cols[5]
    };
  })
  .filter(item => item !== null);

// data.js 생성
const outputPath = path.join(__dirname, "src", "data.js");
fs.writeFileSync(
  outputPath,
  "export const menuData = " + JSON.stringify(data, null, 2) + ";"
);

console.log("✅ data.js 생성 완료!", outputPath);
