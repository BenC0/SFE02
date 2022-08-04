/**
 * Returns the highest CSS Z-Index of all elements matching a specified selector
 * @param {string} [elem=*] CSS selector of elements to compare Z-Index of
 * @returns {integer} The highest Z-Index
 */
export default function getHighestZIndex(elem = "*") {
  var elems = document.getElementsByTagName(elem);
  var highest = Number.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1);
  for (var i = 0; i < elems.length; i++)
  {
    var zindex = Number.parseInt(
      document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index"),
      10
    );
    if (zindex > highest)
    {
      highest = zindex;
    }
  }
  return highest;
}