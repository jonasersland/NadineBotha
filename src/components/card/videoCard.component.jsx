import React, { useEffect, useState } from "react";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import SanityMuxPlayer from 'sanity-mux-player'

import './card.style.css';



//TODO: multiple images might be slideshow in the future?
const VideoCard = ({position, content, refreshCard, dispatchAddToHistory,sanityClient}) =>{

    const handleClickedInternalLink = (id) =>{
       dispatchAddToHistory({ type: 'add', payload: {position:position,id:id}})
    }

    const serializers = {
        marks: {
            internalLink: ({mark, children}) => {
            return <span className="internalLink" onClick={() => { handleClickedInternalLink(mark.reference._ref)}}>{children}</span>
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

    // console.log(content);

    return(
    <div className={`cardContent ${content.referenceType}`}>
        <div className='cardNav'>
            <div className='titleWrapper'>
                {content.title}
            </div>
            <div className='navigationWrapper'>
                <div className='refreshButton' onClick={() => { refreshCard(position, content.id) } }>
                    Refresh
                </div>
            </div>
        </div>
        {content.videos[0].muxAssetDoc ?
            <div className="videoWrapper">
                <SanityMuxPlayer
                    assetDocument={content.videos[0].muxAssetDoc[0]}
                    autoload={true}
                    autoplay={false}
                    showControls={true}
                    muted={false}
                    loop={false}
                />
            </div>
        :''}
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

export default VideoCard;