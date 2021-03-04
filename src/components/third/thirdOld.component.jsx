import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LinkElement from '../linkElement/linkElement.component';

const Right = ({position, content, addHistoryElement}) =>{
console.log(position);
    return(
    <div className={`thirdWrapper ${content._type}`}>
            {/* <button onClick={historyForward}>forward</button> */}
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
                      <div linkelementtarget={post.matched[0].slug.current} onClick={function(e){addHistoryElement(e)}} className={`linkElement ${post.matched[0]._type}`}>{post.matched[0].title}</div>
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
                      <div linkelementtarget={post.slug.current} onClick={function(e, position){addHistoryElement(e, position)}} className={`linkElement ${post._type}`}>{post.title}</div>
                  </div>
                )
              )
            }
          </div>
      }
    </div>)
}

export default Right;