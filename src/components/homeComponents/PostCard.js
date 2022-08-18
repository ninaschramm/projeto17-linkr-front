import React, { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import ReactHashtag from "@mdnm/react-hashtag";
import { useNavigate } from 'react-router-dom';
import Snippet from "./Snippet";
import axios from "axios";
import UserContext from '../../contexts/UserContext';
import ReactTooltip from "react-tooltip";




export default function PostCard ( {post} ) {
    const navigate = useNavigate();
    const { deleteId, setDeleteId, setIsModalVisible } = useContext(UserContext);   
    const UserInfo = JSON.parse(localStorage.getItem('UserInfo'));   
    const userId = UserInfo.userId;
    const config = 
        {
            headers:{
            'Authorization': `Bearer ${UserInfo.token}` 
            }
        }
    
    const [likes, setLikes] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likeloading, setLikeloading] = useState(false);

    useEffect(() => {
        getLikes();
    }, [])

    function getLikes(){
        const URL = `${process.env.REACT_APP_API_BASE_URL}`+post.id;
        const promise = axios.get(URL);
        promise.then((res)=> {
            setLikes(res.data);
        })
        promise.catch(() => {console.log('error on likes request')});
    }

    function addLike(id){
        setLikeloading(true);
        const URL = `${process.env.REACT_APP_API_BASE_URL}`+id;
        const promise = axios.post(URL, config);
        console.log(URL);
        promise.then(() => {
            getLikes();
            setLiked(true);
            setLikeloading(false);
        });
        promise.catch((err) => {
			alert(err.response.data);
            setLikeloading(false);
		});
    }

    function deleteLike(id){
        setLikeloading(true);
        const URL = `${process.env.REACT_APP_API_BASE_URL}`+id;
        const promise = axios.delete(URL, config);
        promise.then(() => {
            getLikes();
            setLiked(false);
            setLikeloading(false);
        });
        promise.catch((err) => {
			alert(err.response.data);
            setLikeloading(false);
		});
    }


    function openModal(id) {
        setIsModalVisible(true)
        setDeleteId(id)
        window.scrollTo(0, 0)
    }    

    return (
        <Card>            
            <PerfilAndLikes>     
                <img src={post.userPicture} id={post.userId} onClick={(e) => {navigate(`/user/${e.target.id}`)}} alt=""/>         
                {(liked)? 
                    <button  className={(likeloading)? 'loading': 'red'} disabled={likeloading}>
                        <ion-icon name="heart" id={post.id} onClick={(e) => {if(!likeloading){deleteLike(e.target.id)}}}></ion-icon> 
                    </button>  
                    : 
                    <button className={(likeloading)? 'loading' : ''} disabled={likeloading}>
                        <ion-icon name="heart-outline"  id={post.id} onClick={(e) => {if(!likeloading){addLike(e.target.id)}}} ></ion-icon> 
                    </button>  
                    }

                <span>
                    <a  data-for='qualquer' data-tip={
                        (likes)? 
                            (likes.usernames.length > 0)? 
                                (likes.usernames.length > 1)? 
                                    (likes.usernames.length > 2)?   
                                        `${(liked)? 'você, ' : ''}${likes.usernames[0]}, ${likes.usernames[1]} e outras ${likes.likesTotal - 2} pessoas`
                                    :`${(liked)? 'você, ': ''}${likes.usernames[0]} e ${likes.usernames[1]}`
                                : `${(liked)? 'você e ': ''} ${likes.usernames[0]}` 
                            : [''] 
                        : ['']   
                    }>
                        {(likes)? likes.likesTotal : '0'} likes
                    </a>
                    <ReactTooltip id='qualquer' type="light" place="bottom" effect="solid" 
                        getContent={(dataTip) => `${dataTip}`}
                    />
                </span>
            </PerfilAndLikes>
            <CardContent>
                <TopLine>
                    <h1 id={post.userId} onClick={(e) => {navigate(`/user/${e.target.id}`)}} > 
                    {post.username}
                    </h1>    
                    { userId === post.userId ? <ion-icon id={post.id} onClick={(e) => openModal(e.target.id)} name="trash-outline"></ion-icon> : null } 
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
    overflow: hidden;

        h1 {
            font-size: 19px;
            line-height: 23px;
            color: #FFFFFF;
            cursor: pointer;
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
        cursor: pointer;
    }

    button{
        background: none;
        border: none;
        color: #FFFFFF;
    }

    ion-icon{
        font-size: 24px;
        cursor: pointer;
    }
    .red{
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
    overflow: hidden;
`

const TopLine = styled.div`
    display: flex;
    justify-content: space-between;

    ion-icon {
        cursor: pointer;
    }
    `

