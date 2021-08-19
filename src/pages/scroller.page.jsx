import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";

import Card from '../components/card/card.component';
import Tags from "../components/tags/tags.component.jsx";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const browseHistory = ['a1b61c75-ff5f-4230-93d8-6a2fd6936e12', '',''];

const historyReducer = (browseHistory, action) => {
    console.log(action.payload.id);
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
                case 'initialPos':
                    addToBrowseHistory[addToBrowseHistory.length-3] = (action.payload.id);
                break;
            }
            return addToBrowseHistory;
        break;
        default:
            return;
    }
}

const Frontpage = () => { 

const [historyState, dispatch] = useReducer(historyReducer, browseHistory);
const [historyOffset, setHistoryOffset] = useState(1);

const [postData, setPostData] = useState(null);
const [totalPostIds, setTotalPostIds] = useState(null); 

const [currentTags, setCurrentTags] = useState([]);
const [clickedTag, setClickedTag] = useState(null);

const {slug} = useParams();

function dispatchAddToHistory(historyItem) {
    dispatch({ type: historyItem.type, payload: {id:historyItem.payload.id,position:historyItem.payload.position} });
}

const returnLatestPosition = () =>{
    console.log(historyState);
    if (historyState[1] == ""){
        return 'left'
    }
    if (historyState[2] == ""){
        return 'middle'
    }
    else{
        return 'right'
    }
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


function returnRandomId(current){

    const filteredIdsArray = totalPostIds.filter(id => {
        for (let i=0; current.length > i; i++){
            if (id != current[i]){return id}
        }
    })
    return filteredIdsArray[Math.floor(Math.random()*filteredIdsArray.length)]
}

const getRandomCard = () => {
    //get ID of cards visible
    let current = [];

    current.push(postData.left[0]._id)
    if(postData.middle[0] != undefined) {current.push(postData.middle[0]._id)}
    if(postData.right[0] != undefined) {current.push(postData.right[0]._id)}
    
    const newId = returnRandomId(current);
    const latestPosition = returnLatestPosition();

    const historyItem = {type:'add', payload:{position:latestPosition, id:newId}}
    console.log(historyItem);
    dispatchAddToHistory(historyItem);

    //dispatchAddToHistory({ type: 'add', payload: {position:returnLatestPosition(),id:newId}})
}

const refreshCard = (position, id)=>{

    const returnNewPosition = ()=>{ // provide the position before the current position to make the historyreducer understand where we want it to be
        switch (position){
            case 'left':
                return 'initialPos'
            break;
            case 'middle':
                return 'left'
            break;
            case 'right':
                return 'middle'
            break;
        }
    }

    const newId = returnRandomId([id])
    const newPosition = returnNewPosition()
    dispatchAddToHistory({ type: 'add', payload: {position:newPosition,id:newId}})
}

const extractMatchedTags = (tagsArray) =>{
    let returnedTags = tagsArray.map(tag => {
        if (!tag.id[0]){
            return 
        }
        if (tag.count > 2) {
            if (tag.id[0]._id == clickedTag){
                return 
            }else{
                return {id: tag.id[0]._id, title: tag.id[0].title} 
            }
        }
    })
    let filteredReturnedTags = returnedTags.filter(tag =>{
        return tag != undefined;
    })
    
    return filteredReturnedTags;
}

const returnTagSelection = () =>{
    if(!postData) {
        return
    }
    else {
        const latestPos = returnLatestPosition();
        console.log(latestPos);
        let leftTags = extractMatchedTags(postData.left[0].tags);  
        let middleTags = [];
        let rightTags = [];

        if(latestPos == 'middle'){
            middleTags = extractMatchedTags(postData.middle[0].tags);
        }
        if(latestPos == 'right'){
            middleTags = extractMatchedTags(postData.middle[0].tags);
            rightTags = extractMatchedTags(postData.right[0].tags);
        }
        
        let uniqueTags = [...leftTags, ...middleTags, ...rightTags].reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);

        function getRandom(arr, n) {
            console.log('total', arr);
            var result = new Array(n),
                len = arr.length,
                taken = new Array(len);
            if (n > len)
                throw new RangeError("getRandom: more elements taken than available");
            while (n--) {
                var x = Math.floor(Math.random() * len);
                result[n] = arr[x in taken ? taken[x] : x];
                taken[x] = --len in taken ? taken[len] : len;
            }
            return result;
        }

        const returnAllowedTagAmount = () =>{
            if (uniqueTags.length < 5){return uniqueTags.length}
            else {return 5}
        }

        let randomTags = getRandom(uniqueTags, returnAllowedTagAmount());
        return randomTags;
    }
}

useEffect(() =>{
    let fetchRequest = `*[_type == 'referenceItem' || _type == 'project']{_id}`;

    return (sanityClient
    .fetch(fetchRequest)
    .then(data => {
        let postIdArray = data.map(post =>{
            return post._id
        })
        console.log(postIdArray);
        setTotalPostIds(postIdArray);
    }).catch(console.error))

},[]);

useEffect(() => {
    console.log(postData);
    const latestPos = returnLatestPosition();
    const filterPosts = (data) =>{
            if (latestPos == 'left' ){
                return data._id !== postData.left[0]._id
            }
            if (latestPos == 'middle'){
                return data._id !== postData.left[0]._id && data._id !== postData.middle[0]._id
            }
            if (latestPos == 'right'){
                return data._id !== postData.left[0]._id && data._id !== postData.middle[0]._id && data._id !== postData.right[0]._id
            }
    }

    if (clickedTag == null){
        return
    } else{

    let fetchRequest = `*[referenceTags[]._ref == "${clickedTag}"]{_id}`;

    sanityClient
    .fetch(fetchRequest)
    .then((data) => data.filter(filterPosts))
    .then((data) => data[Math.floor(Math.random()*data.length)])
    .then((data) => dispatchAddToHistory({ type: 'add', payload: {position:returnLatestPosition(),id:data._id} }))
    .catch(console.error); 
    }

}, [clickedTag]);

useEffect(() => {
    console.log(postData);
    if (!postData){return}
    else{setCurrentTags(returnTagSelection);}
}, [postData]);

// TODO: tidy up youtube/vimeo request better
useEffect(() => { //TODO: maybe dont have to call all three each time?
    let fetchRequest = `*[]{ 
        "right":${historyStateHasContent(1) ? ` *[_id == "${returnHistoryState(1)}"]{
            _id,
            title,
            _type,
            text,
            images,
            videos[]{
                'muxAssetDoc': *[_id == ^.video.asset._ref]{...},
                'youtube': {...},
                'vimeo': {...}
            },
            referenceType,
            "tags": referenceTags[]{"id": *[_type == "tagItem" && _id == ^._ref]{_id, title}, "count": count(*[_type == "referenceItem" && references(^._ref) || _type == "project" && references(^._ref)])}
            },
            `:`{},`}
            "middle":${historyStateHasContent(2) ? ` *[_id == "${returnHistoryState(2)}"]{
                _id,
                title,
                _type,
                text,
                images,
                videos[]{
                    'muxAssetDoc': *[_id == ^.video.asset._ref]{...},
                    'youtube': {...},
                    'vimeo': {...}
                },
                referenceType,
                "tags": referenceTags[]{"id": *[_type == "tagItem" && _id == ^._ref]{_id, title}, "count": count(*[_type == "referenceItem" && references(^._ref) || _type == "project" && references(^._ref)])}
            },
            `:`{},`}
            "left": ${historyStateHasContent(3) ? ` *[_id == "${returnHistoryState(3)}"]{
                _id,
                title,
                _type,
                text,
                images,
                videos[]{
                    'muxAssetDoc': *[_id == ^.video.asset._ref]{...},
                    'youtube': {...},
                    'vimeo': {...}
                },
                referenceType,
                "tags": referenceTags[]{"id": *[_type == "tagItem" && _id == ^._ref]{_id, title}, "count": count(*[_type == "referenceItem" && references(^._ref) || _type == "project" && references(^._ref)])}
                },
            `:`{}`}}`;
            // Sending fetch request
    sanityClient
        .fetch(fetchRequest)
        .then((data) => setPostData(data[0]))
        .catch(console.error);
}, [slug, historyState, historyOffset]);

if (!postData) return <div>Loading...</div>;

  return (
    <div className="home">
        <div className="content">
            {postData.left.length ?
                <Card position='left' content={postData.left[0]} dispatchAddToHistory={dispatchAddToHistory} refreshCard={refreshCard} sanityClient={sanityClient}/>
            :''}
            {postData.middle.length ?
                <Card position='middle' content={postData.middle[0]} dispatchAddToHistory={dispatchAddToHistory} refreshCard={refreshCard} sanityClient={sanityClient}/>
            :''}
            {postData.right.length ?
                <Card position='right' content={postData.right[0]} dispatchAddToHistory={dispatchAddToHistory} refreshCard={refreshCard} sanityClient={sanityClient}/>
            :''}
            <Tags currentTags={currentTags} setClickedTag={setClickedTag} getRandomCard={getRandomCard}/>
        </div>
    </div>
  );
}

export default Frontpage;