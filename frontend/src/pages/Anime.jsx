import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
let base_url = 'http://localhost:5000/api/Anime/'

const Anime = () => {
    const {id} = useParams()
    const [anime, setAnime] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        fetchAnime();
    }, []);


    const fetchAnime = async () => {
        let url = base_url + id
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        setAnime(data);
        setReviews(data.reviews)
    };
    const content = anime === undefined ? <p>wait</p> 
:<div>
<ul>
           <div> Название {anime.name}</div>
           <div> Тип {anime.type}</div>
           <div> Количество эпизодов {anime.episodes}</div>
           <div> Статус {anime.status}</div>
           <div> Год выхода {anime.year}</div>
           <div> Жанры {anime.genres}</div>
           <div> Другие названия {anime.otherNames}</div>
           <div> Возрастной рейтинг {anime.ageRating}</div>
           <div> Студия {anime.studio}</div>
           <div> Рейтинг {anime.rating}</div>
           <div> Количество оценок {anime.ratesCount}</div>
           <div> <img src={anime.coverUrl} alt="Картинка" style={{ width: '300px', height: 'auto' }} /></div>
           <div> Описание {anime.description}</div>
           <div> Отзывы</div>
           <div>
                {reviews.map(review => (
                    <li key={review.id}>
                        <div>{review.userId}</div>
                        <div>Дата {review.date}</div>
                        <div><img src={review.photoUrl} alt="Картинка" style={{ width: '30px', height: 'auto' }} /></div>
                        <div>Оценка {review.rate}</div>
                        <div>Рекоммендация {review.reccomendation}</div>
                        <div>{review.text}</div>
                        </li>
                ))}
            </div>
    
</ul>
</div>
    return (
        <div>
        {content}
        </div>
    );
};

export default Anime;
