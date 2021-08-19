import React, { useEffect, useState } from "react";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";

import './card.style.css';

//TODO: multiple images might be slideshow in the future?
const ImageCard = ({position, content, dispatchAddToHistory,sanityClient}) =>{

    const builder = imageUrlBuilder(sanityClient);
    function urlFor(source) {
    return builder.image(source);
    }

    return(
    <div className={`cardContent`}>
        <div className={`title`}>{content.title}</div>
        <div class="cardImageWrapper">
            <img src={urlFor(content.images[0].image)} />
        </div>
        {content.images[0].caption ?
            <div className="blockContent">
                    <BlockContent
                        blocks={content.images[0].caption}
                        projectId={sanityClient.clientConfig.projectId}
                        dataset={sanityClient.clientConfig.dataset}
                    />
            </div>
        : ''}
    </div>)
}

export default ImageCard;