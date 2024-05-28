import React, { useEffect, useState } from "react";
import Container from "../../containers/Container";
import BottomBar from "../../components/Navbar/BottomBar";
import ArticleCard from "../../components/Cards/ArticleCard";
import BackBar from "../../components/Navbar/BackBar";
import Loader from "../../components/UI/Loader";
import { fetchArticles } from "../../api/articles";
import { Button } from "../../components/UI/button";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetchArticles();
      if (!response) return;
      setArticles(response.data.articles);
      console.log(response);
      setLoading(false);
    })();
  }, []);
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const sortArticles = (order) => {
    const sortedArticles = [...filteredArticles].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      console.log(sortBy);
      return order === "latest" ? dateB - dateA : dateA - dateB;
    });

    setSortBy(order);
    setArticles(sortedArticles);
  };
  return (
    <React.Fragment>
      <BackBar pageLabel={"Articles"} />
      <div className="filters w-[100%] overflow-x-scroll overflow-y-hidden flex justify-center py-2 px-10 ps-11">
        <input
          type="search"
          placeholder="Type to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        />
      </div>
      <div className="flex justify-start ml-5 gap-3 mt-3">
        <Button
          variant={"secondary"}
          className="px-2 py-2"
          onClick={() => sortArticles("latest")}
        >
          Latest News
        </Button>
        <Button
          variant={"secondary"}
          className="px-2 py-2"
          onClick={() => sortArticles("oldest")}
        >
          Oldest News
        </Button>
      </div>
      <Container className="flex justify-center items-start md:flex-wrap sm:flex-wrap flex-wrap gap-5">
        {loading && <Loader />}
        {!loading && searchQuery && filteredArticles.length === 0 && (
          <p>articles not found from ` {searchQuery} `</p>
        )}
        {filteredArticles?.map((article) => {
          return <ArticleCard key={article._id} {...article} />;
        })}
      </Container>
      <BottomBar />
    </React.Fragment>
  );
};

export default Articles;
