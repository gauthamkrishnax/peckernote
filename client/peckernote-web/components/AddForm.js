import { useState } from "react";

const addNote = async (note) => {
	const res = await fetch(`http://localhost:5000/note`, {
		method: "POST",
		mode: "cors",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(note),
	});
	const data = await res.json();
	console.log(data);
	return data;
};

const AddForm = ({ formData }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		// console.log({ title: title, content: content });
		addNote({ title: title, content: content })
			.then((res) => {
				formData(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
		setTitle("");
		setContent("");
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Title</label>
				<input
					type="text"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<label>Content</label>
				<textarea
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
				/>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default AddForm;
