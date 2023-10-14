import { Button, Container, ErrorMessage, Form, Input, Logo, SignUpLink } from "./Login.styles";
import instagram from "../../assets/images/ins-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setAuthToken } from "../../apiConfig";

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleChange = (e, key) => {
		let obj = { ...formData, [key]: e.target.value };
		setFormData(obj);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const unfilledFields = Object.keys(formData).filter((key) => !formData[key]);
		if (unfilledFields.length) {
			setError(`${unfilledFields.join(' ')} is required`);
			return;
		}
		try {
			const url = "http://localhost:8000/api/auth/login";
			const response = await axios.post(url, formData);
			console.log(response.data);
			setAuthToken(response.data.token);
			setFormData({
				username: "",
				password: "",
			});
			navigate("/home");
		} catch (error) {
			console.error("Error logging in: ", error.response.data);
			setError(error.response.data.message);
		}
	};

	return (
		<Container>
			<Logo src={instagram} alt="Instagram" />
			<Form onSubmit={handleSubmit}>
				<Input
					type="text"
					placeholder="Username"
					value={formData.username}
					onChange={(e) => handleChange(e, "username")}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={formData.password}
					onChange={(e) => handleChange(e, "password")}
				/>
				<Button type="submit">Sign In</Button>
			</Form>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<SignUpLink>
				Do not have an account? <Link to="/register">Sign Up</Link>
			</SignUpLink>
		</Container>
	);
};

export default Login;