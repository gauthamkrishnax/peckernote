import EditIcon from "./svg/EditIcon";
import { motion } from "framer-motion";
import { useState } from "react";
import Router from "next/router";

import styles from "../styles/editNote.module.scss";

const addNote = async (note) => {
	const res = await fetch(`https://peckernote.herokuapp.com/note`, {
		method: "PUT",
		mode: "cors",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(note),
	});
	const data = await res.json();
	return data;
};

const AddForm = ({ note, formData, hideModal }) => {
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);

	function handleSubmit(e) {
		e.preventDefault();
		// console.log({ title: title, content: content });
		addNote({ _id: note._id, title: title, content: content })
			.then((res) => {
				hideModal(false);
				// setIsOpen(false);
				formData(res.data);
			})
			.catch((e) => {
				Router.push("/404");
				console.error(e);
			});
		setTitle("");
		setContent("");
	}

	//ANIMATION

	const dropIn = {
		hidden: {
			y: "-100vh",
			opacity: 0,
			scale: 0,
		},
		visible: {
			y: "0",
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.1,
				type: "spring",
				damping: 40,
				stiffness: 800,
			},
		},
		exit: {
			y: "-100vh",
			opacity: 0,
			scale: 0,
		},
	};

	// const [isOpen, setIsOpen] = useState(false);

	function animateAndHideModal(e) {
		e.preventDefault();
		hideModal(false);
		return false;
	}
	return (
		<div className={styles.container}>
			<motion.form
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={dropIn}
				className={`${styles.form} ${styles.comeDownAnimation}`}
				onSubmit={(e) => handleSubmit(e)}
			>
				<div className={styles.arrow}></div>
				<span>
					{" "}
					<label>Title :</label>
					<input
						type="text"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</span>

				<br />
				<span>
					<label>Content :</label>
					<textarea
						placeholder="Add Your Note Content Here ..."
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}
					/>
				</span>

				<div>
					<input type="submit" value="Edit Note" />
					<button onClick={(e) => animateAndHideModal(e)}>Cancel</button>
				</div>
			</motion.form>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={() => hideModal(false)}
				className={styles.modalBackground}
			></motion.div>
		</div>
	);
};

const EditNote = ({ note, afterDelete }) => {
	const [noteModal, setNoteModal] = useState(false);
	function handleClick() {
		setNoteModal(true);
	}
	function setNoteModalfun(data) {
		setNoteModal(data);
	}

	return (
		<>
			{noteModal && (
				<AddForm
					note={note}
					formData={afterDelete}
					hideModal={(data) => setNoteModalfun(data)}
					noteModal={noteModal}
				/>
			)}
			<button onClick={handleClick}>
				<EditIcon /> <span>Edit</span>
			</button>
		</>
	);
};

export default EditNote;
