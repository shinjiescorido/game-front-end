console.log("noinstall");

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

function popupresize() {
  if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
    $('#bet-history, #trans-history, #popup-howto, #popup-settings').attr({
      'width' : 930,
      'height': 1280
    }).css({
      'transform': 'rotate(-90deg)',
      'left' : 175,
      'top'  : -230
    })

    // $('#popup-logout').attr({
    //   'width' : 930,
    //   'height': 1280
    // }).css({
    //   'transform': 'rotate(-90deg)',
    //   'left' : 175,
    //   'top'  : -78
    // })

    // $('#trans-history').attr({
    //   'width' : 930,
    //   'height': 1280
    // }).css({
    //   'transform': 'rotate(-90deg)',
    //   'left' : 175,
    //   'top'  : -230
    // })
    //
    // $('#popup-howto').attr({
    //   'width' : 930,
    //   'height': 1280
    // }).css({
    //   'transform': 'rotate(-90deg)',
    //   'left' : 175,
    //   'top'  : -230
    // })
    //
    // $('#popup-settings').attr({
    //   'width' : 930,
    //   'height': 1280
    // }).css({
    //   'transform': 'rotate(-90deg)',
    //   'left' : 175,
    //   'top'  : -230
    // })

  }
  else {
    $('#bet-history, #trans-history, #popup-howto, #popup-settings').attr({
      'width' : 1280,
      'height': 930
    }).css({
      'transform': '',
      'left' : 0,
      'top'  : 97
    })

    // $('#popup-logout').attr({
    //   'width' : 1280,
    //   'height': 930
    // }).css({
    //   'transform': '',
    //   'left' : '',
    //   'top'  : 96
    // })

    // $('#trans-history').attr({
    //   'width' : 1280,
    //   'height': 930
    // }).css({
    //   'transform': '',
    //   'left' : 0,
    //   'top'  : 97
    // })
    //
    // $('#popup-howto').attr({
    //   'width' : 1280,
    //   'height': 930
    // }).css({
    //   'transform': '',
    //   'left' : 0,
    //   'top'  : 97
    // })
    //
    // $('#popup-settings').attr({
    //   'width' : 1280,
    //   'height': 930
    // }).css({
    //   'transform': '',
    //   'left' : 0,
    //   'top'  : 97
    // })

  }
}
function lobbyresize() {
  if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
    $('#landing').attr({
      'width' : 620,
      'height': 1280
    }).css({
      'transform': 'rotate(-90deg)',
      'left' : 331,
      'top'  : -230
    })

  } else {

    $('#landing').attr({
      'width' : 1280,
      'height': 620
    }).css({
      'transform': '',
      'left' : 0,
      'top'  : 97
    })

  }
}
function baccaratresize() {
  let count = $('.bc-timer').length;

  if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
    let bc_top = 490;
    for (let i = 0; i < count; i++) {
      $('#bc-timer-'+i).attr({
        'width' : 284,
        'height': 800
      }).css({
        transform: 'rotate(-90deg)',
        left : 273,
        top  : ((i*306) - 245) +'px'
      })

    }

    $('#bc-timer-0').css({
      transform: 'rotate(-90deg)',
      left : 273,
      top  : -245
    })

  } else {
    for (let i = 0; i < count; i++) {
      $('#bc-timer-'+i).attr({
        'width' : 800,
        'height': 284
      }).css({
        'transform': '',
        left : '0',
        top  : i* 306 + 5 +'px'
      })

    }

  }

} //baccaratresize
function pokerresize() {
  let count = $('.poker-cont').length;

  if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
    let bc_top = 490;
    for (let i = 0; i < count; i++) {
      $('#poker-'+i).attr({
        'width' : 300,
        'height': 1280
      }).css({
        transform: 'rotate(-90deg)',
        left : 490,
        top  : (i*306) - 488 + 'px'
      })
    }

    $('#poker-0').css({
      transform: 'rotate(-90deg)',
      left : 490,
      top  : -488
    })

  } else {
    for (let i = 0; i < count; i++) {
      $('#poker-'+i).attr({
        'width' : 1280,

        'height': 300
      }).css({
        'transform': '',
        left : '0',
        top  : i*306 +'px'
      })

    }
  }
} //pokerresize
function dragontigerresize() {
  let count = $('.dt-cont').length;

  if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
    for (let i = 0; i < count; i++) {
      $('#dt-'+i).attr({
        'width' : 300,
        'height': 1280
      }).css({
        transform: 'rotate(-90deg)',
        left : 490,
        top  : (i*306) - 488 + 'px'
      })
    }

    $('#dt-0').css({
      transform: 'rotate(-90deg)',
      left : 490,
      top  : -488
    })

  } else {
    for (let i = 0; i < count; i++) {
      $('#dt-'+i).attr({
        'width' : 1280,
        'height': 300
      }).css({
        'transform': '',
        left : '0',
        top  : i*306 +'px'
      })

    }
  }
} //dragontigerresize
function sicboresize() {
  let count = $('.sb-cont').length;

  if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
    for (let i = 0; i < count; i++) {
      $('#sb-'+i).attr({
        'width' : 300,
        'height': 1280
      }).css({
        transform: 'rotate(-90deg)',
        left : 490,
        top  : (i*306) - 488 + 'px'
      })
    }

    $('#sb-0').css({
      transform: 'rotate(-90deg)',
      left : 490,
      top  : -488
    })

  } else {
    for (let i = 0; i < count; i++) {
      $('#sb-'+i).attr({
        'width' : 1280,
        'height': 300
      }).css({
        'transform': '',
        left : '0',
        top  : i*306 +'px'
      })
    }
  }
} //sicboresize
function paigowresize() {
  let count = $('.pg-cont').length;

  if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
    for (let i = 0; i < count; i++) {
      $('#pg-'+i).attr({
        'width' : 300,
        'height': 1280
      }).css({
        transform: 'rotate(-90deg)',
        left : 490,
        top  : (i*306) - 488 + 'px'
      })
    }

    $('#pg-0').css({
      transform: 'rotate(-90deg)',
      left : 490,
      top  : -488
    })

  } else {
    for (let i = 0; i < count; i++) {
      $('#pg-'+i).attr({
        'width' : 1280,
        'height': 300
      }).css({
        'transform': '',
        left : '0',
        top  : i*306 +'px'
      })
    }
  }
} //sicboresize
function userbasedresize() {
  let count = $('.ub-cont').length;

  if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
    for (let i = 0; i < count; i++) {
      $('#ub-room'+i).attr({
        'width' : 125,
        'height': 830
      }).css({
        transform: 'rotate(-90deg)',
        left : 361,
        top  : (i*125) - 350 + 'px'
      })
    }

    $('#ub-room0').css({
      transform: 'rotate(-90deg)',
      left : 361,
      top  : -350
    })

    $('#ub-game').attr({
      'width' : 552,
      'height': 430
    }).css({
      transform: 'rotate(-90deg)',
      left : -60,
      top  : 60
    })


  } else {
    for (let i = 0; i < count; i++) {
      $('#ub-room'+i).attr({
        'width' : 830,
        'height': 125
      }).css({
        'transform': '',
        left : 10,
        top  : i*125 +'px'
      })
    }

    $('#ub-game').attr({
      'width' : 430,
      'height': 552
    }).css({
      transform: '',
      left : 0,
      top  : 0
    })
  }
}


