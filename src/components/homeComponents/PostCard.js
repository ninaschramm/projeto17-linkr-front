import React, { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import ReactHashtag from "@mdnm/react-hashtag";
import { useNavigate } from 'react-router-dom';
import Snippet from "./Snippet";
import axios from "axios";
import UserContext from '../../contexts/UserContext';
import ReactTooltip from "react-tooltip";
import CommentIcon from "./CommentIcon";
import RepostIcon from "./RepostIcon";
import {ImLoop} from 'react-icons/im';
import CommentSection from "./CommentSection";




export default function PostCard ( {post} ) {
    const navigate = useNavigate();
    const { setDeleteId, setIsModalVisible } = useContext(UserContext);   
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
    const [editing, setEditing] = useState(false);
    const [postEdit, setPostEdit] = useState(post.text);
    const [disable, setDisable] = useState(false);    
	const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        getLikes();
    }, [])


    function getLikes(){
        const config = 
        {
            headers:{
            'Authorization': `Bearer ${UserInfo.token}` 
            }
        }
        const URL = `https://projeto17-linkr-g5.herokuapp.com/like/`+post.id;
        const promise = axios.get(URL, config);

        promise.then((res)=> {
            setLikes(res.data);
            setLiked(res.data.liked);
        })
        promise.catch(() => {console.log('error on likes request')});
    }

    function addLike(id){
        const config = 
        {
            headers:{
            'Authorization': `Bearer ${UserInfo.token}` 
            }
        }
        setLikeloading(true);
        const URL = `https://projeto17-linkr-g5.herokuapp.com/like/`+ id;
        const bodyfake = {};
        const promise = axios.post(URL, bodyfake, config);
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
        const config = 
        {
            headers:{
            'Authorization': `Bearer ${UserInfo.token}` 
            }
        }
        setLikeloading(true);
        const URL = `https://projeto17-linkr-g5.herokuapp.com/like/`+ id;
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

    function editPost(e){
        e.preventDefault();
        setDisable(true);

        const promise = axios.put(`https://projeto17-linkr-g5.herokuapp.com/edit-post`, {
            postId: post.id,
            text: postEdit,
        });

        promise.then(() => {
            setDisable(false);
            setEditing(!editing);
            return navigate("/timeline");
        });

        promise.catch((e) => {
            console.log(e.response.data);
            setDisable(false);
            alert(e.response.data + ', n??o foi poss??vel editar sua postagem');
        })
    }

    function openCommentSection(){
       setShowComments(true)
       console.log(showComments)
    }

    return (
        <Container>
            <Repost reposter= {post.reposter} >
                {post.reposter ? 
                <>
                <ImLoop size={15} color={'#fff'}/> 
                <h1>Re-posted by {  userId===post.reposter ?  "you" : post.reposterName}</h1>
                </>
                : <></>}  
                
            </Repost>
            
        <>
        <Card reposter={post.reposter}>           
                <div>
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
                        <a  data-for='likes' data-tip={
                            (likes)? 
                                (likes.likesTotal > 0)? 
                                    (likes.likesTotal > 1)? 
                                        (likes.likesTotal > 2)?  
                                            (likes.likesTotal > 3)? 
                                                `${(liked)? `voc??, ${likes.usernames[0]} e outras ${likes.likesTotal - 2} pessoas` : `${likes.usernames[0]}, ${likes.usernames[1]} e outras ${likes.likesTotal - 2} pessoas`}`
                                            :`${(liked)? `voc??, ${likes.usernames[0]} e ${likes.usernames[1]}` : `${likes.usernames[0]}, ${likes.usernames[1]} e outra 1 pessoa`}`
                                        :`${(liked)? `voc?? e ${likes.usernames[0]}`: `${likes.usernames[0]} e ${likes.usernames[1]}`}`
                                    : `${(liked)? 'voc??': `${likes.usernames[0]}`}` 
                                : [''] 
                            : ['']   
                        }>
                            {(likes)? likes.likesTotal : '0'} likes
                        </a>
                        <ReactTooltip id='likes' type="light" place="bottom" effect="solid" 
                            getContent={(dataTip) => `${dataTip}`}
                        />
                    </span>
                </PerfilAndLikes>
                <CommentIcon id={post.id} showComments={showComments} setShowComments={setShowComments}/>
                <RepostIcon id={post.id}/>
                </div>     
                <CardContent>
                    <TopLine>
                        <h1 id={post.userId} onClick={(e) => {navigate(`/user/${e.target.id}`)}} > 
                        {post.username}
                        </h1>  
                        <div>
                            { userId === post.userId ? <ion-icon onClick={() => setEditing(!editing)} name="pencil-outline"></ion-icon> : null }                     
                            { userId === post.userId ? <ion-icon id={post.id} onClick={(e) => openModal(e.target.id)} name="trash-outline"></ion-icon> : null } 
                        </div> 
                    </TopLine>                       
                    <p>
                        {editing ? 
                        <form onSubmit={editPost}>
                            <input
                                type="text"
                                value={postEdit}
                                onChange={e => setPostEdit(e.target.value)}
                                disabled = {disable}
                            >
                            </input>
                        </form> : 
                            <ReactHashtag onHashtagClick={(elt)=>{navigate(`/hashtag/${elt.toLowerCase().slice(1)}`)}}>                  
                            {postEdit}
                            </ReactHashtag>
                        }

                    </p>
                    <a href={post.link} target="_blank" rel="noreferrer">
                        <Snippet image={post.postImage} title={post.postTitle} description={post.postDescription} link={post.link}/>
                    </a>
                </CardContent>
            </Card>    
            { showComments ? <CommentSection id={post.id} userId={post.userId}/> : null }
        </>
        </Container>
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
    margin-top: ${props => props.reposter ? '20px':''};
    position: relative;
    z-index: 2;
    

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

    input {
        width: 100%;
        height: 50px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-radius: 5px;
    }
`

const TopLine = styled.div`
    display: flex;
    justify-content: space-between;

    ion-icon {
        cursor: pointer;
    }

    div {
        width: 40px;
        display: flex;
        justify-content: space-between;
    }
    `

const Container = styled.div`
position:relative;
`;

const Repost = styled.div`

    display: flex;
    gap: 5px;
    width: 100%;
    align-items: center;
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;

        color: #FFFFFF;

    }
    box-sizing: border-box;
    padding: ${props => props.reposter ? '12px 12px 85px 16px':''};
    height: ${props => props.reposter ? '100px':''};
    background: #1E1E1E;
    border-radius: 16px;
    position: absolute;
    top: -4px;
    left: 0;
    z-index: 1;
    ion-icon {
        color: #FFFFFF;
        
    }
`;

