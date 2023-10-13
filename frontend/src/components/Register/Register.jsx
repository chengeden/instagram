import { Button, Container, ErrorMessage, Form, Input, Logo, SignUpLink } from "./Register.styles";
import instagram from "../../assets/images/ins-logo.png";
import { useState } from "react";

const Register = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		username: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleChange = (e, key) => {
		let obj = { ...formData, [key]: e.target.value };
		setFormData(obj);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("formData", formData);
		const unFilledFields = Object.keys(formData).filter((key) => !formData[key]);
		if (unFilledFields.length) {
			setError(`${unFilledFields.join(" ")} are required!`);
			return;
		}
		console.log('Ready to register');
	};

	return (
		<Container>
			<Logo src={instagram} alt="Instagram" />
			<Form onSubmit={handleSubmit}>
				<Input
					type="text"
					placeholder="Full Name"
					value={formData.fullName}
					onChange={(e) => handleChange(e, "fullName")}
				/>
				<Input
					type="text"
					placeholder="Mobile Number or Email"
					value={formData.email}
					onChange={(e) => handleChange(e, "email")}
				/>
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
				<Button type="submit">Sign Up</Button>
			</Form>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<SignUpLink>Already have an account? <a href="#">Log in</a></SignUpLink>
		</Container>
	);
};

export default Register;