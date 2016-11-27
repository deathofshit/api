// eksisozluk/api

'use strict';

exports.get = (req, res) => {
  res.status(200);
  res.render('dashboard', {
    id: req.user.id,
    displayName: req.user.displayName,
    username: req.user.username,
    profileUrl: req.user.profileUrl,
    email: req.user.emails[0].value,
    photo: req.user.photos[0].value,
    accessToken: req.user.accessToken
  });
};
