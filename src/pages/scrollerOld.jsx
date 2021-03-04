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

const OnePost = () => { 

const [browseHistory, setBrowseHistory] = useState(['flowers', '1980', 'ocean']);
const [postData, setPostData] = useState(null);
const {slug} = useParams();

// const historyReducer = (browseHistory, action) => {
//     if(action.type == 'forward') {
//         const newBrowseHistory = [...browseHistory];
//         newBrowseHistory.push(action.payload);
//         newBrowseHistory.shift();
//         console.log(browseHistory);
//         return newBrowseHistory;
//     }
//     if(action.type == 'backward') {
//         const newBrowseHistory = [...browseHistory];
//         newBrowseHistory.pop();
//         console.log(newBrowseHistory);
//         return newBrowseHistory;
//     }
// }
    
// const [state, dispatch] = useReducer(historyReducer, browseHistory);

// function historyForward(historyItem) {
//     dispatch({ type: 'forward', payload: historyItem });
//   }

useEffect(() => {
    sanityClient
    .fetch(
        `*[slug.current == "${browseHistory[browseHistory.length-1]}"]{
            "current":{
                title,
                _type,
                "references": referenceTags[]{"matched": *[_type == "tagItem" && _id == ^._ref || _type == "referenceItem" && _id == ^._ref]},
                "tagged": *[_type == "referenceItem" && references(^._id) || _type == "project" && references(^._id)]{ title,slug,_type },
            },
            "prev": *[slug.current == "${browseHistory[browseHistory.length-2]}"]{
            title,
            _type,
            "references": referenceTags[]{"matched": *[_type == "tagItem" && _id == ^._ref || _type == "referenceItem" && _id == ^._ref]},
            "tagged": *[_type == "referenceItem" && references(^._id) || _type == "project" && references(^._id)]{ title,slug,_type },
            },
          "prevprev": *[slug.current == "${browseHistory[browseHistory.length-3]}"]{
            title,
            _type,
            "references": referenceTags[]{"matched": *[_type == "tagItem" && _id == ^._ref || _type == "referenceItem" && _id == ^._ref]},
            "tagged": *[_type == "referenceItem" && references(^._id) || _type == "project" && references(^._id)]{ title,slug,_type },
          },
        }`
    )
    .then((data) => setPostData(data[0]))
    .catch(console.error);
}, [browseHistory]);

// only navbar navigation

function historyBackward() {
    const newBrowseHistory = [...browseHistory];
    newBrowseHistory.pop();
    setBrowseHistory(newBrowseHistory)
}

function historyForward(e) {
    const newBrowseHistory = [...browseHistory];
    newBrowseHistory.push(e.target.attributes[0].nodeValue);
    setBrowseHistory(newBrowseHistory)
}

// add to history

function addHistoryElement(e, position) {
    const newBrowseHistory = [...browseHistory];
    console.log(e, position);
    //newBrowseHistory.push(e.target.attributes[0].nodeValue);

    //setBrowseHistory(newBrowseHistory)
}

console.log(postData);

if (!postData) return <div>Loading...</div>;

var right = postData.current;
var middle = postData.prev[0];
var left = postData.prevprev[0];

  return (
    <div className="home">
        <div className="nav">
            <div onClick={() => historyBackward}>&larr; Backward </div> <div onClick={() => historyBackward}> Forward &rarr; </div>
        </div>
        <div className="content">
            <Third position='left' content={left} addHistoryElement={addHistoryElement}/>
            <Third position='middle' content={middle} addHistoryElement={addHistoryElement}/>
            <Third position='right' content={right} addHistoryElement={addHistoryElement}/>
        </div>
    </div>
  );
}

export default OnePost;