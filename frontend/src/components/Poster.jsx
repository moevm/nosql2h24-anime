import React from 'react';

const Poster = (props) => {

    return (
        <div className="post">
            <div className="post_content">
                <strong>{props.post.name}</strong>
                <div>
                    {props.post.type}
                    <div><img src={props.post.coverUrl} alt="Картинка" style={{ width: '30px', height: 'auto' }} /></div>
                </div>

            </div>
        </div>
    );
};

export default Poster;