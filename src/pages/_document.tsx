// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
					/>
				</Head>
				<body>
					<Main/>
					<script src="https://cdn.polyfill.io/v2/polyfill.min.js"/>
					<NextScript/>
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
