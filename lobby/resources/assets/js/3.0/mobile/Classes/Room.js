import {Game} from './Game';
import fnFormat from '../../../factories/formatter';
import { createCardSprite, setCurrentTimezone } from '../../../factories/factories';

class Room {
  constructor(data, parent, self, state) {
    // create div
    this.ctx = self;
    let _this= self;
    this.data = data;

    let countRoom = 0;
    let tempname = data.namespace.split("/").join("-");

    this.avatar = data.avatar;
    this.username = data.userName;
    this.playercount = data.users;
    this.maxplayers = data.maxPlayer;
    this.roomname = data.roomName;
    this.tablenumber = data.roomTable;
    this.userCount = data.users;
    this.namespace = data.namespace;
    this.gameName = data.gameName;
    let junketagent = window.isJunket == 2? 'junketagent' : 'junketuser';
    let range = data.betRange;

    let betrange  = this.constructor.betRange(range.split('-')[0], range.split('-')[1])

    this.roundCount = data.roundCount ;
    this.token = data.token;
    this.isMulti = data.isMulti;

    let roomId= data.roomId;
    let roomType =  data.roomType;
    let duration =  setCurrentTimezone(data.gameDuration);
    let playerType = data.isMulti == false ? window.language2.com_sub_betlayout_singleplayer : window.language2.com_sub_betlayout_multiplayer;
    let slave = data.slave == "supersix"? data.slave : 'classic';
    let roundnum_icon = '';
    let maxMulti = data.isMulti == true? '/7':'';
    let classUsers = window.isJunket == 1? 'room--users' : '';
    let headClass = data.gameName == 'Baccarat'? '' : '-othergames';

    if(this.gameName == "Baccarat" || this.gameName == "Dragon-Tiger") {
      roundnum_icon = 'card';
    } else if(this.gameName == "Sicbo") {
      roundnum_icon = 'dice';
    } else if(this.gameName == "Pai-Gow") {
      roundnum_icon = 'tile';
    }

    if($('.room-con').hasClass(`room--${roomId}`) ){
      parent = $(`.room-con.room--${roomId}`)
    }

    if(this.gameName == 'Baccarat') {
      parent.prepend(
        $(`<div class="room__items room--junket room--${data.token} ${classUsers}">
        <div class="room__head ${headClass}">
          <span class="junket-room-name slave-${slave}">${this.roomname}</span>
          <span class="junket-timer duration-${this.gameName}-${roomId}" data-value="${duration}"></span>
          <i class="ico-room-close room-close--${roomId} ${junketagent}" ></i>
        </div>
        <div class="room__body">
          <div class="room__body-con">
            <div class="room__type">
              <p>${playerType}</p>
            </div>
            <div class="room__round">
              <i class="ico-roundnum ico-${roundnum_icon}--junket"></i>
              <span class="room--roundnum">${this.roundCount}</span>
            </div>
          </div>
          <div class="room__body-con">
            <div class="room__betrange">
              <p>${betrange.rangemin}-${betrange.rangemax}</p>
            </div>

            <div class="room__player">
              <i class="ico-player ico-player--junket"></i>
              <span class="room--playertotal">${this.userCount}${maxMulti}</span>
            </div>
          </div>
          <button class="btn-junket-join btn--${this.gameName}-${roomId}" type="button" name="button">${window.language2.nihtanjunket_lobby_join}</button>
        </div>
        </div> `)
      );
    } else {
      parent.addClass('-other').prepend(
        $(`<div class="room__items room--junket room--${data.token} ${classUsers} -other">
        <div class="room__head ${headClass}">
          <span class="junket-room-name slave-${slave}">${this.roomname}</span>
          <span class="junket-timer duration-${this.gameName}-${roomId}" data-value="${duration}"></span>
          <i class="ico-room-close room-close--${roomId} ${junketagent}" ></i>
        </div>
        <div class="room__body">
          <div class="room__body-con">
            <div class="room__betrange">
              <p>${betrange.rangemin}-${betrange.rangemax}</p>
            </div>
            <div class="room__round">
              <i class="ico-roundnum ico-${roundnum_icon}--junket"></i>
              <span class="room--roundnum">${this.roundCount}</span>
            </div>
            <div class="room__player">
              <i class="ico-player ico-player--junket"></i>
              <span class="room--playertotal">${this.userCount}${maxMulti}</span>
            </div>
          </div>
          <button class="btn-junket-join btn--${this.gameName}-${roomId}" type="button" name="button">${window.language2.nihtanjunket_lobby_join}</button>
        </div>
        </div> `)
      );
    }

    if(duration==0) {
      $(`.junket-timer duration-${this.gameName}-${roomId}`).hide()
    }


    // if(state) {
    //   $(`${this.roomname}-${this.tablenumber}-hover`).addClass('active')
    //   $(`${this.roomname}-${this.tablenumber}-room`).show();
    //
    //   for (var i = 0; i < self.games.length; i++) {
    //     if(self.games[i].namespace == this.namespace) {
    //       self.games[i].roomdata.push(this.data)
    //     }
    //   }
    // }

    let roomDuration = $(`.junket-timer.duration-${this.gameName}-${roomId}`).data('value')
    var countDownDate = new Date(roomDuration).getTime();


    let this_ = this;
    setInterval(function() {
      // Get todays date and time
      var now = new Date().getTime();
      // Find the distance between now an the count down date
      var distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      if(hours <= 0 && minutes <= 0 && days <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
      }
      hours = hours < 10 ?'0'+(hours+(days*24)) : hours+(days*24);
      minutes = minutes < 10 ?'0'+minutes : minutes;


      if(roomDuration) {
        $(`.junket-timer.duration-${this_.gameName}-${roomId}`).text(hours + ' : ' + minutes)
      }
    }, 1000);

    //Button Join
    $(document).on("click",`.btn--${this.gameName}-${roomId}` ,function(e){
      if(window.isJunket > 0) {
        $.post("/settingGame", {range:data.betRange, game:data.namespace, slave:data.slave, multiplayer: data.isMulti === true ? 1 : 0}, function () {

          // location.assign("http://10.1.10.109:8012/"+data.roomTable+"/j?token="+data.token)
          if(data.gameName == 'Pai-Gow') {
            location.assign(window.paigow_domain+data.roomTable+"/j?token="+data.token)
          } else if (data.gameName == 'Sicbo') {
            location.assign(window.sb_domain+ data.roomTable+"/j?token="+data.token)
            // location.assign('http://10.1.10.109:8014/'+ data.roomTable+"/j?token="+data.token)

          } else if (data.gameName == 'Baccarat') {
            location.assign(window.bc_domain+ data.roomTable+"/j?token="+data.token)
          } else if (data.gameName == 'Dragon-Tiger') {
            location.assign(window.dt_domain+ data.roomTable+"/j?token="+data.token)
          }
        });
      }

    });

    let selected = this.data;
    let btncon = $('#popup-removeroom .popup-room-btn').empty()

    //Button Room Close
    $(document).on("click",`.room-close--${roomId}` ,function(e){
      $(btncon).empty();
      $(".popup-container").animate({
	      top: '0'
	    }, {
	      duration: 200,
	      start: function () {
					$('.popup-bg').show();
          $('.popup-box').hide();
          $('#fail-msg').text(window.language2.nihtanjunket_lobby_roomremovednextround)
					$('#popup-removeroom').show();
        }
	    })
      btncon.append(`
         <div id="junket-cancelremove" class="btn-popup popup-btn--cancel cancelremove-room${selected.roomId}">
          <span>${window.language.modal.promptnocaps}</span>
        </div>
        <div id="junket-removeroom" class="btn-popup popup-btn--create remove-room${selected.roomId}">
          <span>${window.language.modal.promptyescaps}</span>
        </div>
      `)
    });

    //Button remove room button confirmation
    // $(document).on("click",`.remove-room${selected.roomId}` ,function(e){
    //   $(".popup-container").animate({
    //     top: '-100%'
    //   }, {
    //     duration: 200,
    //     complete: function () {
    //       $('.popup-bg').hide();
    //       $('.popup-box').hide();
    //     }
    //
    //   })
    //
    //   _this.eventListener.socket.emit('data',{
    //     eventName : 'disband_room',
    //     token     : selected.token,
    //     gameName  : selected.gameName,
    //     agentId   : selected.userId
    //   }, (response) => {
    //     console.log("response", response);
    //     // window.location = window.lobby_domain;
    //   });
    //
    //   // $(`.room--${selected.token}`).remove();
    //   btncon.empty();
    //
    // });
    //
    // //Button cancel remove room button confirmation
    // $(document).on("click",`.cancelremove-room${selected.roomId}` ,function(e){
    //   $(".popup-container").animate({
    //     top: '-100%'
    //   }, {
    //     duration: 200,
    //     complete: function () {
    //       $('.popup-bg').hide();
    //       $('.popup-box').hide();
    //     }
    //   })
    //   btncon.empty();
    // })
  } //END constructor

