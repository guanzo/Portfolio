//replaces bundle hash js reference in index.html, ex. bundle.rewr325634ryegder.js -> bundle.js
const replace = require('replace-in-file');

const options = {
	files:'public/index.html',
	from: /bundle([.].+)?[.]js/g,
	to:'bundle.js'
}

try {
  let changedFiles = replace.sync(options);
}
catch (error) {
  console.error('Error occurred:', error);
}