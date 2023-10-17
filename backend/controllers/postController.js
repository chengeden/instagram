const mongoose = require("mongoose");
const Post = require("../models/Post");

const getAllPosts = (req, res) => {
	Post.find({})
		.then((posts) => {
			if (!posts) {
				return res.status(404).json({ message: "No post found" });
			}
			return res.status(200).json(posts);
		})
		.catch((error) => {
			console.error("Error fetching posts:", error);
			return res.status(500).json({ message: "Internal server error" });
		});
};

const createPost = async (req, res) => {
	try {
		const { userID, profilePic, location, name, likes, isLiked, caption, comments, postID } = req.body;
		const postLink = req.files.postLink.data;
		const newPost = new Post({
			userID,
			profilePic,
			location,
			postLink,
			name,
			likes,
			isLiked,
			caption,
			comments,
			postID,
		});
		await newPost.save();
		return res.status(201).json({ message: "Post Created successfully", post: newPost });
	} catch (error) {
		console.error("Error creating post:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const getPostImage = async (req, res) => {
	try {
		const id = req.params.id;
		const post = await Post.findById(id);
		if (!post || !post.postLink) {
			return res.status(404).json({ message: "Image not found" });
		}
		res.contentType('image/png');
		res.send(post.postLink);
	} catch (error) {
		console.error("Error serving image:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { getAllPosts, createPost, getPostImage };