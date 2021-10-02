import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";

import Loader from "../components/loader";
import GoogleIcon from "../components/svg/GoogleIcon";
import styles from "../styles/index.module.scss";

const fetchData = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notes`, {
		mode: "cors",
		credentials: "include",
	});
	const data = await res.json();
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
		<>
			<Loader />
			<Head>
				<title>Loading</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="Pecker Note is a simple note making Application for everyday needs. Use Peckernote to create and maintain notes easy and fast."
				></meta>
			</Head>
		</>
	) : (
		<div className={styles.container}>
			<Head>
				<title>Pecker Note</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
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
					<a href={`${process.env.NEXT_PUBLIC_SERVER_URL}/google`}>
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
