import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

export default function Navbar() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


	return (
		<Container>
            <LeftSide>
                <BrandLogo onClick={()=>{navigate("/home")}}>
                    <h1>linkr</h1>
                </BrandLogo>
            </LeftSide>
			    
            <RightSide>

            </RightSide>
		</Container>
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
    h1:hover {
        color: lightgray;
        cursor: pointer;
    }
`;

const RightSide = styled.div`
	display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
	height: 60px;
`;

const LeftSide = styled.div`
	display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
	height: 60px;
`;

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