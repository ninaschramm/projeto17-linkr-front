import styled from 'styled-components';
import Navbar from '../components/sharedComponents/Navbar'
import TimeLine from '../components/homeComponents/TimeLine'


export default function HomePage() {
	return (
		<Page>
			<Navbar />
		</Page>
	);
}

const Page = styled.div`
	min-height: 100vh;
	width: 100%;
`;