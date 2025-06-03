import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { showPost } from "services/user";
import { sp } from "utils/numbers";
import Loader from "components/modules/Loader";

import styles from "./PostDetails.module.css";

function PostDetails() {
   const baseURL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const { data, isLoading } = useQuery(
    ["post-details", id],
    async () => await showPost(id)
  );

  if (!isLoading) console.log(data.data.post);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.details}>
          <div className={styles.image}>
            <img src={`${baseURL}${data.data.post?.images}`} />
          </div>
          <div className={styles.description}>
            <h3>{data.data.post.options.title}</h3>
            <p>{data.data.post.options.content}</p>
            <span>{sp(data.data.post.amount)} تومان</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