$('.header-sub--target').click(function() {
  baccaratresize();
  pokerresize();
  dragontigerresize();
  sicboresize();
  paigowresize();
});

$(document).ready(function() {
  popupresize()
  lobbyresize();
  baccaratresize();
  pokerresize();
  dragontigerresize();
  sicboresize();
  paigowresize();
  userbasedresize();
});
$(window).ready(function() {
  popupresize()
  lobbyresize();
  baccaratresize();
  pokerresize();
  dragontigerresize();
  sicboresize();
  paigowresize();
  userbasedresize();
});
$(window).resize(function() {
  popupresize()
  lobbyresize();
  baccaratresize();
  pokerresize();
  dragontigerresize();
  sicboresize();
  paigowresize();
  userbasedresize();
});

$(window).resize(
  lobbyresize,
  baccaratresize,
  pokerresize,
  dragontigerresize,
  sicboresize,
  paigowresize,
  popupresize,
  userbasedresize
);


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
  // if(window.window.devicePixelRatio;)
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

function preventDefault(e){
    e.preventDefault();
    e.stopPropagation();
}

function disablescroll() {
  document.addEventListener('touchmove', preventDefault, { passive: false });

  var scrollitems = document.getElementsByClassName('scrollable');

  for (var i = 0; i < scrollitems.length; i++) {
    scrollitems[i].addEventListener('touchstart',function(e) {
      if (e.currentTarget.scrollTop === 0) {
        e.currentTarget.scrollTop = 1;
      } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
        e.currentTarget.scrollTop -= 1;
      }
    });
    scrollitems[i].addEventListener('touchmove',function(e) {
      e.stopPropagation();
    });
  }
}

