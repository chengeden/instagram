import { Caption, Container, Likes, Media, PostActionIcons, PostInfo, UserInfo, UserPost } from "./Post.styles";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { axiosInstance } from "../../apiConfig";

const Post = () => {
	const allPosts = useSelector((state) => state.post.postData);
	return (
		<Container>
			{allPosts && allPosts.length > 0 ? (
				allPosts.map((post) => {
					return (
						<UserPost key={post.postID} className={`post-${post.postID}`}>
							<UserInfo>
								<div className="post-info">
									<div className="icon">
										<img src={`http://localhost:8000/api/profiles/image/${post.userID}`} alt="profile icon" />
									</div>
									<div className="id-location">
										<p className="user owner-id">
											<Link to={`/profile/${post.userID}`}>{post.userID}</Link>
										</p>
									</div>
								</div>
								<MoreHorizIcon />
							</UserInfo>
							<Media>
								<FavoriteIcon className={`like-post-${post.postID}`} />
								<img src={`http://localhost:8000/api/posts/image/${post._id}`} alt="post" />
							</Media>
							<PostInfo>
								<PostActionIcons>
									<div className="actions">
										<FavoriteIcon className={`like-icon ${post.isLiked ? "liked" : ""}`} />
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
							</PostInfo>
						</UserPost>
					);
				})
			) : (
				<h1>No Posts Yet!</h1>
			)}
		</Container>
	);
};

export default Post;