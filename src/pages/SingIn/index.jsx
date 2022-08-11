import { React, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import { Page, Form } from './style';

export default function SingIn() {

	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disable, setDisable] = useState(false);

	const {setUser} = useContext(UserContext);

	function userLogin(e){
		e.preventDefault();
		setDisable(true);

		const promise = axios.post(`http://localhost:5000/singin`,{
			email,
			password
		});

		promise.then(res => {
			const {data} = res;
			console.log(data);
			localStorage.setItem(
				"UserInfo",
				JSON.stringify({token: data.token, img: data.img})
			);
			setUser(data);
			setDisable(false);
			return navigate("/home")
		});
		promise.catch((e) => {
			console.log(e.response.data);
			alert(e.response.data)
			return setDisable(false);
		});
	}

	return (
		<Page>
			<section className='left-side'>
				<h1>linkr</h1>
				<h2>save, share and discover<br/>
				the best links on the web</h2>
			</section>
			<section className='right-side'>
				<Form onSubmit={userLogin}>
					<input
						type="email"
						placeholder="e-mail"
						value={email}
						onChange={e => setEmail(e.target.value)}
						disabled = {disable}
						required
					/>
					<input
						type="password"
						placeholder="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						disabled = {disable}
						required
					/>
					{disable === false ?
						(<button type="submit">Log In</button>) :
						(<button type="submit" className="disabled-button" disabled = {true}>...</button>)
					}
				</Form>
				<Link to={"/sing-up"}>
					<p>First time? Create an account!</p>
				</Link>
			</section>
		</Page>
	);
}