import React from 'react';

const Poster = (props) => {

    return (
        <div className="post">
            <div className="post_content">
                <strong>{props.post.name}</strong>
                <div>
                    {props.post.type}
                </div>

            </div>
        </div>
    );
};

export default Poster;