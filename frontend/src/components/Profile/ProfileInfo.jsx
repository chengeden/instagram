import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bio, Info, InfoContainer, LoadIcon, Stats } from "./Profile.styles";
import CheckCircle from "@mui/icons-material/CheckCircle";
import CreateProfile from "./CreateProfile";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
	const { id } = useParams();
	const postData = useSelector((state) => state.post.postData);
	let filteredPosts = postData.filter((post) => {
		return post.userID === id;
	});
	const [profile, setProfile] = useState(null);
	const [isProfileCreated, setIsProfileCreated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const url = `${import.meta.env.VITE_SERVER_URL}/api/profiles/${id}`;
		axios.get(url)
			.then((response) => {
				setProfile(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching profile:", error);
				setIsLoading(false);
			});
	}, [id, isProfileCreated]);

	if (isLoading) {
		return (
			<LoadIcon>Loading...</LoadIcon>
		);
	}

	return (
		<>
			{profile ? (
				<InfoContainer>
					<img src={`${import.meta.env.VITE_SERVER_URL}/api/profiles/image/${profile.userID}`} alt="profile picture" />
					<Info>
						<p className="owner-ID">
							{profile.userID}
							{profile.verified ? <CheckCircle className="verified" /> : null}
						</p>
						<Stats>
							<p>
								<strong>{filteredPosts.length}</strong> Posts
							</p>
							<p>
								<strong>{profile.followers}</strong> Followers
							</p>
							<p>
								<strong>{profile.following}</strong> Following
							</p>
						</Stats>
						<Bio>
							<p className="name">
								<strong>{profile.name}</strong>
							</p>
							<p className="category">{profile.category}</p>
							<p>{profile.bio}</p>
						</Bio>
					</Info>
				</InfoContainer>
			) : (
				<InfoContainer>
					<CreateProfile userID={id} setIsProfileCreated={setIsProfileCreated} />
				</InfoContainer>
			)}
		</>
	);
};

export default ProfileInfo;