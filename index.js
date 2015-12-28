/*
 *  nutella-scrape
 *
 *		still learning how to scrape!
 *
 */

var got = require('got');
var cheerio = require('cheerio');

var URL = 'http://web.archive.org/web/20120216223019/http://www.reddit.com/r/science/';

got(URL, function(err, html) {
	var $ = cheerio.load(html);

	if(!err) {
		var div = $('.link');

		// console.log(div.find('div.unvoted').text());

		$(div).map(function(i, el) {

			var score = $(el).find('.score.unvoted');
			var a = $(el).find('a');

			var row = {
				score: score.text(),
				href: a.attr('href'),
				content: a.text()
			};
			console.log(row);
		});
	}
	else {
		console.log(err);
	}
});


