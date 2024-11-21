import React from 'react';
import { Link } from 'react-router-dom'

const Poster = (props) => {

    return (
        <div className="post">
            <div className="post_content">
                <strong><Link to={`/Anime/${props.post.id}`}>{props.post.name}</Link></strong>
                <div>
                    {props.post.type}
                    <div><img src={props.post.coverUrl} alt="Картинка" style={{ width: '30px', height: 'auto' }} /></div>
                </div>

            </div>
        </div>
    );
};

export default Poster;