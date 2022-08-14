import React from "react";
import styled from 'styled-components';

export default function Snippet(props) {
    const { image, title, description, link } = props;

    return (
        <SnippetCard>
            <SnippetContent>
                <h1>{title}</h1>
                {description}
                <a href={link} target="_blank" rel="noreferrer">{link}</a>
            </SnippetContent>
            <img src={image} />
        </SnippetCard>
    )
}

const SnippetCard = styled.div`
    width: 503px;
    max-height: 170px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;

    img {
        width: 160px !important;
        height: auto !important;
        border-radius: 0px 12px 13px 0px;
        object-fit: fill !important;
    }
`

const SnippetContent = styled.div`
    width: auto;
    height: auto;
    padding: 20px 25px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9B9595;
    display: flex;
    flex-direction: column;
    gap: 6px;

    h1 {
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
    }

    a {
        color: #CECECE;
        margin-top: 10px;
    }
`