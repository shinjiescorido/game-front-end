var requestFullscreen = function (ele) {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  } else {
    console.log('Fullscreen API is not supported.');
  }
};

var exitFullscreen = function () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else {
    console.log('Fullscreen API is not supported.');
  }
};

function getOS() {
  var userAgent        = window.navigator.userAgent,
      platform         = window.navigator.platform,
      macosPlatforms   = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms     = ['iPhone', 'iPad', 'iPod'],
      os               = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'MacOS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  return os;
}


function flippycanvas() {
  if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
    $('#flippy-wrap canvas').css({
      'top': '50%'
    })
  }  else {
    $('#flippy-wrap canvas').css({
      'top': ''
    })
  }
}
// function container_default() {
//   if(window.innerWidth < 569 && window.innerHeight < 321) {
//     $('.container-wrap').css({
//       width : window.innerWidth,
//       height : window.innerHeight + 1
//     })
//   } else {
//     $('.container-wrap').css({
//       width : window.innerWidth,
//       height : window.innerHeight
//     })
//   }
// }

function baccaratresize() {
  if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
    $('#myCanvas').css({
      'transform': 'rotate(-90deg) translate(-50%, -50%)',
      'top' : '-88.9%',
      'left' : '71.9%'
    });
  } else {
    $('#myCanvas').css({
      'transform': '',
      'top' : '',
      'left' : ''
    });
  }
}
$('#myCanvas').click(function() {
  flippycanvas();
});
$(document).ready(function() {
  // container_default();
  baccaratresize();
  flippycanvas();
});
$(window).ready(function() {
  // container_default();
  baccaratresize();
  flippycanvas();
});
$(window).resize(function() {
  // container_default();
  baccaratresize();
  flippycanvas();
});

$(window).resize(
  // container_default,
  baccaratresize,
  flippycanvas
);

function container_pc() {
  $('.container-wrap').css({
    'width' : '',
    'height' :  '',
    'position' : 'absolute'
  })

  $('#SUPER-CONTAINER').css({
    'overflow' : 'hidden',
  })

  $('#flippy-wrap').css({
    'width': window.innerWidth,
    'height': window.innerHeight
  })
} //container_android

function container_android() {
  if(window.innerWidth >  window.innerHeight  && window.matchMedia("(orientation: landscape)").matches) {
    $('.container-wrap').css({
      'width' : window.innerWidth,
      'height' : window.screen.height,
      'position' : ''
    })

    $('#flippy-wrap').css({
      'width' : window.innerWidth,
      'height' : window.screen.height
    })

  } else {
    $('.container-wrap').css({
      'width' : window.innerWidth,
      'height' : window.innerHeight,
      'position' : ''
    })

    $('#flippy-wrap').css({
      'width': window.innerWidth,
      'height': window.innerHeight
    })
  }
} //container_android

function container_ios() {
  if(window.innerWidth >  window.innerHeight  && window.matchMedia("(orientation: landscape)").matches) {
    window.scrollTo(0, 0);
    $('.container-wrap').css({
      'width' : document.documentElement.clientWidth,
      'height' : document.documentElement.clientHeight,
      'position' : ''
    })

    $('#flippy-wrap').css({
      'width' : document.documentElement.clientWidth,
      'height' : document.documentElement.clientHeight
    })
  } else {
    // disablescroll();
    $('.container-wrap').css({
      'width' : window.innerWidth,
      'height' : window.innerHeight,
      'position' : ''
    })

    $('#flippy-wrap').css({
      'width': window.innerWidth,
      'height': window.innerHeight
    })
  }
}

function bezel() {
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;
  var baseRatio = (1920 / 1080),
  newRatio = newWidth / newHeight;
  if(newRatio >= baseRatio) {
    newWidth = newHeight * baseRatio;
  } else {
    newWidth = newWidth * baseRatio;
  }
  if(window.innerHeight == window.screen.height) {
    if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
      $('#SUPER-CONTAINER').css({
        'transform': ' rotate(90deg) scale('+((newWidth/ 1280) )+')',
        'overflow': 'hidden'
      })
    }  else {
      $('#SUPER-CONTAINER').css({
        'transform': 'scale('+((newWidth / 1280) )+')',
        'overflow': 'hidden'
      })
    }

  }
} //bezel

function setDeviceView() {
  if (getOS() == "iOS") {
    // alert('load')
    container_ios();

    window.addEventListener('load', function () {
      // disablescroll();
      container_ios();
    });

    window.addEventListener('resize', function () {
      // disablescroll();
      container_ios();
    });


    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });

    document.ontouchmove = function (e) {
      e.preventDefault();
    }

    document.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, { passive: false });


  } else if (getOS() == "Android") {
    container_android();
    window.addEventListener('load', function () {
      container_android();
    });

    window.addEventListener('resize', function () {
      container_android();
      bezel();
    });

    window.addEventListener('click', function () {
      if ($('body').attr('id') == 'fullscreen') {
        requestFullscreen(document.documentElement);
        bezel();
      }
    });
  } else {
    //else
    container_pc();
    window.addEventListener('load', function () {
      container_pc();
    });

    window.addEventListener('resize', function () {
      container_pc();
    });

  }
} setDeviceView();

var gobtn = document.getElementById('gofullscreen');
var exitbtn = document.getElementById('exitfullscreen');
//
gobtn.addEventListener('click', function(e) {
  e.preventDefault();
  var bdy =  document.getElementsByTagName("BODY")[0];
  bdy.setAttribute("id", "fullscreen");
  $(".popup-mb-container").hide();
  $("#popup-gofullscreen").hide();
});

exitbtn.addEventListener('click', function(e) {
  e.preventDefault();
  $("#popup-gofullscreen").hide();
  $(".popup-mb-container").hide();
  exitFullscreen();
});
