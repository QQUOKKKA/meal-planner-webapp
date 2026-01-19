const fs = require("fs");
const path = require("path");

// CSV 파일 경로 (프로젝트 루트에 menu.csv 있어야 함)
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
  .filter(line => line.trim() !== "") // 빈 줄 제거
  .map(line => {
    const cols = line.split(",");

    if (cols.length < 6) return null; // 컬럼 부족 시 제외

    // season 문자열 → 배열로 변환
    let seasonArray = [];
    if (cols[4]) {
      seasonArray = cols[4]
        .replace(/["']/g, "")   // 따옴표 제거
        .split(",")             // 쉼표 기준 분리
        .map(s => s.trim())     // 공백 제거
        .filter(s => s !== ""); // 빈 문자열 제거
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
