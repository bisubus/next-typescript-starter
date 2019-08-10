'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const IGNORED_FILENAMES = [/[/\\].git([/\\]|$)/, /[/\\]scripts[/\\]init-project\.js$/, /[/\\]node_modules([/\\]|$)/i, /~~/];

const AUTHOR_PLACEHOLDER_REGEXP = /author-name-placeholder/g;
const PROJECT_PLACEHOLDER_REGEXP = /ProjectNamePlaceholder|project-name-placeholder/;
const PROJECT_PLACEHOLDER_PASCAL_CASE_REGEXP = /ProjectNamePlaceholder/g;
const PROJECT_PLACEHOLDER_KEBAB_CASE_REGEXP = /project-name-placeholder/g;
const PACKAGE_PLACEHOLDER_REGEXP = /package-name-placeholder/g;
const AUTHOR_NAME_REGEXP = /[a-z0-9-]+/i;
const PROJECT_NAME_REGEXP = /[a-z0-9-]+/i;
const PACKAGE_NAME_REGEXP = /(@[a-z0-9-]+\/|)[a-z0-9-]+/i;
const INIT_SCRIPT_REGEXP = /[ \t]*"init": "node \.\/scripts\/init-project\.js[^"]*",?[\n\r]*/;

const args = process.argv.slice(2);
let isDryRun = false;

if (args[0] === '--dry-run') {
	isDryRun = true;
	args.splice(0, 1);
}

if (args.length < 3) {
	console.log('Usage:');
	console.log('node init-project.js [--dry-run] author-name project-name package-name');
}

const [authorName, projectName, packageName] = args;

assert.ok(authorName, 'No author name');
assert.ok(AUTHOR_NAME_REGEXP.test(authorName), authorName);

assert.ok(projectName, 'No project name');
assert.ok(PROJECT_NAME_REGEXP.test(projectName), projectName);

assert.ok(packageName, 'No package name');
assert.ok(PACKAGE_NAME_REGEXP.test(packageName), packageName);

function init() {
	const rootPath = path.join(__dirname, '..');
	const packageJsonPath = path.join(__dirname, '../package.json');

	for (const filePath of walkSync(rootPath)) {
		let fileContent = fs.readFileSync(filePath, 'utf8');

		let isModified;

		if (AUTHOR_PLACEHOLDER_REGEXP.test(fileContent)) {
			fileContent = fileContent
			.replace(AUTHOR_PLACEHOLDER_REGEXP, authorName);

			isModified = true;
		}

		if (PROJECT_PLACEHOLDER_REGEXP.test(fileContent)) {
			fileContent = fileContent
			.replace(PROJECT_PLACEHOLDER_PASCAL_CASE_REGEXP, toPascalCase(projectName))
			.replace(PROJECT_PLACEHOLDER_KEBAB_CASE_REGEXP, projectName);

			isModified = true;
		}

		if (PACKAGE_PLACEHOLDER_REGEXP.test(fileContent)) {
			fileContent = fileContent
			.replace(PACKAGE_PLACEHOLDER_REGEXP, packageName);

			isModified = true;
		}

		if (filePath === packageJsonPath) {
			fileContent = fileContent
			.replace(INIT_SCRIPT_REGEXP, '');

			isModified = true;
		}

		if (isModified) {
			console.log(`Processed: ${filePath}`);

			if (!isDryRun) {
				fs.writeFileSync(filePath, fileContent, 'utf8');
			}
		}
	}

	// Cleanup
	console.log(`Removed: ${__filename}`);
	if (!isDryRun) {
		fs.unlinkSync(__filename);

		try {
			fs.rmdirSync(path.join(__dirname, '../scripts'));
		} catch (err) {
			if (err.code !== 'ENOTEMPTY') {
				throw err;
			}
		}
	}
}

function toPascalCase(str) {
	return str.replace(/(\w)(\w*)/g, (match, p1, p2) => (p1.toUpperCase() + p2.toLowerCase()));
}

function* walkSync(dir) {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const pathToFile = path.join(dir, file);

		const isIgnored = IGNORED_FILENAMES.reduce((isIgnored, regexp) => (isIgnored || regexp.test(pathToFile)), false);

		if (isIgnored) {
			continue;
		}

		const isDirectory = fs.statSync(pathToFile).isDirectory();

		if (isDirectory) {
			yield* walkSync(pathToFile);
		} else {
			yield pathToFile;
		}
	}
}

init();
