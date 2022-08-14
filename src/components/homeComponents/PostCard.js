import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ReactHashtag from "@mdnm/react-hashtag";
import { useNavigate } from 'react-router-dom';
import Snippet from "./Snippet";
import axios from "axios";

export default function PostCard (props) {
    const navigate = useNavigate();

    // const headers = {
    //     Authorization: `Bearer ${token}`,
    // }
    
    const [likes, setLikes] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likeloading, setLikeloading] = useState(false);

    useEffect(() => {
        getLikes();
    }, [])

    function getLikes(){
        const URL = "http://localhost:5000/like/"+props.post.id;
        const promise = axios.get(URL);
        promise.then((res)=> {
            setLikes(res.data);
        })
        promise.catch(() => {console.log('error on likes request')});
    }

    console.log(likes);

    function addLike(id){
        setLikeloading(true);
        const URL = "http://localhost:5000/like/"+ id;
        const promise = axios.post(URL);
        promise.then(() => {
            getLikes();
            setLiked(true);
            setLikeloading(false);
        });
    }

    function deleteLike(id){
        setLikeloading(true);
        const URL = "http://localhost:5000/like/"+ id;
        const promise = axios.delete(URL);
        promise.then(() => {
            getLikes();
            setLiked(false);
            setLikeloading(false);
        });
    }

    function deletePost(id){
        const body = {
            id: parseInt(id)
        }
        console.log(body)
        const promise = axios.delete('http://localhost:5000/posts', body, { });
		promise.then((res) => {
			console.log(res);
           // window.location.reload();            
		});
		promise.catch((err) => {
			alert(err.response.data);
		});
    }

    return (
        <Card>
            <PerfilAndLikes>
                <img src={props.post.userPicture} alt=""/>
                {(liked)? 
                    <ion-icon id={props.post.id} onClick={(e) => deleteLike(e.target.id)} name="heart"></ion-icon> 
                    : 
                    <ion-icon className = {(likeloading)? 'loading' : 'red'} id={props.post.id} onClick={(e) => addLike(e.target.id)} name="heart-outline"></ion-icon> }
                <span>
                    {(likes)? likes.likesTotal : '0'} likes
                </span>
            </PerfilAndLikes>
            <CardContent>
                <TopLine>
                    <h1> 
                    {props.post.username}
                    </h1>    
                    <ion-icon id={props.post.id} onClick={(e) => deletePost(e.target.id)} name="trash-outline"></ion-icon>    
                </TopLine>                       
                <p>
                    <ReactHashtag onHashtagClick={(elt)=>{navigate(`/hashtag/${elt.toLowerCase().slice(1)}`)}}>                  
                    {props.post.text}
                    </ReactHashtag>
                </p>
                <a href={props.post.link} target="_blank" rel="noreferrer">
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
const PerfilAndLikes = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 26.5px;
        margin-bottom: 19px;
    }

    ion-icon{
        font-size: 24px;
        cursor: pointer;
    }
    .red {
        color: #AC0000;
    }
    .loading {
        color: #fc8888;
    }
    span{    
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #FFFFFF;
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

