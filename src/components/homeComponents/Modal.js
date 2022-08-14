import React, { useState, useContext} from "react";
import styled from 'styled-components';
import axios from 'axios';
import UserContext from "../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';

export default function Modal(id){

    const setIsModalVisible = useContext(UserContext)
    const navigate = useNavigate();

    const headers = {
        Authorization: `Bearer ${null}`,
    }

    async function deletePost(req, res){        
        const body = {
            id: parseInt(id)
        }
        console.log(body)     
		
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/posts`, body, {headers});
            console.log(res);
            setIsModalVisible(false)   
            navigate("/home")
        }
        catch(err) {
            alert("Algo deu errado!")
            console.log(err.response.data)
        }   
    }

    return (
    <ModalBG>
        <ModalCard>
         <h1>Are you sure you want to delete this post?</h1> 
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
`

const CancelButton = styled.button`
    width: 134px;
    height: 37px;
    background: #FFFFFF;
    border-radius: 5px;
`

const ConfirmButton = styled.button`

`