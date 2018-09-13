import { createSprite, randomNum, createCardSprite, createTileSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import tilesModule from '../../factories/tiles';
import rmformat from '../../factories/formatter';

let formatData = rmformat();
let instance = null;

instance = {
  tables : [],
  lastroundBg : [],
  rounds : [],

  getText(x,y,text,font,color,align,valign){
    let ctrl = new createjs.Text(text,font,color);
    ctrl.x = x;
    ctrl.y = y;
    ctrl.textAlign = align;
    ctrl.textBaseline = valign;//"middle"
    return ctrl;
  },

  makeListTables (data, _target, _timer_c,  x, self) {
    this.tables[x] = _target.tables

    // === dealers
    this.tables[x].dealer_img_bg.x = 92
    this.tables[x].dealer_img_bg.y = 122 + this.tables[x].y

    this.tables[x].dealer_img.x = this.tables[x].dealer_img_bg.x + 180;
    this.tables[x].dealer_img.y = this.tables[x].dealer_img_bg.y  + 180;

    this.tables[x].dealer_name.text = data.currentDealer;
    this.tables[x].dealer_name.x = 92;
    this.tables[x].dealer_name.y = 190 + this.tables[x].y;
    this.tables[x].dealer_name.textAlign = "center";

    // === timer
    this.tables[x].timer.x =  -5;
    this.tables[x].timer.y =  this.tables[x].y + 24.8;

    // === game rounds
    let game_rounds_label = new createjs.Text(window.language.lobby.game,"18px latoregular","#fff");
    game_rounds_label.x = 200;
    game_rounds_label.y = 80 + this.tables[x].y;
    _target.addChild(game_rounds_label);

    let game_label_height = game_rounds_label.getMeasuredHeight();
    this.tables[x].round_num.text = data.currentRound;
    this.tables[x].round_num.textAlign = "right";
    this.tables[x].round_num.x = 295;
    this.tables[x].round_num.y = game_rounds_label.y + game_label_height + 20;

    //=== table status
    let round_num_height = this.tables[x].round_num.getMeasuredHeight();
    this.tables[x].status.text = window.language.lobby.nowbetting;
    this.tables[x].status.x = game_rounds_label.x;
    this.tables[x].status.y = this.tables[x].round_num.y + round_num_height + 18;

    let dealerBorder = new createjs.Shape();
    dealerBorder.graphics.setStrokeStyle(1).beginStroke('#848484').lineTo(0, 283).lineTo(0,0);
    dealerBorder.x = 350;
    dealerBorder.y = 0;
    _target.addChild(dealerBorder);

    // === latest result
    let lastResultBorder = new createjs.Shape();
    lastResultBorder.graphics.setStrokeStyle(1).beginStroke('#848484').lineTo(0, 283).lineTo(0,0);
    lastResultBorder.x = 420;
    lastResultBorder.y = 0;
    _target.addChild(lastResultBorder);

    // === add background
    let result_bg = new createjs.Shape();
    result_bg.graphics.beginFill("#333333").drawRect(0,0,896,284);
    result_bg.x = 350;
    result_bg.y =this.tables[x].y;
    _target.addChild(result_bg);

    // === latest result
    let setResultBorder = new createjs.Shape();
    setResultBorder.graphics.setStrokeStyle(1).beginStroke('#848484').lineTo(0, 283).lineTo(0,0);
    setResultBorder.x = 620;
    setResultBorder.y = 0;
    _target.addChild(setResultBorder);

    // ==== table status
    let status_spacing = 100;
    let status_bg = new createjs.Shape();
    status_bg.graphics.beginFill('#2A2A2A').drawRect(640 - 18,248 - 10,624,45)
    _target.addChild(status_bg);

    let status_container = new createjs.Container();
    status_container.x = 640;
    status_container.y = 248;
    _target.addChild(status_container);


    // ==== player status
    let playersIcon = new createjs.Bitmap('/img/icons/paigow/players_ico.png');
    playersIcon.setBounds(0,0,33,29);

    playersIcon.scaleX = playersIcon.scaleY = 0.8;

    this.tables[x].userCount = new createjs.Text(data.totalUsers, "22px BebasNeue", "#9C9C9C");
    this.tables[x].userCount.x = 35;
    status_container.addChild(playersIcon, this.tables[x].userCount);

    // === up bet status
    let upCircle = new createjs.Shape();
    upCircle.graphics.beginFill('#F0942B').setStrokeStyle(1).beginStroke('#fff').drawCircle(0,12,12);
    upCircle.x = this.tables[x].userCount.x + this.tables[x].userCount.getMeasuredWidth() + status_spacing;

    let upText = new createjs.Text('上', 'bold 12px Arial', '#fff');
    upText.x = upCircle.x - 6;
    upText.y = 4;

    this.tables[x].up_bets = new createjs.Text("0", "22px BebasNeue", "#9C9C9C");
    this.tables[x].up_bets.x = upCircle.x + 25;
    status_container.addChild(upCircle, upText, this.tables[x].up_bets);

    // === heaven bet status
    let heavenCircle = new createjs.Shape();
    heavenCircle.graphics.beginFill('#15499D').setStrokeStyle(1).beginStroke('#fff').drawCircle(0,12,12);
    heavenCircle.x = this.tables[x].up_bets.x + this.tables[x].up_bets.getMeasuredWidth() + status_spacing;

    let heavenText = new createjs.Text('天', 'bold 12px Arial', '#fff');
    heavenText.x = heavenCircle.x - 6;
    heavenText.y = 4;

    this.tables[x].heaven_bets = new createjs.Text("0", "22px BebasNeue", "#9C9C9C");
    this.tables[x].heaven_bets.x = heavenCircle.x + 25;
    status_container.addChild(heavenCircle, heavenText, this.tables[x].heaven_bets);

    // === heaven bet status
    let downCircle = new createjs.Shape();
    downCircle.graphics.beginFill('#009659').setStrokeStyle(1).beginStroke('#fff').drawCircle(0,12,12);
    downCircle.x = this.tables[x].heaven_bets.x + this.tables[x].heaven_bets.getMeasuredWidth() + status_spacing;

    let downText = new createjs.Text('下', 'bold 12px Arial', '#fff');
    downText.x = downCircle.x - 6;
    downText.y = 4;

    this.tables[x].down_bets = new createjs.Text("0", "22px BebasNeue", "#9C9C9C");
    this.tables[x].down_bets.x = downCircle.x + 25;
    status_container.addChild(downCircle, downText, this.tables[x].down_bets);

    status_container.visible = parseInt(window.room_info);

    //statistics starts here
    let statistics_container = new createjs.Container();
    statistics_container.set({x: status_container.x, y:status_container.y });
    _target.addChild(statistics_container);

    let targets = [{name:'banker_stat', color:'#b71b1c', label : '庄'}, {name:'up_stat', color:'#ef8f20', label : '上'}, {name:'heaven_stat', color:'#14499c', label : '天'}, {name:'down_stat', color:'#009458', label : '下'}];
    let masks = [];
    let stat_bg = [];
    for(var i = 0; i < targets.length; i++) {

      _target[targets[i].name] = new createjs.Shape();
      _target[targets[i].name].graphics.beginFill(targets[i].color).drawRect(0,0,110,28,5);
      _target[targets[i].name].set({x : (i*150) + 30, y:  2});
      _target[targets[i].name].text = new createjs.Text("0%", "20px bebasneue", "#fff");
      _target[targets[i].name].text.x = _target[targets[i].name].x + 8;
      _target[targets[i].name].text.textBaseline = "middle";
      _target[targets[i].name].text.y = _target[targets[i].name].y + (28/2);

      statistics_container.addChild(_target[targets[i].name], _target[targets[i].name].text);

      masks[i] = new createjs.Shape();
      masks[i].graphics.beginFill("red").drawRoundRect(0,0,110,28,5);
      masks[i].x = _target[targets[i].name].x;
      masks[i].y = _target[targets[i].name].y;

      _target[targets[i].name].mask = masks[i]
      _target[targets[i].name].scaleX = 0;

      stat_bg[i] = new createjs.Shape();
      stat_bg[i].graphics.ss(1).s(targets[i].color).drawRoundRect(_target[targets[i].name].x, _target[targets[i].name].y, 110,28, 5);
      statistics_container.addChild(stat_bg[i]);

      let label = this.getText(_target[targets[i].name].x - 30, _target[targets[i].name].y - 2, targets[i].label, "25px latobold","#b5b5b5","left","top");
      statistics_container.addChild(label);
      
      statistics_container.visible = !parseInt(window.room_info);
    }
    //end statistics
    
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


    // =====================================================************************
    let playArea = ['up', 'heaven', 'down', 'banker']; // the playArea to be looped
    let playerColor = ['#F18F00', '#134CA3', '#00965A', '#B61C1C']; // the highlight color of the winner

    // marks
    let roadMarks = data.marks;
    roadMarks = formatData.fnPaigowLastRounds(roadMarks);

    _.forEach(roadMarks, (m) => {
      if(typeof m.game_info == 'string') m.game_info = JSON.parse(m.game_info); // format game_info
      if(typeof m.game_result == 'string') m.game_result = JSON.parse(m.game_result); //format game_result
    });

    // loop 5 backgrounds for lastrounds
    this.lastroundBg = new createjs.Shape();
    this.lastroundBg.graphics.f("#2A2A2A").drawRoundRect( 0, 0, 230, 210, 8 );
    this.lastroundBg.x = 370;
    this.lastroundBg.y = 20;
    _target.addChild(this.lastroundBg);

    // container for the tiles when displayed
    this.roundsContainer = new createjs.Container();
    this.roundsContainer.x = 0;
    this.roundsContainer.y = 18;
    _target.addChild(this.roundsContainer);

    //set rounds
    this.rounds = rounds || [];

    // clear tiles from roundsContainer
    this.roundsContainer.removeAllChildren();

    // setcon contains 2 tiles per playarea
    let setcon = new createjs.Container();
    setcon.x = this.lastroundBg.x + (220 / 2) - 8;
    setcon.y = this.lastroundBg.y + (220 / 2)  - 52;
    this.roundsContainer.addChild(setcon);

    let rounds = _.first(formatData.fnPaigowLastRounds(data.marks));
    // if(!rounds) return;
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
        _target[playArea[j]+"_0"].gotoAndStop('tile-'+tilesModule(tileData[0]).number);
        _target[playArea[j]+"_0"].scaleX = _target[playArea[j]+"_0"].scaleY = 1;
        _target[playArea[j]+"_0"].alpha = 0;
        tilecon.addChild(_target[playArea[j]+"_0"]);
      }
      //second tile display
      if(tileData[1] != undefined) {
        _target[playArea[j]+"_1"] = createTileSprite(this, 46, 60, self.context.load.getResources("small_tiles"));
        _target[playArea[j]+"_1"].gotoAndStop('tile-'+tilesModule(tileData[1]).number);
        _target[playArea[j]+"_1"].scaleX = _target[playArea[j]+"_1"].scaleY = 1;
        _target[playArea[j]+"_1"].x = 46;
        _target[playArea[j]+"_1"].alpha = 0;
        tilecon.addChild(_target[playArea[j]+"_1"]);
      }
    }

    console.log(data.gameInfo.tiles, "gameinfo")
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

    // roadmap container
    _target.roadmapDataCon = new createjs.Container();
    _target.roadmapDataCon.x = 678;
    _target.roadmapDataCon.y = 30;
    _target.addChild(_target.roadmapDataCon);

    // gameroute container
    _target.routeTileCon = new createjs.Container();
    _target.routeTileCon.x = 920;
    _target.routeTileCon.y = 78;
    _target.routeTileCon.routes = {};
    _target.addChild(_target.routeTileCon);

    // game route static init
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
      tile.scaleX = tile.scaleY = 0.8;
      tile.x = (index > 4 ? index - 5 : index) * 65;
      tile.y = index < 5 ? 0 : 70;
      _target.routeTileCon.addChild(tile);
      _target.routeTileCon.routes[area] = [];

      for (let j = 0; j < 4; j++ ) {
        _target.routeTileCon.routes[area][j] = new createjs.Shape();
        _target.routeTileCon.routes[area][j].graphics.f('#000').drawCircle(0,0,4);
        _target.routeTileCon.routes[area][j].x = tile.x + 48;
        _target.routeTileCon.routes[area][j].y = tile.y + 7 + (j * 12);
        _target.routeTileCon.routes[area][j].scaleX = _target.routeTileCon.routes[area][j].scaleY = 0.8;
        _target.routeTileCon.addChild(_target.routeTileCon.routes[area][j]);
      }
      index++;
    }

    // bets
    this.bets_data = {
      heaven :0,
      up :0,
      down :0
    }

    _target.addChild(this.tables[x].bet_range_container);

    //Maintenance
    let header_bg = [];
    let text_color = "";

    this.tables[x].maintenanceCon = new createjs.Container();
    this.tables[x].maintenanceCon.visible = false;
    _target.addChild(this.tables[x].maintenanceCon);

    if(data.roomType == "p") {
      header_bg = ["#8e24aa","#4d158d"];
      text_color = "#efb052";
    } else if(data.roomType == "v") {
      header_bg = ["#fedd78","#d5a515"];
      text_color = "#000";
    } else {
      header_bg = ["#00838f","#005044"];
      text_color = "#efb052";
    }

    this.tables[x].maintenanceBg = new createjs.Shape();
    this.tables[x].maintenanceBg.graphics.beginFill("#333333").drawRoundRect(0, 0, 1250, 283, 6);
    this.tables[x].maintenanceBg.x = this.tables[x].x;
    this.tables[x].maintenanceBg.y = this.tables[x].y + 1;
    this.tables[x].maintenanceBg.table_id = data.tableNumber;
    this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceBg);

    this.tables[x].maintenanceHeader = new createjs.Shape();
    this.tables[x].maintenanceHeader.x = this.tables[x].x;
    this.tables[x].maintenanceHeader.y = this.tables[x].y - 1;
    this.tables[x].maintenanceHeader.graphics.beginLinearGradientFill(["#960000", "#2a0001"],[0,1],0,0,1250,10).drawRoundRectComplex(0,0,1250,285,10,10,0,0);
    this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceHeader);

    this.tables[x].table_name = new createjs.Text(window.language.lobby.paigow,"bold 20px ArvoItalic","#fdba44");
    this.tables[x].table_name.x = 80;
    this.tables[x].table_name.y = 13 + this.tables[x].y;
    this.tables[x].maintenanceCon.addChild(this.tables[x].table_name);

    this.tables[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"21px ArvoBold","#fdba44");
    this.tables[x].table_num.x = 40; //this.tables[x].table_name.x - (this.tables[x].table_name.getBounds().width / 2) - 10;
    this.tables[x].table_num.y = 11 + this.tables[x].y;
    this.tables[x].maintenanceCon.addChild(this.tables[x].table_num);

    this.tables[x].maintenanceLogo = new createjs.Bitmap(self.context.load.getResources("maintenance_ico"));
    this.tables[x].maintenanceLogo.x = 30;
    this.tables[x].maintenanceLogo.y = 90 + this.tables[x].y;
    this.tables[x].maintenanceLogo.scaleX = this.tables[x].maintenanceLogo.scaleY = 0.85;
    this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceLogo);

    this.tables[x].maintenanceTxt = new createjs.Text('', '30px bebasneue', '#ffb547');
    this.tables[x].maintenanceTxt.x = 205;
    this.tables[x].maintenanceTxt.y = 110 + this.tables[x].y;
    this.tables[x].maintenanceTxt.textAlign = 'left';
    this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceTxt);

    this.tables[x].maintenanceSubTxt = new createjs.Text('', '28px bebasneue', '#fff');
    this.tables[x].maintenanceSubTxt.x = 205;
    this.tables[x].maintenanceSubTxt.y = 150 + this.tables[x].y;
    this.tables[x].maintenanceSubTxt.textAlign = 'left';
    this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceSubTxt);

    this.tables[x].maintenanceTime = new createjs.Text('', '26px bebasneue', '#fff');
    this.tables[x].maintenanceTime.x = 205;
    this.tables[x].maintenanceTime.y = 185 + this.tables[x].y;
    this.tables[x].maintenanceTime.textAlign = 'left';
    this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceTime);

    this.setStats(data.marks, _target, x, self);
    this.setRoomInfo(data.betInfo, x, data.totalBettingUsers);
    this.drawRoadMap(data.marks, _target, _timer_c, x, self);
    this.checkMaintenance(data, false, x);

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
      }, 150, createjs.Ease.circOut);
      
      let val = (stat[key] / totWin) * 100;

      if(val % 1 !== 0) val = parseFloat(val).toFixed(1);
      _target[key+'_stat'].text.text = `${val}%`;  
    }
  },
  setRoomInfo(data, x, totalBettingUsers) {
    if (!this.tables[x]) return;

    this.resetRoomInfo(x);

    if (_.isEmpty(data)) return;

    this.bets_data.heaven += !data.hasOwnProperty('heaven') ? 0 : data.heaven.totalBets;
    this.bets_data.up += !data.hasOwnProperty('up') ? 0 : data.up.totalBets;
    this.bets_data.down += !data.hasOwnProperty('down') ? 0 : data.down.totalBets;

    this.tables[x].heaven_bets.text = numberWithCommas(this.bets_data.heaven);
    this.tables[x].up_bets.text = numberWithCommas(this.bets_data.up);
    this.tables[x].down_bets.text = numberWithCommas(this.bets_data.down);

    this.tables[x].userCount.text = numberWithCommas(totalBettingUsers);
  },
  resetRoomInfo(x) {
    // bets
    this.bets_data = {
      heaven :0,
      up :0,
      down :0
    }

    this.tables[x].heaven_bets.text = 0;
    this.tables[x].up_bets.text = 0;
    this.tables[x].down_bets.text = 0;
  },
  checkMaintenance (maintenanceData, socket, x) {
    if(!this.tables || !this.tables[x] || !this.tables[x].maintenanceCon) return;

    if (window.userAuthority === "admin") return;

    let maintenance = false;
    let activeMaintenance = [];
    let mainText = '';
    let subText = '';

    let mainMaintenance = maintenanceData.mainMaintenance.status;
    let maintenanceSetting = maintenanceData.maintenanceSetting;
    for (var i = 0; i < maintenanceSetting.length; i++) {
      if (maintenanceSetting[i].status == 1) {
        maintenance = true;
        activeMaintenance = maintenanceSetting[i];
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
      this.tables[x].maintenanceCon.visible = true;
      this.tables[x].maintenanceTxt.text = mainText;
      this.tables[x].maintenanceSubTxt.text = subText;
      this.tables[x].maintenanceTime.text = newStartTime +' ~ '+ newEndTime;
    }
    else {
      this.tables[x].maintenanceCon.visible = false;
    }
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

  displayRounds(data, _target, self) {
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
  }, // displayRounds

  drawRoadMap (data, _target, _timer_c,  x, self) {
    if (!this.tables[x]) return;

    data = rmformat().fnPaigowLastRounds(data);
    data = formatData.fnPaigowRoadMap(data);

    let playArea = ['banker', 'up', 'down', 'heaven']; // the playArea to be looped
    let playerColor = ['#B61F24', '#EF8F21', '#2764AD', '#009558']; // the highlight color of the winner

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
          circle.graphics.moveTo(0,15).setStrokeStyle(0.8).beginStroke('#fff').drawCircle(14,14,5);
        }
        // player circle total
        let total = this.getText(circle.x,circle.y, areas[j].total, "20px latobold","#fff","center","middle");
        _target.roadmapDataCon.addChild(total);
      }
    }
  },  // drawRoadMap

  drawGameRoute (data, _target, type) {
    if(!_target || !_target.children.length) return;

    if(type != "noformat") {
      data = rmformat().fnPaigowLastRounds(data);
    }
    // static route tiles
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

    _target.up.tileBg.alpha = 0;
    _target.down.tileBg.alpha = 0;
    _target.heaven.tileBg.alpha = 0;
    _target.banker.tileBg.alpha = 0;

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
  setCurrentTiles(data, _target, x) {
    
    if(!_target || !_target.children.length) return;

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
  setStatus (data, _target, x) {
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

    if(this.tables[x] === undefined) return;

    this.tables[x].status.text = status;
  }
}

export default {
	instance
}
