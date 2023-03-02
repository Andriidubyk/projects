import React from "react";
const categories = [
  "Всі",
  "М'ясні",
  "Вегетаріанська",
  "Гриль",
  "Гострі",
  "Закриті",
];
function Categories({ categoryId, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            onClick={() => onClickCategory(i)}
            className={categoryId === i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
