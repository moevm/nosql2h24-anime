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
        <Search/>
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



