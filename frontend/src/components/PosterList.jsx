import React from 'react';
import Poster from "./Poster";

const PosterList = ({posts, title}) => {
    return (
        <div>
            <h1>{title}</h1>
            {posts.map((post) =>
                <Poster post={post} key={post.id}/>
            )}
        </div>
    );
};

export default PosterList;