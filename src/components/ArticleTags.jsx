import ArticleTag from "./ArticleTag";

export default function ArticleTags({tags}) {
    return (
        <div className="tags">
            {tags && tags.map((t, index) => 
                (
                    <ArticleTag key={index} tag={t} />
                )
            )}
        </div>
    )
}