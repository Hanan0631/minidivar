import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCategory } from "services/admin";
import Loader from "components/modules/Loader";

import styles from "./CategoryList.module.css";
import { deleteCategory } from "services/admin";

function CategoryList() {
  const { data, isLoading } = useQuery(["get-categories"], getCategory);
  console.log({ data, isLoading });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} />
            <h5>{i.name}</h5>
            <p>slug: {i.slug}</p>
            <button onClick={() => mutate(i._id)}>حذف</button>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
