export default function ArticleImage({image}) {
    return (
        <div className="article-image">
            {image && image.medium &&
                <div>
                    <img src={image.medium} alt="" />
                    <div
                        className="article-image-background"
                        style={{backgroundImage: "url(" + image.medium + ")"}}
                    ></div>
                </div>}
            {image && image.title &&
                <div className="article-image-title">{image.title}</div>}
        </div>
    )
}