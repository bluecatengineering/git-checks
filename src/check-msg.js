'use strict';
const {spawnSync} = require('child_process');
const {readFileSync} = require('fs');

const checkMessageTitle = require('./check-message-title');

module.exports = (fileName, checkStory) => {
	const {stdout} = spawnSync('git', ['rev-parse', '--symbolic-full-name', '--abbrev-ref', 'HEAD'], {encoding: 'utf8'});
	if (stdout === 'master\n') {
		const content = readFileSync(fileName, {encoding: 'utf8'});
		const lines = content.split('\n').filter((l) => l[0] !== '#');
		const title = lines[0];
		let error = checkMessageTitle(title, checkStory);
		if (!error && lines.length > 1 && lines[1] !== '') {
			error = 'There must be an empty line after the message title';
		}
		if (error) {
			error +=
				'\nPlease see https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project for guidelines\nThe changes were not committed, see errors above\n';
			process.stderr.write(error, () => process.exit(1));
		} else {
			process.exit(0);
		}
	}
};
