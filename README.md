# wrapRatios
*Micro JS Utility For Responsive Ratios*
  
Browsers don't maintain aspect ratios for most elements, including `<iframe>` which is commonly used for embedding videos. 

Enter `wrapRatios`, a Javascript utility for maintaining aspect ratios responsively. No matter the window size, your videos and content will keep their shape.

Works in all browsers, IE9+. 

View the [demo](http://codepen.io/shshaw/full/BNXWOo) or view a [CSS-only demo](http://codepen.io/shshaw/pen/ZGgXLj) if you want to implement the concept manually.

## How?

Elements are wrapped in a `<div>` container with a `<canvas>` of the proper aspect ratio. 

**Before:**
```html
<iframe data-ratio width="853" height="480" src="https://www.youtube.com/embed/Tbp--r-vO8g" frameborder="0" allowfullscreen></iframe>
```

**After:**

```html
<div class="wrapRatios wrapRatios--dynamic">
  <canvas class="wrapRatios__sizer" width="853" height="480"></canvas>
  <iframe width="853" height="480" src="https://www.youtube.com/embed/Tbp--r-vO8g" frameborder="0" allowfullscreen="" class=" wrapRatios__content"></iframe>
</div>
```

Browsers will scale the `<canvas>` without losing the aspect ratio, so the element is set to `position: absolute`, letting it float over the canvas and resize properly.

The following styles are inserted into the `<head>` on the first run.

```css
.wrapRatios { position:relative; }
.wrapRatios__content { position:absolute; top:0; left:0; width:100%; height:100%; }
.wrapRatios__sizer { display:block; width:100%; height:auto; visibility:hidden; }
```


## Examples

The following iframes are all locked in to a 16x9 ratio:

```html
<iframe data-ratio width="853" height="480" src="https://www.youtube.com/embed/Tbp--r-vO8g" frameborder="0" allowfullscreen></iframe>
<iframe data-ratio="16x9" src="https://www.youtube.com/embed/Tbp--r-vO8g" frameborder="0" allowfullscreen></iframe>
<iframe id="myVideo" src="https://www.youtube.com/embed/Tbp--r-vO8g" frameborder="0" allowfullscreen></iframe>
<script>
wrapRatios( document.getElementById('myVideo'), '16x9' );
</script>
```

`wrapRatios` will work on any element!

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

## Usage

Simply add the `data-ratio` attribute to an element and include the [minified script](wrapRatios.min.js), weighing only 1kb (0.6kb gzipped) which includes all the required styles.

`wrapRatios` automatically wraps any elements with a `data-ratio` attribute, but a selector, element or array of elements can be passed as the first parameter, like `wrapRatios('.video')` or `wrapRatios( document.getElementById('video') )`.

The ratio can be formatted with an `x` or `:`, so `16x9` and `1.77:1` are the same. 

Each element's ratio will be determined in the following order:

1. The second argument when called, e.g. `wrapRatios('video','16x9')`.
2. `data-ratio` attribute value
3. `width` and `height` attributes
