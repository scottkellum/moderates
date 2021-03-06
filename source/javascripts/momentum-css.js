var momentumRoot = document.body.style;
var momentumEls = document.querySelectorAll('.momentumcss');

var noiseInterval = cssTime(window.getComputedStyle(document.body).getPropertyValue('--noiseinterval'));

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
  