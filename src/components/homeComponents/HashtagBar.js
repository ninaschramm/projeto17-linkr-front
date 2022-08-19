import React from "react";
import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from  'react-loader-spinner';

export default function HashtagBar() {

    const navigate = useNavigate();
    const UserInfo = JSON. parse(localStorage.getItem('UserInfo'));
    const [hashtags, setHashtags] = useState(null);

    useEffect(() => {
        const URL = `https://projeto17-linkr-g5.herokuapp.com/hashtags`;
        const promise = axios.get(URL);

        promise.then((res)=> {
            setHashtags(res.data);
        });
    }, [])

    function showHashtags() {
        if (hashtags === null) {
            return <ThreeDots width={51} height={13} color="#D1D1D4" />
        } 
        else if (hashtags === "") {
            return <></>
        }
        else {
            return (hashtags.map((hashtag, index) => <p onClick={()=>{navigate(`/hashtag/${hashtag.hashtag.toLowerCase()}`)}}> {`#${hashtag.hashtag}`} </p>))
        }
    }

    // const mockHashtags = [
    //     {
    //         hashtag: "react",
    //         hashtagCount: 2,
    //     },
    //     {
    //         hashtag: "javascript",
    //         hashtagCount: 1,
    //     },
    //     {
    //         hashtag: "medium",
    //         hashtagCount: 1,
    //     },        {
    //         hashtag: "sql",
    //         hashtagCount: 1,
    //     },        {
    //         hashtag: "lorem",
    //         hashtagCount: 1,
    //     },        {
    //         hashtag: "ipsum",
    //         hashtagCount: 1,
    //     },
    // ]

    // function showMockHashtags() {
    //     return (mockHashtags.map((hashtag, index) => <p onClick={()=>{navigate(`hashtag/:${hashtag.hashtag.toLowerCase()}`)}}> {`# ${hashtag.hashtag}`} </p>))
    // }

    // const callMockHashtags = showMockHashtags()

    const callShowHashtags = showHashtags()

    return (
        <Hashtags>
            <h1> trending </h1>
            <Rectangle></Rectangle>
            <HashtagsList>
                {callShowHashtags}
            </HashtagsList>
        </Hashtags>
    )
}

const Hashtags = styled.div`
    margin-left: 25px;
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 28px;
    letter-spacing: 0.05em;
    color: #FFFFFF;

    h1 {
        font-size: 27px;
        line-height: 40px;
        margin: 9px 16px;
    }

    p {
        cursor: pointer;
    }

    @media (max-width: 988px) {
        display: none;
    }
`

const Rectangle = styled.div `
    width: 100%;
    height: 0px;
    border: 1px solid #484848;
    margin-bottom: 20px;
`
const HashtagsList = styled.div `
    width: 100%;
    max-height: 300px;
    margin: 0 16px;
`

