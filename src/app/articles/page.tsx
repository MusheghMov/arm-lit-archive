import { getArticles } from "@/actions";
import ArticleCard from "@/components/ArticleCard";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="mt-8 grid w-full flex-1 auto-rows-max place-items-center items-center justify-center gap-4 self-center px-4 md:px-8 lg:mt-14 lg:max-w-[80%] lg:grid-cols-2 lg:p-0">
      {articles.map((article) => {
        return <ArticleCard article={article} key={article.id} />;
      })}
    </div>
  );
}
