import React  from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Navbar from "../components/NavBar";
import PosterList from "../components/PosterList";
import Filters from "../components/Filters";
import Footer from "../components/Footer";

const posts = [
    {id: 1, title: 'Наруто', body: 'картинка'},
    {id: 2, title: 'Восхождение героя щита', body: 'картинка'},
    {id: 3, title: 'Клинок рассекающий демонов', body: 'картинка'},
    {id: 4, title: 'Атака титанов', body: 'картинка'},
    {id: 5, title: 'Мой сосед Тоторо', body: 'картинка'},
    {id: 6, title: 'Тетрадь смерти', body: 'картинка'},
];
const Main = () => {
    return (
    <div className="Main">
        <Header/>
        <div className="lineSearch">
            <button className="searchUsers"> Поиск пользователей</button>
            <Search/>
            <div className="NavBar">
                <Navbar/>
            </div>
        </div>
        <div className="container">
            <PosterList posts={posts}/>
            <Filters/>
            <Footer/>
        </div>
    </div>
)
}

export default Main



