import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

let base_url = 'http://localhost:5000/api/Review/User/'


const UserReviews = () => {
    const {id} = useParams()
    const [reviews, setReviews] = useState([]);
    const [login, setLogin] = useState();

    useEffect(() => {
        fetchUser();
        fetchReviews();
    }, []);

    const fetchUser = async () => {
        let url = 'http://localhost:5000/api/User/' + id
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        setLogin(data.login);
    };

    const fetchReviews = async () => {
        let url = base_url + id
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        setReviews(data);
    };
    const content = reviews === undefined ? <p>wait</p> 
:<div>
<ul>
<div>
    {reviews.length != 0  ? <div>Отзывы {login}</div>: <div>Кажется, здесь пусто...</div> }
                {reviews.map(review => (
                    <li key={review.id}>
                        <div><Link to={`/Anime/${review.animeId}`}>{review.animeName}</Link></div>
                        <div><img src={review.coverUrl} alt="Картинка" style={{ width: '80px', height: 'auto' }} /></div>
                        <div>Дата: {review.date.split('T')[0]}</div>
                        <div>Оценка: {review.rate}</div>
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

export default UserReviews;
