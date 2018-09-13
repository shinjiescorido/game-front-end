import { numberWithCommas } from '../factories/factories';

let component_createroom = {
  stage:null,

  main (data) {

    this.validationCheck();

    $('.numplayers').unbind('click').on('click', (e) =>{
      let val = parseInt($('.numplayers--val').data('value'));

      if($(e.currentTarget).hasClass('ico-plus') && val < 1000) {
        val += 10;
      }
      else if($(e.currentTarget).hasClass('ico-minus') && val > 10) {
        val-=10;
      }
      else {
        return;
      }
      $('.numplayers--val').data('value', val).text(val);
    });

    $('#createroom_submit').on('click', (e) => {
      e.preventDefault();

      let betRange = $('.radio-capital:checked').val();
      let maxPlayers = $('.numplayers--val').text();
      let roomName = $('#roomname').val();
      let password = $('#roompass').val();
      let roomId = $('#roomid').val();
      let roomAvatar = window.config.default;
      let money = window.money;
      let openToggle = toggle.getCurrentOpen();
      let currentOpen = openToggle.split("userbased_")[1].toLowerCase();

      if(roomName == "") {
        $('#roomname').addClass('error');
        $('#checkname').show();
        document.getElementById("checkname").className = "ico-not";
      }
      else if($("input[name='is_private']").is(':checked') && password == "" ) {
        $('#roompass').addClass('error');
        $('#checkpass').show();
        document.getElementById("checkpass").className = "ico-not";
      }
      else if(!$('.radio-capital').is(':checked') || !$('.radio-private').is(':checked')) {
        return false;
      }

      else {
        $.post(`/setRoomData`, {
          tableId: roomId,
          roomName: roomName,
          password: password,
          betRange: betRange,
          maxPlayers: maxPlayers,
          avatar: roomAvatar,
          money : money,
          gamename: currentOpen

        }, (response) => {
          console.log("response: ", response);

          if (response.flag === 'false') return;
          this.context.instance.socket.emit('data', {eventName: 'create_room',
            data: {
              title: response.roomName,
              range: response.betRange,
              gameName: currentOpen.toLowerCase() == 'paigow' ? 'Pai-Gow' : 'Sicbo',
              token: response.roomToken,
              user_cnt: response.maxPlayers,
              userId: response.userId,
              userName: window.username,
              gameTable: response.tableId,
              vendor_id: window.vendor_id,
              avatar: window.config.default,
              password: response.password,
              money: window.money,
              roomId: response.flag
            }
          });

          if(currentOpen == "sicbo") {
            if (window.nonInstall) {
              location.replace(window.sb_domain+"non/Sicbo/"+response.tableId+"/"+response.betRange+"?token="+response.roomToken)
              $('input').removeClass('error');
            } else {
              location.replace(window.sb_domain+"m/Sicbo/"+response.tableId+"/"+response.betRange+"?token="+response.roomToken)
              $('input').removeClass('error');
            }
          }
          if(currentOpen == "paigow") {
            if (window.nonInstall) {
              location.replace(window.paigow_domain+"non/Paigow/"+response.tableId+"/"+response.betRange+"/0?token="+response.roomToken)
              $('input').removeClass('error');
            } else {
              location.replace(window.paigow_domain+"m/Paigow/"+response.tableId+"/"+response.betRange+"/0?token="+response.roomToken)
              $('input').removeClass('error');
            }

          }


    		});
        toggle.togglePopups("createroom");
        $('.radio-con.-capital').remove()

      }
    });


  },

  validationCheck() {
    var input = document.getElementsByName('roomname')[0];
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
      if (keyCode === 8 || keyCode === 46) {
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
          document.getElementById("checkname").className = "ico-check";
          $('#checkname').show();
        } else {
          $('#checkname').hide();
        }

      } else {
        $('#checkname').show();
        document.getElementById("checkname").className = "ico-not";
        target.className = "error";
      }
    } //toggleUI
    input.onkeypress = handleKeypress;
    input.onkeyup = handleKeyup;
  }

}
export default {
  component_createroom
}
