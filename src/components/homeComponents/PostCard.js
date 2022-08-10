import React from "react";
import styled from 'styled-components';
import ReactHashtag from "@mdnm/react-hashtag";
import { Link } from 'react-router-dom';
import picture from '../../../src/assets/dog.svg';
import { useNavigate } from 'react-router-dom';


export default function PostCard (props) {
    const navigate = useNavigate();

    return (
        <Card>
            <img src={picture} />
            {/* seria {props.picture} */}
            <CardContent>
                <h1> 
                    {/* {props.username} vai aqui */}
                    Nome do Usuário
                </h1>                
                <p>
                    <ReactHashtag onHashtagClick={(elt)=>{navigate(`hashtag/:${elt.toLowerCase().slice(1)}`)}}> 
                    {/* {props.text} vai aqui, em vez desse texto teste */}
                    #Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod #tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis #nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. #Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </ReactHashtag>
                </p>
                <Link to='/home'>
                    snippet aqui
                    {/* aqui precisa subsituir o caminho do link e fazer o snippet, não olhei como. vai ser necessário fazer uma query juntando post com users pra colocar todas as info deste card */}
                </Link>
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


