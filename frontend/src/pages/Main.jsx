import React, { useEffect, useState }  from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Navbar from "../components/NavBar";
import PosterList from "../components/PosterList";
import Filters from "../components/Filters";
import Footer from "../components/Footer";

const Main = () => {
    const [anime, setAnime] = useState();
    useEffect(() => {getData();}, []);
    const content = anime === undefined ? <p>wait</p> 
    :<div className="Main">
    <Header/>
    <div className="lineSearch">
        <button className="searchUsers"> Поиск пользователей</button>
        <input type='text' onChange={e=> searchByName(e.target.value)} placeholder={"Поиск"} className="search"/>
        <div className="NavBar">
            <Navbar/>
        </div>
    </div>
    <div className="container">
        <PosterList posts = {anime}/>
        <Filters/>
        <Footer/>
    </div>
    </div>

    async function searchByName(name) {
        const response = await fetch('http://localhost:5000/api/Anime?name=' + name, {method: 'GET'});
        const data = await response.json();
        setAnime(data);
    }
    return (
        <div>
    {content}
    </div>
)
        async function getData(){
            const response = await fetch('http://localhost:5000/api/Anime', {method: 'GET'});
            const data = await response.json();
            setAnime(data);
        }
}

export default Main



