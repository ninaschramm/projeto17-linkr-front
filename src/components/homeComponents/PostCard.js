import React, { useState, useContext} from "react";
import styled from 'styled-components';
import ReactHashtag from "@mdnm/react-hashtag";
import { useNavigate } from 'react-router-dom';
import Snippet from "./Snippet";
import axios from "axios";
import UserContext from '../../contexts/UserContext';


export default function PostCard ( {post} ) {
    const navigate = useNavigate();
    const { deleteId, setDeleteId, setIsModalVisible } = useContext(UserContext);   

    function openModal(id) {
        setIsModalVisible(true)
        setDeleteId(id)
        window.scrollTo(0, 0)
    }    

    return (
        <Card>
            <img src={post.userPicture} alt=""/>
            <CardContent>
                <TopLine>
                    <h1> 
                    {post.username}
                    </h1>    
                    <ion-icon id={post.id} onClick={(e) => openModal(e.target.id)} name="trash-outline"></ion-icon>    
                </TopLine>                       
                <p>
                    <ReactHashtag onHashtagClick={(elt)=>{navigate(`/hashtag/${elt.toLowerCase().slice(1)}`)}}>                  
                    {post.text}
                    </ReactHashtag>
                </p>
                <a href={post.link} target="_blank" rel="noreferrer">
                    <Snippet image={post.postImage} title={post.postTitle} description={post.postDescription} link={post.link}/>
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

const TopLine = styled.div`
    display: flex;
    justify-content: space-between;

    ion-icon {
        cursor: pointer;
    }
    `

