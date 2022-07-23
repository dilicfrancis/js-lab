import Link from "next/link";

const NewsHome = () => {
  const router = useRouter();

  const newsId = router.query.newsId;

  return (
    <>
      <h1>This is news!</h1>
      <ul>
        <li>
          <Link href="/news/amazing">Amazing News One</Link>
        </li>
        <li>
          <Link href="/news/shocking">Shocking New Two</Link>
        </li>
      </ul>
    </>
  );
};

export default NewsHome;
