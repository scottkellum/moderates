var typeturaSelect = ['p', 'img', 'h1', 'blockquote'];

var typeturaStyles = [
    'margin-top',
    'font-size',
    'line-height'
  ];

// -----------------------------------------------
// DATA

var getTypeturaContext = function(lettersetEl) {
  return document.querySelector(lettersetEl);
};

// -----------------------------------------------
// HELPERS

// camelize strings
var typeturaCamelize = function(str) {
  return str
    .replace(/-([a-z])/g, function($1) {
      return $1.toUpperCase();
    })
    .replace('-', '')
    .replace(/^(.)/, function($1) {
      return $1.toLowerCase();
    });
};


// -----------------------------------------------
// READ

// parse data from breakpoint list into value + breakpoint arrays
var typeturaParse = function(s) {
  var l = s.split(',');
  var breakpoints = [];
  var values = [];
  for (var i = 0; i < l.length; i++) {
    var x = l[i].split('/');
    if (x[1]) {
      breakpoints.push(parseFloat(x[1].trim()));
      values.push(x[0].trim());
    } else if (x[0]) {
      breakpoints.push(1);
      values.push(x[0].trim());
    }
  }
  if (breakpoints.length > 0) {
    return [breakpoints, values];
  } else {
    return null;
  }
};

// style elements based on parsed data
var typeturaStyle = function(v, w) {
  var u = v[1][0].split(parseFloat(v[1][0]))[1]; // Find the units used

  if (w <= v[0][0]) {
    if (u === 'step') {
      return typeturaMSFunc(parseFloat(v[1][0]));
    }
    return v[1][0]; // Just return the small setting if small
  }
  if (w >= v[0][v[0].length - 1]) {
    if (u === 'step') {
      return typeturaMSFunc(parseFloat(v[1][v[0].length - 1]));
    }
    return v[1][v[0].length - 1]; // Just return the large setting if large
  }

  // Find the breakpoint zone
  var p = 0; // breakpoint (start at 0)

  // Loop through breakpoints to find the correct zone
  for (var i = 0; i < v[0].length; i++) {
    if (w > v[0][i]) {
      p = i;
    }
  }

  var l = (w - v[0][p]) / (v[0][p + 1] - v[0][p]); // Find the location between breakpoints (value between 0-1)
  var s = (parseFloat(v[1][p + 1]) - parseFloat(v[1][p])) * l + parseFloat(v[1][p]); // Map the location to the scale factor

    return s + u; // Add on the units and return value
};

// -----------------------------------------------
// WRITE
var typeturaWrite = function(typeturaData, typeturaWidth, typeturaContext) {
  for (var el in typeturaData) {
    typeturaContext.style.setProperty('--' + el + '-font-variation-settings', ''); // reset so variations don’t compound on old setting
    for (var prop in typeturaData[el]) {
      if (prop === 'ms-base') {
        typeturaMS.base = typeturaStyle(typeturaData[el][prop], typeturaWidth);
      } else if (prop === 'ms-ratio') {
        typeturaMS.ratio = typeturaStyle(typeturaData[el][prop], typeturaWidth);
      } else if (prop.split('-')[0] === 'variation') {
        var currentValue = typeturaContext.style.getPropertyValue('--' + el + '-font-variation-settings');
        var append = '';
        if (currentValue) {
          append = ', ' + currentValue;
        }
        typeturaContext.style.setProperty(
          '--' + el + '-' + 'font-variation-settings',
          '"' + prop.split('-')[1] + '" ' + typeturaStyle(typeturaData[el][prop], typeturaWidth) + append
        );
      } else {
        typeturaContext.style.setProperty('--' + el + '-' + prop, typeturaStyle(typeturaData[el][prop], typeturaWidth));
      }
    }
  }
};

// -----------------------------------------------
// GET DATA
var getTypeturaDataFromDOM = function(typeturaContext) {
  var typeturaData = {};

  // Loop through selectors and build data
  for (var i = 0; i < typeturaSelect.length; i++) {
    var selector = typeturaContext.querySelector(typeturaSelect[i]);

    if (!selector) continue;

    for (var j = 0; j < typeturaStyles.length; j++) {
      var styles = typeturaParse(window.getComputedStyle(selector).getPropertyValue('--' + typeturaStyles[j]));

      if (!styles) continue;

      if (!typeturaData[typeturaSelect[i]]) {
        typeturaData[typeturaSelect[i]] = {};
      }

      typeturaData[typeturaSelect[i]][typeturaStyles[j]] = styles;
    }
  }

  return typeturaData;
};





  var momentumRoot = document.body.style;
  var momentumEls = document.querySelectorAll('.momentumcss');

  var noiseInterval = cssTime(window.getComputedStyle(document.body).getPropertyValue('--noiseinterval'));


  window.addEventListener('scroll',momentumScroll,false);
  function momentumScroll() {
      momentumRoot.setProperty('--scrollx',window.scrollX + 'px');
      momentumRoot.setProperty('--scrolly',window.scrollY + 'px');
  }

  window.addEventListener('pointermove',momentumPointer,false);
  function momentumPointer(e) {
      momentumRoot.setProperty('--clientx',e.clientX + 'px');
      momentumRoot.setProperty('--clienty',e.clientY + 'px');
  }
  window.addEventListener('pointerdown',momentumPointerDown,false);
  window.addEventListener('pointerup',momentumPointerUp,false);
  function momentumPointerDown(e) {
      momentumRoot.setProperty('--pointerdown',1);
  }
  function momentumPointerUp(e) {
      momentumRoot.setProperty('--pointerdown',0);
  }
  // Override pointer events if touch events
  window.addEventListener('touchmove',momentumTouch,false);
  function momentumTouch(e) {
      momentumRoot.setProperty('--clientx',e.touches[0].clientX + 'px');
      momentumRoot.setProperty('--clienty',e.touches[0].clientY + 'px');
  }
  window.addEventListener('touchstart',momentumTouchStart,false);
  window.addEventListener('touchend',momentumTouchEnd,false);
  function momentumTouchStart(e) {
      momentumRoot.setProperty('--pointerdown',0);
      momentumRoot.setProperty('--clientx',e.touches[0].clientX + 'px');
      momentumRoot.setProperty('--clienty',e.touches[0].clientY + 'px');
      momentumRoot.setProperty('--touches',e.targetTouches.length);
  }
  function momentumTouchEnd(e) {
      momentumRoot.setProperty('--touches',e.targetTouches.length);
  }

  window.addEventListener('deviceorientation', momentumOrientation);
  function momentumOrientation(e) {
      momentumRoot.setProperty('--orientalpha',e.alpha + 'deg');
      momentumRoot.setProperty('--orientbeta',e.beta + 'deg');
      momentumRoot.setProperty('--orientgamma',e.gamma + 'deg');
  }

  // HELPER FUNCTIONS
  // https://gist.github.com/jakebellacera/9261266
  function cssTime(t) {
      var num = parseFloat(t, 10),
          unit = t.match(/m?s/),
          milliseconds;

      if (unit) {
        unit = unit[0];
      }

      switch (unit) {
        case "s": // seconds
          milliseconds = num * 1000;
          break;
        case "ms": // milliseconds
          milliseconds = num;
          break;
        default:
          milliseconds = 0;
          break;
      }

      return milliseconds;
    }


    // -----------------------------------------------
