import React from "react";
import "./MealPlanner.css";

export default function MealCard({ title, recipe }) {
  return (
    <div className="meal-card">
      <h3 className="meal-title">{title}</h3>
      <p className="meal-recipe">{recipe}</p>
    </div>
  );
}
