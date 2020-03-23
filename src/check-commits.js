'use strict';
const {spawnSync} = require('child_process');

const checkMessageTitle = require('./check-message-title');

const z40 = '0000000000000000000000000000000000000000';

const checkMerges = (range, localRef) => {
	const {stdout} = spawnSync('git', ['rev-list', '--merges', range], {encoding: 'utf8'});
	return stdout ? 'Found merges in ' + localRef + ', not pushing\n' : null;
};

const checkMessages = (range, localRef, checkStory) => {
	const {stdout} = spawnSync('git', ['rev-list', '--pretty=oneline', range], {encoding: 'utf8'});
	const errors = [];
	stdout.split('\n').forEach((line) => {
		if (!line) return;
		const r = /^(\S+) (.+)$/.exec(line);
		const title = r[2];
		const error = checkMessageTitle(title, checkStory);
		if (error) {
			errors.push(title, '- ' + error);
		}
	});
	if (errors.length) {
		errors.push(
			'\nFound commit message errors in ' +
				localRef +
				', not pushing\nPlease see https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project for guidelines\n'
		);
		return errors.join('\n');
	}
	return null;
};

module.exports = (input, checkStory) => {
	const errors = input
		.split('\n')
		.map((line) => {
			if (!line) return null;
			const result = /(\S+) (\S+) (\S+) (\S+)/.exec(line);
			const localRef = result[1],
				localSha = result[2],
				remoteRef = result[3],
				remoteSha = result[4];
			if (remoteRef.endsWith('master') && localSha !== z40) {
				const range = remoteSha === z40 ? localSha : remoteSha + '..' + localSha;
				return checkMerges(range, localRef) || checkMessages(range, localRef, checkStory);
			}
			return null;
		})
		.filter((e) => e !== null);

	if (errors.length) {
		process.stderr.write(errors.join('\n'), () => process.exit(1));
	} else {
		process.exit(0);
	}
};
