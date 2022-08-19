import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from  'react-loader-spinner';
import PostCard from './PostCard';
import HashtagBar from './HashtagBar';
import CreatePostCard from './CreatePostCard';
import UserContext from '../../contexts/UserContext';
import Modal from './Modal';

export default function HashtagTimeLine() {
    const { isModalVisible, deleteId } = useContext(UserContext)
    let {hashtag} = useParams();
    const UserInfo = JSON. parse(localStorage.getItem('UserInfo'));

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        console.log(hashtag)
        const URL = `${process.env.REACT_APP_API_BASE_URL}/hashtags/${hashtag}`;
        const config = 
        {
            headers:{
            'Authorization': `Bearer ${UserInfo.token}`,
            }
        }
        const promise = axios.get(URL, config);
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
            return (posts.map((post, index) => {if(post != null){return <PostCard key={index} post={post}/>}}))
        }
    }


    const callShowPosts = showPosts()

	return (
		<Page>
            {isModalVisible ? <Modal id={deleteId} /> : null}
			<Container>
                <Title>#hashtag</Title>
                {callShowPosts}
			</Container>
            <Sidebar>
                <HashtagBar />
            </Sidebar>          
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

const Sidebar = styled.div`
    margin-top: 171px;
`