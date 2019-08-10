'use strict';

const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const postcssFixes = require('postcss-fixes');

module.exports = ({ env }) => {
	const isDev = (env !== 'production');

	const plugins = [
		postcssPresetEnv(),
		postcssFixes({ preset: 'safe' }),
		!isDev && cssnano({
			safe: true,
			calc: false // already done by postcss-fixes due to precision rounding reasons
		})
	]
	.filter(Boolean);

	return { plugins };
};
