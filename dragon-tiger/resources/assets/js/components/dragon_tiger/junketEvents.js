/**
 * junketEvents.js
 * @author Kevin Villanueva
 * @since 2018.07.09
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all junket events / functions
**/

import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, fontFormat, setCurrentTimezone } from '../../factories/factories';

export default () => {
	return new blu.Component({
		main() {
			this.junketUsers = [];
			// this.sampleData = [
			// 	{user_id: 4049, username: 'Kevin', user_money: 99999999, user_bets: 99999999, win_lose: 99999999},
			// 	{user_id: 2903, username: 'Lovely', user_money: 99999999, user_bets: 99999999, win_lose: -99999999},
			// 	{user_id: 2906, username: 'Sam', user_money: 99999999, user_bets: 99999999, win_lose: 99999999},
			// 	{user_id: 2904, username: 'Marjo', user_money: 99999999, user_bets: 99999999, win_lose: 0},
			// 	{user_id: 1, username: 'Dan', user_money: 99999999, user_bets: 99999999, win_lose: -99999999},
			// 	{user_id: 2, username: 'Bruce', user_money: 99999999, user_bets: 99999999, win_lose: 99999999},
			// 	{user_id: 3, username: 'John', user_money: 99999999, user_bets: 99999999, win_lose: -99999999},
			// 	{user_id: 4, username: 'Kristian', user_money: 99999999, user_bets: 99999999, win_lose: 99999999},
			// 	{user_id: 5, username: 'Shinji', user_money: 99999999, user_bets: 99999999, win_lose: -99999999},
			// 	{user_id: 6, username: 'Donde', user_money: 99999999, user_bets: 99999999, win_lose: 0}
			// ];

			$('.modal-con--chat').off().on('click', (e) => {
				this.removeNotif();
			});

			$('.modal-con--chat').draggable({
				handle: '.modal-header-chat',
				containment: 'parent'
			});

			if (window.junket == 2) {
				$('.modal-con--betlogs').css({right: '36.5%', top: '6.5%', display: 'none'});
			} else if (window.junket == 1) {
				this.junketUsers.push({
					user_id: window.userId,
					username: window.user_name,
					user_money: window.user_money,
					user_bets: 0,
					win_lose: 0,
					original_bets: 0,
					original_money: 0
				});
				this.setPlayers();
			}

			if (!this.context.junketAgent) {
				$('#agentMoney').remove();
				$('.btn-junket').remove();
				$('.junket-player-con').remove();
				$('.junket-body-info').css({height: '120px'});
			}

			// Disband room
			$('.disband-room').off().on('click', (e) => {
				$('.junket-confirm').show();
				$('.mdl_bg.-closeroom').show();

				// Confirm disband
				$('#junketYes').on('click', () => {
					this.context.socket.emit('data', {
					 	eventName : 'disband_room',
					 	token     : window.vendorData.token,
					 	gameName  : 'Sicbo',
					 	agentId   : window.vendorData.bankerId
					}, (response) => {
						if(window.lobby_type == 'integrated'){
		          window.location = window.lobby_redirect_url;
		        } else {
		          window.location = window.lobby_domain;
		        }
					});
				});
			});

			// Change password
			$('.change-password').off().on('click', (e) => {
				$('.junket-confirm').show();
				$('.mdl_bg.-password').show();
				$('.mdl_input').val('');
			});

			$('#changePassYes').off().on('click', (e) => {
				if ($('#inputOldPass').val() == '' || $('#inputNewPass').val() == '' || $('#inputConfirmPass').val() == '') {
					$('.mdl_message-error.-inc_match').html(window.language2.nihtanjunket_lobby_allfieldsrequired);
					$('.mdl_message-error.-inc_match').show();
					return;
				};

				$.post('/checkPassword', {password: $('#inputOldPass').val()}, (password) => {
					if (password != window.vendorData.roomPass) {
						$('.-inc_pass').show();
						return;
					}

					if ($('#inputNewPass').val() != $('#inputConfirmPass').val()) {
						$('.mdl_message-error.-inc_match').html(window.language2.nihtanjunket_lobby_passwordnotmatch);
						$('.mdl_message-error.-inc_match').show();
						return;
					}

					if ($('#inputNewPass').val().length < 4) {
						$('.mdl_message-error.-inc_match').html(window.language2.nihtanjunket_lobby_atleast4);
						$('.mdl_message-error.-inc_match').show();
						return;
					}

					$.post('/updateRoom', {
						flag: 'P',
						status: '1',
						roomType: 'j',
						tableId: window.tableNum,
						userId: window.userId,
						roomId: window.vendorData.roomId,
						password: $('#inputNewPass').val()
					}, (response) => {
						if (response) {
							window.vendorData.roomPass = response;
							$('.mdl_bg.-password').hide();
							$('.mdl_bg.-success').show();

							this.context.socket.emit('data', {
								eventName: 'update_room',
								title: window.vendorData.title,
								token: window.vendorData.token,
								gameTable: window.tableNum,
								range: window.range,
								roomId: window.vendorData.roomId,
								userCnt: 2,
								password: response,
								gameName: 'Baccarat'
							}, (emit) => { });
						} // end response if
					}); // end post
				});
			});

			$('#inputOldPass, #inputNewPass, #inputConfirmPass').keydown((e) => {
				$('.-inc_pass').hide();
				$('.-inc_match').hide();
			});

			// Close junket modal
			$('#junketNo, #changePassNo, #successConfirm').on('click', () => {
				$('.junket-confirm').hide();
				$('.mdl_bg').hide();
			});

			// === Broadcast events
			if (!this.context.junketAgent) $('.junket-chat-con').remove();

			// Click emote
			$('.emote-ico-btn.-bc').off().on('click', (e) => {
				if ($(e.currentTarget).attr('toggled') == 'true') {
					$('.chat-emote-con.-bc').hide();
					$(e.currentTarget).attr('toggled', 'false');
				} else {
					$('.chat-emote-con.-bc').show();
					$(e.currentTarget).attr('toggled', 'true');
				}
			})

			$('.emote-ico.-bc').off().on('click', (e) => {
				let emoteClass = this.setEmote($(e.currentTarget).attr('code'));

				$('.chat-input.-bc').append(`<img alt="${emoteClass}" src="/img/menu/3.0/chat/${emoteClass}.png" class="message-emote" />`);
				$('.chat-input.-bc').scrollTop(1500);

				$('.chat-emote-con.-bc').hide();
				$('.emote-ico-btn.-bc').attr('toggled', 'false');
				this.placeCaretAtEnd($('.chat-input.-bc').get(0));
			});

			// Send message
			$('.send-message-ico.-bc').off().on('click', (e) => {
				if ($('.chat-input.-bc').html() == '') return;

				if (this.context.junketAgent) {
					this.setMessage('', 'broadcast', window.userId);
	    	} else {
	    		this.setMessage('', 'userPM', window.userId);
	    	}
			});

			$('.chat-input.-bc').keydown((e) => {
				if (e.keyCode == 13 && !e.shiftKey) {
				  e.preventDefault();
		    	if ($('.chat-input.-bc').html() == '') return;

		    	if (this.context.junketAgent) {
						this.setMessage('', 'broadcast', window.userId);
		    	} else {
		    		this.setMessage('', 'userPM', window.userId);
		    	}
					return;
			  }
			});
			// === End of Broadcast events
		},
    placeCaretAtEnd(el) {
	    el.focus();
	    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
	    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
	    }
		},
		init (data) {
			this.junketUsers = _.uniqBy(this.junketUsers, function (e) { return e.user_id; });
			_.remove(this.junketUsers, function(e) { return e.user_id == window.vendorData.bankerId });

			$.post(`/getJunket/${window.vendorData.roomId}`, (response) => {
				for(var x = 0; x < data.length; x++) {
					this.junketUsers.push({
						user_id: data[x].userId,
						username: data[x].userName,
						user_money: data[x].money ? data[x].money : 0,
						user_bets: 0,
						win_lose: 0
					});

					for(var i = 0; i < response.length; i++) {
						for (var j = 0; j < this.junketUsers.length; j++) {
							if (response[i].user_id == this.junketUsers[j].user_id) {
								this.junketUsers[j].user_bets = window.casino === 'N' ? parseInt(response[i].total_bet): parseFloat(response[i].total_bet).toFixed(2);
								this.junketUsers[j].original_bets = window.casino === 'N' ? parseInt(response[i].total_bet): parseFloat(response[i].total_bet).toFixed(2);
								this.junketUsers[j].win_lose = window.casino === 'N' ? parseInt(response[i].total_win) : parseFloat(response[i].total_win).toFixed(2);

								this.junketUsers[j].user_bets = this.junketUsers[j].user_bets * window.currencyMultiplier;
								this.junketUsers[j].original_bets = this.junketUsers[j].original_bets * window.currencyMultiplier;
								this.junketUsers[j].win_lose = this.junketUsers[j].win_lose * window.currencyMultiplier;
							}
						}
					} // end for loop
					this.junketUsers.forEach((e) => {
						e.original_bets = e.user_bets;
						e.original_money = e.user_money;
					})
				}

				//ovverriding
				for(var i = 0; i < data.length; i++) {
					for (var j = 0; j < this.junketUsers.length; j++) {
						if (data[i].userId == this.junketUsers[j].user_id) {
							this.junketUsers[j].user_money = data[i].money ? data[i].money : 0;
							this.junketUsers[j].original_money = data[i].money ? data[i].money : 0;
							if(data[i].bets !== undefined && data[i].bets.length) {
								let money = window.casino === 'N' ? parseInt(this.junketUsers[j].user_money) : parseFloat(this.junketUsers[j].user_money).toFixed(2);
								this.junketUsers[j].original_money = money + _.sumBy(data[i].bets, 'bet_amount');
							}
						}
					}
				}

				if (window.junket != 0) {
					this.setPlayers();
					$('#agentMoney').html(numberWithCommas(this.context.context.user_money));
				} else {
					$('#agentMoney').remove();
					$('.junket-player-con').remove();
				}

				//setting room data
				// $('#totalJunketBets').html(0);
			});
		},
		setPlayers() {
			this.junketUsers = _.uniqBy(this.junketUsers, function (e) { return e.user_id; });
			_.remove(this.junketUsers, function(e) { return e.user_id == window.vendorData.bankerId });

			let playerData = this.junketUsers;
			$('#totalPlayers').html(this.junketUsers.length);
			$('#junketPlayerList').empty();

			for (var i = 0; i < playerData.length; i++) {
				let username = playerData[i].username.length > 3 ? `${playerData[i].username.substring(0,3)}...` : playerData[i].username;
				let winloseClass = playerData[i].win_lose > 0 ? '--win' : (playerData[i].win_lose == 0 ? '' : '--lose');

				$('#junketPlayerList').append(
					$(`<div class="table-tr player-list-tr" user="${playerData[i].user_id}">`)
						.append($(`<div class="table-td -hover -text" name="${playerData[i].username}"></div>`).text(username))
						.append($('<div class="table-td -hover -credit"></div>').text(numberWithCommas(playerData[i].user_money)))
						.append($('<div class="table-td -hover -bets"></div>').text(numberWithCommas(playerData[i].user_bets)))
						.append($(`<div class="table-td -hover -winlose ${winloseClass}"></div>`).text(numberWithCommas(playerData[i].win_lose)))
						.append($('<div class="table-td -extra"></div>').append(
								$(`<div class="chat-notif -inactive notif-${playerData[i].user_id}">
									<div class="chat-ico -inactive message-ico-${playerData[i].user_id}" value=0></div>
								</div>`)
						))
					.append($('</div>'))
				)
			} // end of for loop

			$('.table-td.-hover').off().on('click', (e) => {
				e.preventDefault();

				$('.modal-con--betlogs').show();
				$('.modal-con--betlogs').attr('user', $(e.currentTarget).parent().attr('user'));
				$('.menu-header-txt.--betlogs').text(`${window.language.menu.betlogs} (${$(e.currentTarget).parent().children(":first").attr('name')})`);
        this.context.component_betRecords.initRecords('betlogs');
			});

			// Toggle chat
			$('.table-td.-extra').off().on('click', (e) => {
				let currentUserId = $(e.currentTarget).parent().attr('user');

				if(document.getElementById(`chatPM${currentUserId}`) != null) {
					$(`#chatPM${currentUserId}`).show();
					$(`#chatPM${currentUserId}`).animate({
				    opacity: 1,
				    // right: 0,
				    top: 0
				  }, 300, function() {
				    // Animation complete.
				  });

					this.removeNotif(currentUserId);

					$(`.notif-${currentUserId}`).removeClass('-active');
					$(`.notif-${currentUserId}`).addClass('-inactive');

					$(`.message-ico-${currentUserId}`).removeClass('-active');
					$(`.message-ico-${currentUserId}`).addClass('-inactive');

					$(`.message-ico-${currentUserId}`).attr('value', 0);
					$(`.message-ico-${currentUserId}`).empty();

					return;
				}

		    this.setChatBox(e, currentUserId);
			}); // end of chat click event
		},
		setChatBox(e, currentUserId, type = '') {
			let activeChat = $(".junket-chat-con").children().length;

			let pmName = '';
			if (type) {
				pmName = e;
			} else {
				pmName = $(e.currentTarget).parent().children(":first").attr('name');
			}

			$('.junket-chat-con').append(
				`<div id="chatPM${currentUserId}" class="modal-con noselect modal-con-pm" user="${currentUserId}">
					<div class="modal-header modal-header-chat" con="chatPM${currentUserId}">
						<span class="menu-header-txt header-${currentUserId}">${window.language2.com_sub_menuarea_chat} (${pmName})</span>
						<span class="minimize-pm">&mdash;</span>
						<span class="close-pm" value='chat'></span>
					</div>

					<div class="modal-body modal-body-chat --chat" style='height: 255px;'>
						<div class="chat-message-con message-con-${currentUserId}" style="height: 255px;">
						</div>

						<div class="chat-input-con" user="${currentUserId}">
							<div class="chat-input message-${currentUserId} -pm" contentEditable="true"></div>
							<div class="chat-actions">
								<div class="send-message-ico -pm"></div>
								<div class="emote-ico-btn emote-btn-${currentUserId} -pm" toggled="false" con="emote-con-${currentUserId}"></div>
							</div>
						</div>
					</div>

					<div class="chat-emote-con emote-con-${currentUserId}">
						<div class="chat-inner">
							<div class="emote-ico -pm emote-smile" code=":smile:"></div>
							<div class="emote-ico -pm emote-heart" code=":heart:"></div>
							<div class="emote-ico -pm emote-grin" code=":grin:"></div>
							<div class="emote-ico -pm emote-astonish" code=":astonish:"></div>
							<div class="emote-ico -pm emote-tongue" code=":tongue:"></div>
							<div class="emote-ico -pm emote-cry" code=":cry:"></div>
							<div class="chat-arrow-down"><span></span></div>
						</div>
					</div>
				</div>`);

			// Reset notification
			$('.modal-con-pm').off().on('click', (e) => {
				let userId = $(e.currentTarget).attr('user');

				this.removeNotif(userId);

				$(`.notif-${userId}`).removeClass('-active');
				$(`.notif-${userId}`).addClass('-inactive');

				$(`.message-ico-${userId}`).removeClass('-active');
				$(`.message-ico-${userId}`).addClass('-inactive');

				$(`.message-ico-${userId}`).attr('value', 0);
				$(`.message-ico-${userId}`).empty();
			});

			// Close chat
			$('.close-pm').off().on('click', (e) => {
				$(`#${$(e.currentTarget).parent().attr('con')}`).remove();
			});

			// Minimize PM
			$('.minimize-pm').off().on('click', (e) => {
				let conId = $(e.currentTarget).parent().attr('con');
				let userId = $(e.currentTarget).parent().parent().attr('user');

				$(`#${conId}`).animate({
			    opacity: 0,
			    // right: '+=500',
			    top: '+=100'
			  }, 300, function() {
			    // Animation complete.
			    $(`#${conId}`).hide();
			  });
			})

			// Click emote
			$('.emote-ico-btn.-pm').off().on('click', (e) => {
				if ($(e.currentTarget).attr('toggled') == 'true') {
					$(`.${$(e.currentTarget).attr('con')}`).hide();
					$(e.currentTarget).attr('toggled', 'false');
				} else {
					$(`.${$(e.currentTarget).attr('con')}`).show();
					$(e.currentTarget).attr('toggled', 'true');
				}
			})

			$('.emote-ico.-pm').off().on('click', (e) => {
				let userId = $(e.currentTarget).parent().parent().parent().attr('user');
				let emoteClass = this.setEmote($(e.currentTarget).attr('code'));

				$(`.message-${userId}`).append(`<img alt="${emoteClass}" src="/img/menu/3.0/chat/${emoteClass}.png" class="message-emote" />`);
				$(`.message-${userId}`).scrollTop(1500);

				$(`.emote-con-${userId}`).hide();
				$(`.emote-btn-${userId}`).attr('toggled', 'false');
				this.placeCaretAtEnd($(`.message-${userId}`).get(0));
			});

			// Send message
			$('.send-message-ico.-pm').off().on('click', (e) => {
				let userId = $(e.currentTarget).parent().parent().attr('user');
				if ($(`.message-${userId}`).html() == '') return;
				this.setMessage('', 'send', userId);
			});

			$(".chat-input.-pm").keydown((e) => {
				let userId = $(e.currentTarget).parent().attr('user');
				if (e.keyCode == 13 && !e.shiftKey) {
				  e.preventDefault();
		    	if ($(`.message-${userId}`).html() == '') return;

					this.setMessage('', 'send', userId);
					return;
			  }
			});

			$(`#chatPM${currentUserId}`).draggable({
				handle: '.modal-header-chat',
				containment: 'parent'
			});
		},
		setMessage(data, type, userId) {
			let messageDisplay = '';
			let senderName = '';
			let messageSend = '';
			let userTextType = '';

			if (type == 'send') {
			  $(`.message-${userId}`).children('.message-emote').each(function () {
		      $(this).replaceWith(`:${$(this).prop('alt')}:`)
		    });

				messageSend = $(`.message-${userId}`).html();
				messageDisplay = messageSend;
				senderName = window.user_name;

				$(`.message-${userId}`).empty();

				// Emit PM
				this.context.socketAll.emit('chat',{
		      eventName:'chatPM',
		      isPM: true,
		      message: messageSend,
		      sender: window.userId,
		      receiver: userId,
		      roomId: window.vendorData.roomId,
		      senderName: window.user_name
		    });
			} else if (type == 'broadcast' || type == 'userPM') {
				$('.chat-input.-bc').children('.message-emote').each(function () {
		      $(this).replaceWith(`:${$(this).prop('alt')}:`)
		    });

				messageSend = $('.chat-input.-bc').html();
				messageDisplay = messageSend;
				senderName = window.user_name;

				$('.chat-input.-bc').empty();

				if (type == 'broadcast') {
					// Emit broadcast
					this.context.socketAll.emit('chat',{
			      eventName:'roomBroadcast',
			      namespace: `${window.game}/${window.tableNum}`, // 'Sicbo/1',
			      message: messageSend,
			      token: window.vendorData.token,
			      roomId: window.vendorData.roomId,
			      senderName: senderName
			    }, (d) => { });
				} else {
					// Emit PM
					this.context.socketAll.emit('chat',{
			      eventName:'chatPM',
			      isPM: true,
			      message: messageSend,
			      sender: window.userId,
			      receiver: window.vendorData.bankerId,
			      roomId: window.vendorData.roomId,
			      senderName: window.user_name
			    });
				}

			} else if (type == 'receive') {
				messageDisplay = data.message;
				senderName = !data.senderName ? 'user' : data.senderName;
				userTextType = '-sender';

				if (this.context.junketAgent) {
					$(`.notif-${userId}`).removeClass('-inactive');
					$(`.notif-${userId}`).addClass('-active');

					$(`.message-ico-${userId}`).removeClass('-inactive');
					$(`.message-ico-${userId}`).addClass('-active');

					let msgCount = parseInt($(`.message-ico-${userId}`).attr('value')) + 1;
					$(`.message-ico-${userId}`).attr('value', msgCount);
					$(`.message-ico-${userId}`).html(msgCount > 9 ? '9+' : msgCount);

		    	if(document.getElementById(`chatPM${userId}`) == null) {
						this.setChatBox(senderName, userId, 'receive');
						$(`#chatPM${userId}`).hide();
		    	}
				} else {
					userId = data.receiver;
					this.setChatNotif();
				}

				// Notifications
				if (this.alertInstance) this.alertInstance.stop();
      	this.alertInstance = createjs.Sound.play(`alert`, {loop:4});

      	$(`.notif-${userId}`).addClass('chatactive');
				setTimeout(() => {
					this.removeNotif(userId);
				}, 6000);
			} else if (type == 'receiveBroadcast') {
				messageDisplay = data.message;
				senderName = window.vendorData.bankerUsername; // !data.senderName ? 'user' : data.senderName;
				userTextType = '-sender';

				this.setChatNotif();
			}

		  messageDisplay = messageDisplay.replaceAll(':smile:', `<img alt="smile" src="/img/menu/3.0/chat/smile.png" class="message-emote" />`);
		  messageDisplay = messageDisplay.replaceAll(':heart:', `<img alt="heart" src="/img/menu/3.0/chat/heart.png" class="message-emote" />`);
		  messageDisplay = messageDisplay.replaceAll(':grin:', `<img alt="grin" src="/img/menu/3.0/chat/grin.png" class="message-emote" />`);
		  messageDisplay = messageDisplay.replaceAll(':astonish:', `<img alt="astonish" src="/img/menu/3.0/chat/astonish.png" class="message-emote" />`);
		  messageDisplay = messageDisplay.replaceAll(':tongue:', `<img alt="tongue" src="/img/menu/3.0/chat/tongue.png" class="message-emote" />`);
		  messageDisplay = messageDisplay.replaceAll(':cry:', `<img alt="cry" src="/img/menu/3.0/chat/cry.png" class="message-emote" />`);
		  let message = messageDisplay;

			$(`.message-con-${userId}`).append(
				$(`<div class="message-data-con">`)
					.append($(`<div class="message-username message-text ${userTextType}"></div>`).text(`${senderName}:`))
					.append($(`<div class="message-data message-text"></div>`).html(message))
				.append($('</div>'))
			);

			$(`.message-${userId}`).focus();
			$(`.message-con-${userId}`).scrollTop(1500);
		},
		setChatNotif() {
			if (!$('#menu-chat').hasClass('menu-toggled') && window.junket == 1) {
      	$('.menu-list-inner.-chat').addClass('chatactive');
				setTimeout(() => {
					this.removeNotif();
				}, 6000);

				$('.list-chat-ico').removeClass('-inactive');
				$('.list-chat-ico').addClass('-active');

				let notifCount = $('.chat-notif-count').attr('value');

				if (parseInt(notifCount) + 1 > 9) {
					notifCount = '9+';
					$('.chat-notif-count').css({'padding-left': '5px'});
				} else {
					notifCount = parseInt(notifCount) + 1;
					$('.chat-notif-count').css({'padding-left': '0'});
				}

				$('.chat-notif-count').attr('value', notifCount);
				$('.chat-notif-count').html(notifCount);
			}

			if (window.junket == 1) {
				if (this.alertInstance) this.alertInstance.stop();
      	this.alertInstance = createjs.Sound.play(`alert`, {loop:4});
			}
		},
		dragElement(elmnt) {
      let divEl = document.getElementById(element);
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      divEl.onmousedown = dragMouseDown;

		  // if (document.getElementById(elmnt.id + "header")) {
		  //   /* if present, the header is where you move the DIV from:*/
		  //   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
		  // } else {
		  //   /* otherwise, move the DIV from anywhere inside the DIV:*/
		  //   elmnt.onmousedown = dragMouseDown;
		  // }

		  function dragMouseDown(e) {
		    e = e || window.event;
		    e.preventDefault();
		    // get the mouse cursor position at startup:
		    pos3 = e.clientX;
		    pos4 = e.clientY;
		    document.onmouseup = closeDragElement;
		    // call a function whenever the cursor moves:
		    document.onmousemove = elementDrag;
		  }

		  function elementDrag(e) {
		    e = e || window.event;
		    e.preventDefault();
		    // calculate the new cursor position:
		    pos1 = pos3 - e.clientX;
		    pos2 = pos4 - e.clientY;
		    pos3 = e.clientX;
		    pos4 = e.clientY;
		    // set the element's new position:

		    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		    elmnt.style.left = ((elmnt.offsetLeft - pos1) - 60) + "px";
		  }

		  function closeDragElement() {
		    /* stop moving when mouse button is released:*/
		    document.onmouseup = null;
		    document.onmousemove = null;
		  }
		},
		setEmote(code) {
			return `${code.split(':')[1]}`;
		},
		setCountdown(data) {
    	let expiry;

    	for(var key in data) {
        let token = key.split('|')[4];
        token = token.split(':')[0];

        if (window.vendorData.token == token) {
        	expiry = setCurrentTimezone(data[key].expireDateUTC);
        }
      } // end for in

      if (!expiry) return;
      expiry = new Date(expiry).getTime();

      let countdown = setInterval(function() {
	      // Get todays date and time
	      var now = new Date().getTime();
	      // Find the distance between now an the count down date
	      var distance = expiry - now;
	      // Time calculations for days, hours, minutes and seconds
	      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

	      if (parseInt(hours) < 0 && parseInt(minutes) < 0) {
	      	hours = '00';
	      	minutes = '00';
	      } else {
		      hours = hours+(days*24) < 10 ? `0${hours+(days*24)}` : hours+(days*24);
		      minutes = minutes < 10 ? `0${minutes}` : minutes;
	      }

	      $('#junketRoomExpiry').html(`${hours}:${minutes}`)
	    }, 1000);
		},
		removeRoom(data) {
			let token = data.split('|')[4];
      token = token.split(':')[0];

      if (token == window.vendorData.token) {
				$('.junket-confirm').show();
				$('.mdl_message').html(window.language2.com_sub_ingameprompts_disbandroom);
				$('.mdl_lobby').html(`<span>${window.language2.com_sub_rooms_confirm}</span>`);
        $('.mdl_bg.-closeroom').show();
        $('.mdl_alert_txt').css({'margin-bottom': '17px'});
				$('.mdl_btn').hide();
				$('.mdl_lobby').show();

				$('.mdl_lobby').click(function() {
          window.location = `${window.dt_domain}${window.tableNum}`;
				});

				setTimeout(() => {
          window.location = `${window.dt_domain}${window.tableNum}`;
				}, 10000)
      } // end if
		},
		removeNotif(id = false) {
			if (id) {
				$(`.notif-${id}`).removeClass('chatactive');
			} else {
				$('.menu-list-inner.-chat').removeClass('chatactive');
			}
			if (this.alertInstance) this.alertInstance.stop();
		}
	}) // end blu component
} // end export
