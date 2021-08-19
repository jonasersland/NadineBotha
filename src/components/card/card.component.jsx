import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";

import ImageCard from "./imageCard.component";
import VideoCard from "./videoCard.component";
import TextCard from "./textCard.component";
import QuoteCard from "./quoteCard.component";
import BookCard from "./bookCard.component";
import ProjectCard from "./projectCard.component";

import './card.style.css';

//TODO: create templates for each card based on content type

const Card = ({position, content, refreshCard, dispatchAddToHistory,sanityClient}) =>{

    let cardComponent = null;
    if(content._type === 'project'){
        cardComponent = <ProjectCard position={position} content={content} dispatchAddToHistory={dispatchAddToHistory} refreshCard={refreshCard} sanityClient={sanityClient} />;
    }
    else{
        switch(content.referenceType) {
        case 'referenceTypeImage':
            cardComponent = <ImageCard position={position} content={content} dispatchAddToHistory={dispatchAddToHistory} refreshCard={refreshCard} sanityClient={sanityClient} />;
            break;
        case 'referenceTypeVideo':
            cardComponent = <VideoCard position={position} content={content} dispatchAddToHistory={dispatchAddToHistory} refreshCard={refreshCard} sanityClient={sanityClient} />;
            break;
        case 'referenceTypeText':
            cardComponent = <TextCard position={position} content={content} dispatchAddToHistory={dispatchAddToHistory} refreshCard={refreshCard} sanityClient={sanityClient} />;
            break;
        case 'referenceTypeQuote':
            cardComponent = <QuoteCard position={position} content={content} dispatchAddToHistory={dispatchAddToHistory} refreshCard={refreshCard} sanityClient={sanityClient} />;
            break;
        case 'referenceTypeBook':
            cardComponent = <BookCard position={position} content={content} dispatchAddToHistory={dispatchAddToHistory} refreshCard={refreshCard} sanityClient={sanityClient} />;
            break;
        default:
            cardComponent = null;
        }
    }

    return(
        <div className={`cardWrapper`}>
            {cardComponent}
          </div>
        
      
 )
}

export default Card;