"use strict";
const commonConfig = {
		width: "100%",
		height: "100%",
		playback: {
				autoPlay: false,
		},
		analytics: [
				{
								type: "server",
								options: {
										cuid: "visualon", // customer specified user ID for Analytics Agent
								},
				},
		],
		logs: {
				logToConsole: true,
		},
		advanced: {
				segmentDownloadRetryCount: 3,
				segmentDownloadRetryDelay: 1000,
				minBufferToAppendData: 3,
				startupBitrate: 1000,
				limitBitrateToPlayerSize: false,
				bitrateThreshold: {
						upper: 1000,
						lower: 100
				}
		}
};
const sourceConfig = {
		links: [
				{
						uri: "https://d1w9xdakxie2rx.cloudfront.net/html5/hls/playlist.m3u8",
						type: "hls",
				},
		],
};


// 인스턴스 생성
function vopMake(container, play, timeupdated, complete){
	if($(container).find('.instance').length == 0){
		$(container).append($('<div>').addClass('instance'));
		var playerContainer = $(container).find('.instance')[0];
		var player = new voPlayer.Player(playerContainer);
		player.init(commonConfig);
		var playerUI = new voPlayer.UIEngine(player);
		playerUI.buildUI();
		player.open(sourceConfig);
		player.mute();
		player.addEventListener('VO_OSMP_SRC_CB_OPEN_FINISHED', function(){ // 준비 완료시 재생
			player.play();
			play();
		})
		player.addEventListener('VO_OSMP_CB_PLAY_TIME_UPDATED', function(){ // 시간 업데이트시 timeupdated
			timeupdated();
		})
		player.addEventListener('VO_OSMP_CB_PLAY_COMPLETE', function(){ // 재생완료시 complete
			complete();
		})
		$(container).find('.instance').data('vop', player);
		console.log('vopMake');
	}
}

// 인스턴스 파괴 array
function vopDestroy(dom){ 
	$(dom).each(function(){
		$(this).find('.instance').remove();
	})
	console.log('vopDestroy');
}

/* #W_L_1_1 : visualon init */
/*
$('#W_L_1_1 .has-vop-obj').each(function(){
	if($(this).closest('.swiper-slide').find('.screen-blocked-wrap').length == 0){
		playerContainer = $(this)[0];
		player = new voPlayer.Player(playerContainer);
		player.init(commonConfig);
		var playerUI = new voPlayer.UIEngine(player);
		playerUI.buildUI();
		player.open(sourceConfig);
		$(playerContainer).data('obj', player);
	}
})
*/
/* #W_L_1_1 : 타임라인 제어 */
/*
$('#W_L_1_1 .has-vop-obj').each(function(){
	if($(this).closest('.swiper-slide').find('.screen-blocked-wrap').length == 0){
		var obj = $(this).data('obj');
		var timeline = $(this).closest('.swiper-slide').find('.timeline .bar');
		obj.addEventListener('VO_OSMP_CB_PLAY_TIME_UPDATED', function(){
			timeline.css('width', ((obj.getPosition() / obj.getDuration()) * 100) + '%');
		})
	}
})
*/
/* #W_T_1_1 : visualon init */
/*
$('#W_T_1_1 .has-vop-obj').each(function(){
		playerContainer = $(this)[0];
		player = new voPlayer.Player(playerContainer);
		player.init(commonConfig);
		var playerUI = new voPlayer.UIEngine(player);
		playerUI.buildUI();
		player.open(sourceConfig);
		$(playerContainer).data('obj', player);
})
*/

/* #W_P_1_1 : visualon init */
/*
$('#W_P_1_1 .has-vop-obj').each(function(){
	playerContainer = $(this)[0];
	player = new voPlayer.Player(playerContainer);
	player.init(commonConfig);
	var playerUI = new voPlayer.UIEngine(player);
	playerUI.buildUI();
	player.open(sourceConfig);
	$(playerContainer).data('obj', player);
})
*/

/* .sz-special-wrap : visualon init */
/*
$('.sz-special-wrap .has-vop-obj').each(function(){
	playerContainer = $(this)[0];
	player = new voPlayer.Player(playerContainer);
	player.init(commonConfig);
	var playerUI = new voPlayer.UIEngine(player);
	playerUI.buildUI();
	player.open(sourceConfig);
	$(playerContainer).data('obj', player);
})
*/

/* .sz-special-wrap : 타임라인 제어 */
/*
$('.sz-special-wrap .has-vop-obj').each(function(){
		var obj = $(this).data('obj');
		var timeline = $(this).closest('.video').find('.time-line span');
		obj.addEventListener('VO_OSMP_CB_PLAY_TIME_UPDATED', function(){
			timeline.css('width', ((obj.getPosition() / obj.getDuration()) * 100) + '%');
		})
})
*/

/*
player.setVolume(0);
player.mute(); // 음소거
player.unmute(); // 음소거 해제
player.stop(); // 멈춤 : 디스트로이 전에 사용할것
player.pause(); // 일시정지
player.play(); // 재생
player.setPosition(0); // 현재 영상 재생위치 수정
player.getPosition(); // 현재 재생된 위치
player.getDuration(); // 총길이
*/
