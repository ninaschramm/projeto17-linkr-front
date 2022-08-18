import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { IconContext } from "react-icons";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import {DebounceInput} from 'react-debounce-input';

//import UserContext from '../../contexts/UserContext';

export default function Navbar() {
    const [viewMenu, setViewMenu] = useState(false);
    const navigate = useNavigate();
    const data = localStorage.getItem("UserInfo");
    const userInfo = JSON.parse(data);
    const [letters, setLetters] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        handleSearch();
    }, [letters])

    function logout(){
        localStorage.removeItem("UserInfo");
        navigate("/");
    }

    function close() {
        setViewMenu(false);
    }

    function toggleMenu() {
        setViewMenu(!viewMenu);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    function handleSearch (){

        if(letters.length >= 3){
            const URL = `${process.env.REACT_APP_API_BASE_URL}/serachUsers/${letters}`
            const config = 
            {
                headers:{
                'Authorization': `Bearer ${userInfo.token}` 
                }
            }
            const promise = axios.get(URL,config);

            promise.then(res => {
                setSearchResults(res.data);
                console.log(searchResults)
            });
            promise.catch((e) => {
                console.log(e.response.data);
                setSearchResults([]);
                return
            });
        }
        else{
            setSearchResults([]);
        }

    }

    function showSearchResults() {
         if (searchResults === null) {
             return 
         } 
         else if (searchResults.length === 0) {
             return 
         }
         else {
             return (<Results>
                    {(searchResults.map((result, index) => {if(result != null)
                        {
                        console.log(result)
                        return <Result key={index}>
                                    <img src={result.picture}/>
                                    <h3>{result.username}</h3>
                                </Result>}}))}
                    </Results>)
        }
    }


    const callShowSearchResults = showSearchResults()

	return (
        <>
            <Container>
                <LeftSide>
                    <BrandLogo onClick={()=>{navigate("/timeline")}}>
                        <h1>linkr</h1>
                    </BrandLogo>
                </LeftSide>
                <SearchAndResults>
                    <DebounceInput
                        element={search}
                        minLength={3}
                        debounceTimeout={300}
                        placeholder="Search for people"
                        value={letters}
                        onChange={e => setLetters(e.target.value)}
                    />
                    <ion-icon name="search-outline" onClick={() => setLetters(letters)}></ion-icon> 
                    {callShowSearchResults} 
                </SearchAndResults>
                
                <RightSide>
                    <IconContext.Provider value={{color: "white", size: 30}}>
                    <div onClick={toggleMenu}>
                        {viewMenu ? <FaChevronUp /> : <FaChevronDown />}
                        <Img src={userInfo.picture} alt=""/>
                    </div>
                    </IconContext.Provider>
                </RightSide>
            </Container>

            {viewMenu ? (
                <>
                    <Logout onClick={logout} toggle={viewMenu}>
                        <p>Logout</p>
                    </Logout>
                    <Box onClick={close} />
                </>
            ) : (
                <></>
            )}
        </>

	);
}



const Container = styled.div`
	display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
	height: 72px;
    padding: 0  20px;
    background-color: #151515;
    position:fixed;
    top:0px;
    z-index: 3;
    box-sizing: border-box;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box; 
    h1:hover {
        color: lightgray;
        cursor: pointer;
    }
`;

const RightSide = styled.div`
	display: flex;
    justify-content: end;
    align-items: flex-end;
    width: 100%;
	height: 60px;

    div {
        display: flex;
        align-items: center;
        gap: 15px;
        cursor: pointer;
        @keyframes flipIn {
            from {
                transform: rotate(0);
            }
            to {
                transform: rotate(180deg);
            }
        }
        @keyframes flipOff {
            from {
                transform: rotate(180deg);
            }
            to {
                transform: rotate(0);
            }
        }
        > svg {
            animation: forwards
                ${(props) => (props.toggle ? "flipIn" : "flipOff")} 0.5s;
        }
    }
`;

const LeftSide = styled.div`
	display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
	height: 60px;
`;

const Img = styled.img`
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
        background-position: center;
        background-size: cover;
`

const BrandLogo = styled.div`
    width: 120px;
	height: 60px;
    h1{
        color: #fff;
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 54px;
    }
`;

const Logout = styled.div`
    width: 150px;
    height: 47px;
    position: absolute;
    right: 0;
    top: 70px;
    background-color: #151515;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "lato", sans-serif;
    font-weight: 700;
    font-size: 17px;
    border-radius: 0 0 0 20px;
    z-index: 10;
    cursor: pointer;
`;

const Box = styled.div`
    cursor: default;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 5;
`;

const search = styled.input`
    cursor: pointer;
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    border:none;
    outline-width: 0;
`;

const SearchAndResults = styled.div`
    cursor: default;
    height: 45px;
    width: 100%;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
    ion-icon{
        cursor: pointer;
    }
`;

const Results = styled.div`
    position: absolute;
    top: 41px;
    left: 0;
    width: inherit;
    height: 100px;
    background: #E7E7E7;
    border-radius: 0 0px 8px 8px;
    padding: 14px 0 24px 18px;  
    gap: 16;

`;

const Result = styled.div`
    display: flex;
    align-items: center;
    img{
        width: 39px;
        height: 39px;
        border-radius: 304px;
    }
    gap: 12px;
    h3{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151
    }
`;