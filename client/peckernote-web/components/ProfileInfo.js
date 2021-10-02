import Router from "next/router";

import styles from "../styles/Navbar.module.scss";

const ProfileInfo = () => {
	const fetchData = async () => {
		const res = await fetch(`http://localhost:5000/logout`, {
			mode: "cors",
			credentials: "include",
		});
		const data = await res.json();
		return data;
	};

	function handleClick() {
		fetchData()
			.then((data) => {
				if (data.authfail && !data.userID) {
					Router.push("/");
				}
			})
			.catch((e) => {
				Router.push("/404");
				console.error(e);
			});
	}
	return (
		<div className={styles.profileInfoButton}>
			<button onClick={handleClick}>Logout</button>
		</div>
	);
};

export default ProfileInfo;
