import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";

function returnType(t){
    switch (t){
        case 'tagItem':
            return '(tag)'
        break;
        case 'referenceItem':
            return '(reference)'
        break;
        case 'project':
            return '(project)'
        break;
        default:
            return '';
    }
}

const Right = ({position, content, dispatchAddToHistory,sanityClient}) =>{
const typeTag = returnType(content._type);
    return(
        
    <div className={`thirdWrapper ${content._type}`}>
        {
        (content._type != 'tagItem')
          ?
          <div className="thirdContent">
            <div className={`title`}>{content.title}<br/>{typeTag}</div>
            <div className="blockContent">
                        <BlockContent
                            blocks={content.text}
                            projectId={sanityClient.clientConfig.projectId}
                            dataset={sanityClient.clientConfig.dataset}
                        />
            </div>
            <div className="references">
                Related:
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
          </div>
          : 
          <div className="thirdContent">
            <div className="title">{content.title}<br/>{typeTag}</div>
            <div className="blockContent">
                        <BlockContent
                            blocks={content.text}
                            projectId={sanityClient.clientConfig.projectId}
                            dataset={sanityClient.clientConfig.dataset}
                        />
            </div>
            <div className="references">
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
          </div>
      }
    </div>)
}

export default Right;