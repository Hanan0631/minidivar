import { useQuery } from "@tanstack/react-query";
import Loader from "components/modules/Loader";

import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import { useState } from "react";
import { getCategory } from "services/admin";
import { getAllPosts } from "services/user";

function HomePage() {
  const style = {
    display: "flex",
  };

  const { data: posts, isLoading: postLoading } = useQuery(
    ["post-list"],
    getAllPosts
  );
  const { data: categories, isLoading: categoryLoading } = useQuery(
    ["get-categories"],
    getCategory
  );

  const [selectedCategory, setSelectedCategory] = useState("all");

  console.log(posts)

  const postList = posts?.data.posts || []

  const filteredPosts =
    selectedCategory === "all"
      ? postList
      : postList.filter((post) => post.category === selectedCategory);

  return (
    <>
      {postLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar
            categories={categories}
            setSelectedCategory={setSelectedCategory}
          />
          <Main
            posts={filteredPosts}
          />
        </div>
      )}
    </>
  );
}

export default HomePage;
