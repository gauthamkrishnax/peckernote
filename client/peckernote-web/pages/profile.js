import { useEffect, useState } from "react";
import AddForm from "../components/AddForm";
import DeleteNote from "../components/DeleteNote";

const fetchData = async () => {
	const res = await fetch(`http://localhost:5000/notes`, {
		mode: "cors",
		credentials: "include",
	});
	const data = await res.json();
	console.log(data);
	return data;
};

export default function UserProfile(props) {
	const [data, setData] = useState(null);
	useEffect(() => {
		fetchData().then((data) => {
			setData(data);
		});
	}, []);

	const getNotesFromChild = (data) => {
		setData(data);
	};
	return data ? (
		<div>
			<h1>Hi {data.username}</h1>
			{<img src={data.picture} alt="myAvatar" /> /* eslint-disable-line */}
			<AddForm formData={getNotesFromChild} />
			<div>
				<ul>
					{data.notes.map((note) => (
						<div key={note._id}>
							<h2>{note.title}</h2>
							<p>{note.content}</p>
							<DeleteNote id={note._id} afterDelete={getNotesFromChild} />
						</div>
					))}
				</ul>
			</div>
		</div>
	) : (
		<h1>Loading...</h1>
	);
}
