import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import AddReview from "../components/AddReview";
import  EditReview  from '../components/EditReview';

let base_url = 'http://localhost:5000/api/Anime/'
let base_user_url = 'http://localhost:5000/api/User/'

let year = "";
let genres = '';
let names = ''
var usersmap = new Map()

const Anime = () => {
    const {id} = useParams()
    const [anime, setAnime] = useState([]);
    const [users, setUsers] = useState();
    const [reviews, setReviews] = useState([]);
    
    const [editingReviewId, setEditingReviewId] = useState(null);

    useEffect(() => {

        fetchAnime();
    }, []);
    
    const fetchUser = async (user_id) => {
        let url = base_user_url + user_id
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        return data
    };
    const fetchAnime = async () => {
        let url = base_url + id
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        setAnime(data);
        year = data.year.split('T')[0]
        genres = data.genres.join(', ')
        names = data.otherNames.join(', ')
        setReviews(data.reviews)
        await data.reviews.map(review => (fetchUser(review.userId).then((result) => {
            usersmap.set(review.userId,result )
            setUsers(true)})))
    };


    const handleReviewAdded = (newReview) => {
        setReviews((prevReviews) => [...prevReviews, newReview]);
    };

    const handleReviewUpdated = (updatedReview) => {
        setReviews(
            reviews.map((review) =>
                review.id === updatedReview.id ? updatedReview : review
            )
        );
        setEditingReviewId(null);
    };

    const content = users === undefined ? <p>wait</p> 

:<div>
<ul>
           <div> Название: {anime.name}</div>
           <div> Тип: {anime.type}</div>
           <div> Количество эпизодов: {anime.episodes}</div>
           <div> Статус: {anime.status}</div>
           <div> Год выхода: {year}</div>
           <div> Жанры: {genres}</div>
           <div> Другие названия: {names}</div>
           <div> Возрастной рейтинг: {anime.ageRating}</div>
           <div> Студия: {anime.studio}</div>
           <div> Рейтинг: {anime.rating}</div>
           <div> Количество оценок: {anime.ratesCount}</div>
           <div> <img src={anime.coverUrl} alt="Картинка" style={{ width: '300px', height: 'auto' }} /></div>
           <div> Описание: {anime.description}</div>
           <div> Отзывы:</div>
           <div>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            {editingReviewId === review.id ? (
                                <EditReview
                                    reviewId={review.id}
                                    currentRate={review.rate}
                                    currentText={review.text}
                                    coverurl={anime.coverUrl}
                                    animeid={anime.id}
                                    animename={anime.name}
                                    rec={review.reccomendation}
                                    onReviewUpdated={handleReviewUpdated}
                                />
                            ) : (
                                <div>
                                    <div>
                                        <Link to={`/User/${review.userId}`}>
                                            {usersmap.get(review.userId).login}
                                        </Link>
                                    </div>
                                    <div>
                                        <img
                                            src={usersmap.get(review.userId).photoUrl}
                                            alt="Картинка"
                                            style={{ width: '30px', height: 'auto' }}
                                        />
                                    </div>
                                    <div>Дата: {review.date.split('T')[0]}</div>
                                    <div>Оценка: {review.rate}</div>
                                    <div>{review.text}</div>
                                    {review.userId === sessionStorage.getItem("id") ? 
                                   ( <button onClick={() => setEditingReviewId(review.id)}>
                                        Изменить
                                    </button>) : <div></div>}
                                </div>
                            )}
                        </li>
                    ))}
                </div>
    
</ul>

        <div>
          <h2>Добавить отзыв:</h2>
          {sessionStorage.getItem("id") ? 
          (<AddReview
            animeId={anime.id}
            animeName={anime.name}
            coverurl={anime.coverUrl}
            onReviewAdded={handleReviewAdded}
          />) : (<div> Зарегистрируйтесь, чтобы писать отзывы</div>)}
        </div>

</div>
    return (
        <div>
        {content}
        </div>
    );
};

export default Anime;
