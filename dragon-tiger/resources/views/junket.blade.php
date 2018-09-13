{{-- Chat container --}}
@if(isset($_GET['token']))
	<div class="junket-chat-con dom-resizable"></div>
@endif

{{-- Junket modal --}}
<div class="junket-confirm">
	<div class="mdl_overlay"></div>
	<div class="mdl_bg -closeroom dom-resizable"> {{-- close room --}}
		<div class="mdl_warning_ico"></div>
		<div class="mdl_alert_txt">{!! trans('ingame-web.com_sub_ingameprompts_alert') !!}</div>
		<div class="mdl_message">{!! trans('ingame-web.com_sub_rooms_closetheroom') !!}</div>
		<div id="junketNo" class="mdl_btn -no">
			<span>{!! trans('ingame-web.com_sub_rooms_no') !!}</span>
		</div>
		<div id="junketYes" class="mdl_btn -yes">
			<span>{!! trans('ingame-web.com_sub_rooms_yes') !!}</span>
		</div>
		<div class="mdl_lobby">
			<span>{!! trans('ingame-web.com_sub_rooms_backtolobby') !!}</span>
		</div>
	</div>

	<div class="mdl_bg -password dom-resizable"> {{-- change password --}}
		<div class="password-con">
			<div class="mdl_message -password">{!! trans('ingame-web.com_sub_rooms_inputoldpassword') !!}</div>
			<input id="inputOldPass" class="mdl_input" type="text" maxlength="4" />
			<div class="mdl_message-error -inc_pass">{!! trans('ingame-web.nihtanjunket_lobby_passwordnotmatch') !!}</div>
			<div class="mdl_message -password">{!! trans('ingame-web.com_sub_rooms_inputnewpassword') !!}</div>
			<input id="inputNewPass" class="mdl_input" type="text" maxlength="4" />
			<div class="mdl_message -password">{!! trans('ingame-web.com_sub_rooms_inputconfirmpassword') !!}</div>
			<input id="inputConfirmPass" class="mdl_input" type="text" maxlength="4" />
			<div class="mdl_message-error -inc_match">{!! trans('ingame-web.nihtanjunket_lobby_passwordnotmatch') !!}</div>
		</div>
		<div class="password-btn-con">
			<div id="changePassNo" class="mdl_btn -no">
				<span>{!! trans('ingame-web.com_sub_rooms_cancel') !!}</span>
			</div>
			<div id="changePassYes" class="mdl_btn -yes">
				<span>{!! trans('ingame-web.com_sub_rooms_changepassword') !!}</span>
			</div>
		</div>
	</div>

	<div class="mdl_bg -success dom-resizable"> {{-- success modal --}}
		<div class="mdl_warning_ico"></div>
		<div class="mdl_alert_txt">{!! trans('ingame-web.com_sub_rooms_success') !!}</div>
		<div id="successConfirm" class="mdl_btn -confirm">
			<span>{!! trans('ingame-web.com_sub_rooms_confirm') !!}</span>
		</div>
	</div>
</div>
