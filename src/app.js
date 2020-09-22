/*
 * WARNING !!!!!!!!!!!!!!!!!!!!!!!!
 *
 * This file's only purpose is to be the entry point for webpack's build.
 * It imports the CSS and assets required.
 * The resulting dist/assets/app.js file should never be used in the actual site.
 * It does nothing.
 */
import "css/style.screen.css";
import "icons/icons.font";

// Import all images
function importAll(object) {
  return object.keys().map(object);
}

importAll(require.context("./img", true, /\.(gif|png|jpe?g|svg)$/));
