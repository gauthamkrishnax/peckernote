import { useEffect, useState } from "react";
import Router from "next/router";
import { XMasonry, XBlock } from "react-xmasonry";
import Head from "next/head";

import styles from "../styles/profile.module.scss";

import Loader from "../components/Loader";
import AddForm from "../components/AddForm";
import DeleteNote from "../components/DeleteNote";
import NavBar from "../components/Navbar";
import Note from "../components/Note";
import AddIcon from "../components/svg/AddIcon";
import { AnimatePresence } from "framer-motion";
import EditNote from "../components/EditNote";

const fetchData = async () => {
	const res = await fetch(`https://peckernote.herokuapp.com/notes`, {
		mode: "cors",
		credentials: "include",
	});
	const data = await res.json();
	return data;
};

export default function UserProfile(props) {
	const [data, setData] = useState(null);
	const [noteModal, setNoteModal] = useState(false);
	useEffect(() => {
		fetchData()
			.then((data) => {
				if (data.authfail || !data.userID) {
					setData(false);
					Router.push("/");
				}
				setData(data);
			})
			.catch((e) => {
				Router.push("/404");
				console.error(e);
			});
	}, []);

	const getNotesFromChild = (data) => {
		if (data.authfail || !data.userID) {
			setData(false);
			Router.push("/");
		}
		setData(data);
	};
	function getDateandTime(at) {
		let date = new Date(Date.parse(at));
		let hours = date.getHours();
		let minutes = date.getMinutes();
		hours > 12
			? (hours = `${hours - 12}:${minutes}PM`)
			: (hours = `${hours}:${minutes}AM`);
		return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}-  ${hours}`;
	}
	return !data ? (
		<>
			<Loader />
			<Head>
				<title>Loading</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
		</>
	) : data.userID ? (
		<>
			<Head>
				<title>Pecker Note - {data.username}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavBar name={data.username} picture={data.picture} />
			<main className={styles.container}>
				<div>
					<button
						className={styles.addNoteButton}
						onClick={() => {
							noteModal ? setNoteModal(false) : setNoteModal(true);
						}}
					>
						<AddIcon />
						<span>Add Note</span>
					</button>
					<AnimatePresence
						initial={false}
						exitBeforeEnter={true}
						onExitComplete={() => null}
					>
						{noteModal && (
							<AddForm
								formData={getNotesFromChild}
								hideModal={(data) => setNoteModal(data)}
								noteModal={noteModal}
							/>
						)}
					</AnimatePresence>
				</div>
				<div className={styles.notesContainer}>
					<XMasonry center={false} targetBlockWidth={400}>
						{data.notes
							.slice()
							.reverse()
							.map((note) => (
								<XBlock key={note._id}>
									<div className={styles.note}>
										<Note title={note.title} content={note.content} />
										<div className={styles.noteFooter}>
											<span>{getDateandTime(note.updatedAt)}</span>
											<div>
												<EditNote note={note} afterDelete={getNotesFromChild} />
												<DeleteNote
													id={note._id}
													afterDelete={getNotesFromChild}
												/>
											</div>
										</div>
									</div>
								</XBlock>
							))}
					</XMasonry>
				</div>
			</main>
		</>
	) : (
		<Loader />
	);
}

// <div>
// 	<h1>Hi {data.username}</h1>
// 	{<img src={data.picture} alt="myAvatar" /> /* eslint-disable-line */}
// 	<AddForm formData={getNotesFromChild} />
// 	<div>
// 		<ul>
// 			{data.notes.map((note) => (
// 				<div key={note._id}>
// 					<h2>{note.title}</h2>
// 					<p>{note.content}</p>
// 					<DeleteNote id={note._id} afterDelete={getNotesFromChild} />
// 				</div>
// 			))}
// 		</ul>
// 	</div>
// </div>
