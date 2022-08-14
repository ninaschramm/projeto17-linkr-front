import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from  'react-loader-spinner';
import PostCard from './PostCard';
import HashtagBar from './HashtagBar';
import CreatePostCard from './CreatePostCard';

export default function TimeLine() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const URL = "http://localhost:5000/posts";
        const promise = axios.get(URL);
        promise.then((res)=> {
            setPosts(res.data);
        })
        promise.catch(() => {setPosts('error')});
    }, [])

    function showPosts() {
        if (posts === null) {
            return <ThreeDots width={51} height={13} color="#D1D1D4" />
        } 
        else if (posts === "") {
            return <>There are no posts yet.</>
        }
        else if (posts === 'error') {
            return <>An error occured while trying to fetch the posts, please refresh the page.</>
        }
        else {
            return (posts.map((post, index) => <PostCard key = {index} post={post}/>))
        }
    }


    const callShowPosts = showPosts()

	return (
		<Page>
			<Container>
                <Title>timeline</Title>
                <CreatePostCard />
                {callShowPosts}
			</Container>
            <div>
                <HashtagBar />
            </div>          
		</Page>
	);
}


const Page = styled.div`
	min-height: 100vh;
	width: 100%;
    display: flex;
    justify-content: center;
    
`;

const Container = styled.div`
    margin-top: 140px;
	display: flex;
	flex-direction: column;
	//justify-content: center;
`

const Title = styled.div`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    margin-bottom: 43px;
`