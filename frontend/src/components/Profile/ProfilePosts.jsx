import { PostGrid } from "./Profile.styles";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePosts = () => {
	const { id } = useParams();
	const postData = useSelector((state) => state.post.postData);
	let filteredPosts = postData.filter((post) => {
		return post.userID === id;
	});

	return (
		<PostGrid>
			{filteredPosts.length ? (
				filteredPosts.map((post) => {
					return (
						<div key={post.postID}>
							<div className="overlay"></div>
							<img src={`${import.meta.env.VITE_SERVER_URL}/api/posts/image/${post._id}`} alt="post" />
						</div>
					);
				})
			) : (
				<h2 className="empty-post-section">No Posts Yet!</h2>
			)}
		</PostGrid>
	);
};

export default ProfilePosts;