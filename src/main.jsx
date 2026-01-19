import React from "react";
import ReactDOM from "react-dom/client";
import MealPlanner from "./components/MealPlanner"; // 새 컴포넌트 import
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MealPlanner />  {/* 여기서 컴포넌트 렌더링 */}
  </React.StrictMode>
);
