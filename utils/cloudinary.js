const ora = require('ora');
const alert = require('cli-alerts');
const { api, v2, config } = require('cloudinary');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { green: g, yellow: y, dim: d, red: r } = require('chalk');
const clipboard = require('clipboardy');
const convertBytes = require('./convertBytes');
const cloudinaryConfig = require('./config.json');

const spinner = ora({
	text: ''
});

config({
	cloud_name: cloudinaryConfig.CLOUDINARY_CLOUD_NAME,
	api_key: cloudinaryConfig.CLOUDINARY_APIKEY,
	api_secret: cloudinaryConfig.CLOUDINARY_SECRET_KEY,
	secure: true
});

module.exports = async filePath => {
	if (filePath !== '') {
		try {
			if (!fs.existsSync(filePath)) {
				alert({
					type: `error`,
					msg: `Invalid Path or File not found!`
				});
				return;
			}

			const osUsername = os.userInfo().username;
			const linuxPath = filePath.replace(/\\/g, '/');
			const filename = path.basename(linuxPath);
			const { size } = fs.statSync(linuxPath);

			console.log();
			console.log(`${y(`Filename:`)} ${d(filename)}\n`);
			console.log(`${y(`Size:`)} ${d(convertBytes(size))}\n`);

			spinner.start(
				`${y(`🚀 Uploading...`)} \n\n${d(
					`It may take moment depending on your internet speed...`
				)}`
			);

			await api.create_folder(osUsername);
			const { secure_url } = await v2.uploader.upload(linuxPath, {
				folder: osUsername
			});
			//return console.log(result);

			spinner.succeed(`${g(`File`)} uploaded!`);
			alert({
				type: `success`,
				name: `DONE`,
				msg: `\n\n${filename} uploaded successfully.`
			});
			console.log(`${y(`Public link:`)} ${g(secure_url)}`);
			clipboard.writeSync(secure_url);
			console.log(`${d(`Link copied to clipboard.`)}`);
		} catch (error) {
			spinner.fail(`${r(`Error`)}`);
			console.log(error.message);
			//clipboard.writeSync(error);
			if (error.message === 'Invalid image file') {
				alert({
					type: `error`,
					msg: `Sorry only images & videos supported!`
				});
			} else {
				alert({
					type: `error`,
					msg: `Error uploading file 😢, try again later`
				});
			}
		}
	} else {
		spinner.fail(`${r(`Error`)}`);
		alert({
			type: `error`,
			msg: `Invalid file path use --help for infos`
		});
	}
};
