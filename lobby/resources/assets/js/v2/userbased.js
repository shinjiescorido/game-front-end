import { createSprite, randomNum, createCardSprite, createTileSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';
import {instance as all} from './factory/all.js';
import {instance as userbased} from './factory/userbased.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_userbased = {
  room_stage : [],
  game_stage : null,
  main (roomdata, gamedata) {
    this.createStage(roomdata);
    this.createGameStage(gamedata);

    let self = this;

    self.createGameInfoTable(gamedata, gamedata.gameName, roomdata);

    $('.header-subnav__sortlist li').click(function(){
      $('.header-subnav__sort span').text($(this).text());
      $('.header-subnav__sort span').attr('data-value', $(this).attr('data-value')).removeClass('active');
      let currentOpen = toggle.getCurrentOpen();
      let rooms = self.context.instance.roomTables;
      let gameTables = self.context.instance.sicboTables[0];
      let type = 'Sicbo';

      if(currentOpen.toLowerCase() === "userbased_paigow") {
        type = 'Paigow';
        rooms = self.context.instance.paigow_roomTables;
        gameTables = self.context.instance.paigowTables[1];
      }
      self.createRoomTables(rooms, gameTables, $(this).attr('data-value'));
    });
  },

  getText(x,y,text,font,color,align,valign){
		let ctrl = new createjs.Text(text,font,color);
		ctrl.x = x;
		ctrl.y = y;
		ctrl.textAlign = align;
		ctrl.textBaseline = valign;//"middle"
		return ctrl;
    },
  createStage (data) {
    this.room_stage = [];
    $(".ub-room").empty();
    console.log( data, "room data")
    for(var x = 0; x < data.length; x++) {
      var c = document.createElement("canvas");

      c.setAttribute("id", "ub-room"+x)
      c.setAttribute("class", "ub-cont")
      c.setAttribute("width", "830");
      c.setAttribute("height", "125");

      $(".ub-room").append(c);

      $(c).css({
        position : 'absolute',
        left : '10px',
        top : (x* 125)+'px',
        transform : 'translate(0,0)'
      });

      this.room_stage[x] = new createjs.Stage("ub-room"+x);
      this.room_stage[x].enableMouseOver(10)
      this.room_stage[x].x = 15;
      this.room_stage[x].y = 5;

      if (window.nonInstall) {
        if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
          this.room_stage[x].regX =  0;
          this.room_stage[x].regY =  104;
          this.room_stage[x].rotation = 90;
        } else {
          this.room_stage[x].regX = 0;
          this.room_stage[x].regY =  0;
          this.room_stage[x].rotation = 0;
        }
  		} //nonInstall

    }
  }, //createStage
  createRoomTables (data, gamedata,  sort = 'all') {
    if(!data)  return;

    if(!data.length) {
      for(var x = 0; x < this.room_stage.length; x++) {
        this.room_stage[x].removeAllChildren();
      }
      return;
    };


    if(!this.room_stage.length) {
			this.main(this.context.instance.roomTables, this.context.instance.sicboTables[0])
		}

    all.room_tables = [];

    let sortedData = []
    switch(sort){
      case 'all':
        sortedData = _.filter(data, (e) => { return e.data[2] == window.vendor_id });
        break;
      case 'privaterooms':
        sortedData = _.filter(data, (e) => { return e.data[2] == window.vendor_id && e.banker.password });
        break;
      case 'publicrooms':
        sortedData = _.filter(data, (e) => { return e.data[2] == window.vendor_id && !e.banker.password});
        break;
    }
    this.createStage(sortedData);

    for(var x = 0; x < sortedData.length; x++) {
      this.room_stage[x].room_tables = [];
      this.room_stage[x].data = sortedData[x];
      all.makeRoomListTables(sortedData[x], gamedata, this.room_stage[x], null, x, this);
      userbased.makeRoomListTables(sortedData[x], gamedata, this.room_stage[x], null, x,this);
    }

    $('#privatejoin').on('click', (e)=> {
			let roompass = $('#joinpass').val();
			let token = $('#privatejoin').attr('token');
			let betrange = $('#privatejoin').attr('betrange');
			let tableid = $('#privatejoin').attr('tableid');
      let pass = $('#targetuser').val();
      let roomId = $('#privatejoin').attr('roomId');
      let game = $('#privatejoin').attr('game');

			$.post(`/checkPass`, {
				password: roompass,
				roomPassword: pass,
        roomId: roomId,
        game
			}, (response) => {
					if(response == 'true') {

            if (window.nonInstall) {
              if(game.toLowerCase() === "pai-gow") {
                location.assign(window.paigow_domain+"non/Paigow/"+tableid+"/"+betrange+"/0?token="+token)
              } else {
                location.assign(window.sb_domain+"non/Sicbo/"+tableid+"/"+betrange+"?token="+token)
              }
            } else {
              if(game.toLowerCase() === "pai-gow") {
                location.assign(window.paigow_domain+"m/Paigow/"+tableid+"/"+betrange+"/0?token="+token)
              } else {
                location.assign(window.sb_domain+"m/Sicbo/"+tableid+"/"+betrange+"?token="+token)
              }
            }
              $('#joinpass').val('');
              $('.error-text').hide();
					} else {
						$('.error-text').show();
					}
			});
		}); //privatejoin

  }, //createRoomTables

  createGameStage (data) {
    // == create only once
    if(document.getElementById("ub-game") === null) {
      var c = document.createElement("canvas");
      c.setAttribute("id", "ub-game")
      c.setAttribute("width", "430");
      c.setAttribute("height", "552px");


      $(c).css({
          position : 'absolute',
          left : '0',
          top : '0',
          transform : 'translate(0,0)'
      });

      $(".ub-game").append(c);
    }

    this.game_stage = new createjs.Stage("ub-game");
    this.game_stage.enableMouseOver(10)
    this.game_stage.x = 15;
    this.game_stage.y = 5;

    if (window.nonInstall) {
      if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
        this.game_stage.regX =  0;
        this.game_stage.regY =  530;
        this.game_stage.rotation = 90;
      } else {
        this.game_stage.regX = 0;
        this.game_stage.regY =  0;
        this.game_stage.rotation = 0;
      }
		} //nonInstall


    return c;
  }, //createGameStage
  createGameInfoTable (data, type, roomdata) {
    this.game_stage.removeAllChildren();
    this.table_bg = new createjs.Shape();
    this.table_bg.graphics.beginFill("#333333").drawRoundRectComplex( 0, 0, 420, 548, 10, 0, 0, 0 );
    this.table_bg.setBounds( 0, 0, 420, 548, 10, 0, 0, 0 );
    this.game_stage.addChild(this.table_bg);

    this.gameName_bg = new createjs.Shape();
    this.gameName_bg.graphics.beginLinearGradientFill(["#980000","#440001"], [0,1],0,0,230,0).drawRoundRectComplex( 0, 0, 420, 40, 10, 0, 0, 0 );
    this.game_stage.addChild(this.gameName_bg);

    this.gameName = this.getText( 10, 20, `${data.tableNumber}-${data.gameName}`, "20px ArvoItalic",'#efb052', "left", "middle" );
    this.game_stage.addChild(this.gameName);

    if(type == "Sicbo") {
      let game_label = this.getText(70,160 + 45, `${window.language.lobby.game}:`, "18px LatoBlack","#b5b5b5","center","top");
      this.game_stage.addChild(game_label);
      this.round_num = this.getText(70,game_label.y + 25, data.currentRound, "22px Lato","#b5b5b5","center","top");
    }
    if(type == "Paigow") {
      let game_label = this.getText(70,160 + 230, `${window.language.lobby.game}:`, "21px LatoBlack","#b5b5b5","center","top");
      this.game_stage.addChild(game_label);
      this.round_num = this.getText(70,game_label.y + 25, data.currentRound, "22px Lato","#b5b5b5","center","top");
    }
    this.game_stage.addChild(this.round_num);

    this.result_bg = new createjs.Shape();
    this.result_bg.graphics.f('#2A2A2A').drawRoundRect(0,0,245,220,10);
    this.result_bg.x = 145;
    this.result_bg.y = 60;
    this.game_stage.addChild(this.result_bg);

    let createFlag = false;
    for (var i = 0; i < roomdata.length; i++) {
      if (roomdata[i].banker.banker.user_id == window.userId) {
        createFlag = true;

      }
    }

    this.button_grad = ["#ffd476","#c69522"];

    let currOpen = toggle.getCurrentOpen().split("_")[1] ? toggle.getCurrentOpen().split("_")[1].toLowerCase() : toggle.getCurrentOpen().toLowerCase();

    if(parseInt(window.game_settings[currOpen]) == 1) {
      if(createFlag == true) {
        this.button_grad = ["#b38f40","#a07f38"]
      } else {
        this.button_grad = ["#ffd476","#c69522"];
      }
    } else {
      this.button_grad = ["#b38f40","#a07f38"]
    }

    if(window.isBanker == true) {
      this.button_grad = ["#b38f40","#a07f38"]
    }

    this.createButton = new createjs.Shape();
    this.createButton.graphics.beginLinearGradientFill( this.button_grad, [0, 1],0 ,0, 0, 32 ).drawRoundRect(0, 0, 245, 45, 10 );
    this.createButton.x = 145;
    this.createButton.y = 60 + 220 + 20;
    this.game_stage.addChild(this.createButton);

    console.log(this.game_stage, "lalalalala")
    this.createButton.addEventListener('click', (e) => {
      console.log(currOpen, "lalalalala")
      currOpen = toggle.getCurrentOpen().split("_")[1] ? toggle.getCurrentOpen().split("_")[1].toLowerCase() : toggle.getCurrentOpen().toLowerCase();
      if(parseInt(window.game_settings[currOpen]) == 1 && !window.isBanker) {
        if(createFlag == false) {
          let bet_range = [];
          let betRangeMax = 0;
          let betRangeMin = 0;
          let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
          bet_range = data.casinoBetRanges;

          for(var i = 0; i < bet_range.length; i++) {
            betRangeMax = (bet_range[i].max * parseInt(window.currencyMultiplier)) * window.userMultiplier * mainMultiplier;
            betRangeMin = (bet_range[i].min * parseInt(window.currencyMultiplier)) * window.userMultiplier * mainMultiplier;
            let disable = "";

            if(window.money < betRangeMin) {
              disable = "disabled";
            }

            $('.createroom__boxcon.-capital').append(
              "<div class='radio-con -capital'>"
              +"<div class='radio-btn "+ disable +"'>"
              +"<i><input type='radio' name='radio-btn' value='"+ bet_range[i].min +"-"+bet_range[i].max+"' class='radio-capital input-radio'/></i>"
              +"</div>"
              +"<span>"+numberWithCommas(betRangeMin)+" - "+numberWithCommas(betRangeMax)+"</span>"
              +"</div> "
            );
          }

          toggle.togglePopups("createroom");
          $('.dropdown-con > span').text($('.dropdown-list li:first-child').text());
          $('#roomname').val($('.dropdown-list li:first-child').text());
          $('#roomid').val(data.tableNumber);
        }
      }
      else {
        $("#popup-failed").show();
        setTimeout(() => {
          $(".popup-mb-container").addClass("isShow").show();
        }, 200)
        $("#popup-failed").animate({
          top: '30%',
          opacity : 1
        }, 200)
      }
    });

    // if(window.isBanker == true) {
    //   this.createButton.addEventListener('click', (e) => {
    //     $("#popup-failed").show();
    //     setTimeout(() => {
    //       $(".popup-mb-container").addClass("isShow").show();
    //     }, 200)
    //     $("#popup-failed").animate({
    //       top: '30%',
    //       opacity : 1
    //     }, 200)
    //   });
    // }

    this.createButtonText = this.getText(this.createButton.x + (245/2), this.createButton.y + (45/2), window.language.lobby.create_room, "bold 26px LatoBlack","#473102","center","middle");
    this.createButtonText.shadow = new createjs.Shadow("#feff5f",1,2,2);
    this.createButtonText.hitArea = this.createButton;
    this.game_stage.addChild(this.createButtonText);

    this.game_container = new createjs.Container();
    this.game_stage.data = data;
    this.game_stage.addChild(this.game_container);
    this.game_stage.game_container = this.game_container;

    if(type == "Sicbo") {
      this.game_stage.tables = {};
      userbased.sicboGameTable(data, this.game_stage);
    }

    if(type == "Paigow") {
      this.game_stage.tables = {};
      userbased.paigowGameTable(data, this.game_stage, this);
    }
  }, //createGameInfoTable++
  setNewround(data, e_gameName,tId , meta) {
    if(!this.currentSelected) return;
    for(var x = 0; x < data.length; x++) {
      if(e_gameName == data[x].gameName && tId == data[x].tableNumber) {
        if(this.currentSelected != data[x].namespace) return;
				this.round_num.text = data[x].currentRound;
			} //end if
		} //end for
  },

  setResultGameTable(data, type) {
    if(!this.currentSelected) return;
    if(this.currentSelected.toLowerCase() != `${type.toLowerCase()}/${data.tableNumber}`) return;

    if(toggle.getCurrentOpen().toLowerCase() === "userbased_sicbo") {
      userbased.sicboGameTable(data, this.game_stage);
    }
    if(toggle.getCurrentOpen().toLowerCase() === "userbased_paigow") {
      userbased.paigowDisplayRounds(data.gameResult, this.game_stage);

      let roadMarks = data.marks;
      roadMarks = rmformat().fnPaigowLastRounds(roadMarks);
      userbased.drawRoadMapPaigow(rmformat().fnPaigowRoadMap(roadMarks), this.game_stage);;
    }
  },

  setCardSwipe (data, type) {
    if(!this.currentSelected) return;
    if(this.currentSelected.toLowerCase() != `${type.toLowerCase()}/${data.tableId}`) return;

    userbased.drawTilesInputPaiGow(data, this.game_stage);
  },
  checkReset(data, gameName, index) {
    if(!this.currentSelected) return;
    console.log("checkinggg", data, gameName, this.currentSelected, "reset selected");
    if(gameName.toLowerCase() === "pai-gow") {
      let check = data.marks;
      check = rmformat().fnPaigowLastRounds(check);
      check  = rmformat().fnPaigowRoadMap(check);
      console.log("checkinggg", check);
      if(check.length >= 5 || check.length == 0){
        this.game_stage.roadmapDataCon.removeAllChildren();
        data.marks = [];
        data.game_info = {};
      }
    }
  }
} //component_sicbo

export default {
  component_userbased
}
