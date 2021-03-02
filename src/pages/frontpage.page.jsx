import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {

const [postData, setPostData] = useState(null);
const {slug} = useParams();

useEffect(() => {
    sanityClient
    .fetch(
        `*[slug.current == "${slug}"]{
          title,
          _type,
          "references": referenceTags[]{"matched": *[_id == ^._ref]},
          "tagged": *[references(^._id)]{ title,slug },
        }`
    )
    .then((data) => setPostData(data[0]))
    .catch(console.error);
}, [slug]);
console.log(postData);
  if (!postData) return <div>Loading...</div>;

  return (
    <div className="home">
        {
        (postData._type != 'tagItem')
          ?
          <div>
            <h1>{postData.title} - {'('+ postData._type +')'}</h1>
            <br/>
            Tags or references:
            <br/>
            {postData.references.map(
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
          <div>
            <h2>{postData.title} - {'('+ postData._type +')'}</h2>
            <br/>
            Items tagged with {postData.title}:
            <br/>
            {postData.tagged.map(
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
  );
}