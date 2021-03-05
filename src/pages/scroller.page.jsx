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


const browseHistory = ['flowers', '',''];

    const historyReducer = (browseHistory, action) => {
        console.log(action.payload);
        switch (action.type){
            case 'add':
                const addToBrowseHistory = [...browseHistory];
                switch (action.payload.position){
                    case 'left':
                        //console.log(action.payload.position);
                         addToBrowseHistory.pop();
                         addToBrowseHistory.pop();
                    break;
                    case 'middle':
                        //console.log(action.payload.position);
                         addToBrowseHistory.pop();
                    break;
                    case 'right':
                        //console.log(action.payload.position);
                    break;
                }
                addToBrowseHistory.push(action.payload.id);
                console.log(addToBrowseHistory);
                return addToBrowseHistory;
            break;
            case 'forward':
                const forwardBrowseHistory = [...browseHistory];
                forwardBrowseHistory.push(action.payload);
                // newBrowseHistory.shift();
                console.log(forwardBrowseHistory);
                return forwardBrowseHistory;
            break;
            case 'backward':
                const backwardBrowseHistory = [...browseHistory];
                backwardBrowseHistory.pop();
                console.log(backwardBrowseHistory);
                return backwardBrowseHistory;
            break;
            default:
                return;
        }
    }

const OnePost = () => { 

const [historyState, dispatch] = useReducer(historyReducer, browseHistory);
const [postData, setPostData] = useState(null);
const {slug} = useParams();

function dispatchAddToHistory(historyItem) {
    console.log(historyItem);
    dispatch({ type: historyItem.type, payload: {id:historyItem.payload.id,position:historyItem.payload.position} });
}

function returnHistoryState(pos){
    console.log(pos);
    let returnedPos = '';
    if((historyState.length-pos) != null){
        returnedPos = historyState[(historyState.length-pos)]
    }
    return returnedPos;
}

function historyStateHasContent(i){
    console.log(historyState[historyState.length-i]);
    let condition;
    if (!historyState[historyState.length-i]){
        console.log('false');
        condition = false
    } else{
        console.log('true');
        condition = true
    }
    return condition
}
//TODO: finn ut hvorfor det ikke går når det mangler to elementer (bare ett)
// prøv å sette if else etter 'prev' 'prevprev', så objektet finnes men bare er uten innhold
useEffect(() => {
    let fetchRequest = 
        `*[]{
            
        "current":${historyStateHasContent(1) ? ` *[slug.current == "${returnHistoryState(1)}"]{
                    title,
                    _type,
                    "references": referenceTags[]{"matched": *[_type == "tagItem" && _id == ^._ref || _type == "referenceItem" && _id == ^._ref]},
                    "tagged": *[_type == "referenceItem" && references(^._id) || _type == "project" && references(^._id)]{ title,slug,_type },
                },
            `:`{},`}
            "prev":${historyStateHasContent(2) ? ` *[slug.current == "${returnHistoryState(2)}"]
                {
                    title,
                    _type,
                    "references": referenceTags[]{"matched": *[_type == "tagItem" && _id == ^._ref || _type == "referenceItem" && _id == ^._ref]},
                    "tagged": *[_type == "referenceItem" && references(^._id) || _type == "project" && references(^._id)]{ title,slug,_type },
                },
            `:`{},`}
            "prevprev": ${historyStateHasContent(3) ? ` *[slug.current == "${returnHistoryState(3)}"]
                {
                    title,
                    _type,
                    "references": referenceTags[]{"matched": *[_type == "tagItem" && _id == ^._ref || _type == "referenceItem" && _id == ^._ref]},
                    "tagged": *[_type == "referenceItem" && references(^._id) || _type == "project" && references(^._id)]{ title,slug,_type },
                },
            `:`{}`}}`; 
console.log(fetchRequest);
    sanityClient
    .fetch(fetchRequest)
    .then((data) => setPostData(data[0]))
    .catch(console.error);
}, [slug, historyState]);

console.log(postData);

if (!postData) return <div>Loading...</div>;

  return (
    <div className="home">
        <div className="nav">
            <div> &larr; Backward </div> <div onClick={() => dispatch({ type: 'forward', payload: 'glass' })}> Forward &rarr; </div>
        </div>
        <div className="content">
            {postData.prevprev[0].length ?
            <Third position='left' content={postData.prevprev[0]} dispatchAddToHistory={dispatchAddToHistory}/>
            :''}
            {postData.prev[0].length ?
            <Third position='middle' content={postData.prev[0]} dispatchAddToHistory={dispatchAddToHistory}/>
            :''}
            {postData.current.length ?
            <Third position='right' content={postData.current[0]} dispatchAddToHistory={dispatchAddToHistory}/>
            :''}
        </div>
    </div>
  );
}

export default OnePost;