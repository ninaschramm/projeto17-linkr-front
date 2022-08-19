import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";

import UserContext from "./contexts/UserContext";

import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import HomePage from './pages/HomePage';
import HashtagTimeLine from './components/homeComponents/HashtagTimeLine';
import UserTimeLine from './components/homeComponents/UserTimeLine';


function App() {
	
	const [user, setUser] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
    const [deleteId, setDeleteId] = useState('')

	return (
		<UserContext.Provider value={{ user, setUser, isModalVisible, setIsModalVisible, deleteId, setDeleteId }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SingIn />} />
					<Route path="/sign-up" element={<SingUp />} />
					<Route path="/timeline" element={<HomePage />} />
					<Route path="/hashtag/:hashtag" element={<HashtagTimeLine />} />
					<Route path="/user/:id" element={<UserTimeLine />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;