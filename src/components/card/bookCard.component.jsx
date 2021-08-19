import React, { useEffect, useState } from "react";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";

import './card.style.css';

//TODO: multiple images might be slideshow in the future?
const BookCard = ({position, content, dispatchAddToHistory,sanityClient}) =>{

    const serializers = {
        marks: {
            internalLink: ({mark, children}) => {
            return <span className="internalLink" data-internallink={mark.reference._ref}>{children}</span>
            },
            link: ({mark, children}) => {
            // Read https://css-tricks.com/use-target_blank/
            const { blank, href } = mark
            return blank ?
                <a href={href} target="_blank" rel="noopener">{children}</a>
                : <a href={href}>{children}</a>
            }
        }
    }

    const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

    return(
    <div className={`cardContent`}>
        <div className={`title`}>{content.title}</div>
        {content.images ?
                <div class="cardImageWrapper">
                <img src={urlFor(content.images[0].image)} />
            </div>
        :''}
        <div className="blockContent">
                <BlockContent
                    blocks={content.text}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                    serializers={serializers} 
                />
        </div>
    </div>)
}

export default BookCard;