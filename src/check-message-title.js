'use strict';

const exceptions = ['Embed'];

const checkVerb = verb => /(ed|ing)$/.test(verb) && !exceptions.includes(verb);

module.exports = function(title, checkStory) {
	if (title.length > 72) {
		return 'Message too long (maximum length: 72 chars)';
	}

	if (checkStory) {
		const r = /^([A-Z]{3}-[0-9]+): ([A-Z][a-z]*)/.exec(title);
		if (!r || checkVerb(r[2])) {
			return 'Message format not valid, must be "XXX-9999: Short summary" in present tense starting with capital letter';
		}
	} else {
		const r = /^([A-Z][a-z]*)/.exec(title);
		if (!r || checkVerb(r[1])) {
			return 'Message format not valid, must be "Short summary" in present tense starting with capital letter';
		}
	}

	return null;
};
