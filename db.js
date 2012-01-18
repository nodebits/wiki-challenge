var FS = require('fs');
var Path = require('path');
var Markdown = require('markdown').markdown;

// This function is used to map wiki page names to files
// on the real filesystem.
function pathFromName(name) {
  return Path.join(__dirname, "pages", name + ".markdown");
}

// Load a file from disk and parse out the title and generate the HTML
exports.loadPage = function (name, callback) {
  // Attempt to load the file from disk
  var path = pathFromName(name);
  FS.readFile(path, 'utf8', function (err, markdown) {
    var exists = true;
    if (err) {
      // If it's not there, generate a placeholder body
      if (err.code === "ENOENT") {
        markdown = "# " + name.replace(/_/g, " ") + "\n\n" + 
                   "This page does not exist yet.  Be the first to write it.";
        exists = false;
      } else {
        // Forward all other errors on
        return callback(err);
      }
    }

    // Parse the markdown extracting the first header as the title
    // and then render as an HTML string
    var tree = Markdown.parse(markdown);
    var title = name;
    for (var i = 1, l = tree.length; i < l; i++) {
      if (tree[i] && tree[i][0] === "header") {
        title = tree[i][2];
        tree.splice(i, 1);
        break;
      }
    }
    var html = Markdown.toHTML(tree);

    // Send back the page as an object
    callback(null, {
      name: name,
      title: title,
      exists: exists,
      markdown: markdown,
      html: html,
    });
  });
};

// Saving is simple.  Just put the markdown in the file
exports.savePage = function (name, value, callback) {
  var path = pathFromName(name);
  FS.writeFile(path, value, callback);
};
