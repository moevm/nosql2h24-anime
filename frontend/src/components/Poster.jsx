import React from 'react';
import { Link } from 'react-router-dom'

const Poster = (props) => {

    return (
        <div className="post">
            <div className="post_content">
                <strong><Link to={`/Anime/${props.post.id}`}>{props.post.name}</Link></strong>
                <div>
                    <div><img src={props.post.coverUrl} alt="Картинка" style={{ width: '30px', height: 'auto' }} />
                    <p>{props.post.type}</p>
                    <p>Рейтинг {Math.round(props.post.rating*10)/10}</p>
                    <p>Количество оценок: {props.post.ratesCount}</p>
                    <p>Жанр: {props.post.genres.join(', ')}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Poster;