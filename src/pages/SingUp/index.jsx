import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";

import { Page, Form } from "./styles";

export default function SingUp() {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [picture, setPicture] = useState("");
    const [disable, setDisable] = useState(false);

    function userSingUp(e){
        e.preventDefault();
        setDisable(true);

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`,{
            email: email,
            username: username,
            password: password,
            picture: picture
        });

        promise.then(() => {
            setDisable(false);
            return navigate("/");
        });

        promise.catch((e) => {
            console.log(e.response.data);
            alert(e.response.data);
            return setDisable(false);
        })
    }

    return (
		<Page>
			<section className='left-side'>
				<h1>linkr</h1>
				<h2>save, share and discover<br/>
				the best links on the web</h2>
			</section>
			<section className='right-side'>
				<Form onSubmit={userSingUp}>
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
                    <input
						type="text"
						placeholder="username"
						value={username}
						onChange={e => setUsername(e.target.value)}
						disabled = {disable}
						required
					/>
                    <input
						type="url"
						placeholder="picture url"
						value={picture}
						onChange={e => setPicture(e.target.value)}
						disabled = {disable}
						required
					/>
					{disable === false ?
						(<button type="submit">Sign Up</button>) :
						(<button type="submit" className="disabled-button" disabled = {true}>
							<ThreeDots
								color='#a0a0a0'
								height={30}
								width={70}
							/>
						</button>)
					}
				</Form>
				<Link to={"/"}>
					<p>Switch back to log in</p>
				</Link>
			</section>
		</Page>
	);
}