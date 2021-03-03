import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Right = ({postDataLeft}) =>(
    <div className='half right'>
        {
        (postDataLeft[0]._type != 'tagItem')
          ?
          <div className="content">
            <div className="title">{postDataLeft.title} - {'('+ postDataLeft._type +')'}</div>
            <br/>
            Tags or references:
            <br/>
            <br/>
            {postDataLeft.references.map(
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
            <div className="title">{postDataLeft[0].title} - {'('+ postDataLeft[0]._type +')'}</div>
            <br/>
            Items tagged with {postDataLeft[0].title}:
            <br/>
            <br/>
            {postDataLeft[0].tagged.map(
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
    </div>
)

export default Right;