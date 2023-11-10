import { useState } from "react"
import axiosClient from "../axios-client"
import { NavLink } from "react-router-dom"

export default function TableRow({item}) {
    const [article, setArticle] = useState({
        id: null
    })
    const [opened, setOpened] = useState(false)

    const openRow = (id) => {
        if(opened) {
            setOpened(false)
        } else {
            axiosClient.get("/list/" + id)
            .then((data) => {
                setArticle(data.data)
                setOpened(true)
            })
            .catch(() => {
                setOpened(false)
            })
        }
    }

    const parseIdCode = (code = "") => {
        if(code.length < 11) return "";

        code = JSON.stringify(code);

        let date = "";

        let c = code.substring(0, 1) < 5 ? 19 : 20;
        let y = code.substring(1, 3);
        let m = code.substring(3, 5);
        let d = code.substring(5, 7);

        date += d + "." + m + "." + c + y;

        return date
    }
    
    return (
        <>
            <tr key={item.id} onClick={ev => openRow(item.id)}>
                <td>{item.firstname}</td>
                <td>{item.surname}</td>
                <td>{item.sex && item.sex == "f" ? "Naine" : item.sex && item.sex == "m" ? "Mees" : ""}</td>
                <td>{parseIdCode(item.personal_code)}</td>
                <td>{item.phone.substring(0, 4) + " " + item.phone.substring(4, item.phone.length)}</td>
            </tr>
            {article && opened && <tr className="article-row">
                <td colSpan="5">
                    <div className="article-content">
                        <div className="col">
                            <div
                                className="article-content-image"
                                style={{backgroundImage: "url(" + article.image.small + ")"}}
                            ></div>
                        </div>
                        <div className="col">
                            <div dangerouslySetInnerHTML={{__html: article.intro}} />
                            {/* <button>Loe rohkem</button> */}
                            <NavLink
                                to={"/article/" + article.id}
                            >Loe rohkem</NavLink>
                        </div>
                    </div>
                </td>
            </tr>}
        </>
    )
}