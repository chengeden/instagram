import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Container } from "./Contact.styles";
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Contact = () => {
	const { id } = useParams();
	return (
		<>
			<Navbar />
			<Container>
				<div className="img">
					<img src={`${import.meta.env.VITE_SERVER_URL}/api/profiles/image/${id}`} alt="profile-pic" />
				</div>
				<div className="email">
					<h2>{`${id}@gmail.com`}</h2>
				</div>
				<div className="social-media">
					<div className="instagram handle">
						<a target="_blank" href="https://instagram.com" rel="noopener noreferrer">Instagram</a>
						<InstagramIcon />
					</div>
					<div className="linkedin handle">
						<a target="_blank" href="https://linkedin.com" rel="noopener noreferrer">Linkedin</a>
						<LinkedInIcon />
					</div>
					<div className="github handle">
						<a target="_blank" href="https://github.com" rel="noopener noreferrer">Github</a>
						<GitHubIcon />
					</div>
					<div className="twitter handle">
						<a target="_blank" href="https://twitter.com" rel="noopener noreferrer">Twitter</a>
						<TwitterIcon />
					</div>
				</div>
			</Container>
		</>
	);
};

export default Contact;