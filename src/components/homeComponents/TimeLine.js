import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from  'react-loader-spinner';
import PostCard from './PostCard';
import HashtagBar from './HashtagBar';
import CreatePostCard from './CreatePostCard';
import UserContext from '../../contexts/UserContext';
import Modal from './Modal';
import useInterval from 'use-interval'

export default function TimeLine() {
    const { isModalVisible, deleteId } = useContext(UserContext)
    const UserInfo = JSON.parse(localStorage.getItem('UserInfo'));

    const [posts, setPosts] = useState(null);
    const [newPosts, setNewPosts] = useState(null);
    const [qtdNewPosts, setQtdNewPosts] = useState(0);
    
    useEffect(() => {
        const URL = `${process.env.REACT_APP_API_BASE_URL}/posts`;
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
        promise.catch((err) => {setPosts('error'); console.log(err.response.data)});
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

    function checkNewPosts(){
        const URL = `${process.env.REACT_APP_API_BASE_URL}/posts`;
        const config = 
        {
            headers:{
            'Authorization': `Bearer ${UserInfo.token}`,
            }
        }
        const promise = axios.get(URL, config);
        promise.then((res)=> {
            setNewPosts(res.data);
        })
        promise.catch((err) => {setPosts('error'); console.log(err.response.data)});
        compareNewPost();
    }

    function compareNewPost(){
        if(posts && newPosts){
            if(newPosts.length > posts.length){
                return setQtdNewPosts(newPosts.length - posts.length);
            }
        }
    }
    
    function atualisePosts(){
        console.log('atualizando');
        let start = newPosts.length - posts;
        let arrcerto = [];
        for(let i = 0; i <(newPosts.length - posts); i++){
            arrcerto.push(newPosts[start+i]);
        }
        setPosts([arrcerto,posts]);
    }

    useInterval(checkNewPosts, 15000);

    const callShowPosts = showPosts()

	return (
		<Page>
            {isModalVisible ? <Modal id={deleteId} /> : null}
			<Container>
                <Title>timeline</Title>
                <CreatePostCard />
                {(qtdNewPosts > 0)?
                    <AtualisePosts onClick={atualisePosts}>
                        {qtdNewPosts} posts pra carregar
                    </AtualisePosts>
                :``}
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
    margin-bottom: 43px;
`

const Sidebar = styled.div`
    margin-top: 171px;
`
const AtualisePosts = styled.button`

`