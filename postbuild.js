//adds hash string to bundle.js for cache busting, ex. bundle.js -> bundle.rewr325634ryegder.js
//and changes reference in html <script>
var hashFiles = require('hash-files');
var fs = require('fs')
var replace = require('replace-in-file')


// options is optional 
hashFiles({ files: ['public/dist/bundle.js']}, function(error, hash) {
	fs.rename('public/dist/bundle.js','public/dist/bundle.'+hash+'.js')
	
	const options = {
		files:'public/index.html',
		from: /bundle([.].+)?[.]js/g,
		to:'bundle.'+hash+'.js'
	}
	
	try {
	  let changedFiles = replace.sync(options);
	}
	catch (error) {
	  console.error('Error occurred:', error);
	}
	
});

