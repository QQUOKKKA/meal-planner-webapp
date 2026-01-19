import React, { useState } from "react";
import { menuData } from "../data";

const roles = [
  { name: "밥", code: 1 },
  { name: "국", code: 5 },
  { name: "주찬", code: 6 },
  { name: "반찬1", code: 7 },
  { name: "반찬2", code: 8 },
  { name: "김치", code: 13 },
  { name: "후식", code: 4 }
];

export default function MealPlanner() {
  const [season, setSeason] = useState("봄");
  const [meal, setMeal] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const pickRandomMeal = () => {
    const newMeal = {};
    roles.forEach(role => {
      const items = menuData.filter(
        item => item.role_code === role.code && item.season.includes(season)
      );
      newMeal[role.name] =
        items.length > 0
          ? items[Math.floor(Math.random() * items.length)]
          : { name: "-", recipe: "레시피 없음" };
    });
    setMeal(newMeal);
  };

  const pickSingle = role => {
    const items = menuData.filter(
      item => item.role_code === role.code && item.season.includes(season)
    );
    if (items.length > 0) {
      setMeal(prev => ({
        ...prev,
        [role.name]: items[Math.floor(Math.random() * items.length)]
      }));
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>🍽 영CAT쌤의 식단작성</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <select
          value={season}
          onChange={e => setSeason(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        >
          <option>봄</option>
          <option>여름</option>
          <option>가을</option>
          <option>겨울</option>
        </select>
        <button
          onClick={pickRandomMeal}
          style={{
            marginLeft: "15px",
            padding: "8px 15px",
            backgroundColor: "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          전체 랜덤
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center"
        }}
      >
        {roles.map(role => (
          <div
            key={role.code}
            style={{
              border: "2px solid #27ae60",
              borderRadius: "15px",
              padding: "20px",
              minWidth: "150px",
              maxWidth: "180px",
              textAlign: "center",
              backgroundColor: "#ecf0f1",
              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <h3 style={{ color: "#2c3e50" }}>{role.name}</h3>
            <p style={{ minHeight: "40px", fontWeight: "bold", fontSize: "16px" }}>
              {meal[role.name]?.name || "-"}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {meal[role.name]?.recipe && (
                <button
                  onClick={() => setSelectedRecipe(meal[role.name].recipe)}
                  style={{
                    padding: "6px",
                    backgroundColor: "#2980b9",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  레시피 보기
                </button>
              )}
              <button
                onClick={() => pickSingle(role)}
                style={{
                  padding: "6px",
                  backgroundColor: "#16a085",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                {role.name} 변경
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 레시피 모달 */}
      {selectedRecipe && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "25px",
              borderRadius: "12px",
              maxWidth: "500px",
              textAlign: "center",
              boxShadow: "0 6px 12px rgba(0,0,0,0.2)"
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "15px", color: "#2c3e50" }}>📖 레시피</h2>
            <p style={{ whiteSpace: "pre-wrap", fontSize: "15px" }}>{selectedRecipe}</p>
            <button
              onClick={() => setSelectedRecipe(null)}
              style={{
                marginTop: "15px",
                padding: "6px 12px",
                backgroundColor: "#c0392b",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

