import styles from "../styles/index.module.scss";
import GoogleIcon from "../components/svg/GoogleIcon";
import Router from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/loader";

const fetchData = async () => {
	const res = await fetch(`http://localhost:5000/notes`, {
		mode: "cors",
		credentials: "include",
	});
	const data = await res.json();
	console.log(data);
	return data;
};

export default function UserProfile() {
	const [showLoader, setShowLoader] = useState(true);
	useEffect(() => {
		fetchData()
			.then((data) => {
				if (!data.authfail && data.userID) {
					Router.push("/profile");
				} else {
					setShowLoader(false);
				}
			})
			.catch((e) => {
				Router.push("/404");
				console.error(e);
			});
	}, []);
	return showLoader ? (
		<Loader />
	) : (
		<div className={styles.container}>
			<main className={styles.main}>
				<article>
					<h1>Pecker Note</h1>
					<p>
						A Simple note app for your everyday needs.
						<br /> Create and maintain notes easy and fast.
					</p>
				</article>
				<section>
					<h4>Sign In / Sign Up</h4>
					<a href="http://localhost:5000/google">
						<button tabIndex="-1">
							<GoogleIcon />
							<span>Sign in with Google</span>
						</button>
					</a>
				</section>
				<span>**This Application is made for education purpose only</span>
			</main>
			<div className={styles.illustration}></div>
		</div>
	);
}
