// eksisozluk/api

'use strict';

// core packages
const crypto = require('crypto');
const fs = require('fs');

// usage : {{ asset '/css/style.css' }}
// usage : {{ asset '/js/app.min.js' }}
module.exports = (path, precision) => {
  if (typeof path.length === 'undefined') {
    return;
  }

  if (typeof precision !== 'number' || precision <= 0) {
    precision = 10;
  }

  const fullPath = './public' + path;
  const md5 = crypto.createHash('md5');
  let hash = '';

  try {
    const content = fs.readFileSync(fullPath);

    md5.update(content);
    hash = md5.digest('hex').slice(0, precision);
  }
  catch (err) {
    console.error('Failed to generate hash. Check if file exists: ' + path);
    console.error('Error: ' + err.message);
  }

  return path + '?v=' + hash;
};
