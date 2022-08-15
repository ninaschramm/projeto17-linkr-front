import { React, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'

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

		const promise = axios.post(`http://localhost:5000/signin`,{
			email,
			password
		});

		promise.then(res => {
			const {data} = res;
			console.log(data);
			localStorage.setItem(
				"UserInfo",
				JSON.stringify({token: data.token, picture: data.picture})
			);
			setUser(data);
			setDisable(false);
			return navigate("/timeline")
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
						(<button type="submit" className="disabled-button" disabled = {true}>
							<ThreeDots
								color='#a0a0a0'
								height={30}
								width={70}
							/>
						</button>)
					}
				</Form>
				<Link to={"/sign-up"}>
					<p>First time? Create an account!</p>
				</Link>
			</section>
		</Page>
	);
}