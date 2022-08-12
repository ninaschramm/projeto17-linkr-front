import styled from "styled-components";

export const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #333333;

    .left-side {
        background-color: #151515;
        width: 60%;
        padding-top: 10%;
        padding-left: 10%;
    }
    
    h1 {
        font-size:106px;
        font-weight: 700;
        color: #FFFFFF;
        font-family: 'Passion One', cursive;
    }

    h2 {
        font-size:43px;
        font-weight: 700;
        color: #FFFFFF;
        font-family: 'Oswald', sans-serif;
    }

    .right-side {
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding-top: 11%;
    }

    p {
        color: #FFFFFF;
        font-family: 'Lato', sans-serif;
        text-decoration-line: underline;
    }
`
export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    input {
        height: 55px;
        padding-left: 15px;
        width: 80%;
        border-radius: 6px;
        border: none;
        font-size: 20px;
        font-family: 'Oswald', sans-serif;
    }

    .disabled-button{
        background-color: #263a55;
        color: #7a7474;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button{
        background-color: #1877F2;
        color: #FFFFFF;
        font-family: 'Oswald', sans-serif;
        font-size: 20px;
        height: 55px;
        width: 80%;
        border-radius: 6px;
        border: none;
    }
`