import { React, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import { Page, Form } from './style';

export default function SingIn() {

	const navigate = useNavigate();
	/*const [singIn, setSingIn] = useState({
		email: "",
		password: ""
	});*/
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disable, setDisable] = useState("");

	/*function handleInput(e){
		singIn[e.target.name] = e.target.value;
		setSingIn({...singIn});
	}*/

	//const {email, password} = singIn

	return (
		<Page>
			<section className='left-side'>
				<h1>linkr</h1>
				<h2>save, share and discover<br/>
				the best links on the web</h2>
			</section>
			<section className='right-side'>
				<Form /*onSubmit={submit function}*/>
					<input
						type="email"
						placeholder="e-mail"
						value={email}
						//onChange={handleInput}
						onChange={e => setEmail(e.target.value)}
						disabled = {disable}
						required
					/>
					<input
						type="password"
						placeholder="password"
						value={password}
						//onChange={handleInput}
						onChange={e => setPassword(e.target.value)}
						disabled = {disable}
						required
					/>
					{disable === "" ?
						(<button type="submit">Log In</button>) :
						(<button type="submit" className="disabled-button" disabled = {true}>Log In</button>)
					}
				</Form>
				<Link to={"/sing-up"}>
					<p>First time? Create an account!</p>
				</Link>
			</section>
		</Page>
	);
}