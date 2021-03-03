import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Right = ({content, historyBackward, historyForward}) =>{

    return(
    <div className='third'>
            <button onClick={historyBackward}>backward</button>
            <button linkto="glass" onClick={historyForward}>forward</button>
        {
        (content._type != 'tagItem')
          ?
          <div className="content">
            <div className="title">{content.title} - {'('+ content._type +')'}</div>
            <br/>
            Tags or references:
            <br/>
            <br/>
            {content.references.map(
              (post, index) =>
                (
                  <div key={index}>
                    <Link to={"/"+post.matched[0].slug.current}>
                      {post.matched[0].title}
                    </Link>
                  </div>
                )
              )
            }
          </div>
          : 
          <div className="content">
            <div className="title">{content.title} - {'('+ content._type +')'}</div>
            <br/>
            Items tagged with {content.title}:
            <br/>
            <br/>
            {content.tagged.map(
              (post, index) =>
                (
                  <div key={index}>
                    <Link to={"/"+post.slug.current}>
                      {post.title}
                    </Link>
                  </div>
                )
              )
            }
          </div>
      }
    </div>)
}

export default Right;