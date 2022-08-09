import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from  'react-loader-spinner';

export default function TimeLine() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const URL = "";
        const promise = axios.get(URL);
        promise.then((res)=> {
            setPosts(res.data);
        });
    }, [])

    function showPosts() {
        if (posts === null) {
            return <ThreeDots width={51} height={13} color="#D1D1D4" />
        } 
        else if (posts === "") {
            return <></>
        }
        else {
            return (posts.map((post, index) => <h1>Test</h1>))
        }
    }


    const callShowPosts = showPosts()

	return (
		<Page>
			<Container>
                {callShowPosts}
			</Container>
		</Page>
	);
}


const Page = styled.div`
	min-height: 100vh;
	width: 100%;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`