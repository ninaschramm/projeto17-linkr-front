import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from  'react-loader-spinner';
import PostCard from './PostCard';
import HashtagBar from './HashtagBar';
import CreatePostCard from './CreatePostCard';
import UserContext from '../../contexts/UserContext';
import Modal from './Modal';

export default function TimeLine() {
    const { isModalVisible, deleteId } = useContext(UserContext)
    const UserInfo = JSON.parse(localStorage.getItem('UserInfo'));

    const [posts, setPosts] = useState(null);
    const [follows, setFollows] = useState(null)

    useEffect(() => {
        const URL = `https://projeto17-linkr-g5.herokuapp.com/posts`;
        const config = 
        {
            headers:{
            'Authorization': `Bearer ${UserInfo.token}`,
            }
        }
        const promise = axios.get(URL, config);
        promise.then((res)=> {
            setFollows(res.status);
            setPosts(res.data);
        })
        promise.catch((err) => {setPosts('error'); console.log(err.response.data)});
    }, [])

    function showPosts() {    
        if (posts === null) {
            return <ThreeDots width={51} height={13} color="#D1D1D4" />
        } 
        else if (follows === 204) {
            return <Warning>You don't follow anyone yet. Search for new friends!</Warning>
        }
        else if (follows === 206) {
            return <Warning>No posts found from your friends.</Warning>
        }
        else if (posts === "") {
            return <Warning>There are no posts yet.</Warning>
        }
        else if (posts === 'error') {
            return <Warning>An error occured while trying to fetch the posts, please refresh the page.</Warning>
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
                <Title>timeline</Title>
                <CreatePostCard />
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
    gap: 16px;
`

const Title = styled.div`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    margin-bottom: 25px;
`

const Sidebar = styled.div`
    margin-top: 232px;
`

const Warning = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    color: #B7B7B7;
`