import DeleteNote from "./DeleteNote";

const Note = ({ title, content }) => {
	return (
		<article>
			<h3>{title}</h3>
			<p>{content}</p>
		</article>
	);
};

export default Note;
