import { IoMdDoneAll } from "react-icons/io";

import styles from "./Sidebar.module.css";

function Sidebar({ categories, setSelectedCategory }) {

  // console.log(categories);
  // console.log(posts);

  return (
    <div className={styles.sidebar}>
      <h4>دسته ها</h4>
      <ul>
        <li onClick={() => setSelectedCategory("all")}>
          <IoMdDoneAll />
          <p>همه</p>
        </li>
        {categories.data.map((category) => (
          <li key={category._id} onClick={() => setSelectedCategory(category._id)}>
            <img src={`${category.icon}.svg`} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
