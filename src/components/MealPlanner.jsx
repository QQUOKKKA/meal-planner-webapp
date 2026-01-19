// src/components/MealPlanner.jsx
import React, { useState } from "react";
import menuData from "../menu.json"; // menu.json 경로 확인

export default function MealPlanner() {
  const categories = ["밥/면", "국", "주찬", "반찬1", "반찬2", "김치", "후식"];

  const [menu, setMenu] = useState(() => {
    const initial = {};
    categories.forEach(cat => (initial[cat] = ""));
    return initial;
  });

  const [recipes, setRecipes] = useState(() => {
    const initial = {};
    categories.forEach(cat => (initial[cat] = ""));
    return initial;
  });

  const getRandomItem = (category) => {
    const items = menuData.filter(item => item.role === category);
    const random = items[Math.floor(Math.random() * items.length)];
    return random ? random.name : "";
  };

  const getRecipe = (menuName) => {
    const item = menuData.find(item => item.name === menuName);
    return item ? item.recipe : "";
  };

  const randomAll = () => {
    const newMenu = {};
    categories.forEach(cat => (newMenu[cat] = getRandomItem(cat)));
    setMenu(newMenu);

    // 레시피 초기화
    const reset = {};
    categories.forEach(cat => (reset[cat] = ""));
    setRecipes(reset);
  };

  const randomCategory = (category) => {
    const name = getRandomItem(category);
    setMenu(prev => ({ ...prev, [category]: name }));
    setRecipes(prev => ({ ...prev, [category]: "" }));
  };

  const toggleRecipe = (category) => {
    setRecipes(prev => ({
      ...prev,
      [category]: prev[category] ? "" : getRecipe(menu[category])
    }));
  };

  return (
    <div className="meal-planner">
      <h2>0CATSSAM 식단</h2>
      <button className="all-random" onClick={randomAll}>전체변경</button>

      <div className="menu-grid">
        {categories.map(category => (
          <div key={category} className="menu-card">
            <h3>{category}</h3>
            <p>{menu[category]}</p>
            <div className="button-group">
              <button className="category-random" onClick={() => randomCategory(category)}>변경</button>
              <button className="recipe-toggle" onClick={() => toggleRecipe(category)}>
                {recipes[category] ? "레시피 닫기" : "레시피"}
              </button>
            </div>
            {recipes[category] && <pre>{recipes[category]}</pre>}
          </div>
        ))}
      </div>
    </div>
  );
}
