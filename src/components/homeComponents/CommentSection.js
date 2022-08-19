import styled from "styled-components"
import { useEffect, useState } from "react";
import { FiSend } from 'react-icons/fi';
import axios from "axios";


export default function CommentSection({ id, userId }){

    const [commentList, setCommentList] = useState(null);
    const [comment, setComment] = useState(null);
    const UserInfo = JSON.parse(localStorage.getItem('UserInfo'));  
    const [isLoading, setIsLoading] = useState(false);
    const [userStatus, setUserStatus] = useState(null);
    const config = 
        {
            headers:{
            'Authorization': `Bearer ${UserInfo.token}` 
            }
        }


    useEffect(() => {
        const URL = `${process.env.REACT_APP_API_BASE_URL}/comments/${id}`;
        const promise = axios.get(URL);
        promise.then((res)=> {
            console.log(res.data)
            setCommentList(res.data);           
        })
        promise.catch((err) => console.log(err));
    }, [])

    const createComment = (event) => {
		event.preventDefault();

		const postComment = {
			comment
		};
        
		const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/comments/${id}`, postComment, config);
		promise.then((res) => {
            setIsLoading(false);
            window.location.reload();            
		});
		promise.catch((err) => {
			alert(err.response.data);
            setIsLoading(false);
		});
	};

    function checkUserStatus(commentUserId) {
        
        if (commentUserId === UserInfo.userId) {
            return "• you"
        }
        else if (commentUserId === userId) {
            return "• post's author" }        
        else {
            return null
        }
    }


    return (
        <> <CommentCard>
            {commentList ? 
            commentList.map((comment) => <Comment> <img src={comment.picture} alt="" /> <TextBlock> <div> <h1> {comment.username} </h1> {checkUserStatus(comment.userId)} </div> {comment.comment} </TextBlock> </Comment>)   
            : null}
            <div>
            <img src={UserInfo.picture} alt="" />
            <Forms onSubmit={createComment}>
                    <input
                        required
                        type="text"
                        placeholder="write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={isLoading}
                    />
                                       
				    <button type="submit" disabled={isLoading} >< FiSend size={15}/></button>
			</Forms>
            </div>
            </CommentCard>
        </>
    )
}

const CommentCard = styled.div`
    margin-top: -60px;
    padding-top: 40px;
    width: 611px;
    min-height: 123px;
    background: #1E1E1E;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 25px;

    img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 26.5px;
        cursor: pointer;
    }

    div {
        display: flex;
        align-items: center;
    }
`

const Comment = styled.div`
    width: 571px;
    height: auto;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #353535;
    transform: rotate(-0.1deg);
    margin-bottom: 19px;
    padding-bottom: 19px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;

    h1 {
        font-weight: 700;
        color: #F3F3F3;
        margin-right: 4px;
    }

    @media (max-width: 571px) {
            width: 100%;
        }
`

const Forms = styled.form`
    width: 532px;
	display: flex;
	align-items: center;
    justify-content: center;
    position: relative;
    gap: 10px;

	input {
        width: 100%;
		max-width: 510px;
        height: 39px;
        background: #252525;
        border-radius: 8px;        
        font-family: 'Lato';
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.05em;
        color: #ACACAC;
        padding: 0 15px;
        border: 0;

        ::placeholder {
            font-style: italic;
            color: #575757;
        }
    }

    button {
        margin-left: -50px;
        background: #252525;
        color: #F3F3F3;
        border: 0;
    }

       @media (max-width: 430px) {
            width: 100%;
        }
    `

    const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start !important;
    margin-left: 18px;
    justify-content: flex-start;
    width: 571px;
    gap: 3px;

    @media (max-width: 571px) {
            width: 100%;
        }
    `