  setRoundCount (data) {
    let namespace = `${data.gameName}/${data.tableId}`
    if(this.namespace == namespace ){
      this.roundCount+=1;
      $(`.room--${this.data.token} .room--roundnum`).text(this.roundCount)
    }
  }

  setUserCount (data, type) {
    if(this.token == data.data.token ) {
      this.userCount = data.data.users;
      let maxMulti = ''

      if(this.isMulti == true) {
        maxMulti = '/7';
        if(this.userCount == 7) {
          if(window.isJunket != 1) return
          $(`.btn--${this.gameName}-${this.roomId}`).attr('disabled',true).addClass('disabled-btn');
        } else {
          $(`.btn--${this.gameName}-${this.roomId}`).attr('disabled',false).removeClass('disabled-btn');
        }
      }

      $(`.room--${this.data.token} .room--playertotal`).text(this.userCount+maxMulti)
    }
  }

  static betRange(min, max) {
    let rangemin = '';
    let rangemax = '' ;

    if(min * window.currencyMultiplier  > 999999) {
      rangemin = ((min * window.currencyMultiplier)/1000000) + "M"
    } else if(min * window.currencyMultiplier  > 999) {
      rangemin = ((min * window.currencyMultiplier)/1000) + "K"
    } else {
      rangemin = min * window.currencyMultiplier
    }

    if(max* window.currencyMultiplier  > 999999) {
      rangemax = ((max* window.currencyMultiplier)/1000000) + "M"
    } else if( max* window.currencyMultiplier  > 999) {
      rangemax = ((max* window.currencyMultiplier)/1000) + "K"
    } else {
      rangemax = max* window.currencyMultiplier
    }

    return {rangemin : rangemin, rangemax : rangemax}
  }

