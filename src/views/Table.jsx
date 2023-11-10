import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import TableRow from "../components/TableRow"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

export default function Table() {
    const [list, setList] = useState([])
    const [currentPage, setPage] = useState(1)
    const [pages, setPages] = useState([])
    const [pageNumbers, setPageNumbers] = useState([1,2,3,4,5])
    const [sorting, setSorting] = useState([
        {
            name: "firstname",
            sort: "",
            icon: faSort
        },
        {
            name: "surname",
            sort: "",
            icon: faSort
        },
        {
            name: "sex",
            sort: "",
            icon: faSort
        },
        {
            name: "personal_code",
            sort: "",
            icon: faSort
        },
    ])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getList()
    }, [])

    const paginate = (nextPage = currentPage) => {
        if(nextPage >= pages.length) {
            nextPage = pages.length;
        }
        if(nextPage < 1) {
            nextPage = 1;
        }
        let lastPage = nextPage + 2;

        if(lastPage >= pages.length) lastPage = pages.length
        if(lastPage < 5) lastPage = 5

        let firstPage = lastPage - 4;
        let _pageNumbers = [];

        for (let i = firstPage; i <= lastPage; i++) {
            _pageNumbers.push(i);
        }

        setPageNumbers(_pageNumbers);

        setPage(nextPage);
    }

    const sort = (key, direction = "ASC") => {
        for (var i=0; i<sorting.length; i++) {
            if(sorting[i].name == key) {
                if(sorting[i].sort == "") {
                    sorting[i].sort = "ASC";
                    sorting[i].icon = faSortDown;
                } else if(sorting[i].sort == "ASC") {
                    sorting[i].sort = "DESC";
                    sorting[i].icon = faSortUp;
                } else if(sorting[i].sort == "DESC") {
                    sorting[i].sort = "";
                    sorting[i].icon = faSort;
                }
                direction = sorting[i].sort
            } else {
                sorting[i].sort = ""
                sorting[i].icon = faSort
            }
        }

        setSorting(sorting);

        let sortedList = list.sort((a, b) => {
            const nameA = key == "personal_code" ? a[key] : a[key].toUpperCase();
            const nameB = key == "personal_code" ? b[key] : b[key].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            
            return 0;
        });

        if(direction == "DESC") {
            sortedList.reverse();
        } else if(direction == "") {
            getList();
            return;
        }
        
        let resList = sortedList;
        let size = 10; let listPages = [];

        for (var j=0; j<resList.length; j+=size) {
            listPages.push(resList.slice(j,j+size));
        }

        setPages(listPages)
        setLoading(false);
    }

    const getList = () => {
        setLoading(true)

        axiosClient.get("/list?limit=500")
        .then((data) => {
            let resList = data.data.list;
            let size = 10; let listPages = [];

            for (var i=0; i<resList.length; i+=size) {
                listPages.push(resList.slice(i,i+size));
            }

            setList(data.data.list)
            setPages(listPages)

            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        })
    }

    return (
        <div>
            <h1>Nimekiri</h1>
            {!loading && <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => {
                                sort("firstname")
                            }}>
                                <span>
                                    Eesnimi
                                    <FontAwesomeIcon icon={sorting[0].icon} />
                                </span>
                            </th>
                            <th onClick={() => {
                                sort("surname")
                            }}>
                                <span>Perekonnanimi<FontAwesomeIcon icon={sorting[1].icon} /></span>
                            </th>
                            <th onClick={() => {
                                sort("sex")
                            }}>
                                <span>Sugu<FontAwesomeIcon icon={sorting[2].icon} /></span>
                            </th>
                            <th onClick={() => {
                                sort("personal_code")
                            }}>
                                <span>Sünnikuupäev<FontAwesomeIcon icon={sorting[3].icon} /></span>
                            </th>
                            <th>Telefon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages[currentPage - 1] && pages[currentPage - 1].map(item => (
                            <TableRow key={item.id} item={item} />
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>}
            
            {loading && "laeb..."}

            <div className="pagination">
                <span className={currentPage > 1 ? "active" : ""} onClick={() => {
                    paginate(currentPage - 1)
                }}><FontAwesomeIcon icon={faAngleLeft} /></span>

                {pageNumbers.map((number, index) => (
                    <span className={currentPage == number ? "active" : ""} key={index} onClick={() => {
                        paginate(number)
                    }}>{number}</span>
                ))}

                <span className={currentPage < pages.length ? "active" : ""} onClick={() => {
                    paginate(currentPage + 1)
                }}><FontAwesomeIcon icon={faAngleRight} /></span>
            </div>
        </div>
    )
}