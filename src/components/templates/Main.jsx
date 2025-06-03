import { useNavigate } from "react-router-dom";

import { sp } from "utils/numbers";

import styles from "./Main.module.css";

function Main({ posts }) {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  console.log(posts);
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div
          key={post._id}
          className={styles.card}
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <div className={styles.info}>
            <p>{post.options?.title}</p>
            <div>
              <p>{sp(post.amount)} تومان</p>
              <span>{post.options?.city}</span>
            </div>
          </div>
          <img src={`${baseURL}${post.images[0]}`} />
        </div>
      ))}
    </div>
  );
}

export default Main;
