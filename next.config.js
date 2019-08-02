const path = require('path');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const nextComposePlugins = require('next-compose-plugins');

const nextAlias = require('@blunck/next-alias');
const nextCss = require('@zeit/next-css');
const nextImages = require('next-images');
const nextLess = require('@zeit/next-less');
const nextProgressBar = require('next-progressbar');
const nextSass = require('@zeit/next-sass');
const nextSize = require('next-size');
const nextSourceMaps = require('@zeit/next-source-maps');
const nextTranspileModules = require('next-transpile-modules');


const nextBundleAnalyzer = ({ enabled = true }) => (nextConfig = {}) => (
	Object.assign({}, nextConfig, {
		webpack(config, options) {
			const { isServer } = options;
			const { bundleAnalyzer: bundleAnalyzerOptions = {} } = nextConfig;

			if (enabled) {
				const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

				config.plugins.push(
					new BundleAnalyzerPlugin({
						analyzerMode: 'static',
						reportFilename: isServer
							? '../analyze/server.html'
							: './analyze/client.html',
						...bundleAnalyzerOptions
					})
				);
			}

			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options);
			}

			return config;
		}
	})
);

const nextMaxify = ({ enabled }) => (nextConfig = {}) => (
	Object.assign({}, nextConfig, {
		webpack(config, options) {
			if (enabled) {
				config.optimization.minimize = false;
			}

			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options);
			}

			return config;
		}
	})
);

const nextSvgr = (nextConfig = {}) => (
	Object.assign({}, nextConfig, {
		webpack(config, options) {
			config.module.rules.push({
				test: /\.svg$/,
				use: ['@svgr/webpack', 'url-loader']
			});

			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options);
			}

			return config;
		}
	})
);

module.exports = (phase, { defaultConfig }) => {
	const isDev = (phase === PHASE_DEVELOPMENT_SERVER);

	const config = {
		dir: 'src',
		distDir: '../dist'
	};

	if (isDev) { /* ... */ }

	const plugins = [
		// Styles
		[nextCss, {
			cssModules: true,
			cssLoaderOptions: {
				importLoaders: 1,
				localIdentName: '[local]___[hash:base64:5]'
			}
		}],
		[nextLess, {
			cssModules: true,
			lessLoaderOptions: { javascriptEnabled: true },
			cssLoaderOptions: {
				importLoaders: 1,
				localIdentName: '[local]___[hash:base64:5]'
			}
		}],
		[nextSass, {
			cssModules: true,
			cssLoaderOptions: {
				importLoaders: 1,
				localIdentName: '[local]___[hash:base64:5]'
			}
		}],

		// Images
		[nextImages, { exclude: /\.svg$/ }],
		[nextSvgr],

		// Modules
		[nextAlias({
			'@': path.join(__dirname, 'src')
		})],
		[nextTranspileModules, {
			transpileModules: []
		}],

		[nextBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }), {
			bundleAnalyzer: { openAnalyzer: false }
		}],
		[nextMaxify({ enabled: process.env.MINIFY === 'false' })],
		[nextProgressBar, {
			progressBar: { profile: false }
		}],
		[nextSize],
		[nextSourceMaps({})]
	];

	const pluginsConfig = nextComposePlugins(plugins, config)(phase, { defaultConfig });

	return pluginsConfig;
};