  static createRoom (data, self) {
    let tempname = data.namespace.split("/").join("-");
    let _this = self

    // Room.validationCheck(data);
    //Get game duration
    $(document).off("click",`.room-duration.-${tempname}`);
    $(document).on("click",`.room-duration.-${tempname}` ,function(e){
      e.preventDefault();
      let val = parseInt($(`.room-duration--val.-${tempname}`).data('value'));
      let hr = " Hr";

      if($(e.currentTarget).hasClass('ico-plus') && val < 24) {
        val += 1;
      }
      else if($(e.currentTarget).hasClass('ico-minus') && val > 1) {
        val-=1;
      }
      else {
        return;
      }
      if(val > 1) {
        hr = " Hrs"
      }
      $(`.room-duration--val.-${tempname}`).data('value', val).text(val+hr);
    });
    //Create room button
    let clicked = false;
    $(`#junket-createroom-${tempname}`).unbind('click').on('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // console.log("create click");

      let betRange = $(`.-betrange-${tempname} > .range-selected`).attr('data-range');
      let maxPlayers = 0;
      let roomAvatar = window.config.default;
      // let roomName = $(`#junket-${tempname}-roomname`).val();
      let roomName = window.username;
      let tableNumber = data.tableNumber;
      let money = window.money;
      let gameName = data.gameName.toLowerCase().split('-').join('');;
      let roomType = window.isJunket > 0 ? 'j' : 'r';
      let duration = 0;
       // $("input[name='haslimit']").is(':checked')?$(`.room-duration--val.-${tempname}`).data('value') : 0;
      let type = $(`.radio--${tempname}:checked`).data('value')
      let isJunket = window.isJunket > 0 ? 'junket': 'normal';
      let slave = data.gameName == 'Baccarat'? $(`.radio-slave--${tempname}:checked`).data('value') : 'normal';

      let vendorEndDate = window.vendorEndDate;

      let gameduration = $("input[name='haslimit']").is(':checked')?$(`.room-duration--val.-${tempname}`).data('value') : null;

      let password = $(`#junket-${tempname}-roompass`).val();
      let confirmPassword = $(`#junket-${tempname}-confirm-roompass`).val();


      // CHECK INPUT IF EMPTY
      if(password == '' && confirmPassword == '') {
        $(`#junket-${data.gameName}-${data.tableNumber}-roompass`).addClass('error')
        $(`#junket-${data.gameName}-${data.tableNumber}-confirm-roompass`).addClass('error')

        // $(`#junket-${tempname}-roomname`).addClass('error');
        $('.error-empty').css({display : 'block'});
        setTimeout(() => {
          $('.error-empty').css({display : ''});
        }, 2500)

        return;
      }

      if(password.length < 4 && password != '') {
        $(`#junket-${data.gameName}-${data.tableNumber}-roompass`).addClass('error')
        $(".password.error-mes").css('display', 'block');
        $('.error-empty').css({display : ''});

        // if(roomName == '') {
        //   $(`#junket-${tempname}-roomname`).addClass('error');
        //   $('.room-input-con .error-empty').show();
        //   setTimeout(() => {
        //     $('.error-empty').css({display : ''});
        //   }, 2500)
        // } else {
        //   $(`#junket-${tempname}-roomname`).removeClass('error');
        // }

        setTimeout(() => {
          $(".password.error-mes").css('display', 'none');
        }, 2500)
        return;
      }

      // if(roomName.length < 4 && roomName != '') {
      //   $('.error-empty').css({display : ''});
      //   $(`#junket-${tempname}-roomname`).addClass('error');
      //
      //   // $('.popup-body-inner').remove();
      //   // $('.popup-btn-inner').remove();
      //   // $('#popup-junket').hide().removeClass(`popup--${data.gameName}`);
      //
      //   $('#popup-junket').hide()
      //   $('#fail-msg').text(window.language2.nihtanjunket_lobby_roomname4characters);
      //   $('#popup-fail .popup-alert-btn').empty();
      //   $('#popup-fail .popup-alert-btn').append(`
      //     <div class="btn-popup popup-btn--close -roomerror">
      //       <span>${window.language2.nihtanjunket_lobby_close}</span>
      //     </div>
      //   `)
      //   $("#popup-fail").show();
      //   clicked = false;
      // }

      if(confirmPassword != password) {
        $('.confirm-password').css({display: 'block'});
        $(`#junket-${tempname}-confirm-roompass`).addClass('error');
        $(`#junket-${tempname}-roompass`).removeClass('error');

        setTimeout(() => {
          $('.confirm-password').css({display: ''});
        }, 2500)
         clicked = false;
         return;
      } else {
        if(clicked) return;

        $.post(`/setRoomData`, {
          tableId: tableNumber,
          roomName: roomName,
          password: password,
          betRange: betRange,
          maxPlayers: maxPlayers,
          avatar: roomAvatar,
          gamename: gameName,
          roomType: roomType,
          duration: duration,

        }, (response) => {
          console.log("response: ", response);

          let btncon = $(".popup-room-btn-close");
          btncon.empty();

          if(!response) {
            $('.popup-body-inner').remove();
            $('.popup-btn-inner').remove();
            $('#popup-junket').hide().removeClass(`popup--${data.gameName}`);
            $('#popup-fail .popup-alert-btn').empty();
            $('#popup-fail .popup-alert-btn').append(`
              <div class="btn-popup popup-btn--close -roomerror">
                <span>${window.language2.nihtanjunket_lobby_close}</span>
              </div>
            `)
            $("#popup-fail").show();
            return;
          }

          $(".popup-container").animate({
            top: '-100%',
          }, {
            duration: 200,
            complete: function () {
              $('.popup-box').hide();
              $(".popup-container").removeClass("isShow");
              $('.popup-bg').hide().css({'top': ''}).removeClass('active');
              $('.popup-body-inner').remove();
              $('.popup-btn-inner').remove();
              $('#popup-junket').removeClass(`popup--${data.gameName}`);
            }
          })
          _this.eventListener.socket.emit('data', { eventName: 'create_room',
            data: {
              roomType : isJunket,
              vendor_id: window.vendor_id,
              gameDuration: duration,
              isMulti : type,
              title: response.roomName,
              gameName: data.gameName,
              token: response.roomToken,
              gameTable: response.tableId,
              range: response.betRange,

              roomId: response.flag,
              balanceBet : 0,
              password: response.password,
              userId: response.userId,
              userName: window.username,
              avatar: window.config.default,
              user_cnt: response.maxPlayers,
              money: window.money,
              vendorEndDate: vendorEndDate,
              slave: slave
            }}, (response) => {
            console.log("response", response);
            // window.location = window.lobby_domain;
            if(response==false) {
              $('#popup-fail .popup-alert-btn').empty()
              $(".popup-container").animate({
        	      top: '0'
        	    }, {
        	      duration: 200,
        	      start: function () {
        					$('.popup-bg').show();
                  $('.popup-box, .popup-alert-box').hide();
                  $('#popup-fail .popup-alert-btn').append(`
                    <div class="btn-popup popup-btn--close -alert">
                      <span>${window.language2.nihtanjunket_lobby_close}</span>
                    </div>
                  `)
        					$('#popup-fail').show();
                }
        	    })

            } else {
              clicked = false;
              // $(`#${data.gameName}-${response.tableId}-room`).addClass('active');
              $('.game-hover').removeClass('active');
              $(`#${data.gameName}-${response.tableId}-hover`).addClass('active')
            }
          });

        });

      }
      clicked = true;
    });

