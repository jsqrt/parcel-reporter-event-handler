const { Reporter } = require('@parcel/plugin');
const watcher = require('@parcel/watcher');
const fs = require('fs');
const path = require('path');

// trigger bundle when parcle freezes
const triggerBundle = () => {
	const triggerFile = path.resolve(process.cwd(), './.parcelrc');

	const fileContent = fs.readFileSync(triggerFile, {
		encoding: 'utf8',
	});
	fs.writeFileSync(triggerFile, fileContent);
};

const handleWatch = (err, events) => {
	if (process.fatalError) {
		process.fatalError = false;
		triggerBundle();
	}
};

module.exports = new Reporter({
	async report({ event, options }) {
		if (!this.subscribtion) {
			this.subscribtion = watcher.subscribe(
				process.cwd().concat('/src'),
				handleWatch,
			);
		}

		if (event.type === 'buildFailure') {
			process.fatalError = true;
		}
	},
});
