import { Container } from "./Profile.styles";
import Navbar from "../Navbar/Navbar";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";

const Profile = () => {
	return (
		<Container>
			<Navbar />
			<ProfileInfo />
			<ProfilePosts />
		</Container>
	);
};

export default Profile;