    $(document).off("click",'#popup-fail .popup-btn--close.-roomerror');
    $(document).on("click","#popup-fail .popup-btn--close.-roomerror" ,function(e){
      // $(".popup-container").animate({
      //   top: '-100%',
      // }, {
      //   duration: 200,
      //   complete: function () {
      //     $('.popup-box, .popup-alert-box').hide();
      //     $('.enter.gameButtons').css({ display : '' })
      //     $('.popup-bg').hide().css({'top': '', display : '' }).removeClass('active');
      //     $('#popup-fail .popup-alert-btn').empty();
      //   }
      // })
      $("#popup-fail").hide();
      $(`#checkname-${tempname}`).show().removeClass('ico-check').addClass('ico-not')
      // $(`#create-${tempname}`).trigger('click')
      $("#popup-junket").show();
      $(`#junket-${tempname}-roomname`).addClass('error');
    });

    //

    //cancel room button
    $(document).on("click",`#junket-cancel-${tempname}` ,function(){
      $(".popup-container").animate({
        top: '-100%',
      }, {
        duration: 200,
        complete: function () {
          $('.popup-box').hide();
          $(".popup-container").removeClass("isShow");
          $('.popup-bg').hide().css({'top': ''}).removeClass('active');
          // $('.popup-body-inner').remove();
          // $('.popup-btn-inner').remove();
        }
      })

      $('#popup-junket .popup-body').empty();
      $('#popup-junket').removeClass('-junketcreate')
      $('#popup-junket').removeClass(`popup--${data.gameName}`);
    });

