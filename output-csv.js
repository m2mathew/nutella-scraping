/*
 *  nutella-scrape - level 4
 *
 *		still learning how to scrape!
 *
 */

var got = require('got');
var cheerio = require('cheerio');

var writer = require('format-data')('csv');

// writer.write({
// 	header1: 'value',
// 	header2: 'value'
// });

// writer.pipe(process.stdout);

/** could also write to a file like this:

var fs = require('fs')
    var file = fs.writeFileStream('output.csv')
    writer.pipe(file)

**/

var URL = 'http://web.archive.org/web/20120216223019/http://www.reddit.com/r/science/';

got(URL, function(err, html) {
	var $ = cheerio.load(html);

	if(!err) {
		var div = $('.link');

		$(div).map(function(i, el) {

			var score = $(el).find('.score.unvoted');
			var a = $(el).find('a');

			var row = {
				score: score.text(),
				href: a.attr('href'),
				content: a.text()
			};
			writer.write(row);
		});
		writer.pipe(process.stdout);
	}
	else {
		console.log(err);
	}
});


// OFFICIAL SOLUTION

/**

var cheerio = require('cheerio')
    var got = require('got')
    var writer = require('format-data')('csv')

    var URL = 'http://web.archive.org/web/20120216223019/http://www.reddit.com/r/science/'

    got(URL, function (err, html) {
      $ = cheerio.load(html)
      $('.link').map(function (i, el) {
        el = $(el)
        var score = el.find('.score.unvoted')
        var a = el.find('a')
        var row = {
          score: score.text(),
          href: a.attr('href'),
          content: a.text()
        }
        writer.write(row)
      })
    })

    writer.pipe(process.stdout)

**/
