import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import ArticleImage from "../components/ArticleImage"
import { useParams } from "react-router-dom"
import ArticleTags from "../components/ArticleTags"

export default function Article() {
    const {id} = useParams()
    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getArticle()
    }, [])

    const getArticle = (a_id = "972d2b8a") => {
        setLoading(true)

        if(id && id !== "") {
            a_id = id;
        }

        axiosClient.get("/list/" + a_id)
        .then((data) => {
            setLoading(false)
            setArticle(data.data)
        })
        .catch(() => {
            setLoading(false)
        })
    }

    return (
        <div className="article">
            {!loading && <div>
                <h1>{article.title}</h1>

                <div className="article-intro" dangerouslySetInnerHTML={{__html: article.intro}} />

                <ArticleImage image={article.image} />
                
                <div dangerouslySetInnerHTML={{__html: article.body}} />

                {article.tags &&
                    <ArticleTags tags={article.tags} />
                }
            </div>}
            {loading && "laeb..."}
        </div>
    )
}