import Router from "next/router";

import TrashIcon from "./svg/TrashIcon";

const deleteNote = async (id) => {
	const b = { _id: id };
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/note`, {
		method: "DELETE",
		mode: "cors",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(b), //prettier-ignore
	});
	const data = await res.json();
	return data;
};

const DeleteNote = ({ id, afterDelete }) => {
	function handleClick() {
		deleteNote(id)
			.then((res) => {
				afterDelete(res.data);
			})
			.catch((e) => {
				Router.push("/404");
				console.error(e);
			});
	}

	return (
		<button onClick={handleClick}>
			<TrashIcon />
			<span>Delete</span>
		</button>
	);
};

export default DeleteNote;
