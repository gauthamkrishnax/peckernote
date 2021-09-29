import { useEffect, useState } from "react";
import Image from "next/image";

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
	return data ? (
		<div>
			<h1>Hi {data.username}</h1>
			<img src={data.picture} alt="myAvatar" />
		</div>
	) : (
		<h1>Loading...</h1>
	);
}
