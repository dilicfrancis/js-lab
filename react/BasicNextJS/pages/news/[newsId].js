import { useRouter } from "next/router";

const NewsPage = () => {
  const router = useRouter();

  const newsId = router.query.newsId;

  return <h1>NewsPage</h1>;
};

export default NewsPage;
