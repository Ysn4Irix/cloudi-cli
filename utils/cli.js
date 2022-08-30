const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	path: {
		type: `string`,
		default: "",
		desc: `Image or video path`
	},
	clear: {
		type: `boolean`,
		default: false,
		desc: `Clear the console`
	},
	help: {
		type: `boolean`,
		default: false,
		desc: `Print help info`
	},
	debug: {
		type: `boolean`,
		default: false,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};

const commands = {
	upload: {
		desc: `Upload file to cloudinary`
	}
};

const helpText = meowHelp({
	name: `cloudi`,
	flags,
	commands,
	defaults: false
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	allowUnknownFlags: false,
	flags
};

module.exports = meow(helpText, options);