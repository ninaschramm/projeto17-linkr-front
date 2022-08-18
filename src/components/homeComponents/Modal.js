import React, { useState, useContext} from "react";
import styled from 'styled-components';
import axios from 'axios';
import UserContext from "../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';

export default function Modal( {id} ){

    const {setIsModalVisible} = useContext(UserContext)
    const navigate = useNavigate();
    const UserInfo = JSON.parse(localStorage.getItem('UserInfo'));
    const token = UserInfo.token;

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    async function deletePost(req, res){        
        const payload = {
            id: parseInt(id)
        }
        console.log(payload)     
		
        const promise = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/posts`, {   headers: headers,         
            data: payload
          });
        promise.then((res) => postDeleted(res))   
        promise.catch((err) => 
			console.log(err.response.data),
            setIsModalVisible(false),
            alert("It wasn't possible to delete this post")
            
		);
    }

    function postDeleted(res) {
        console.log(res);
        setIsModalVisible(false);
        window.location.reload()
    }

    return (
    <ModalBG>
        <ModalCard>
         <h1>Are you sure you want <br></br>to delete this post?</h1> 
         <CancelButton onClick={() => setIsModalVisible(false)}>No, go back</CancelButton> <ConfirmButton onClick={deletePost}>Yes, delete it</ConfirmButton>
        </ModalCard>
    </ModalBG>
)}

const ModalBG = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
`

const ModalCard = styled.div`
    width: 597px;
    height: 262px;
    background: #333333;
    border-radius: 50px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;
    padding: 38px;
    h1 {
        margin-bottom: 38px;
    }
`

const CancelButton = styled.button`
    width: 134px;
    height: 37px;
    background: #FFFFFF;
    border-radius: 5px;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #1877F2;
    border: 0;
    margin-right: 14px;
    cursor: pointer;
    :hover {
        filter: brightness(150%);
    }
`

const ConfirmButton = styled.button`
    width: 134px;
    height: 37px;
    background: #1877F2;
    border-radius: 5px;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    border: 0;
    margin-left: 14px;
    cursor: pointer;
    :hover {
        filter: brightness(150%);
    }
`