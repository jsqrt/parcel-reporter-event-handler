const { Reporter } = require('@parcel/plugin');
const watcher = require('@parcel/watcher');
const fs = require('fs');
const path = require('path');
// const { exec, execSync } = require('child_process');
// const kill = require('kill-port');

const triggerBundle = () => {
	const triggerFile = path.resolve(process.cwd(), './.parcelrc');

	const fileContent = fs.readFileSync(triggerFile, {
		encoding: 'utf8',
	});
	fs.writeFileSync(triggerFile, fileContent);
};

// const handleFatalError = () => {
// 	if (!process.fatalError) return;
// 	process.fatalError = false;

// 	// process.stdout.write(` ❌ Fatal error. Rebuilding... \n`);
// 	// kill(8080, 'tcp');

// 	const ls = execSync(
// 		'node dev-scripts/clear-cache.mjs && node ./dev-scripts/prebuild.mjs && parcel serve src/pug/pages/*.pug --port=8080',
// 		(error, stdout, stderr) => {},
// 	);

// 	process.exit();
// };

const handleWatch = (err, events) => {
	if (process.fatalError) {
		process.fatalError = false;
		triggerBundle();
	}
};

module.exports = new Reporter({
	async report({ event, options }) {
		// process.stdout.write(`${event.type}...\n`);

		if (!this.subscribtion) {
			this.subscribtion = watcher.subscribe(process.cwd().concat('/src'), handleWatch);

			// process.on('uncaughtException', (error) => {
			// 	process.fatalError = true;
			// 	handleFatalError();
			// });
		}

		if (event.type === 'buildFailure') {
			process.fatalError = true;

			// if (event.diagnostics[0]?.message?.includes('Expected content key')) {
			// 	handleFatalError();
			// }
		}
	},
});
