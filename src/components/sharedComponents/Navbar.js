import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { IconContext } from "react-icons";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

//import UserContext from '../../contexts/UserContext';

export default function Navbar() {
    const [viewMenu, setViewMenu] = useState(false);
    const navigate = useNavigate();
    const data = localStorage.getItem("UserInfo");
    const userInfo = JSON.parse(data);

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


	return (
        <>
            <Container>
                <LeftSide>
                    <BrandLogo onClick={()=>{navigate("/timeline")}}>
                        <h1>linkr</h1>
                    </BrandLogo>
                </LeftSide>
                    
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