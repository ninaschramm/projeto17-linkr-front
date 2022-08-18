import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from "axios";
import UserContext from '../../contexts/UserContext';

export default function FollowButton( {id} ){

    const [follows, setFollows] = useState(null);
    const UserInfo = JSON.parse(localStorage.getItem('UserInfo'));
    const [isLoading, setIsLoading] = useState(false);


    const config = 
    {
        headers:{
        'Authorization': `Bearer ${UserInfo.token}` 
        }
    }

    useEffect(() => {
        const URL = `${process.env.REACT_APP_API_BASE_URL}/users/${id}`;
        const promise = axios.get(URL, config);
        promise.then((res)=> {
            setFollows(res.data); 
            console.log(res.data)           
        })
        promise.catch((err) => console.log(err));
    }, [])

    function follow() {
        setIsLoading(true)
        const URL = `${process.env.REACT_APP_API_BASE_URL}/users/${id}`;
        const promise = axios.post(URL, {}, config);
        promise.then((res)=> {
            setFollows(true);  
            setIsLoading(false);         
        })
        promise.catch((err) => console.log(err), alert("Failed to execute this action"));    
    }

    function unfollow() {
        setIsLoading(true)
        const URL = `${process.env.REACT_APP_API_BASE_URL}/users/${id}`;
        const promise = axios.delete(URL, config);
        promise.then((res)=> {
            setFollows(false);  
            setIsLoading(false);          
        })
        promise.catch((err) => console.log(err), alert("Failed to execute this action"));    
    }


return (
    <FollowDiv>
        { follows ? <Unfollow disabled={isLoading} onClick={unfollow}>Unfollow</Unfollow> : <Follow onClick={follow}>Follow</Follow> }
    </FollowDiv>    
)
}

const FollowDiv = styled.div`
    margin-top: 171px;
    margin-left: 214px;
`

const Follow = styled.button`
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    border: 0;
    cursor: pointer;
`

const Unfollow = styled.button`
    width: 112px;
    height: 31px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #1877F2;
    border: 0;
    cursor: pointer;
`
