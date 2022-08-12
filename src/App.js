import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

import UserContext from "./contexts/UserContext";

import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import HomePage from './pages/HomePage';


function App() {
	
	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SingIn />} />
					<Route path="/sign-up" element={<SingUp />} />
					<Route path="/home" element={<HomePage />} />

				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;