// Initiate typetura by building data and setting reference styles
var typeturaInit = function(typeturaData, typeturaContext) {
    var typeturaWidth = typeturaContext.offsetWidth;

    // set up custom props in head
    typeturaWrite(typeturaData, typeturaWidth, typeturaContext);

    // Setup custom props on elements
    var elements = typeturaContext.querySelectorAll(typeturaSelect);

    for (var k = 0; k < elements.length; k++) {
      var tag = elements[k].tagName.toLowerCase();

      for (var prop in typeturaData[tag]) {
        if (prop.split('-')[0] === 'ms') {
          // Don’t write anything for ms values
        } else if (prop.split('-')[0] === 'variation') {
          elements[k].style.fontVariationSettings = 'var(--' + tag + '-font-variation-settings)';
        } else {
          elements[k].style[typeturaCamelize(prop)] = 'var(--' + tag + '-' + prop + ')';
        }
      }
    }
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = typeturaInit;
    }
    exports.typeturaInit = typeturaInit;
    exports.getTypeturaDataFromDOM = getTypeturaDataFromDOM;
    exports.typeturaInit = typeturaInit;
    exports.getTypeturaContext = getTypeturaContext;
    exports.typeturaWrite = typeturaWrite;
  } else {
    // Top level element,
    // overwrite to be more specific for better performance.
    if (!window.lettersetEl) {
      window.lettersetEl = 'body';
    }
    if (!window.typeturaContext) {
      window.typeturaContext = getTypeturaContext(window.lettersetEl);
    }
    if (!window.typeturaData) {
      window.typeturaData = getTypeturaDataFromDOM(window.typeturaContext);
    }

    window['typeturaInit'] = typeturaInit;

    window.onload = function() {
      window.typeturaInit(window.typeturaData, window.typeturaContext);
      function momentumInit() {
        momentumRoot.setProperty('--viewportwidth',window.innerWidth + 'px');
        momentumRoot.setProperty('--viewportheight',window.innerHeight + 'px');
        for (let i = 0; i < momentumEls.length; i++) {
            const e = momentumEls[i];
            e.style.setProperty('--width',e.offsetWidth + 'px');
            e.style.setProperty('--height',e.offsetHeight + 'px');
            e.style.setProperty('--top',e.offsetTop + 'px');
            e.style.setProperty('--left',e.offsetLeft + 'px');
        }
    } momentumInit();
    window.addEventListener('resize',momentumInit);
    if(noiseInterval > 0) {
        window.setInterval(function(){
            momentumRoot.setProperty('--noise',Math.random());
        }, noiseInterval);
    }


    // initialize for browsers that don’t support registering properties yet
    momentumRoot.setProperty('--scrollx',window.scrollX + 'px');
    momentumRoot.setProperty('--scrolly',window.scrollY + 'px');
    momentumRoot.setProperty('--clientx','0px');
    momentumRoot.setProperty('--clienty','0px');
    momentumRoot.setProperty('--pointerdown',0);
    momentumRoot.setProperty('--touches',0);
    momentumRoot.setProperty('--orientalpha','0deg');
    momentumRoot.setProperty('--orientbeta','0deg');
    momentumRoot.setProperty('--orientgamma','0deg');
    momentumRoot.setProperty('--noise',Math.random());

    };

    window.onresize = function() {
      var typeturaWidth = window.typeturaContext.offsetWidth;

      typeturaWrite(window.typeturaData, typeturaWidth, window.typeturaContext);
    };
  }



document.addEventListener("DOMContentLoaded", function() {
  var videos = document.querySelectorAll('iframe[src*="vimeo.com"]');
  videos.forEach(function(video) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('videowrap');
    video.parentNode.insertBefore(wrapper, video);
    wrapper.appendChild(video);
  });
});
