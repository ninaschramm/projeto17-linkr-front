import { React, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import { Page } from './style';


export default function HomePage() {
	return (
		<Page>
			<section className='left-side'>
				<h1>linkr</h1>
				<h2>save, share and discover<br/>
				the best links on the web</h2>
			</section>
			<section className='right-side'>
				
			</section>
			
			
		</Page>
	);
}