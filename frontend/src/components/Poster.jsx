import React from 'react';

const Poster = (props) => {

    return (
        <div className="post">
            <div className="post_content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>

            </div>
        </div>
    );
};

export default Poster;