    $(document).off("click", ".popup-channel-con > .range-selected");
    $(document).on("click", ".popup-channel-con > .range-selected", function (e) {
      if($('.popup-range-list').is(':visible')) {
        $('.popup-range-list').animate({'height':'0'},{
          duration : 200,
          complete : function () {
            $('.popup-range-list').hide()
          }
        });
        $(this).removeClass('active');
      } else {
        $('.popup-range-list').show();
        $('.popup-range-list').animate({'height': $('.popup-range-list').children().length *40 + 'px'},200);
        $(this).addClass('active');
      }
    })

    //set selected range data
    $(document).on("click", `.-betrange-list-${tempname} > .range-selected`, function () {
      let range = $(this).attr('data-range');
      let min = '';
      let max = '';
      $(`.-betrange-${tempname} > .range-selected`).attr('data-range', $(this).attr('data-range'));

      let betrange = Room.betRange(range.split('-')[0], range.split('-')[1])

      $(`.-betrange-${tempname} > .range-selected > .range-min`).html(betrange.rangemin);
      $(`.-betrange-${tempname} > .range-selected > .range-max`).html(betrange.rangemax);

      $('.popup-range-list').animate({'height':'0'},{
        duration : 200,
        complete : function () {
          $('.popup-range-list').hide()
          $('.popup-channel-con > .range-selected').removeClass('active')
        }
      });
    })

  } //createRoom


  static validationCheck (data) {
    let roomname = data.namespace.split("/").join("-") + "-roomname";
    let checkname = data.namespace.split("/").join("-");
    var input = document.getElementsByName(roomname)[0];

    var currencyRegex = /^[a-zA-Z0-9- ]*$/;

    function handleKeypress(e) {
      // Get the string value of the charCode.
      var char = String.fromCharCode(e.charCode),
      target = e.target,
      inputVal = target.value,
      // Construct what the value will be if the event is not prevented.
      value = inputVal.substr(0, target.selectionStart) + char + inputVal.substr(target.selectionEnd);
      // Test to make sure the user is inputting only valid characters
      // and that the resulting input is valid.

      if (!char.match(/^[a-zA-Z0-9- ]*$/) || !value.match(currencyRegex)) {
        toggleUI(false, target);
      } else {
        toggleUI(true, target);
      }
    } //handleKeypress

    function handleKeyup(e) {
      var target = e.target,
      keyCode = e.keyCode;
      // If the user deletes anything, test the value in the input
      // again to check for validity.

      if (keyCode === 8 || keyCode === 46 || keyCode === 13) {
        if(!target.value.match(currencyRegex)) {
          toggleUI(false, target);
        } else {
          toggleUI(true, target);
        }
      }

    } //handleKeyup

    function toggleUI(valid, target) {

      if (valid === true) {
        target.className = "valid";

        if(target.value) {
          document.getElementById(`checkname-${checkname}`).className = "ico-check";
          $(`#checkname-${checkname}`).show();
        } else {
          $(`#checkname-${checkname}`).hide();
        }

      } else {
        $(`#checkname-${checkname}`).show();
        document.getElementById(`checkname-${checkname}`).className = "ico-not";
        target.className = "error";
      }
    } //toggleUI
    input.onkeypress = handleKeypress;
    input.onkeyup = handleKeyup;
  }
}

export default {Room};
