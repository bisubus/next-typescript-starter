import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import { NextSeo } from 'next-seo';

import Home from '../components/Home';

const IndexPage: React.FC<{}> & NextPage<{}> = () => (
	<>
		<NextSeo
			title="Home"
			description=""
		/>
		<Home/>
	</>
);

IndexPage.getInitialProps = async (_ctx: NextPageContext) => ({});

export default IndexPage;
