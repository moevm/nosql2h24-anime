import React, { useEffect, useState }  from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Navbar from "../components/NavBar";
import PosterList from "../components/PosterList";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom'


let base_url = 'http://localhost:5000/api/Anime/'
let page = ""
let name = ""
let TV = ""
let OVA = ""
let Film = ""
let Special = ""
let sort = new Map([
    ["name", "rating"],
    ["order", "-1"],
  ]);
  let dates = new Map([
    ["from", ""],
    ["to", ""],
  ]);
let genres = new Map([
    ["Авангард", ""],
    ["Спорт", ""],
    ["Экшен", ""],
    ["Драма", ""],
    ["Триллер", ""],
    ["Комедия", ""],
    ["Повседневность", ""],
    ["Фантастика", ""],
    ["Приключение", ""],
    ["Тайна", ""],
    ["Романтика", ""],
    ["Ужасы", ""],
    ["Фэнтэзи", ""],
  ]);

  let statuses = new Map([
    ["Вышло", ""],
    ["Сейчас выходит", ""],
    ["Ещё не вышло", ""]
  ]);

  let ageRatings = new Map([
    ["G", ""],
    ["PG", ""],
    ["PG-13", ""],
    ["R-17", ""],
    ["R+", ""]
  ]);
const Main = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [anime, setAnime] = useState();
    const [datalength, setTotalDataLength] = useState();
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) { // Проверяем, что страница в допустимом диапазоне
            setCurrentPage(page);
            console.log("Переход на страницу: " + page);
            console.log("Текущая страница: " + currentPage);
        }
    };

    useEffect(() => {
        // Этот эффект будет вызван каждый раз, когда currentPage изменится
        console.log(`Текущая страница изменена на: ${currentPage}`);
        getData();
    }, [currentPage]);

    useEffect(() => {getData();}, []);
    const content = anime === undefined ? <p>wait</p> 
    :<div className="Main">
    <Header/>
    <div className="lineSearch">
        <Link to="/UsersList">Поиск пользователей</Link>
        <input type='text' onChange={e=> searchByName(e.target.value)} placeholder={"Поиск"} className="search"/>
        <div className="NavBar">
            <Navbar/>
        </div>
    </div>
    <div> Тип:
        <label>
        <input type = "checkbox" onChange={e => TVFilter(e.target.checked, "TV сериал")}/> TV
        </label>
        <label>
        <input type = "checkbox" onChange={e => OVAFilter(e.target.checked, "OVA")}/> OVA
        </label>
        <label>
        <input type = "checkbox" onChange={e => FilmFilter(e.target.checked, "Фильм")}/> Фильм 
        </label>
        <label>
        <input type = "checkbox" onChange={e => SpecialFilter(e.target.checked, "Special")}/> Special
        </label>
    </div>
    <div> Жанр:
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Авангард")}/> Авангард
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Спорт")}/> Спорт
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Экшен")}/> Экшен
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Драма")}/> Драма
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Триллер")}/> Триллер
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Комедия")}/> Комедия
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Повседневность")}/> Повседневность
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Фантастика")}/> Фантастика
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Приключение")}/> Приключение
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Тайна" )}/> Тайна
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Романтика")}/> Романтика
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Ужасы")}/> Ужасы
        </label>
        <label>
        <input type = "checkbox" onChange={e => GenreFilter(e.target.checked, "Фэнтэзи")}/> Фэнтэзи
        </label>
    </div>
    <div> Статус:
        <label>
        <input type = "checkbox" onChange={e => StatusFilter(e.target.checked, "Вышло")}/> Вышло
        </label>
        <label>
        <input type = "checkbox" onChange={e => StatusFilter(e.target.checked, "Сейчас выходит")}/> Сейчас выходит
        </label>
        <label>
        <input type = "checkbox" onChange={e => StatusFilter(e.target.checked, "Ещё не вышло")}/> Ещё не вышло
        </label>
    </div>
    <div> Возрастной рейтинг:
        <label>
        <input type = "checkbox" onChange={e => AgeRatingFilter(e.target.checked, "G")}/> G
        </label>
        <label>
        <input type = "checkbox" onChange={e => AgeRatingFilter(e.target.checked, "PG")}/> PG
        </label>
        <label>
        <input type = "checkbox" onChange={e => AgeRatingFilter(e.target.checked, "PG-13")}/> PG-13
        </label>
        <label>
        <input type = "checkbox" onChange={e => AgeRatingFilter(e.target.checked, "R-17")}/> R-17
        </label>
        <label>
        <input type = "checkbox" onChange={e => AgeRatingFilter(e.target.checked, "R%2B")}/> R+
        </label>
    </div>
    <div> Дата выхода:
       С <input type="date" onChange={e => DateFromFilter(e.target.value)}/> 
        По <input type="date" onChange={e => DateToFilter(e.target.value)}/> 
        </div>
    <div> 
        <label>
            <input type="radio" value="" name="radio" onChange={e => Sort("rating", "-1")}/>  По рейтингу
        </label>
        <br />
        <label>
            <input type="radio" value="" name="radio" onChange={e => Sort("year", "-1")}/>  Сначала новые
            </label>
            <br />
            <label>
            <input type="radio" value=""  name="radio"onChange={e => Sort("year", "1")}/>  Сначала старые
            </label>
            <br />
            <label>
            <input type="radio" value=""  name="radio" onChange={e => Sort("name", "1")}/>  По названию
        </label>
        <p>Найдено {datalength} элементов</p>
    </div>
        <br />
        <div className="container">
        <PosterList posts = {anime}/>
        </div>
        <div>
            <h1>Текущая страница: {currentPage}</h1>
            <Footer 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    </div>
    return (
        <div>
    {content}
    </div>
)

    async function DateFromFilter(from) {
        dates.set("from", from)
        getData()
    }
    async function DateToFilter(to) {
        dates.set("to", to)
        getData()
    }
    async function Sort(name, order) {
        sort.set("name", name)
        sort.set("order", order)
        getData()
    }
    async function GenreFilter(check, newtype) {
        if (check)
            genres.set(newtype, newtype + ',')
        else
            genres.set(newtype , '')
        getData()
    }
    async function AgeRatingFilter(check, newAR) {
        if (check)
            ageRatings.set(newAR, newAR + ',')
        else
            ageRatings.set(newAR , '')
        getData()
    }
    async function StatusFilter(check, newstatus) {
        if (check)
            statuses.set(newstatus, newstatus + ',')
        else
            statuses.set(newstatus , '')
        getData()
    }
    async function TVFilter(check, newtype) {
        if (check){
            TV = newtype + ','
        }
        else
            TV = ''
        getData()
    }
    async function OVAFilter(check, newtype) {
        if (check)
            OVA = newtype + ','
        else
            OVA = ''
        getData()
    }
    async function FilmFilter(check, newtype) {
        if (check)
            Film = newtype + ','
        else
            Film = ''
        getData()
    }
    async function SpecialFilter(check, newtype) {
        if (check)
            Special = newtype + ','
        else
            Special = ''
        getData()
    }

    async function searchByName(newname) {
        name = '&name=' + newname
        getData()
    }

        async function getData(){
            

            let url = base_url + "?type=" + TV + OVA + Film + Special
            + name
            + "&genres=" + Array.from(genres.values()).join('').slice(0,-1)
            + "&status=" + Array.from(statuses.values()).join('').slice(0,-1)
            + "&ageRating=" + Array.from(ageRatings.values()).join('').slice(0,-1)
            + "&sort=" + sort.get("name") + "&order=" + sort.get("order")
            + "&fromYear=" + dates.get("from") + "&toYear=" + dates.get("to")
            
            let url_page = url + "&page=" + currentPage;
            console.log("url = " + url);
            console.log("url_page = " + url_page);

            console.log("currentPage = " + currentPage);
            console.log("totalPages = " + totalPages);

            const response = await fetch(url, {method: 'GET'});//url
            const allData = await response.json();
            setTotalDataLength(allData.length);
            setTotalPages(Math.ceil(allData.length / 3));
            const response_page = await fetch(url_page, {method: 'GET'});
            const data = await response_page.json();
            setAnime(data);
        }

        
    
        
}

export default Main



