const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');

module.exports = () => {
	unhandled();
	welcome({
		title: `cloudi`,
		tagLine: `by Ysn4Irix`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true
	});
};
