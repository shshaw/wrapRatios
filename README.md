# wrapRatios
*Micro JS Utility For Responsive Ratios*
  
Browsers don't maintain aspect ratios for iframes and other embedded elements when responsively sized. Enter `wrapRatios`, a Javascript utility that wraps elements in a `div` container with a `canvas` of the proper aspect ratio. No matter the window size, your videos and content will keep their ratio.

Works in all browsers, IE9+. View the [demo](http://codepen.io/shshaw/pen/BNXWOo) or view a [CSS-only demo](http://codepen.io/shshaw/pen/ZGgXLj) if you want to copy do this manually.

## How To Use

To use `wrapRatios`, add the `data-ratio` attribute to an element and include the [minified script](wrapRatios.min.js), weighing only 1kb (0.6kb gzipped) which includes all the required styles.

The script automatically wraps any elements with the `data-ratio` attribute, but a selector, element or array of elements can be passed as the first parameter, like `wrapRatios('.video')` or `wrapRatios( document.getElementById('video') )`.

The element's ratio will be based on `width` and `height` attributes, unless you specify a ratio in the `data-ratio` attribute or as the second parameter in the wrapRatios call `wrapRatios(null,'16x9')`. The ratio can be formatted with an `x` or `:`, so `16x9` and `1.77:1` are the same.

## Examples

The following examples all have the same result of a 16x9 embedded video:

```html
&lt;iframe data-ratio width="853" height="480" src="https://www.youtube.com/embed/Tbp--r-vO8g" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;
```

```html
&lt;iframe data-ratio="16x9" src="https://www.youtube.com/embed/Tbp--r-vO8g" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;
```

```html
&lt;iframe id="myVideo" src="https://www.youtube.com/embed/Tbp--r-vO8g" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;
&lt;script&gt;
wrapRatios( document.getElementById('myVideo'), '16x9' );
&lt;/script&gt;
```

You can use `wrapRatios` on any element, and the `data-ratio` attribute can be formatted either as `4x3` or `1.33:1`.

```html
  <span data-ratio="2x3">2x3</span>
  <span data-ratio="1x1">1x1</span>
  <span data-ratio="4x3">4x3</span>
  <span data-ratio="16x9">16x9</span>
  <span data-ratio="1.618:1">1.618:1</span>
  <span data-ratio="1.77:1">1.77:1</span>
  <span data-ratio="1.85:1">1.85:1</span>
  <span data-ratio="2.35:1">2.35:1</span>
```