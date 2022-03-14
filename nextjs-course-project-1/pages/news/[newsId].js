// our-domain.com/news/details
import { useRouter } from "next/router";

const DetailsPage = () => {
  const router = useRouter();

  const newsId = router.query.newsId;

  // send a request to the backend API
  // to fetch the news item with newsId

  return <h1>The Details Page</h1>
};

export default DetailsPage;