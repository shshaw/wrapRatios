/*! wrapRatios - v1 - 2015-09-15
 * https://github.com/shshaw/wrapRatios */

(function(){
  "use strict";
  var c = 'wrapRatios', // Function name, also used for BEM classes
      attr = 'data-ratio', // Default selector and attribute
      style = '<style>.'+c+'{position:relative;}.'+c+'__content{position:absolute;top:0;left:0;width:100%;height:100%;}.'+c+'__sizer{display:block;width:100%;height:auto;visibility:hidden;}</style>', // The style injected into the head on first run.
      d = document,
      b = d.body,
      strType = typeof "";

  function makeRatio(r) {
    if ( !r ) { return false; }
    r = r.split(/[x|:]/);
    if ( r.length !== 2 ) { return false; }
    return [100,Math.round(100 * (r[1] / r[0]))];
  }

  /**
   * wrapRatios()
   * Wrap elements to preserve their ratio across any screen size.
   *
   * @param {string|element[]|NodeList} selector - The elements to apply a ratio. Default selector is `[data-ratio]` and the ratio will be pulled from the `data-ratio` attribute or the element's width & height unless a specific ratio is given when called.
   * @param {string} ratio - Force a specific ratio
   */
  window[c] = function(selector, ratio) {
    // By default, find all children with the attribute `data-ratio` or pass in your own selector
    selector = selector || '['+attr+']';
    ratio = makeRatio(ratio); //(ratio && ratio.indexOf('x') > 0 ? ratio : false );

    // If an element or Array/NodeList of elements is passed in, go ahead and use that. Otherwise find elements with `querySelectorAll`
    var elems = ( typeof selector === strType ? b.querySelectorAll(selector) :
                 selector instanceof Element ? [selector] : selector ),
        len = elems.length,
        i = 0,
        el, r, w, s;

    // Exit if no items provided/found
    if ( !len ) { return false; }

    // Insert needed styles to document head. This will only execute once.
    if ( style ) {
      d.head.insertAdjacentHTML('afterbegin',style);
      style = null;
    }

    // Loop through all elements and wrap them.
    for (; i < len; i++) {
      el = elems[i];
      r = ratio || // Use supplied ratio
        makeRatio(el.getAttribute(attr)) || // or get the data-ratio attribute.
        // If the ratio is not supplied, we'll use the width and height attributes
        [
          el.getAttribute('width'),
          el.getAttribute('height')
        ];

      // Exit out if no aspect ratio or width/height.
      if (!r[0] || !r[1]) { continue; }

      // Create a container div with the proper classes for the responsive styling
      w = d.createElement('div');
      w.className = c+' '+c+'--dynamic';

      //c.style.display = ( getComputedStyle(el).display.indexOf('inline') >= 0 ? 'inline-block' : 'block' );

      // Insert a canvas into the container with the proper aspect ratio. The browser will keep proper sizing of a canvas, just like an image.
      w.innerHTML = '<canvas class="'+c+'__sizer" width="' + r[0] + '" height="' + r[1] + '"></canvas>';

      el.parentElement.insertBefore(w, el); // Insert the container where the element is
      el.parentElement.removeChild(el); // Take the element out of the document so we can make a few changes before inserting it back
      el.removeAttribute(attr); // Remove the data-ratio attribute so that the element won't ever be reprocessed.
      el.className += ' '+c+'__content'; // Give the element the proper class
      w.appendChild(el); // Put the element in the container
    }
  };

  window[c]();

}());