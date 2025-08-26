import ArticleCard from "./ArticleCard";

interface RecentArticlesProps {
  articles: Array<{
    id: number;
    img: string;
    title: string;
    date: string;
  }>;
}

const RecentArticles = ({ articles }: RecentArticlesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4  pb-2">
        Recent Articles
      </h2>
      <div className="space-y-2 border-b ">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            img={article.img}
            title={article.title}
            date={article.date}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentArticles;
