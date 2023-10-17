import { useState } from "react";
import { ErrMessage, FormButton, FormContainer, FormInput, FormLabel } from "./Profile.styles";
import { axiosInstance } from "../../apiConfig";
import { useDispatch } from "react-redux";
import { saveProfileData } from "../../Redux/ProfileData";

const CreateProfile = ({ userID, setIsProfileCreated }) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: "",
		category: "",
		bio: "",
		profilePic: "",
		userID: userID,
		followers: "22k",
		following: 666,
		verified: true,
	});
	const [errorMessage, setErrorMessage] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValidated = Object.keys(formData).every((key) => formData[key]);
		if (!isValidated) {
			setErrorMessage("Please enter the required fields!");
			return;
		}
		setErrorMessage("");
		const formDataToSubmit = new FormData();
		formDataToSubmit.append('name', formData.name);
		formDataToSubmit.append('category', formData.category);
		formDataToSubmit.append('bio', formData.bio);
		formDataToSubmit.append('profilePic', formData.profilePic, formData.profilePic.name);
		formDataToSubmit.append('userID', formData.userID);
		formDataToSubmit.append('followers', formData.followers);
		formDataToSubmit.append('following', formData.following);
		formDataToSubmit.append('verified', formData.verified);
		try {
			const response = await axiosInstance.post(
				"/api/profiles",
				formDataToSubmit,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			const updatedProfiles = await axiosInstance.get("/api/profiles");
			dispatch(saveProfileData(updatedProfiles.data));
			setIsProfileCreated(true);
			console.log("Profile uploaded successfully:", response.data);
		} catch (error) {
			console.error("Error uploading profile:", error);
		}
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setFormData({ ...formData, profilePic: file });
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	return (
		<FormContainer>
			<h2>Create Your Profile</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<FormLabel htmlFor="profilePic">Profile Picture</FormLabel>
					<FormInput
						type="file"
						id="profilePic"
						name="profilePic"
						onChange={handleImageChange}
					/>
				</div>
				<div>
					<FormLabel htmlFor="name">Name</FormLabel>
					<FormInput
						type="text"
						id="name"
						name="name"
						value={formData.name || ""}
						onChange={handleChange}
					/>
				</div>
				<div>
					<FormLabel htmlFor="category">Category</FormLabel>
					<FormInput
						type="text"
						id="category"
						name="category"
						value={formData.category || ""}
						onChange={handleChange}
					/>
				</div>
				<div>
					<FormLabel htmlFor="bio">Bio</FormLabel>
					<FormInput
						type="text"
						id="bio"
						name="bio"
						value={formData.bio || ""}
						onChange={handleChange}
					/>
				</div>
				<div>
					<FormButton type="submit">Create Profile</FormButton>
				</div>
				{errorMessage && <ErrMessage>{errorMessage}</ErrMessage>}
			</form>
		</FormContainer>
	);
};

export default CreateProfile;