import React, { useState, useEffect, useContext } from "react";
import {AiOutlineComment} from 'react-icons/ai';
import styled from 'styled-components';
import axios from "axios";

export default function CommentIcon( { id, showComments, setShowComments } ){

    const [count, setCount] = useState(null);
    const UserInfo = JSON.parse(localStorage.getItem('UserInfo'));
    const config = 
    {
        headers:{
        'Authorization': `Bearer ${UserInfo.token}` 
        }
    }

    useEffect(() => {
        const URL = `https://projeto17-linkr-g5.herokuapp.com/count/${id}`;
        const promise = axios.get(URL, config);
        promise.then((res)=> {
            setCount(res.data);           
        })
        promise.catch((err) => console.log(err));
    }, [])

    return (
        <Comment onClick={() => setShowComments(!showComments)}>
            <AiOutlineComment size={25}/> 
           <span>{count} comments</span>
        </Comment>
    )
}

const Comment = styled.div`
    margin-top: 15px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #FFFFFF;
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`