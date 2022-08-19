import React, { useState, useEffect, useContext } from "react";
import {ImLoop} from 'react-icons/im';
import styled from 'styled-components';
import axios from "axios";

export default function CommentIcon( { id } ){


    function CreatRepost (){
        const UserInfo = JSON.parse(localStorage.getItem('UserInfo'));
        const URL = `${process.env.REACT_APP_API_BASE_URL}/repost`;
        const config = 
        {
            headers:{
            'Authorization': `Bearer ${UserInfo.token}` 
            }
        }
        const body = {postId: id}
        const promise = axios.post(URL, body, config);
        promise.then((res)=> {
           alert(res.data);          
        })
        promise.catch((err) => console.log(err));
    }

    return (
        <Comment onClick={() => CreatRepost()}>
            <ImLoop size={25}/> 
            <span>re-post</span>
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