function container_pc() {
  $('.container-wrap').css({
    'width' : '',
    'height' :  '',
    'position' : 'absolute'
  })
} //container_android

function container_ios() {
  if(window.innerWidth >  window.innerHeight  && window.matchMedia("(orientation: landscape)").matches) {
  window.scrollTo(0, 0);
    $('.container-wrap').css({
      'width' : document.documentElement.clientWidth,
      'height' : document.documentElement.clientHeight + 1,
      'position' : ''
    })
  } else {
    $('.container-wrap').css({
      'width' : window.innerWidth,
      'height' : window.innerHeight,
      'position' : ''
    })
  }
}

function container_android() {
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  let screenHeight = window.innerHeight;
  let devicePixelRatio = window.devicePixelRatio;

  if (newWidth > 1439) {
    newWidth = window.innerWidth / devicePixelRatio;
    newHeight = window.innerHeight / devicePixelRatio;
  } else {
    newWidth = window.innerWidth;
    newHeight = window.innerHeight;
  }

  if(window.innerWidth >  window.innerHeight  && window.matchMedia("(orientation: landscape)").matches) {
    $('.container-wrap').css({
      'width' : newWidth,
      'height' : window.screen.height,
      'position' : ''
    })
  } else {
    $('.container-wrap').css({
      'width' : newWidth,
      'height' : newHeight,
      'position' : ''
    })
  }
} //container_android

function bezel () {
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  let devicePixelRatio = window.devicePixelRatio;

  if (newWidth > 1440) {
    newWidth = window.innerWidth / devicePixelRatio;
    newHeight = window.innerHeight / devicePixelRatio;
  } else {
    newWidth = window.innerWidth;
    newHeight = window.innerHeight;
  }

  var baseRatio = (1920 / 1080),
  newRatio = newWidth / newHeight;

  if(newRatio >= baseRatio) {
    newWidth = newHeight * baseRatio;
  } else {
    newWidth = newWidth * baseRatio;
  }

  if(window.innerHeight == window.screen.height) {
    $('.container-wrap').css({
      'position' : 'absolute'
    })

    if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
      $('#SUPER-CONTAINER').css({
        'transform': ' rotate(90deg) scale('+((newWidth/ 1280) )+')'
      })
    }  else {
      $('#SUPER-CONTAINER').css({
        'transform': 'scale('+((newWidth / 1280) )+')'
      })
    }

  }
} //BEZEL


function setDeviceView() {
  if (getOS() == "iOS") {
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

    // document.addEventListener('touchmove', function(e) {
    //   e.preventDefault();
    // }, { passive: false });

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
