#!/usr/bin/env node

/**
 * cloudi-cli
 * cli for uploading images & videos to Cloudinary
 *
 * @author Ysn4Irix <https://ysnirix.tech>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const cloudi = require('./utils/cloudinary');

const input = cli.input;
const flags = cli.flags;

(async () => {
	if (input.length === 0 || !flags || !input.includes('upload')) {
		init();
		cli.showHelp(0);
	}

	if (flags.help) {
		cli.showHelp(0);
	}

	flags.help && cli.showHelp(0);

	if (input.includes('upload')) {
		cloudi(flags.path);
	}

	flags.debug && log(flags);
})();
