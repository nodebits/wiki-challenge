// Load our model abstraction so we can load and save pages in the wiki.
var DB = require('../db');

// When the wiki is initially loaded, simply redirect to the `home` page.
exports.index = function(req, res) {
  res.redirect("/home");
};

// Load a page from the database and render as html
exports.view = function (req, res, next) {
  DB.loadPage(req.params.name, function (err, page) {
    if (err) return next(err);
    res.render('view', page);
  });
};

// Load a page from the database and render edit form
exports.edit = function (req, res, next) {
  DB.loadPage(req.params.name, function (err, page) {
    if (err) return next(err);
    res.render('edit', page);
  });
};

// Save changes to a page and redirect to view page
exports.save = function (req, res, next) {
  DB.savePage(req.params.name, req.body.markdown, function (err) {
    if (err) return next(err)
    res.redirect("/" + req.params.name);
  });
}