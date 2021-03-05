import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Right = ({position, content, dispatchAddToHistory}) =>{
    console.log(position);
    console.log(content);
    // if (!content) return null;
    return(
        
    <div className={`thirdWrapper ${content._type}`}>
        {
        (content._type != 'tagItem')
          ?
          <div className="thirdContent">
            <div className={`title`}>{content.title}</div>
            <br/>
            Tags or references:
            <br/>
            <br/>
            {content.references.map(
              (post, index) =>
                (
                  <div key={index}>
                      <div onClick={() => dispatchAddToHistory({ type: 'add', payload: {position:position,id:post.matched[0].slug.current} })} linkelementtarget={post.matched[0].slug.current} className={`linkElement ${post.matched[0]._type}`}>{post.matched[0].title}</div>
                  </div>
                )
              )
            }
          </div>
          : 
          <div className="thirdContent">
            <div className="title">{content.title} - {'('+ content._type +')'}</div>
            <br/>
            Items tagged with {content.title}:
            <br/>
            <br/>
            {content.tagged.map(
              (post, index) =>
                (
                  <div key={index}>
                      <div onClick={() => dispatchAddToHistory({ type: 'add', payload: {position:position,id:post.slug.current} })} linkelementtarget={post.slug.current} className={`linkElement ${post._type}`}>{post.title}</div>
                  </div>
                )
              )
            }
          </div>
      }
    </div>)
}

export default Right;