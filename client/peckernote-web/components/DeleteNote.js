const deleteNote = async (id) => {
	const b = { _id: id };
	const res = await fetch(`http://localhost:5000/note`, {
		method: "DELETE",
		mode: "cors",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(b), //prettier-ignore
	});
	const data = await res.json();
	console.log(data);
	return data;
};

const DeleteNote = ({ id, afterDelete }) => {
	function handleClick() {
		deleteNote(id)
			.then((res) => {
				afterDelete(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	return <button onClick={handleClick}>Delete</button>;
};

export default DeleteNote;
