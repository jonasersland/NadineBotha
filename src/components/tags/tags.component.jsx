import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './tags.style.css';

const Tags = ({currentTags, setClickedTag, getRandomCard}) =>{

    if (!currentTags || currentTags.length == 0) return <div>Loading...</div>;
    return(
        <div className="tagsContainer"> 
            <div className="tagsListWrapper">
                <div className="tagsListTitle">Draw new card related to...</div>
                <ul className="tagsList">
                    {currentTags.map(tag => (
                        <li 
                            key={tag.id} 
                            onClick={() => { setClickedTag(tag.id)}}    
                        >
                            {tag.title}
                        </li>
                    ))} 
                </ul>
                <div className='randomTagWrapper'>
                    <div className='randomTagButton' onClick={() => {getRandomCard()}}    >
                        Random
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tags;