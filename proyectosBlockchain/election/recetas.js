const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  uri: `https://cookpad.com/cl/recetas/284184`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    console.log($);
  })
  .catch((err) => {
    console.log(err);
  });
