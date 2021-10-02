import Link from "next/link";
import styles from "../styles/index.module.scss";

import ArrowIcon from "../components/svg/ArrowIcon";

export default function UserProfile({ message = "404 Error 😬" }) {
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
					<h1>{message}</h1>
					<p>
						Sorry! We are unable to proceed with your request.
						<br /> Try again after some time.
					</p>
				</article>
				<section>
					<Link href="/" passHref>
						<a id="goBackHome">
							<ArrowIcon /> Go back{" "}
						</a>
					</Link>
				</section>
				<span>**This Application is made for education purpose only</span>
			</main>
			<div className={styles.illustration}></div>
		</div>
	);
}
