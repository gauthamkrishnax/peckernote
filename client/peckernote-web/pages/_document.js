import Document, { Html, Head, Main, NextScript } from "next/document"; // eslint-disable-line

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com"></link>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin
					></link>
					<link
						href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
