import { Caption, CommentInput, Comments, Container, Likes, Media, PostActionIcons, PostInfo, UserInfo, UserPost } from "./Post.styles";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLikeSingleClick, handleLikeDoubleClick, postComment } from "../../Redux/PostData";
import { useState } from "react";
import { axiosInstance } from "../../apiConfig";

const Post = () => {
	const dispatch = useDispatch();
	const allPosts = useSelector((state) => state.post.postData);
	const userID = useSelector((state) => state.user.userID);
	const [comment, setComment] = useState({});

	const updatePostData = async (id, updatedObj) => {
		try {
			const url = `/api/posts/${id}`;
			await axiosInstance.put(url, updatedObj);
		} catch (error) {
			console.error("Error updating post data:", error);
		}
	};

	const handlePostLikes = (type, postData) => {
		let updatedPost = { ...postData };
		let likes = "";
		if (type === "singleClick") {
			updatedPost.isLiked = !postData.isLiked;
			likes = String(parseInt(updatedPost.likes, 10) + (updatedPost.isLiked ? 1 : -1));
			updatedPost.likes = likes;
			dispatch(handleLikeSingleClick(updatedPost));
		} else if (type === "doubleClick") {
			updatedPost.isLiked = true;
			likes = String(parseInt(updatedPost.likes, 10) + (postData.isLiked ? 0 : 1));
			updatedPost.likes = likes;
			dispatch(handleLikeDoubleClick(updatedPost));
		}
		let updatedObj = {
			likes: likes,
			isLiked: type === "singleClick" ? !postData.isLiked : true,
			comments: [...postData.comments],
		};
		updatePostData(postData._id, updatedObj);
	};

	const handlePostComment = (postData, text) => {
		let updatedPost = {
			...postData,
			comments: [...postData["comments"], [userID, text]]
		};
		dispatch(postComment(updatedPost));

		let updatedObj = {
			comments: [...postData["comments"], [userID, text]],
			likes: postData.likes,
			isLiked: postData.isLiked,
		};
		updatePostData(postData._id, updatedObj);

		setComment((prevComments) => ({ ...prevComments, [postData._id]: "" }));
	};

	const handleCommentLike = (e) => {
		let color = e.target.style.color;
		e.target.style.color = color === "tomato" ? "#2f2d2d" : "tomato";
	};

	return (
		<Container>
			{allPosts && allPosts.length > 0 ? (
				allPosts.map((post) => {
					return (
						<UserPost key={post.postID} className={`post-${post.postID}`}>
							<UserInfo>
								<div className="post-info">
									<div className="icon">
										<img src={`${import.meta.env.VITE_SERVER_URL}/api/profiles/image/${post.userID}`} alt="profile icon" />
									</div>
									<div className="id-location">
										<p className="user owner-id">
											<Link to={`/profile/${post.userID}`}>{post.userID}</Link>
										</p>
									</div>
								</div>
								<MoreHorizIcon />
							</UserInfo>
							<Media onDoubleClick={() => handlePostLikes("doubleClick", post)}>
								<FavoriteIcon className={`like-post-${post.postID}`} />
								<img src={`${import.meta.env.VITE_SERVER_URL}/api/posts/image/${post._id}`} alt="post" />
							</Media>
							<PostInfo>
								<PostActionIcons>
									<div className="actions">
										<FavoriteIcon
											className={`like-icon ${post.isLiked ? "liked" : ""}`}
											onClick={() => handlePostLikes("singleClick", post)}
										/>
										<ChatBubbleOutlineOutlinedIcon />
										<TelegramIcon />
									</div>
									<div className="save">
										<BookmarkBorderIcon />
									</div>
								</PostActionIcons>
								<Likes>{post.likes}likes</Likes>
								<Caption>
									<div className={`content-${post.postID} hideContent`}>
										<span className="user owner-id">
											<Link to={`/profile/${post.userID}`}>{post.userID}</Link>
										</span>
										{post.caption}
									</div>
									<span className="show-more">
										<a href="#">...more</a>
									</span>
								</Caption>
								<Comments>
									{post.comments && post.comments.length !== 0 ? (
										<>
											{post.comments.map((comment, i) => {
												return (
													<li key={`${i}-${comment[0]}`}>
														<div>
															<Link to={`/profile/${comment[0]}`}>
																<p className="user"> {comment[0]}</p>
															</Link>
															<p className="comment">{comment[1]}</p>
														</div>
														<div>
															<FavoriteIcon style={{ fontSize: 12 }} onClick={handleCommentLike} />
														</div>
													</li>
												);
											})}
										</>
									) : (
										<p className="empty-comment-box">No Comments Yet!</p>
									)}
								</Comments>
								<CommentInput>
									<SentimentSatisfiedOutlinedIcon />
									<form>
										<input
											className={`comment-input-${post.postID}`}
											type="text"
											placeholder="Add a comment..."
											value={comment[post._id] || ""}
											onChange={(e) =>
												setComment((prevComments) => ({
													...prevComments,
													[post._id]: e.target.value
												}))}
										/>
									</form>
									<a href="#" onClick={() => handlePostComment(post, comment[post._id]) || ""}>Post</a>
								</CommentInput>
							</PostInfo>
						</UserPost>
					);
				})
			) : (
				<h1>No Posts Yet!</h1>
			)}
		</Container >
	);
};

export default Post;