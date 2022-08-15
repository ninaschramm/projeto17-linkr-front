import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import ReactHashtag from "@mdnm/react-hashtag";
import { Link, useNavigate } from 'react-router-dom';
import dog from '../../assets/dog.svg'

export default function CreatePostCard (props) {

    const navigate = useNavigate();

    const [link, setLink] = useState('');
	const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// const locallyStoredToken = localStorage.getItem('token');
        const locallyStoredToken = 1;
        // token ainda não implementado

		if (locallyStoredToken === null) {
			navigate('/', { replace: true });
		}
	}, []);

	const createPost = (event) => {
		event.preventDefault();
        setIsLoading(true);

		const post = {
			link,
			text
		};

        const isLinkValid = /^(ftp|http|https):\/\/[^ "]+$/.test(link);

        if(!isLinkValid){
            alert("link is invalid");
            setIsLoading(false);
            return
        }

        console.log(post)
		const promise = axios.post('https://projeto17-linkr-g5.herokuapp.com/posts', post);
		promise.then((res) => {
			alert(res.data);
            setIsLoading(false);
            window.location.reload();
            
		});
		promise.catch((err) => {
			alert(err.response.data);
            setIsLoading(false);
		});
	};

    return (
        <Card>
            {/*<img src={localStorage.getItem('token')} />
            seria a image do user que teria sido guardada no localStorage
    ao logar */}
            <img src={dog} />
            <CardContent>
                <h1> 
                    What are you going to share today?
                </h1>                
            <Container>
			    <Forms onSubmit={createPost}>
                    <input
                        required
                        type="text"
                        placeholder="http://..."
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        disabled={isLoading}
                    />
                    <input
                        type="text"
                        placeholder="Awesome article about #javascript"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={isLoading}
                    />
				    <Button type="submit" disabled={isLoading} >{ isLoading ?  "Publishing..." : "Publish"}</Button>
			    </Forms>
		    </Container>
            </CardContent>
        </Card>    
            );

    }


const Card = styled.div `
    width: 611px;
    min-height: 210px;
    height: auto;
    padding: 21px;
    display: flex;
    gap: 18px;
    margin-bottom: 16px;
    background: #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;

        h1 {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 300;
            font-size: 20px;
            line-height: 24px;
            color: #707070;
        }

        img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 26.5px;
        }
        
        @media (max-width: 430px) {
            width: 100%;
            border-radius: 0;
            -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
            -moz-box-sizing: border-box;    /* Firefox, other Gecko */
            box-sizing: border-box;
        }
    `

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    gap: 10px;
`

const Forms = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
    justify-content: center;
	width: 100%;
    gap: 13px;
    position: relative;
	input {
		width: 100%;
        height: 66px;
        max-width: 503px;
        background: #EFEFEF;
        border-radius: 5px;
        color: #949494;
        cursor: pointer;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        border:none;
        outline-width: 0;
	}
    > * {
      &:first-child {
        height: 30px;
      }
    }
`;

const Button = styled.button`
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: transparent;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
	cursor: pointer;
    position: absolute;
    right: 22px;
    bottom: -36px;
`;