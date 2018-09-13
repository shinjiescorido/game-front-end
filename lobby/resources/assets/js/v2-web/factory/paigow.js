import { createSprite, randomNum, createCardSprite, createTileSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import tilesModule from '../../factories/tiles';
import rmformat from '../../factories/formatter';

let formatData = rmformat();
let instance = null;

instance = {
  list_tables : [],
  lastroundBg : [],
  rounds : [],
  playArea : [],

  getText(x,y,text,font,color,align,valign){
    let ctrl = new createjs.Text(text,font,color);
    ctrl.x = x;
    ctrl.y = y;
    ctrl.textAlign = align;
    ctrl.textBaseline = valign;//"middle"
    return ctrl;
  },

  makeListTables (data, _target, _timer_c,  x, self) {
    this.list_tables[x] = _target.list_tables;

    let label_spacing = 65;

    // === game rounds
    let game_rounds_label = new createjs.Text(window.language.lobby.game,"20px latoregular","#fff");
    game_rounds_label.x = 180;
    game_rounds_label.y = 90 + this.list_tables[x].y;
    _target.addChild(game_rounds_label);

    this.list_tables[x].round_num.text = data.currentRound;
    this.list_tables[x].round_num.textAlign = "right";
    this.list_tables[x].round_num.color = "#fff";
    this.list_tables[x].round_num.x = 310;
    this.list_tables[x].round_num.font = "20px BebasNeue";
    this.list_tables[x].round_num.y = game_rounds_label.y + 35

    // === deal count
    let deal_label = new createjs.Text(window.language.lobby.set,"20px latoregular","#fff");
    deal_label.x = 180;
    deal_label.y = game_rounds_label.y + label_spacing;
    _target.addChild(deal_label);

    let mark = rmformat().fnPaigowLastRounds(data.marks);

    this.list_tables[x].deal_count = new createjs.Text(mark.length, "20px BebasNeue","#fff");
    this.list_tables[x].deal_count.textAlign = "right";
    this.list_tables[x].deal_count.x = 310;
    this.list_tables[x].deal_count.y = deal_label.y + 30;
    _target.addChild(this.list_tables[x].deal_count);

    // === round
    // let round_label = new createjs.Text(window.language.advanced_bet.rounds+ ':' ,"20px latoregular","#B1B1B1");
    // round_label.x = 180;
    // round_label.y = deal_label.y + label_spacing;
    // _target.addChild(round_label);
    //
    // this.list_tables[x].round_num = new createjs.Text(data.marks.length, "20px BebasNeue","#ABABAB");
    // this.list_tables[x].round_num.textAlign = "right";
    // this.list_tables[x].round_num.x = 310;
    // this.list_tables[x].round_num.y = round_label.y + 2;
    // _target.addChild(this.list_tables[x].round_num);

    this.list_tables[x].status.text = window.language.lobby.nowbetting;
    this.list_tables[x].status.x = 180;
    this.list_tables[x].status.y = deal_label.y + 75;

    // === timer
    this.list_tables[x].timer.x = -10;
    this.list_tables[x].timer.y = this.list_tables[x].y  + 54;

    // === dealer image
    this.list_tables[x].dealer_img_bg.x = 92
    this.list_tables[x].dealer_img_bg.y = 156 + this.list_tables[x].y;

    this.list_tables[x].dealer_img.x = this.list_tables[x].dealer_img_bg.x + 190;
    this.list_tables[x].dealer_img.y = this.list_tables[x].dealer_img_bg.y + 190;
    this.list_tables[x].dealer_img.mask = this.list_tables[x].dealer_img_bg

    // === dealer name
    this.list_tables[x].dealer_name.text = data.currentDealer;
    this.list_tables[x].dealer_name.x = 92;
    this.list_tables[x].dealer_name.y = 232 + this.list_tables[x].y;
    _target.addChild(this.list_tables[x].dealer_name);

    // === add background
    let bg = new createjs.Shape();
    bg.graphics.setStrokeStyle(2).beginStroke("#585556").moveTo(350,0).lineTo(350, 283).moveTo(1367, 0).lineTo(1367,283).endStroke()
    .beginFill("#333").drawRect(351,0,1015,283);
    _target.addChild(bg);

    // === latest result
    let result_bg = new createjs.Shape();
    result_bg.graphics.beginFill("#2a2a2a").drawRoundRect(0, 0, 225, 205, 10);
    result_bg.x = 370;
    result_bg.y = 20 + this.list_tables[x].y;
    _target.addChild(result_bg);

    // === Road Map
    let ch1 = this.getText(635,30, '庄', "25px latobold","#b5b5b5","left","top");
    _target.addChild(ch1);

    let ch2 = this.getText(ch1.x,30 + 47, '上', "25px latobold","#b5b5b5","left","top");
    _target.addChild(ch2);

    let ch3 = this.getText(ch1.x,30 + 47 * 2, '天', "25px latobold","#b5b5b5","left","top");
    _target.addChild(ch3);

    let ch4 = this.getText(ch1.x,30 + 47 * 3, '下', "25px latobold","#b5b5b5","left","top");
    _target.addChild(ch4);

    let roadmapcon = new createjs.Container();
    roadmapcon.x = 670;
    roadmapcon.y = 22;
    _target.addChild(roadmapcon);

    let gw = 47;
    for(let i = 0; i < 4; i ++) {

      for(let j=0; j < 5; j++) {
        let grid = new createjs.Shape();
        grid.graphics.f('#3F3F3F').setStrokeStyle(1).beginStroke('#676767').moveTo(0,0).lineTo(0,gw).lineTo(gw,gw).lineTo(gw, 0).lineTo(0,0);
        grid.x = j * gw;
        grid.y = i * gw;
        roadmapcon.addChild(grid);
      }
    }

    // === Game Route
    let gamerouteText = this.getText(940,22, window.language.lobby.gameroutecaps, "22px latobold","#fff","left","top");
    _target.addChild(gamerouteText);

    // ==== table status
    let status_spacing = 150;
    let status_bg = new createjs.Shape();
    status_bg.graphics.beginFill('#2A2A2A').drawRect(365 - 14,248 - 8,1015,45);
    _target.addChild(status_bg);

    let status_container = new createjs.Container();
    status_container.x = 365;
    status_container.y = 248;
    _target.addChild(status_container);

    // ==== player status
    let playersIcon = new createjs.Bitmap('/img/icons/paigow/players_ico.png');
    playersIcon.setBounds(0,0,33,29);

    playersIcon.scaleX = playersIcon.scaleY = 0.8;

    this.list_tables[x].userCount = new createjs.Text(data.totalUsers, "22px BebasNeue", "#9C9C9C");
    this.list_tables[x].userCount.x = 35;
    status_container.addChild(playersIcon, this.list_tables[x].userCount);

    // === up bet status
    let upCircle = new createjs.Shape();
    upCircle.graphics.beginFill('#F0942B').setStrokeStyle(1).beginStroke('#fff').drawCircle(0,12,12);
    upCircle.x = this.list_tables[x].userCount.x + this.list_tables[x].userCount.getMeasuredWidth() + status_spacing;

    let upText = new createjs.Text('上', 'bold 12px Arial', '#fff');
    upText.x = upCircle.x - 6;
    upText.y = 4;

    this.list_tables[x].up_bets = new createjs.Text("0", "22px BebasNeue", "#9C9C9C");
    this.list_tables[x].up_bets.x = upCircle.x + 25;
    status_container.addChild(upCircle, upText, this.list_tables[x].up_bets);

    // === heaven bet status
    let heavenCircle = new createjs.Shape();
    heavenCircle.graphics.beginFill('#15499D').setStrokeStyle(1).beginStroke('#fff').drawCircle(0,12,12);
    heavenCircle.x = this.list_tables[x].up_bets.x + this.list_tables[x].up_bets.getMeasuredWidth() + status_spacing;

    let heavenText = new createjs.Text('天', 'bold 12px Arial', '#fff');
    heavenText.x = heavenCircle.x - 6;
    heavenText.y = 4;

    this.list_tables[x].heaven_bets = new createjs.Text("0", "22px BebasNeue", "#9C9C9C");
    this.list_tables[x].heaven_bets.x = heavenCircle.x + 25;
    status_container.addChild(heavenCircle, heavenText, this.list_tables[x].heaven_bets);

    // === heaven bet status
    let downCircle = new createjs.Shape();
    downCircle.graphics.beginFill('#009659').setStrokeStyle(1).beginStroke('#fff').drawCircle(0,12,12);
    downCircle.x = this.list_tables[x].heaven_bets.x + this.list_tables[x].heaven_bets.getMeasuredWidth() + status_spacing;

    let downText = new createjs.Text('下', 'bold 12px Arial', '#fff');
    downText.x = downCircle.x - 6;
    downText.y = 4;

    this.list_tables[x].down_bets = new createjs.Text("0", "22px BebasNeue", "#9C9C9C");
    this.list_tables[x].down_bets.x = downCircle.x + 25;
    status_container.addChild(downCircle, downText, this.list_tables[x].down_bets);

    status_container.visible = parseInt(window.room_info);
    // end user

    //statistics starts here
    let statistics_container = new createjs.Container();
    statistics_container.set({x: status_container.x, y:status_container.y});
    _target.addChild(statistics_container);

    let targets = [{name:'banker_stat', color:'#b71b1c', label : '庄'}, {name:'up_stat', color:'#ef8f20', label : '上'}, {name:'heaven_stat', color:'#14499c', label : '天'}, {name:'down_stat', color:'#009458', label : '下'}];
    let masks = [];
    let stat_bg = [];

    for(var i = 0; i < targets.length; i++) {

      _target[targets[i].name] = new createjs.Shape();
      _target[targets[i].name].graphics.beginFill(targets[i].color).drawRect(0,0,180,22,5);
      _target[targets[i].name].set({x : (i*240) + 40, y:  2});
      _target[targets[i].name].text = new createjs.Text("0%", "20px bebasneue", "#fff");
      _target[targets[i].name].text.x = _target[targets[i].name].x + 8;
      _target[targets[i].name].text.textBaseline = "middle";
      _target[targets[i].name].text.y = _target[targets[i].name].y + (22/2);

      statistics_container.addChild(_target[targets[i].name], _target[targets[i].name].text);

      masks[i] = new createjs.Shape();
      masks[i].graphics.beginFill("red").drawRoundRect(0,0,180,22,5);
      masks[i].x = _target[targets[i].name].x;
      masks[i].y = _target[targets[i].name].y;

      _target[targets[i].name].mask = masks[i]
      _target[targets[i].name].scaleX = 0;

      stat_bg[i] = new createjs.Shape();
      stat_bg[i].graphics.ss(2).s(targets[i].color).drawRoundRect(_target[targets[i].name].x, _target[targets[i].name].y, 180, 22, 5);
      statistics_container.addChild(stat_bg[i]);

      let label = this.getText(_target[targets[i].name].x - 32, _target[targets[i].name].y - 5, targets[i].label, "25px latobold","#b5b5b5","left","top");
      statistics_container.addChild(label);

      statistics_container.visible = !parseInt(window.room_info);
    }
    //statistics ends here

    // ======================================================
    let playArea = ['up', 'heaven', 'down', 'banker']; // the playArea to be looped
    let playerColor = ['#F18F00', '#134CA3', '#00965A', '#B61C1C']; // the highlight color of the winner

    // marks
    let roadMarks = data.marks;
    _.forEach(roadMarks, (m) => {
      if(typeof m.game_info == 'string') m.game_info = JSON.parse(m.game_info); // format game_info
      if(typeof m.game_result == 'string') m.game_result = JSON.parse(m.game_result); //format game_result
    });

    // loop 5 backgrounds for lastrounds
    this.lastroundBg = new createjs.Shape();
    this.lastroundBg.graphics.f("#2a2a2a").drawRoundRect( 0, 0, 168, 158, 8 );
    this.lastroundBg.x = 395;
    this.lastroundBg.y = 30;
    _target.addChild(this.lastroundBg);

    // container for the tiles when displayed
    this.roundsContainer = new createjs.Container();
    this.roundsContainer.x = 0;
    this.roundsContainer.y = 25;
    _target.addChild(this.roundsContainer);

    // setcon contains 2 tiles per playarea
    let setcon = new createjs.Container();
    setcon.x = this.lastroundBg.x + (150 / 2);
    setcon.y = this.lastroundBg.y + (138 / 2)  - 32;
    this.roundsContainer.addChild(setcon);

    //set rounds
    this.rounds = rounds || [];

    let rounds = _.first(formatData.fnPaigowLastRounds(roadMarks));
    let d = 65; // adjustable dimension of the tiles
    // looping the playArea
    for (let j=0; j<playArea.length;j++) {
      let tileData = !rounds ? ['0000','0000'] : _.find(rounds.game_info.tiles, (value, key)=> { return key == playArea[j] }); //tiles(2) to be displayed

      // tile 0 if no data
      if(!tileData) tileData = [0,0];

      // container of the tiles
      let tilecon = new createjs.Container();
      tilecon.setBounds( 0, 0, 75, 52 );
      tilecon.x = (j != 3 ? d - 8 : d) * (j == 3 ? 0 : j-1);
      tilecon.y = d * (j == 2 ? 0 : j == 3 ? -1 : j);
      tilecon.regX = 34;
      tilecon.regy = 21.5;
      setcon.addChild(tilecon);

      _target[playArea[j]] = {};
      _target[playArea[j]].tileBg  = new createjs.Shape();
      _target[playArea[j]].tileBg.graphics.clear().f(playerColor[j]).drawRoundRect( -2,-2, 97, 65, 4 );
      _target[playArea[j]].tileBg.alpha = 0;
      tilecon.addChild(_target[playArea[j]].tileBg);

      // first tile display
      if(tileData[0] != undefined) {
        _target[playArea[j]+"_0"] = createTileSprite(this, 46, 60, self.context.load.getResources("small_tiles"));
        _target[playArea[j]+"_0"].gotoAndStop('tile-'+tilesModule(tileData[0]).value);
        _target[playArea[j]+"_0"].scaleX =  _target[playArea[j]+"_0"].scaleY = 1;
        _target[playArea[j]+"_0"].alpha = 0;
        tilecon.addChild(  _target[playArea[j]+"_0"]);
      }
      //second tile display
      if(tileData[1] != undefined) {
        _target[playArea[j]+"_1"] = createTileSprite(this, 46, 60, self.context.load.getResources("small_tiles"));
        _target[playArea[j]+"_1"].gotoAndStop('tile-'+tilesModule(tileData[1]).value);
        _target[playArea[j]+"_1"].scaleX = _target[playArea[j]+"_1"].scaleY = 1;
        _target[playArea[j]+"_1"].x = 46;
        _target[playArea[j]+"_1"].alpha = 0;
        tilecon.addChild( _target[playArea[j]+"_1"]);
      }
    }

    //SETTING CURRENT TILES/
    var flag = false;
    for(var key in data.gameInfo.tiles) {
     var res =  _.filter(data.gameInfo.tiles[key], function(e) {return e !== null});
     if(res.length) {
       flag = true;
       for(var a = 0; a < data.gameInfo.tiles[key].length; a++) {
         if(data.gameInfo.tiles[key][a] === null) continue;
         _target[key+"_"+a].alpha = 1;
         _target[key+"_"+a].gotoAndStop("tile-"+data.gameInfo.tiles[key][a][3]);
       }
     }
    }

    // checking if gameinfo tiles incomplete
    for (let j=0; j<playArea.length;j++) {
      if(!_.isEmpty(data.gameInfo) &&  _.filter(data.gameInfo.tiles[playArea[j]], function (e) {return !e }).length) {
        flag = false
      }
    }

    if(data.roundStatus.toLowerCase() != 'p' && data.marks.length) {
      // checking init winning
      if(data.marks[0].game_result && data.marks[0].game_result.winner &&  data.marks[0].game_result.winner.length) {
        for(let i = 0; i < data.marks[0].game_result.winner.length; i++) {
          _target[data.marks[0].game_result.winner[i]].tileBg.alpha = flag ? 1 : 0;
        }
      }
    }

    // static route tiles

    // gameroute container
    _target.routeTileCon = new createjs.Container();
    _target.routeTileCon.x = 940;
    _target.routeTileCon.y = 78;
    _target.routeTileCon.routes = {};
    _target.addChild(_target.routeTileCon);

    _target.routeTiles = {
      'tile-1' : [],
      'tile-2' : [],
      'tile-3' : [],
      'tile-4' : [],
      'tile-5' : [],
      'tile-6' : [],
      'tile-7' : [],
      'tile-8' : [],
      'tile-9' : [],
      'tile-0' : [],
    };

    // loop route tiles
    let index = 0;
    for (let area in _target.routeTiles) {
      let tile = createTileSprite(this, 46, 60, self.context.load.getResources("small_tiles"));
      tile.gotoAndStop(area);
      tile.scaleX = tile.scaleY = 1;
      tile.x = (index > 4 ? index - 5 : index) * 75;
      tile.y = index < 5 ? 0 : 70;
      _target.routeTileCon.addChild(tile);
      _target.routeTileCon.routes[area] = [];

      for (let j = 0; j < 4; j++ ) {
        _target.routeTileCon.routes[area][j] = new createjs.Shape();
        _target.routeTileCon.routes[area][j].graphics.f('#000').drawCircle(0,0,4);
        _target.routeTileCon.routes[area][j].x = tile.x + 61;
        _target.routeTileCon.routes[area][j].y = tile.y + 7 + (j * 16);
        _target.routeTileCon.addChild(_target.routeTileCon.routes[area][j]);
      }
      index++;
    }

    // roadmap container
    _target.roadmapDataCon = new createjs.Container();
    _target.roadmapDataCon.x = 678;
    _target.roadmapDataCon.y = 30;
    _target.addChild(_target.roadmapDataCon);

    // bets
    this.bets_data = {
      heaven :0,
      up :0,
      down :0
    }

    this.list_tables[x].maintenanceCon = new createjs.Container();
    this.list_tables[x].maintenanceCon.visible = false;
    _target.addChild(this.list_tables[x].maintenanceCon);

    this.list_tables[x].maintenanceCon.on("click", (e) => {
      return;
    });

    let header_bg = ["#980000","#2b0000"];
    let text_color = "#efb052";

    if(data.roomType == "p") {
      header_bg = ["#bd0000","#7c0000"];
      text_color = "#efb052";
    } else if(data.roomType == "v") {
      header_bg = ["#fedd78","#d5a515"];
      text_color = "#000";
    }

    this.list_tables[x].maintenanceBg = new createjs.Shape();
    this.list_tables[x].maintenanceBg.graphics.beginFill("#333333").drawRoundRect(0, 0, 1640, 283, 6);
    this.list_tables[x].maintenanceBg.x = this.list_tables[x].x;
    this.list_tables[x].maintenanceBg.y = this.list_tables[x].y + 1;
    this.list_tables[x].maintenanceBg.table_id = data.tableNumber;
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceBg);

    this.list_tables[x].maintenanceHeader = new createjs.Shape();
    this.list_tables[x].maintenanceHeader.x = this.list_tables[x].x;
    this.list_tables[x].maintenanceHeader.y = this.list_tables[x].y - 1;
    this.list_tables[x].maintenanceHeader.graphics.beginLinearGradientFill(["#960000", "#2a0001"],[0,1],0,0,1640,10).drawRoundRectComplex(0,0,1640,333,10,10,0,0);
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceHeader);

    this.list_tables[x].table_name = new createjs.Text(window.language.lobby.paigow,"22px ArvoItalic","#fdba44");
    this.list_tables[x].table_name.x = 80; //175;
    this.list_tables[x].table_name.y = 13 + this.list_tables[x].y;
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].table_name);

    if(window.language.locale == "zh") {
      this.list_tables[x].table_name = "25px ArvoItalic";
    }

    this.list_tables[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"24px ArvoBold","#fdba44");
    this.list_tables[x].table_num.x = 40; //this.list_tables[x].table_name.x - (this.list_tables[x].table_name.getBounds().width / 2) - 10;
    this.list_tables[x].table_num.y = 11 + this.list_tables[x].y;
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].table_num);

    this.list_tables[x].maintenanceLogo = new createjs.Bitmap(self.context.load.getResources("maintenance_ico"));
    this.list_tables[x].maintenanceLogo.x = 30;
    this.list_tables[x].maintenanceLogo.y = 90 + this.list_tables[x].y;
    this.list_tables[x].maintenanceLogo.scaleX = this.list_tables[x].maintenanceLogo.scaleY = 0.85;
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceLogo);

    this.list_tables[x].maintenanceTxt = new createjs.Text('', '30px bebasneue', '#ffb547');
    this.list_tables[x].maintenanceTxt.x = 185;
    this.list_tables[x].maintenanceTxt.y = 110 + this.list_tables[x].y;
    this.list_tables[x].maintenanceTxt.textAlign = 'left';
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceTxt);

    this.list_tables[x].maintenanceSubTxt = new createjs.Text('', '28px bebasneue', '#fff');
    this.list_tables[x].maintenanceSubTxt.x = 185;
    this.list_tables[x].maintenanceSubTxt.y = 150 + this.list_tables[x].y;
    this.list_tables[x].maintenanceSubTxt.textAlign = 'left';
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceSubTxt);

    this.list_tables[x].maintenanceTime = new createjs.Text('', '26px bebasneue', '#fff');
    this.list_tables[x].maintenanceTime.x = 185;
    this.list_tables[x].maintenanceTime.y = 185 + this.list_tables[x].y;
    this.list_tables[x].maintenanceTime.textAlign = 'left';
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceTime);

    this.checkMaintenance(data, false, x);
    this.setStats(data.marks, _target, x, self);
    this.setRoomInfo(data.betInfo, x, data.totalBettingUsers);
    this.drawRoadMap(data.marks, _target, _timer_c, x, self);

    
    let temp = _.clone(formatData.fnPaigowLastRounds(roadMarks));
    let cnt = !_.isEmpty(data.gameInfo.tiles) ? data.gameInfo.setCount : 0;
    let cnt_2 = temp.length && temp[temp.length-1].game_info.setCount? temp[temp.length-1].game_info.setCount : 0;
    
    var check = self.checkReset(data, 'Pai-Gow', x);

    console.log(cnt_2, cnt, "check", cnt != cnt_2)
    if(check) {
      temp = [];
    }
    
    if(cnt != cnt_2 && !_.isEmpty(data.gameInfo)) {
      temp.push({
        game_info: data.gameInfo
      });
    }
    console.log(temp, "check", check)
    this.drawGameRoute(temp, _target, "noformat");
    this.setStatus(data, _target, _timer_c,  x);
  },
  setStats (data, _target, x, self) {
    if(!_target || !_target.children.length) return;
    data = rmformat().fnPaigowLastRounds(data);
    data  = rmformat().fnPaigowRoadMap(data);

    if(!data.length) return;
    let stat = {
      banker : 0,
      up : 0,
      down : 0,
      heaven : 0
    }

    let totWin = 0;
    for(var i = 0; i < data.length; i++) {
      for(var key in stat) {
        let win = _.filter(data[i].game_result.winner, function(e) { return e === key});
        totWin += parseInt(win.length);
        if(win.length) {
          stat[key] += win.length
        }
      }
    }
    for(var key in stat) {

      createjs.Tween.get(_target[key+'_stat'], {override:true})
      .to({
        scaleX :stat[key] / data.length
      }, 150, createjs.Ease.circOut)

      let val = (stat[key] / totWin) * 100;

      if(val % 1 !== 0) val = parseFloat(val).toFixed(1);
      _target[key+'_stat'].text.text = `${val}%`;
    }
  },
  setRoomInfo(data, x, totalBettingUsers) {
    if (!this.list_tables[x]) return;

    this.resetRoomInfo(x);

    if (_.isEmpty(data)) return;

    this.bets_data.heaven += !data.hasOwnProperty('heaven') ? 0 : data.heaven.totalBets;
    this.bets_data.up += !data.hasOwnProperty('up') ? 0 : data.up.totalBets;
    this.bets_data.down += !data.hasOwnProperty('down') ? 0 : data.down.totalBets;

    this.list_tables[x].heaven_bets.text = numberWithCommas(this.bets_data.heaven);
    this.list_tables[x].up_bets.text = numberWithCommas(this.bets_data.up);
    this.list_tables[x].down_bets.text = numberWithCommas(this.bets_data.down);

    this.list_tables[x].userCount.text = numberWithCommas(totalBettingUsers);
  },
  checkMaintenance (maintenanceData, socket, x) {
    if (!this.list_tables || !this.list_tables[x] || !this.list_tables[x].maintenanceCon) return;

    if (window.userAuthority === "admin") return;

    let maintenance = false;
    let activeMaintenance = [];
    let mainText = '';
    let subText = '';

    if (!socket) {
      let mainMaintenance = maintenanceData.mainMaintenance.status;
      let maintenanceSetting = maintenanceData.maintenanceSetting;

      // if (mainMaintenance == 1) {
      //  maintenance = true;
      // }

      for (var i = 0; i < maintenanceSetting.length; i++) {
        if (maintenanceSetting[i].status == 1) {
          maintenance = true;
          activeMaintenance = maintenanceSetting[i];
        }
      }
    } else {
      activeMaintenance = maintenanceData.data;

      if (maintenanceData == 1) {
        maintenance = true;
      } else {
        maintenance = false;
      }
    }

    if (activeMaintenance.status === undefined) return;

    let newStartTime = setCurrentTimezone(activeMaintenance.start_time);
    let newEndTime = setCurrentTimezone(activeMaintenance.end_time);

    if (parseInt(activeMaintenance.main_text) == 1) {
      mainText = window.language.lobby.maintextCap1;
    }
    else if (parseInt(activeMaintenance.main_text) == 2) {
      mainText = window.language.lobby.maintextCap2;
    }
    else if (parseInt(activeMaintenance.main_text) == 3) {
      mainText = window.language.lobby.maintextCap3;
    }

    if (parseInt(activeMaintenance.sub_text) == 1) {
      subText = window.language.lobby.subtextCap1;
    }
    else if (parseInt(activeMaintenance.sub_text) == 2) {
      subText = window.language.lobby.subtextCap2;
    }
    else if (parseInt(activeMaintenance.sub_text) == 3) {
      subText = window.language.lobby.subtextCap3;
    }

    if (maintenance) {
      this.list_tables[x].maintenanceCon.visible = true;
      this.list_tables[x].maintenanceTxt.text = mainText;
      this.list_tables[x].maintenanceSubTxt.text = subText;
      this.list_tables[x].maintenanceTime.text = newStartTime +' ~ '+ newEndTime;
    } else {
      this.list_tables[x].maintenanceCon.visible = false;
    }
  },
  resetRoomInfo(x) {

    // bets
    this.bets_data = {
      heaven :0,
      up :0,
      down :0
    }

    this.list_tables[x].heaven_bets.text = 0;
    this.list_tables[x].up_bets.text = 0;
    this.list_tables[x].down_bets.text = 0;
  },

  drawTilesInput(_target, self, type, info) {
    if(!_target || !_target.children.length) return;

    let val = _.cloneDeep(info.gameInfo.tiles[type.split("_")[1]]);
    val[0] = val[0][val[0].length-1]; 
    val[1] = val[1][val[1].length-1]; 

    var type1 = type.split("_")[1]+'_0';
    var type2 = type.split("_")[1]+'_1';

    _target[type1].gotoAndStop("tile-"+val[0]);
    _target[type2].gotoAndStop("tile-"+val[1]);
    _target[type1].alpha = 0;
    _target[type2].alpha = 0;
    createjs.Tween.get(_target[type1])
    .wait(500)
    .to({
      alpha: 1
    },200);
    createjs.Tween.get(_target[type2])
    .wait(500)
    .to({
      alpha: 1
    },200);

    if(val[0] == 10) val[0] = 0;
    if(val[1] == 10) val[1] = 0;

    _target.routeTiles[`tile-${val[0]}`].push(`000${val[0]}`);
    _target.routeTiles[`tile-${val[1]}`].push(`000${val[1]}`);

    // loop routetiles
    for (let area in _target.routeTiles) {
      // 2nd loop routetilecon
      for(let i=0;i<_target.routeTileCon.routes[area].length;i++) {
        // draw route if data exist in routetiles
        if(_target.routeTiles[area][i]) {
          _target.routeTileCon.routes[area][i].graphics.clear().f('#2CA84B').drawCircle(0,0,4);
        }
      }
    }
  }, // drawTiles

  displayRounds (data, _target, self) {
    if(!data) return;
    if(!_target || !_target.children.length) return;

    let playArea = ['up', 'heaven', 'down', 'banker']; // the playArea to be looped
    for(let j = 0; j < playArea.length; j++) {
      _target[playArea[j]+"_0"].alpha = 1;
      _target[playArea[j]+"_1"].alpha = 1;
    }

    _target.up.tileBg.alpha = 0;
    _target.down.tileBg.alpha = 0;
    _target.heaven.tileBg.alpha = 0;
    _target.banker.tileBg.alpha = 0;

    if(data.winner &&  data.winner.length) {
      for(let i = 0; i < data.winner.length; i++) {
        _target[data.winner[i]].tileBg.alpha = 1;
      }
    }
  },

  drawRoadMap (data, _target, _timer_c,  x, self) {
    if (!this.list_tables[x]) return;

    let playArea = ['banker', 'up', 'down', 'heaven']; // the playArea to be looped
    let playerColor = ['#B61F24', '#EF8F21', '#2764AD', '#009558']; // the highlight color of the winner

    data = rmformat().fnPaigowLastRounds(data);
    data  = rmformat().fnPaigowRoadMap(data);
    // clear roadmap data container
    _target.roadmapDataCon.removeAllChildren();

    //loop data to display
    for (let i=0; i<data.length; i++) {
      let areas = data[i].areas;
      for(let j=0; j<areas.length; j++) {
        //draw winning background if winner
        if(areas[j].isWinner) {
          let winBG = new createjs.Shape();
          winBG.graphics.f('#DEC343').drawRect(-8,-8,46,46);
          winBG.x = i * 47;
          winBG.y = j * 47;
          _target.roadmapDataCon.addChild(winBG);
        }
        // draw player circle
        let circle = new createjs.Shape();
        circle.graphics.f(areas[j].color).drawCircle(0,0,20);
        circle.x = 15 + (i * 47);
        circle.y = 15 + (j * 47);
        _target.roadmapDataCon.addChild(circle);
        //if pair add small circle
        if(areas[j].isPair) {
          circle.graphics.moveTo(0,15).setStrokeStyle(0.8).beginStroke('#fff').drawCircle(12,12,5);
        }
        // player circle total
        let total = this.getText(circle.x,circle.y, areas[j].total, "20px latobold","#fff","center","middle");
        _target.roadmapDataCon.addChild(total);
      }
    }
  },  // drawRoadMap

  drawGameRoute (data, _target, type) {
    console.log(data, "rawwwwww")
    if(!_target || !_target.children.length) return;

    if(type != "noformat") {
      data = rmformat().fnPaigowLastRounds(data);
    }
    console.log(data, "not rawwwwww")

    _target.routeTiles = {
      'tile-1' : [],
      'tile-2' : [],
      'tile-3' : [],
      'tile-4' : [],
      'tile-5' : [],
      'tile-6' : [],
      'tile-7' : [],
      'tile-8' : [],
      'tile-9' : [],
      'tile-0' : [],
    };

    // loop rounds
    for(let i=0;i<data.length;i++) {
      // loop tiles
      for(let area in data[i].game_info.tiles) {
        let tileData = data[i].game_info.tiles[area];

        if(tileData[0] != undefined && _target.routeTiles['tile-'+tilesModule(tileData[0]).number]){
          _target.routeTiles['tile-'+tilesModule(tileData[0]).number].push(tileData[0])
        }
        if(tileData[1] != undefined && _target.routeTiles['tile-'+tilesModule(tileData[1]).number]){
          _target.routeTiles['tile-'+tilesModule(tileData[1]).number].push(tileData[1])
        }
      }
    }

    console.log(_target.routeTiles, "not tiles")
    // reset
    for (let area in _target.routeTiles) {
      _target.routeTileCon.routes[area][0].graphics.clear().f('#000').drawCircle(0,0,4);
      _target.routeTileCon.routes[area][1].graphics.clear().f('#000').drawCircle(0,0,4);
      _target.routeTileCon.routes[area][2].graphics.clear().f('#000').drawCircle(0,0,4);
      _target.routeTileCon.routes[area][3].graphics.clear().f('#000').drawCircle(0,0,4);
    }

    // loop routetiles
    for (let area in _target.routeTiles) {
      // 2nd loop routetilecon
      for(let i=0;i<_target.routeTileCon.routes[area].length;i++) {
        // draw route if data exist in routetiles
        if(_target.routeTiles[area][i]) {
          _target.routeTileCon.routes[area][i].graphics.clear().f('#2CA84B').drawCircle(0,0,4);
        }
      }
    }
  }, // drawGameRoute
  resetInfos (_target) {

    _target.roadmapDataCon.removeAllChildren();

    _target.up.tileBg.alpha = 0;
    _target.down.tileBg.alpha = 0;
    _target.heaven.tileBg.alpha = 0;
    _target.banker.tileBg.alpha = 0;

    _target.routeTiles = {
      'tile-1' : [],
      'tile-2' : [],
      'tile-3' : [],
      'tile-4' : [],
      'tile-5' : [],
      'tile-6' : [],
      'tile-7' : [],
      'tile-8' : [],
      'tile-9' : [],
      'tile-0' : [],
    };

    // reset
    for (let area in _target.routeTiles) {
      _target.routeTileCon.routes[area][0].graphics.clear().f('#000').drawCircle(0,0,4);
      _target.routeTileCon.routes[area][1].graphics.clear().f('#000').drawCircle(0,0,4);
      _target.routeTileCon.routes[area][2].graphics.clear().f('#000').drawCircle(0,0,4);
      _target.routeTileCon.routes[area][3].graphics.clear().f('#000').drawCircle(0,0,4);
    }

    // loop routetiles
    for (let area in _target.routeTiles) {
      // 2nd loop routetilecon
      for(let i=0;i<_target.routeTileCon.routes[area].length;i++) {
        // draw route if data exist in routetiles
        if(_target.routeTiles[area][i]) {
          _target.routeTileCon.routes[area][i].graphics.clear().f('#000').drawCircle(0,0,4);
        }
      }
    }

    //reset statitsics info
    let stat = {
      banker : 0,
      up : 0,
      down : 0,
      heaven : 0
    }
    for(var key in stat) {
      createjs.Tween.get(_target[key+'_stat'], {override:true})
      .to({
        scaleX : 0
      }, 150, createjs.Ease.circOut);
      _target[key+'_stat'].text.text = '0%';
    }
  },
  removeItem (data, _target) {

    let temp = formatData.fnPaigowLastRounds(_target.data.marks);

    temp.push({
      game_info : data.gameInfo
    });

    this.drawGameRoute(temp, _target, "noformat");

    _target.up_0.alpha = 0;
    _target.up_1.alpha  = 0;
    _target.down_0.alpha  = 0;
    _target.down_1.alpha   = 0;
    _target.heaven_0.alpha = 0;
    _target.heaven_1.alpha = 0;
    _target.banker_0.alpha = 0;
    _target.banker_1.alpha = 0;
    _target.up.tileBg.alpha = 0;
    _target.down.tileBg.alpha = 0;
    _target.heaven.tileBg.alpha = 0;
    _target.banker.tileBg.alpha = 0;

    //SETTING CURRENT TILES/
    var flag = false;
    for(var key in data.gameInfo.tiles) {
     var res =  _.filter(data.gameInfo.tiles[key], function(e) {return e !== null});
     if(res.length) {
       flag = true;
       for(var a = 0; a < data.gameInfo.tiles[key].length; a++) {
         if(data.gameInfo.tiles[key][a] === null) continue;
         _target[key+"_"+a].alpha = 1;
         _target[key+"_"+a].gotoAndStop("tile-"+data.gameInfo.tiles[key][a][3]);
       }
     }
    }

  },
  setResult(data, _target, _timer_c,  x, self) {
    if(!this.list_tables[x] || !this.list_tables[x].status) return;
    this.list_tables[x].status.text  = window.language.lobby.result;
    let mark = rmformat().fnPaigowLastRounds(data.marks);
    this.list_tables[x].deal_count.text = mark.length;


    //SETTING CURRENT TILES/
    var flag = false;
    for(var key in data.gameInfo.tiles) {
     var res =  _.filter(data.gameInfo.tiles[key], function(e) {return e !== null});
     if(res.length) {
       flag = true;
       for(var a = 0; a < data.gameInfo.tiles[key].length; a++) {
         if(data.gameInfo.tiles[key][a] === null) continue;
         _target[key+"_"+a].alpha = 1;
         _target[key+"_"+a].gotoAndStop("tile-"+data.gameInfo.tiles[key][a][3]);
       }
     }
    }
  },
  setStatus (data, _target, _timer_c,  x, self) {
    //=== table status
    let status = "";
    if(data.roundStatus == "P") {
      if(data.gameName != "Sicbo") {
        status = window.language.lobby.dealing
      } else {
        status = window.language.lobby.result
      }
    }
    if(data.roundStatus == "S") {
      status = window.language.lobby.nowbetting;
    }

    if(data.roundStatus == "E") {
      status = window.language.lobby.bettingend;
    }

    if(data.roundStatus == "R") {
      status = window.language.lobby.result;
    }

    if(data.roundStatus == "H") {
      status = window.language.lobby.roundhold;
    }

    this.list_tables[x].status.text = status;
  }
}


export default {
	instance
}
