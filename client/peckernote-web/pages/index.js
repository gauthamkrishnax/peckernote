import styles from "../styles/index.module.scss";
import GoogleIcon from "../components/svg/GoogleIcon";

export default function UserProfile() {
	// async function authenticate() {
	// 	const res = await fetch("http://localhost:5000/google", {
	// 		method: "GET",
	// 		mode: "no-cors",
	// 	});
	// }

	return (
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
