import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Right = ({postDataRight}) =>(
    <div className='half right'>
        {
        (postDataRight._type != 'tagItem')
          ?
          <div className="content">
            <div className="title">{postDataRight.title} - {'('+ postDataRight._type +')'}</div>
            <br/>
            Tags or references:
            <br/>
            <br/>
            {postDataRight.references.map(
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
            <div className="title">{postDataRight.title} - {'('+ postDataRight._type +')'}</div>
            <br/>
            Items tagged with {postDataRight.title}:
            <br/>
            <br/>
            {postDataRight.tagged.map(
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