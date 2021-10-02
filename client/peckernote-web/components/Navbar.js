import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Navbar.module.scss";
import ProfileInfo from "./ProfileInfo";

const NavBar = ({ name, picture }) => {
	const [showProfile, setShowProfile] = useState(false);
	function clickHandler() {
		setShowProfile(!showProfile);
	}
	return (
		<header className={styles.container}>
			<Link href="/">
				<a>
					<h2>Pecker Note</h2>
				</a>
			</Link>
			<div onClick={clickHandler} className={styles.profileInfo}>
				<span>{`Hey ${name} !`}</span>
				<div className={styles.avatar}>
					{<img src={picture} alt="Profile Picture" /> /*eslint-disable-line */}
				</div>
			</div>
			{showProfile && <ProfileInfo />}
		</header>
	);
};

export default NavBar;
