import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

import UserContext from "./contexts/UserContext";

import SingIn from './pages/SingIn';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';


function App() {
	
	const [x, setX] = useState("x");

	useEffect(() => {
		localStorage.setItem("y", "yy");
	}, []);

	return (
		<UserContext.Provider value={{ x, setX }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SingIn />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/home" element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;