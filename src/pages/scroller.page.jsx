import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

import Third from '../components/third/third.component';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const browseHistory = ['virus', '',''];
const historyReducer = (browseHistory, action) => {
    switch (action.type){
        case 'add':
            const addToBrowseHistory = [...browseHistory];
            switch (action.payload.position){
                case 'left':
                        addToBrowseHistory[addToBrowseHistory.length-1] = '';
                        addToBrowseHistory[addToBrowseHistory.length-2] = (action.payload.id);

                break;
                case 'middle':
                    addToBrowseHistory[addToBrowseHistory.length-1] = (action.payload.id);
                break;
                case 'right':
                    addToBrowseHistory.push(action.payload.id);
                    
                break;
            }
            return addToBrowseHistory;
        break;
        default:
            return;
    }
}

const OnePost = () => { 

const [historyState, dispatch] = useReducer(historyReducer, browseHistory);
const [postData, setPostData] = useState(null);
const [historyOffset, setHistoryOffset] = useState(1);
const {slug} = useParams();

function dispatchAddToHistory(historyItem) {
    dispatch({ type: historyItem.type, payload: {id:historyItem.payload.id,position:historyItem.payload.position} });
}

function returnHistoryState(pos){
    let returnedPos = '';
    if((historyState.length-pos) != null){
        returnedPos = historyState[(historyState.length-pos)*historyOffset]
    }
    return returnedPos;
}

function historyStateHasContent(i){
    let condition;
    if (!historyState[historyState.length-i]){
        condition = false
    } else{
        condition = true
    }
    return condition
}

useEffect(() => {
    let fetchRequest = `*[]{ 
        "right":${historyStateHasContent(1) ? ` *[slug.current == "${returnHistoryState(1)}"]{
                    title,
                    _type,
                    text,
                    "references": referenceTags[]{"matched": *[_type == "tagItem" && _id == ^._ref || _type == "referenceItem" && _id == ^._ref]},
                    "tagged": *[_type == "referenceItem" && references(^._id) || _type == "project" && references(^._id)]{ title,slug,_type },
                },
            `:`{},`}
            "middle":${historyStateHasContent(2) ? ` *[slug.current == "${returnHistoryState(2)}"]
                {
                    title,
                    _type,
                    text,
                    "references": referenceTags[]{"matched": *[_type == "tagItem" && _id == ^._ref || _type == "referenceItem" && _id == ^._ref]},
                    "tagged": *[_type == "referenceItem" && references(^._id) || _type == "project" && references(^._id)]{ title,slug,_type },
                },
            `:`{},`}
            "left": ${historyStateHasContent(3) ? ` *[slug.current == "${returnHistoryState(3)}"]
                {
                    title,
                    _type,
                    text,
                    "references": referenceTags[]{"matched": *[_type == "tagItem" && _id == ^._ref || _type == "referenceItem" && _id == ^._ref]},
                    "tagged": *[_type == "referenceItem" && references(^._id) || _type == "project" && references(^._id)]{ title,slug,_type },
                },
            `:`{}`}}`; 
    sanityClient
        .fetch(fetchRequest)
        .then((data) => setPostData(data[0]))
        .catch(console.error);
        console.log(postData);
}, [slug, historyState, historyOffset]);

if (!postData) return <div>Loading...</div>;
  return (
    <div className="home">
        {/* <div className="nav">
            <div className={historyState.length > 3 ? 'navActive' : 'navInactive'} onClick={() => setHistoryOffset(historyOffset + 1)}> &larr; Backward </div>
            <div className={historyOffset > 1 ? 'navActive' : 'navInactive'} onClick={() => setHistoryOffset(historyOffset - 1)}> Forward &rarr; </div>
        </div> */}
        <div className="content">
            {postData.left.length ?
                <Third position='left' content={postData.left[0]} dispatchAddToHistory={dispatchAddToHistory} sanityClient={sanityClient}/>
            :''}
            {postData.middle.length ?
                <Third position='middle' content={postData.middle[0]} dispatchAddToHistory={dispatchAddToHistory} sanityClient={sanityClient}/>
            :''}
            {postData.right.length ?
                <Third position='right' content={postData.right[0]} dispatchAddToHistory={dispatchAddToHistory} sanityClient={sanityClient}/>
            :''}
        </div>
    </div>
  );
}

export default OnePost;