import React from "react";
import styled from 'styled-components';
import ReactHashtag from "@mdnm/react-hashtag";
import { useNavigate } from 'react-router-dom';
import Snippet from "./Snippet";

export default function PostCard (props) {
    const navigate = useNavigate();

    return (
        <Card>
            <img src={props.post.userPicture} />
            <CardContent>
                <h1> 
                    {props.post.username}
                </h1>                
                <p>
                    <ReactHashtag onHashtagClick={(elt)=>{navigate(`hashtag/:${elt.toLowerCase().slice(1)}`)}}>                  
                    {props.post.text}
                    </ReactHashtag>
                </p>
                <a href={props.post.link}>
                    <Snippet image={props.post.postImage} title={props.post.postTitle} description={props.post.postDescription} link={props.post.link}/>
                </a>
            </CardContent>
        </Card>    
            );

    }


const Card = styled.div `
    width: 611px;
    height: auto;
    padding: 21px;
    display: flex;
    gap: 18px;
    margin-bottom: 16px;
    background: #171717;
    border-radius: 16px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;

        h1 {
            font-size: 19px;
            line-height: 23px;
            color: #FFFFFF;
        }

        a {

        }

        img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 26.5px;
        }
        
        span {
            font-weight: 700;
            color: #FFFFFF;
            cursor: pointer;
        }

        @media (max-width: 430px) {
            width: 100%;
            border-radius: 0;
        }
    `

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`


