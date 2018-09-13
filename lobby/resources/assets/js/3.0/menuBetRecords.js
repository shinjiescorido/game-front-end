import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';
import cardValue from '../factories/cards';
import baccaratTotal from '../factories/baccaratTotal';
import tilesModule from '../factories/tiles';

let pageDisplay = 0;
bet_records = {

  main () {
    self = this.context;
  },

  initRecords(type, gameName, startDate, endDate, searchId = '', timeZone) {
    // this.links = links;
    startDate = $('#date_timepicker_start').val();
    endDate =  $('#date_timepicker_end').val();

    $("#tblBodyBetlogs").empty();
    $('#tblFooterBetlogs').empty();
    $("#prevPageBetlogs").hide();
    $("#nextPageBetlogs").hide();
    // $(".range-disp.betlogs").html('Baccarat')

    let gameNameBetlogs = $(".range-disp.betlogs").text();
    $(".range-disp.betlogs").html(gameNameBetlogs)

    //Remove all
    switch(type) {
      case ('betlogs'):
      let playType = 'p';
      let getBetLogs = null;
      let gameType = 'L';

      if(window.isJunket > 0) {
        gameType = gameName=='allgames' ? 'L' : 'D'
      }

      // if(window.isJunket==0) {
      //   gameType = 'L'
      // }

      $.post('/getLogs', {gameType: gameType, gameName: gameName, tableId: '0', roundNum: '0', betPage: 1, playType: playType, vendor_id: window.vendor_id, startDate: startDate, endDate: endDate, searchId: searchId, timeZone: timeZone}, (response) => {
        this._betLogs = response;
        console.log(response, "::::response from dbbbbb")
        this._betLogs.currentPage = 1;
        this.displayBetLogs();
      });
      break;
    } //end switch

    // let linksClass = this.links.split('/');
    if(gameName == 'sicbo') {
      $('.result-table').addClass('sicbo');
    } else {
      $('.result-table').removeClass("sicbologs");
    }

    if(gameName == 'paigow') {
      $('.result-body').addClass('paigow')
      $('.result-table').addClass('paigow')
    } else {
      $('.result-body').removeClass("paigowlogs");
      $('.result-table').removeClass("paigowlogs");
    }
  },

  displayBetLogs() {
    let self = this;
    let body_con = $('#tblBodyBetlogs').empty();
    let page_num_con = $('#tblFooterBetlogs').empty();
    let data = this._betLogs;
    let max = data.length ? data[0].cnt : 1;
    let totalPage = Math.ceil(parseInt(max) / 11);
    let pageData = data;
    // let link = this.links+"?page=";
    if(pageData.length == 0) {
      $('.modal-body-nodata').show();
      $('#tblBetLogs').hide();
    } else {
      $('.modal-body-nodata').hide();
      $('#tblBetLogs').show();
    }

    let gameName = $('.range-disp.betlogs').attr('game');

    for (let i = 0; i < pageData.length; i++) {
      this.tiles = pageData[i].game_info || {};
      let result = pageData[i].game_result || {};
      let isVoid = _.isEmpty(result);
      let roomId = pageData[i].table_id;
      let newDate = setCurrentTimezone(pageData[i].updated_at) || '';
      let winClass = parseInt(pageData[i].total_win) > 0 ? 'tbl-win-text' : 'tbl-lose-text';
      if (pageData[i].total_win == 0) winClass = '';

      pageData[i].total_bet = window.casino == 'SS' ? pageData[i].total_bet.toFixed(2) : pageData[i].total_bet;
      pageData[i].total_win = window.casino == 'SS' ? pageData[i].total_win.toFixed(2) : pageData[i].total_win;

      let listVoid = '';
      let listUserId = `<span>${pageData[i].user_id}</span>`;
      let listTotalBet = `<span>${numberWithCommas(pageData[i].total_bet)}</span>`;
      let listWinLose = `<span>${numberWithCommas(pageData[i].total_win)}</span>`;
      if (pageData[i].status.toLowerCase() == 'w') {
        listVoid = 'void';
        listTotalBet = `<span class="void-text">${window.language2.com_sub_menuarea_gamevoid}</span>`;
        listWinLose = `<span class="gamevoid-ico"></span>`;
      }

      let textToShow = pageData[i].dealer_name;

      if(gameName == 'allgames') {
        textToShow = pageData[i].game_type;

        switch(pageData[i].game_type.toLowerCase()) {
          case 'poker':
            textToShow = window.language2.lobby_gamename_texasholdem;
            break;
          case "bonus plus":
            textToShow = window.language2.poker_betlayout_bonusplus;
            break;
          case "super 6":
            textToShow = window.language2.baccarat_winningdisplay_supersix;
            break;
          case "baccarat":
          case "flippy":
            textToShow = window.language2.lobby_gamename_baccarat;
            break;
          case "dragon tiger":
            textToShow = window.language2.lobby_gamename_dragontiger;
            break;
          case "sicbo":
            textToShow = window.language2.lobby_gamename_sicbo;
            break;
          case "pai-gow":
            textToShow = window.language2.lobby_gamename_paigow;
            break;
        }

        $(".tbl-header-list.-list_dealer").html('Game')
      } else {
        $(".tbl-header-list.-list_dealer").html(window.language2.com_sub_menuarea_dealername)
      }

      if (window.isJunket == 2) {
        let gamenametext = ''
        switch (pageData[i].game_type) {
          case 'Super 6':
          case 'Baccarat':
          case 'Flippy':
            gamenametext = window.language2.lobby_gamename_baccarat;
            break;
          case 'Sicbo':
            gamenametext = window.language2.lobby_gamename_sicbo;
            break;
          case 'Dragon Tiger':
            gamenametext = window.language2.lobby_gamename_dragontiger;
            break;
          case 'Poker':
            gamenametext = window.language2.lobby_gamename_poker;
            break;
          case 'Pai-Gow':
            gamenametext = window.language2.lobby_gamename_paigow;
            break;
        }

        body_con.append(
          $(`<div class="tbl-body-tr -data-list-${i} ${listVoid}">`)
            .append($(`<div class="tbl-td-list -list_gameno"><span>${pageData[i].round_num}</span></div>`))
            .append($(`<div class="tbl-td-list -list_date"><span>${newDate.length ? newDate.replace(" ", "<br/>") : newDate}</span></div>`))
            .append($(`<div class="tbl-td-list -list_channel"><span>${pageData[i].table_id} - ${gamenametext} </span></div>`))
            // .append($(`<div class="tbl-td-list -list_userid">${pageData[i].user_id}</div>`))
            // .append($(`<div class="tbl-td-list -list_currency">${pageData[i].currency}</div>`))
            .append($(`<div class="tbl-td-list -list_userid ">${listUserId}</div>`))
            .append($(`<div class="tbl-td-list -list_totalbet tbl-align-right">${listTotalBet}</div>`))
            .append($(`<div class="tbl-td-list -list_winlose tbl-align-right ${winClass}">${listWinLose}</div>`))
          .append($('</div>'))
          )

        // $('.-list_date').css({width: '1400px'});
        // $('.-list_channel').css({width: '140px'});
        // $('.-list_totalbet').css({width: '140px'});
        // $('.-list_winlose').css({width: '140px'});
      } else {
        let gamenametext = '';

        let type = pageData[i].type ? pageData[i].type : pageData[i].game_type;
        switch(type.toLowerCase()) {
          case "super 6":
            gamenametext = '/'+window.language2.baccarat_winningdisplay_supersix;
            break;
          case "baccarat":
          case "flippy":
            gamenametext = '/'+window.language2.lobby_gamename_baccarat;
            break;
          case "poker":
            gamenametext = '/'+window.language2.lobby_gamename_texasholdem;
            break;
          case "bonus plus":
            gamenametext = '/'+window.language2.poker_betlayout_bonusplus;
            break;
        }
        console.log("toggled gamename", gameName)

        if(gameName == 'allgames') gamenametext = '';

        body_con.append(
          $(`<div class="tbl-body-tr -data-list-${i} ${listVoid}">`)
            .append($(`<div class="tbl-td-list -list_gameno"><span>${pageData[i].round_num}</span></div>`))
            .append($(`<div class="tbl-td-list -list_date"><span>${newDate.length ? newDate.replace(" ", "<br/>") : newDate}</span></div>`))
            .append($(`<div class="tbl-td-list -list_channel"><span>${pageData[i].table_id}${gamenametext}</span></div>`))
            .append($(`<div class="tbl-td-list -list_dealer"><span>${textToShow}</span></div>`))
            .append($(`<div class="tbl-td-list -list_totalbet tbl-align-right">${listTotalBet}</div>`))
            .append($(`<div class="tbl-td-list -list_winlose tbl-align-right ${winClass}">${listWinLose}</div>`))
          .append($('</div>'))
          )
      }

      $(`.-data-list-${i}`).data('log', pageData[i]);
      $(`.-data-list-${i}`).click(function(e) {
        let _this = $(e.currentTarget);
        if(!_this.hasClass('void')) {
          // let link = self.links.indexOf('alllogs') > -1 ? '/baccaratlogs/baccarat' : null;
          // if(_this.data('log').game_type.toLowerCase() === 'dragon tiger') link = '/dragontigerlogs/dragontiger';
          // if(_this.data('log').game_type.toLowerCase().indexOf('texas') > -1) link = '/pokerlogs/poker';
          // if(_this.data('log').game_type.toLowerCase().indexOf('sicbo') > -1) link = '/sicbologs/sicbo';
          // if(_this.data('log').game_type.toLowerCase().indexOf('pai') > -1) link = '/paigowlogs/paigow';
          self.showBetlogData(pageData[i], '/getLogs');
        }
      });
    }


    for (let j = 0; j < totalPage; j++) {
      let page = j+1;
      let pageDom = $(`.paginate-page_${page}`);

      if (!pageDom.length) {
        let page_btn = $(`<div class="modal-page-list paginate-page_${page}">${page}</div>`);
        page_btn.attr('data-page', page);
        page_num_con.append(page_btn);


        //to append dotdot

        if(page==1 && totalPage > 10) {
          page_num_con.prepend(`<div class="modal-page-list -dot-before page-dot" data-page=''>. . .</div>`)
        }
        if(page == totalPage && totalPage > 10) {
          page_num_con.append(`<div class="modal-page-list -dot-after page-dot" data-page=''>. . .</div>`)
        }
        //end append dotdot
        if(self._betLogs.currentPage > 10) {
          $('.modal-page-list.-dot-before').show()
        } else {
          pageDisplay = 0;
        }

        if(self._betLogs.currentPage <= (pageDisplay-10) && self._betLogs.currentPage > 10) {
          pageDisplay = ((Math.floor(self._betLogs.currentPage/10))*10)
        }

        if(totalPage > 11) {
          if(pageDisplay < totalPage) {
            $('.modal-page-list.-dot-after').show()
          } else {
            $('.modal-page-list.-dot-after').hide()
          }

        }
        // if((self._betLogs.currentPage/10)%1 == 0.1 && totalPage > 10) {
        //   $('.modal-page-list.-dot-before').show()
        // }
        if(page < 11 && self._betLogs.currentPage < 11) {
          $(page_btn).show()
        } else {
          $(page_btn).hide()
          if(page > 10 && self._betLogs.currentPage > 10) {
            let total = (self._betLogs.currentPage/10)%1;

            if(parseFloat((self._betLogs.currentPage/10)%1).toFixed(1) == 0.1 && self._betLogs.currentPage < totalPage) {
              pageDisplay = self._betLogs.currentPage+9;
            }

            if(page >= (pageDisplay-9) && page <= pageDisplay) {
              $(page_btn).show()
            }
          }
        }

        let dot_after = 0;
        let dot_before = 0;

        if(pageDisplay > 19) {
          dot_after = pageDisplay + 1;
          dot_before = pageDisplay - 10;
        } else {
          dot_after = 11;
          dot_before = 0;
        }

        $('.modal-page-list.-dot-after').attr('data-page', dot_after)
        $('.modal-page-list.-dot-before').attr('data-page', dot_before)

        $('.page-ico').show();
        page_btn.on('click', function (e){
          $('.page-active').removeClass('page-active');
          $(e.currentTarget).addClass('page-active');
          self._betLogs.currentPage = parseInt($(e.currentTarget).attr('data-page'));
          self.displayPage(`${self.links}?page=${parseInt($(e.currentTarget).attr('data-page'))}`, 'betlog');
        });

        $(document).off("click",'.modal-page-list.page-dot');
        $(document).on("click",'.modal-page-list.page-dot' ,function(e){
          self._betLogs.currentPage = parseInt($(e.currentTarget).attr('data-page'));
          self.displayPage(`${self.links}?page=${parseInt($(e.currentTarget).attr('data-page'))}`, 'betlog');
        });
      }
    }

    $('.page-active').removeClass('page-active');
    $(`.paginate-page_${this._betLogs.currentPage}`).addClass('page-active');

    $("#prevPageBetlogs").unbind('click');
    $('#prevPageBetlogs').click(function(e) {
      if(self._betLogs.currentPage-1 > 0) {
        self._betLogs.currentPage -= 1;
        self.displayPage(self.links+"?page=" + self._betLogs.currentPage, 'betlog');
      }
    });

    $("#nextPageBetlogs").unbind('click');
    $('#nextPageBetlogs').click(function(e) {
      if(self._betLogs.currentPage+1 <= totalPage) {
        self._betLogs.currentPage += 1;
        self.displayPage(self.links+"?page=" + self._betLogs.currentPage, 'betlog');
      }
    });
  },

  displayPage (link, type, url) {
    let self = this;
    let data = {tableId: window.tableNum};

    let startDate = $('#date_timepicker_start').val();
    let endDate =  $('#date_timepicker_end').val();
    let searchId = $('#search-userid').val();
    let gameName = $('.range-disp.betlogs').attr('game');

    let gameType = gameName == 'allgames' ? 'L' : 'D';
    if(gameType === 'D' && !window.isJunket) gameType = 'L';

    if(type == 'betlog') {
      let playType = 'p';
      data = {
        gameType: gameType,
        gameName: gameName,
        searchId: searchId,
        vendor_id : window.vendor_id,
        tableId: 0,
        roundNum: 0,
        startDate: startDate,
        endDate : endDate,
        betPage: this._betLogs.currentPage,
        playType: playType
      }
    }

    $.post('/getLogs', data, (response) => {
      let responseData = typeof response === 'string' ? JSON.parse(response) :response;
      self.displayCallback(type, responseData, url);
    });
  },

  formatNumber(number) {
    if((window.casino == 'SS')) {
      return number.toLocaleString(undefined, {minimumFractionDigits: 2});
    } else {
      number = parseInt(number) || 0;
      return number.toLocaleString('en');
    }
  },

  displayCallback (type, newdata, links) {
    switch(type) {
      case 'betlog' :
      newdata.currentPage = this._betLogs.currentPage;
      this._betLogs = newdata;
      this.displayBetLogs();
      break;
    }
  },

  showBetlogData(betData, links) {
    let playType = 'p';
    let startDate = '';
    let endDate =  '';
    let searchId = '';
    let gameName = $('.range-disp.betlogs').attr('game');

    // if(!links) links = this.links;

    $(".result-table").removeClass('sicbologs');
    $(".result-table").removeClass('paigowlogs');

    if(betData.game_type.toLowerCase() === 'sicbo') {
      $(".result-table").addClass('sicbologs')
    } else if(betData.game_type.toLowerCase() === 'pai-gow') {
      $(".result-table").addClass('paigowlogs')
    }

    if(gameName == 'allgames') {
      gameName = betData.game_type.split("-").join('').toLowerCase();
      gameName = gameName.toLowerCase() === 'flippy' || gameName.toLowerCase() === 'super 6' ? 'baccarat' : gameName;
    }

    if (gameName.toLowerCase() == "texas hold'em" || gameName.toLowerCase() == 'bonus plus') {
      gameName = 'poker';
    } else if (gameName.toLowerCase() == 'dragon tiger') {
      gameName = 'dragontiger';
    }

    $.post('/getLogs', {
      gameType: 'D',
      gameName: gameName,
      tableId: betData.table_id,
      roundNum: betData.round_num,
      betPage: 0,
      vendor_id : window.vendor_id,
      user_id : betData.user_id !== undefined? betData.user_id : '' ,
      startDate: startDate,
      endDate: endDate,
      searchId: searchId
    }, (response) => {

      let betlog = response.length ? response[0] : {};

      if (!_.isEmpty(betlog)) {
        $('.range-list.betlogs').css('z-index', '0');
        let con = $('#modalResult').show();
        let gameInfo = typeof betlog.game_info === 'string' ? JSON.parse(betlog.game_info) : betlog.game_info || {};
        let result = typeof betlog.game_result === 'string' ? JSON.parse(betlog.game_result) : betlog.game_result || {};
        let isVoid = _.isEmpty(result) || _.isEmpty(gameInfo);
        let betHistory = typeof betlog.bet_history === 'string' ? JSON.parse(betlog.bet_history) : typeof betlog.bet_history;
        let newDate = setCurrentTimezone(betlog.updated_at) || '';

        $('.header-list-left').text(`${window.language2.com_sub_menuarea_game} ${betlog.round_num}`).append(`<br/>${betlog.dealer_name}`);
        $('.header-list-right').text(`${newDate.split(" ")[0]}`).append(`<br/>${newDate.split(" ")[1]}`);
        $('.header-result-con').empty();

        $('.result-main-con').empty();
        $('.result-banker-con').remove();
        $('.result-other-con').remove();
        $('.result-info').empty();

        if(gameName== 'baccarat') {
          let winColor = '#fff';
          let winResultColor = '#1565c0'
          let bordercolor = '#d6bb69';
          let winText = result.winner;
          let resultType = '';
          let resultTypeInitials = winText == 'banker' ? 'B' : winText == 'player' ? 'P' : 'T';

          switch (winText) {
            case 'player':
            resultType = window.language2.baccarat_betlayout_player;
            winResultColor = '#1565c0';
            bordercolor = '#1565c0';
            break;
            case 'banker':
            resultType = window.language2.baccarat_betlayout_banker;
            winResultColor = '#d32f2f';
            bordercolor = '#d32f2f';
            break;
            case 'tie':
            resultType = window.language2.baccarat_betlayout_tie;
            winResultColor = '#689f38';
            bordercolor = '#689f38';
            break;
            default:
          }

          $('.header-result-con').css({'background': winResultColor })
          .append( $('<div class="result-list"></div>')
          .append(
            $(`<div class="center-content">
            <div class="result-mark" style="background: ${winColor}; color: ${winResultColor}; border: 2px solid ${bordercolor};">
            <span style="color: ${winResultColor};">${resultTypeInitials}</span>
            </div>
            </div>`)
          )
          .append( $(`<div class="result-text" style="color: ${winColor}">${resultType}</div>`) )
          )

          let totalVal = baccaratTotal(gameInfo);

          let banker1Card = gameInfo.banker1;
          let banker2Card = gameInfo.banker2;
          let banker3Card = gameInfo.banker3;

          let player1Card = gameInfo.player1;
          let player2Card = gameInfo.player2;
          let player3Card = gameInfo.player3;

          $('#modalResult .result-body').empty();

          let resultcon = document.createElement('div');
          resultcon.className = "result-main-con center-content";

          $('#modalResult .result-body').append(resultcon)

          $('.result-main-con').append(
            `<div class="result-info -baccarat">
            <div class="result-info-items -player">
            <div class="result-card-num"><span style="margin-left:0px;">${totalVal.player}</span></div>
            <span class="card-holder card-${player1Card}"></span>
            <span class="card-holder card-${player2Card}"></span>
            <span class="card-holder card-${player3Card}"></span>
            </div>
            <div class="result-info-items -banker">
            <div class="result-card-num"><span style="margin-left:0px">${totalVal.banker}</span></div>
            <span class="card-holder card-${banker1Card}"></span>
            <span class="card-holder card-${banker2Card}"></span>
            <span class="card-holder card-${banker3Card}"></span>
            </div>
            </div>`
          );

          let table_con = con.find('.result-table-body').empty();
          let betTblHeight = (betHistory.length + 1) * 30;
          let totalWin = 0;
          $('.result-table-body').css('height', `${betTblHeight+20}px`);

          for (let i = 0;i < betHistory.length; i++) {
            let rowData = betHistory[i];
            let winLoseAmt = 0;

            if (window.isJunket == 2) {
              winLoseAmt = (rowData.win_money - rowData.bet_money) * (-1);
            } else {
              winLoseAmt = rowData.win_money - rowData.bet_money;
            }

            totalWin += winLoseAmt;

            rowData.bet_money = window.casino == 'SS' ? parseFloat(rowData.bet_money).toFixed(2) : rowData.bet_money;
            winLoseAmt = window.casino == 'SS' ? parseFloat(winLoseAmt).toFixed(2) : winLoseAmt;

            let rowdataBet = "";
            if(rowData.bet == "banker") {
              rowdataBet = window.language2.baccarat_betlayout_banker;
            } else if(rowData.bet == "player") {
              rowdataBet = window.language2.baccarat_betlayout_player;
            } else {
              rowdataBet = window.language2.baccarat_betlayout_tie;
            }
            table_con.append(
              $('<div class="result-tr"></div>')
              .append($('<div class="result-td"></div>').text( `${rowdataBet}` ))
              .append($('<div class="result-td"></div>').text(numberWithCommas(rowData.bet_money) ))
              .append($('<div class="result-td"></div>').addClass(winLoseAmt > 0 ? 'tbl-win-text' : 'tbl-lose-text').text(numberWithCommas(winLoseAmt)))
            );
          }

          let totalWinClass = totalWin > 0 ? 'tbl-win-text' : 'tbl-lose-text';
          if (totalWin == 0) totalWinClass = '';

          totalWin = window.casino == 'SS' ? totalWin.toFixed(2) : totalWin;

          table_con.append(
            $('<div class="result-tr"></div>')
            .append($('<div class="result-td -total"></div>').text(window.language2.com_sub_menuarea_total))
            .append($('<div class="result-td"></div>').addClass('total--bet').text( numberWithCommas(betData.total_bet) ))
            .append($('<div class="result-td"></div>').addClass('total--payout').addClass(totalWinClass).text( numberWithCommas(totalWin) ))
          );

        } else if(gameName == 'poker') {
          let winColor = '#fff';
					let winResultColor = '#1565c0'
					let winText = result.winner;
					let resultType = '';
          let resultTypeInitials = '';

          switch (winText) {
            case 'player':
            resultType = window.language2.poker_betlayout_player;
            winResultColor = '#1565c0';
            resultTypeInitials = 'P';
            break;
            case 'dealer':
            resultType = window.language2.poker_betlayout_dealer;
            winResultColor = '#d32f2f';
            resultTypeInitials = 'D';
            break;
            case 'tie':
            resultType = window.language2.poker_winningdisplay_tie;
            winResultColor = '#689f38';
            resultTypeInitials = 'T';
            break;
          }

          $('.header-result-con').css({'background': winResultColor })
          .append( $('<div class="result-list"></div>')
          .append(
            $(`<div class="center-content">
            <div class="result-mark" style="background: ${winColor}; color: ${winResultColor};">
            <span style="color: ${winResultColor};">${resultTypeInitials}</span>
            </div>
            </div>`)
          )
          .append( $(`<div class="result-text" style="color: ${winColor}">${resultType}</div>`) )
          )

          let cards = result.cards;
          for(var index in gameInfo) {
            if(index == 'burn')
            continue;
            if(Array.isArray(gameInfo[index])) {
              let temp = gameInfo[index]
              gameInfo[index] = temp.map(x => {
                if(cards.indexOf(x) > -1)
                x += ' -win'

                return x
              })
            } else {
              if(cards.indexOf(gameInfo[index]) > -1)
              gameInfo[index] += ' -win'
            }
          }

          let dealer1 = gameInfo.dealer[0];
          let dealer2 = gameInfo.dealer[1];

          let flop1 = gameInfo.flop[0]
          let flop2 = gameInfo.flop[1]
          let flop3 = gameInfo.flop[2]

          let turn = gameInfo.turn;
          let river = gameInfo.river;

          let player1 = gameInfo.player[0];
          let player2 = gameInfo.player[1];

          $('#modalResult .result-body').empty();

          let resultcon = document.createElement('div');
          resultcon.className = "result-main-con center-content";

          $('#modalResult .result-body').append(resultcon)

          $('.result-main-con').append(
            `<div class="result-info -poker">
            <div class="result-info-items -dealer">
            <span class="result-info-label">${window.language2.poker_betlayout_dealer}</span>
            <div class="card-con">
            <div class="card-holder card-${dealer1}"></div>
            <div class="card-holder card-${dealer2}"></div>
            </div>
            </div>
            <div class="result-info-items -community">
            <span class="result-info-label">${window.language2.poker_betlayout_community}</span>
            <div class="card-con">
            <div class="card-holder card-${flop1}"></div>
            <div class="card-holder card-${flop2}"></div>
            <div class="card-holder card-${flop3}"></div>
            <div class="card-holder card-${turn}"></div>
            <div class="card-holder card-${river}"></div>
            </div>
            </div>
            <div class="result-info-items -player">
            <span class="result-info-label">${window.language2.poker_betlayout_player}</span>
            <div class="card-con">
            <div class="card-holder card-${player1}"></div>
            <div class="card-holder card-${player2}"></div>
            </div>
            </div>
            </div>`
          );

          let table_con = con.find('.result-table-body').empty();
          let betTblHeight = (betHistory.length + 1) * 30;
          let totalWin = 0;
          let betlayoutText = "";

          $('.result-table-body').css('height', `${betTblHeight+20}px`);

          for (var key in betHistory ) {
            if (betlog.type == 'r') {
              if (key == 'pocket' || key == 'bonusplus') continue;
            }

            let rowData = betHistory[key];
            let winLoseAmt = 0;

            if (window.isJunket == 2) {
              winLoseAmt = (rowData.win - rowData.bet) * (-1);
            } else {
              winLoseAmt = rowData.win - rowData.bet;
            }

            let winLoseClass = winLoseAmt > 0 ? 'tbl-win-text' : 'tbl-lose-text';
            if (winLoseAmt == 0) winLoseClass = '';

            totalWin += winLoseAmt;

            if(key == "ante") {
              betlayoutText = window.language2.poker_betlayout_ante;
            } else if(key == "bonus") {
              betlayoutText = window.language2.poker_betlayout_bonus;
            } else if(key == "flop") {
              betlayoutText = window.language2.poker_betlayout_flop;
            } else if(key == "river") {
              betlayoutText = window.language2.poker_betlayout_river;
            } else if(key == "turn") {
              betlayoutText = window.language2.poker_betlayout_turn;
            } else if(key == "bonusplus") {
              betlayoutText = window.language2.poker_betlayout_bonusplus;
            } else {
              betlayoutText = window.language2.poker_betlayout_pocket;
            }

            rowData.bet = window.casino == 'SS' ? parseFloat(rowData.bet).toFixed(2) : rowData.bet;
            winLoseAmt = window.casino == 'SS' ? parseFloat(winLoseAmt).toFixed(2) : winLoseAmt;

            table_con.append(
              $('<div class="result-tr"></div>')
              .append($('<div class="result-td"></div>').text( `${betlayoutText}` ))
              .append($('<div class="result-td"></div>').text( numberWithCommas(rowData.bet) ))
              .append($('<div class="result-td"></div>').addClass(winLoseClass).text(numberWithCommas(winLoseAmt)))
            );
          }

          let totalWinClass = totalWin > 0 ? 'tbl-win-text' : 'tbl-lose-text';
          if (totalWin == 0) totalWinClass = '';

          totalWin = window.casino == 'SS' ? totalWin.toFixed(2) : totalWin;

          table_con.append(
            $('<div class="result-tr"></div>')
            .append($('<div class="result-td -total"></div>').text(window.language2.com_sub_menuarea_total))
            .append($('<div class="result-td"></div>').addClass('total--bet').text( numberWithCommas(betData.total_bet) ))
            .append($('<div class="result-td"></div>').addClass('total--payout').addClass(totalWinClass).text( numberWithCommas(totalWin) ))
          );


        } else if(gameName == 'sicbo') {
          let winColor = '#fff';
					let winText = parseInt(gameInfo.one) + parseInt(gameInfo.two) + parseInt(gameInfo.three);
					let resultType = winText > 10 ? window.language2.sicbo_betlayout_big : window.language2.sicbo_betlayout_small;
					let resultConColor = winText > 10 ? '#d32f2e' : '#1465c0';
					let markPadding = winText > 10 ? '2px' : '0px';

          $('.header-result-con').append( $('<div class="result-list"></div>')
          .append( $(`<div class="center-content"><div class="result-mark">${winText}</div></div>`) )
          .append( $(`<div class="result-text">${resultType}</div>`) )
          )

          $('.result-text').css({color: winColor});
          $('.result-mark').css({color: resultConColor, background: winColor, 'padding-right': markPadding});
          $('.header-result-con').css({background: resultConColor});

          let diceData = [
            {value: 1, circle: [5]},
            {value: 2, circle: [1, 9]},
            {value: 3, circle: [1, 5, 9]},
            {value: 4, circle: [1, 3, 7, 9]},
            {value: 5, circle: [1, 3, 5, 7, 9]},
            {value: 6, circle: [1, 3, 4, 6, 7, 9]}
          ]

          $('#modalResult .result-body').empty();

          let resultcon = document.createElement('div');
          resultcon.className = "result-main-con center-content";

          $('#modalResult .result-body').append(resultcon)



          for (let j in gameInfo) {
            for (var i = 0; i < diceData.length; i++) {
              if (gameInfo[j] == diceData[i].value) {
                $('.result-main-con').append(
                  `<div class="result-dice-bg result-dice-${j}">
                  <span class="result-dice-circle dice-circle-${j}-1"></span>
                  <span class="result-dice-circle dice-circle-${j}-2"></span>
                  <span class="result-dice-circle dice-circle-${j}-3"></span>
                  <span class="result-dice-circle dice-circle-${j}-4"></span>
                  <span class="result-dice-circle dice-circle-${j}-5"></span>
                  <span class="result-dice-circle dice-circle-${j}-6"></span>
                  <span class="result-dice-circle dice-circle-${j}-7"></span>
                  <span class="result-dice-circle dice-circle-${j}-8"></span>
                  <span class="result-dice-circle dice-circle-${j}-9"></span>
                  </div>`
                );

                for (var x = 0; x < diceData[i].circle.length; x++) {
                  $(`.dice-circle-${j}-${diceData[i].circle[x]}`).css('opacity', '1');
                }

                break;
              } // end of if
            } // end of for loop
          } // end of for-in

          let table_con = con.find('.result-table-body').empty();
          let betTblHeight = (betHistory.length + 1) * 30;
          let totalWin = 0;
          $('.result-table-body').css('height', `${betTblHeight}px`);

          for (let i = 0;i < betHistory.length; i++) {
            let rowData = betHistory[i];
            let winLoseAmt = 0;

            if (window.isJunket == 2) {
              winLoseAmt = (rowData.win_money - rowData.bet_money) * (-1);
            } else {
              winLoseAmt = rowData.win_money - rowData.bet_money;
            }

            totalWin += winLoseAmt;

            rowData.bet_money = window.casino == 'SS' ? parseFloat(rowData.bet_money).toFixed(2) : rowData.bet_money;
            winLoseAmt = window.casino == 'SS' ? parseFloat(winLoseAmt).toFixed(2) : winLoseAmt;

            let rowdataBet = "";
            if(rowData.bet == "odd") {
              rowdataBet = window.language2.sicbo_betlayout_odd;
            } else if(rowData.bet == "even") {
              rowdataBet = window.language2.sicbo_betlayout_even;
            } else if(rowData.bet == "big") {
              rowdataBet = window.language2.sicbo_betlayout_big;
            } else if(rowData.bet == "small") {
              rowdataBet = window.language2.sicbo_betlayout_small;
            } else {
              rowdataBet = rowData.bet;
            }

            table_con.append(
              $('<div class="result-tr"></div>')
              .append($('<div class="result-td"></div>').text( `${rowdataBet}` ))
              .append($('<div class="result-td"></div>').text(numberWithCommas(rowData.bet_money) ))
              .append($('<div class="result-td"></div>').addClass(winLoseAmt > 0 ? 'tbl-win-text' : 'tbl-lose-text').text(numberWithCommas(winLoseAmt)))
            );
          }

          let totalWinClass = totalWin > 0 ? 'tbl-win-text' : 'tbl-lose-text';
          if (totalWin == 0) totalWinClass = '';

          totalWin = window.casino == 'SS' ? totalWin.toFixed(2) : totalWin;

          table_con.append(
            $('<div class="result-tr"></div>')
            .append($('<div class="result-td -total"></div>').text(window.language2.com_sub_menuarea_total))
            .append($('<div class="result-td"></div>').addClass('total--bet').text( numberWithCommas(betData.total_bet) ))
            .append($('<div class="result-td"></div>').addClass('total--payout').addClass(totalWinClass).text( numberWithCommas(totalWin) ))
          );

        } else if(gameName == 'dragontiger') {
          let winColor = '#fff';
          let winResultColor = '#1565c0'
          let bordercolor = '#d6bb69';
          let winText = result.winner;
          let resultType = '';
          let resultTypeInitials = winText == 'dragon' ? 'D' : 'T';

          switch (winText) {
            case 'dragon':
            resultType = window.language2.dragontiger_betlayout_dragon;
            winResultColor = '#1565c0';
            bordercolor = '#1565c0';
            break;
            case 'tiger':
            resultType = window.language2.dragontiger_betlayout_tiger;
            winResultColor = '#d32f2f';
            bordercolor = '#d32f2f';
            break;
            case 'tie':
            resultType = window.language2.dragontiger_betlayout_tie;
            winResultColor = '#689f38';
            bordercolor = '#689f38';
            break;
            case 'suited tie':
            resultType = window.language2.dragontiger_betlayout_suitedtie;
            winResultColor = '#689f38';
            bordercolor = '#d6bb69';
            break;
            default:
          }

          $('.header-result-con').css({'background': winResultColor })
          .append( $('<div class="result-list"></div>')
          .append(
            $(`<div class="center-content">
            <div class="result-mark" style="background: ${winColor}; color: ${winResultColor}; border: 2px solid ${bordercolor};">
            <span style="color: ${winResultColor};">${resultTypeInitials}</span>
            </div>
            </div>`)
          )
          .append( $(`<div class="result-text" style="color: ${winColor}">${resultType}</div>`) )
          )

          let dragonValue = cardValue(gameInfo.dragon).value;
          let tigerValue = cardValue(gameInfo.tiger).value;
          let dragonCard = gameInfo.dragon;
          let tigerCard = gameInfo.tiger;

          let dragon_margin = 0;
          let tiger_margin = 0;

          let count = 0;
          var posResult = {}

          if (dragonValue == 1 || dragonValue > 9 && dragonValue < 20) {
            dragon_margin = -4;
          } else {
            dragon_margin = 0;
          }

          if (tigerValue == 1 || tigerValue > 9 && tigerValue < 20) {
            tiger_margin = -4;
          } else {
            tiger_margin = 0;
          }

          $('#modalResult .result-body').empty();

          let resultcon = document.createElement('div');
          resultcon.className = "result-main-con center-content";

          $('#modalResult .result-body').append(resultcon)

          $('.result-main-con').append(
            `<div class="result-info">
            <div class="result-info-items -dragon">
            <div class="result-card-num"><span style="margin-left:${dragon_margin}px;">${dragonValue}</span></div>
            <span class="card-holder card-${dragonCard}"></span>
            </div>
            <div class="result-info-items -tiger">
            <div class="result-card-num"><span style="margin-left:${tiger_margin}px">${tigerValue}</span></div>
            <span class="card-holder card-${tigerCard}"></span>
            </div>
            </div>`
          );

          let table_con = con.find('.result-table-body').empty();
          let betTblHeight = (betHistory.length + 1) * 30;
          let totalWin = 0;
          $('.result-table-body').css('height', `${betTblHeight+20}px`);

          for (let i = 0;i < betHistory.length; i++) {
            let rowData = betHistory[i];
            let winLoseAmt = rowData.win_money - rowData.bet_money;
            totalWin += winLoseAmt;

            rowData.bet_money = window.casino == 'SS' ? parseFloat(rowData.bet_money).toFixed(2) : rowData.bet_money;
            winLoseAmt = window.casino == 'SS' ? parseFloat(winLoseAmt).toFixed(2) : winLoseAmt;

            table_con.append(
              $('<div class="result-tr"></div>')
              .append($('<div class="result-td"></div>').text( `${rowData.bet}` ))
              .append($('<div class="result-td"></div>').text( numberWithCommas(rowData.bet_money) ))
              .append($('<div class="result-td"></div>').addClass(winLoseAmt > 0 ? 'tbl-win-text' : 'tbl-lose-text').text(numberWithCommas(winLoseAmt)))
            );
          }

          let totalWinClass = totalWin > 0 ? 'tbl-win-text' : 'tbl-lose-text';
          if (totalWin == 0) totalWinClass = '';

          totalWin = window.casino == 'SS' ? totalWin.toFixed(2) : totalWin;

          table_con.append(
            $('<div class="result-tr"></div>')
            .append($('<div class="result-td"></div>').text(window.language2.com_sub_menuarea_total))
            .append($('<div class="result-td"></div>').addClass('total--bet').text( numberWithCommas(betData.total_bet) ))
            .append($('<div class="result-td"></div>').addClass('total--payout').addClass(totalWinClass).text( numberWithCommas(totalWin) ))
          );
        } else if(gameName == 'paigow') {

          if(typeof result === 'string') {
            result = JSON.parse(result)
          }

          for (var i = 0; i < result.winner.length; i++) {
            let winColor;
            let winText;
            let winneyLayoutText;
            if (result.winner[i] == 'banker') {
              winText = '庄';
              winColor = '#d32f2e';
              winneyLayoutText = window.language2.paigow_betlayout_banker;
            } else if (result.winner[i] == 'up') {
              winText = '上';
              winColor = '#e07a15';
              winneyLayoutText = window.language2.paigow_betlayout_up;
            } else if (result.winner[i] == 'heaven') {
              winText = '天';
              winColor = '#1665c1';
              winneyLayoutText = window.language2.paigow_betlayout_heaven;
            } else if (result.winner[i] == 'down') {
              winText = '下';
              winColor = '#689f39';
              winneyLayoutText = window.language2.paigow_betlayout_down;
            }

            $('.header-result-con').css({'background': '#fff' })
            $('.header-result-con').append( $('<div class="result-list"></div>')
            .append( $(`<div class="center-content"><div class="result-mark" style="background: ${winColor}">${winText}</div></div>`) )
            .append( $(`<div class="result-text" style="color: ${winColor}">${winneyLayoutText}</div>`) )
            )
          }

          $('.result-main-con').remove();
          $('.result-body').append('<div class="result-banker-con center-content"></div>')
          .append('<div class="result-other-con center-content"></div>');
          if(typeof this.tiles === 'string') this.tiles = JSON.parse(this.tiles)
          let areaArr = ['banker','up','heaven','down'];
          _.forEach(areaArr, (area) => {
            let tileArea = gameInfo.tiles[area] || {};

            let isPair = _.find(result.pairs, (o) => { return o == area }) != undefined;
            if(!_.isEmpty(tileArea)) {
              let totalText = isPair ? tilesModule(tileArea[0]).text : _.sum(_.flatMap(tileArea, (v) => { return tilesModule(v).value; })) % 10 || 0;
              let circle = `<div class="result--circle circle--${area} ${isPair ? 'pair' : ''}">${totalText}</div>`;
              let resultTiles = this.createTiles(area, gameInfo, result, 'betlog');

              if ($(resultTiles).hasClass('tile--banker')) {
                $('.result-banker-con').append( $('<div class="result-con"></div>')
                .append( $('<div></div>').addClass('info-winning__area center-content').addClass(`set-${area}`).append(circle) )
                .append( $('<div></div>').addClass('result--tile__con center-content').append(resultTiles) )
                )
              } else {
                $('.result-other-con').append( $('<div class="result-con"></div>')
                .append( $('<div></div>').addClass('info-winning__area center-content').addClass(`set-${area}`).append(circle) )
                .append( $('<div></div>').addClass('result--tile__con center-content').append(resultTiles) )
                )
              }
            }
          });

          let table_con = con.find('.result-table-body').empty();
          let betTblHeight = (betHistory.length + 2) * 30;
          let totalWin = 0;
          $('.result-table-body').css('height', `${110+20}px`);

          for (let i = 0;i < betHistory.length; i++) {
            let rowData = betHistory[i];
            let winLoseAmt = 0;

            if (window.isJunket == 2) {
              winLoseAmt = (rowData.win_money - rowData.bet_money) * (-1);
            } else {
              winLoseAmt = rowData.win_money - rowData.bet_money;
            }

            totalWin += winLoseAmt;

            let betText = window.language.menu[`${rowData.bet}caps`];
            if(betText == undefined) {
              betText = rowData.bet.toUpperCase(); //temporary fix
            }

            table_con.append(
              $('<div class="result-tr"></div>')
              .append($('<div class="result-td"></div>').text(betText))
              .append($('<div class="result-td"></div>').text( numberWithCommas(rowData.bet_money) ))
              .append($('<div class="result-td"></div>').addClass(winLoseAmt > 0 ? 'tbl-win-text' : 'tbl-lose-text').text(numberWithCommas(winLoseAmt)))
            );
          }

          let totalWinClass = totalWin > 0 ? 'tbl-win-text' : 'tbl-lose-text';
          if (totalWin == 0) totalWinClass = '';

          table_con.append(
            $('<div class="result-tr"></div>')
            .append($('<div class="result-td"></div>').text(window.language2.com_sub_menuarea_total))
            .append($('<div class="result-td"></div>').addClass('total--bet').text( numberWithCommas(betData.total_bet) ))
            .append($('<div class="result-td"></div>').addClass('total--payout').addClass(totalWinClass).text( numberWithCommas(totalWin) ))
          );
        } // end paigow
      } // empty betlogs
    })
  },

  createTiles(type, tiles, result, record = 'gamehistory') {
    let isWinner = _.find(result.winner, (o) => { return type == o }) != undefined;
    tiles = tiles.tiles[type] || [];

    let res = `<div class="${record}--tile__con tile--${type} ${isWinner == true ? 'active' : '' }">`;
    for(let i=0; i < tiles.length; i++) {
      if(tiles[i] && tilesModule(tiles[i])) {
        res += `<div class="tile-icon tile-${tilesModule(tiles[i]).number} icon-count-${i}"></div>`;
      }
    }
    res += '</div>';

    return res;
  }

}


export default {
  bet_records
}
