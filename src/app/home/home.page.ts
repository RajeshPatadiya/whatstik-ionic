import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { MenuController } from '@ionic/angular';
// import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';

// import { Plugins } from '@capacitor/core';
// import * as PluginsLibrary from 'capacitor-video-player';
// const { CapacitorVideoPlayer, Device } = Plugins;

import { Plugins } from '@capacitor/core';
import * as WebVPPlugin from 'capacitor-video-player';
const { CapacitorVideoPlayer, Device } = Plugins;

import { VgApiService } from '@videogular/ngx-videogular/core';
import { visitAll } from '@angular/compiler';
declare var $: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	videoOptions: any;
	videoUrl: string;

	videos: any;
	videoPlayer: any;
	private _videoPlayer: any;
	private _url: string;
	private _handlerPlay: any;
	private _handlerPause: any;
	private _handlerEnded: any;
	private _handlerReady: any;
	private _handlerPlaying: any;
	private _handlerExit: any;
	private _first: boolean = false;
	private _apiTimer1: any;
	private _apiTimer2: any;
	private _apiTimer3: any;
	private _testApi: boolean = true;

	preload: string = 'auto';
	api: VgApiService;
	constructor(private menu: MenuController, private renderer: Renderer2) {
		this.videos = [
			{
				post_id: 1,
				url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
				subtitle: "By Blender Foundation",
				thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
				title: "Big Buck Bunny"
			},
			{
				post_id: 2,
				url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
				subtitle: "By Blender Foundation",
				thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
				title: "Elephant Dream"
			},
			{
				post_id: 3,
				url: "https://cdn.sharechat.com/171ca99f_1597724210354_c_v__5ff42c3b-5c41-4dc2-a011-ef5a847aa5ab.mp4",
				subtitle: "By Blender Foundation",
				thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
				title: "Elephant Dream"
			}
		];
	}

	async ngOnInit() {
		// define the plugin to use
		const info = await Device.getInfo();
		if (info.platform === "ios" || info.platform === "android") {
			this._videoPlayer = CapacitorVideoPlayer;
		} else {
			this._videoPlayer = WebVPPlugin.CapacitorVideoPlayer
		}
		// define the video url
		this._url = "https://whatstik.s3.amazonaws.com/upload/video/1598254471_1486282717.mp4"
		// add listeners to the plugin
		this._addListenersToPlayerPlugin();
	}

	public onIntersection({ target, visible }: { target: HTMLVideoElement; visible: boolean }, vdi: any): void {
		// console.log("this.renderer", target, visible, vdi);
		(visible ? target.play() : target.pause());
		// this.renderer.addClass(target, visible ? 'active' : 'inactive');
		// this.renderer.removeClass(target, visible ? 'inactive' : 'active');
	}

	onPlayerReady(api: VgApiService, vdi: number) {
		this.api = api;
		this.api.getDefaultMedia().subscriptions.ended.subscribe(
			() => {
				// Set the video to the beginning
				this.api.getDefaultMedia().currentTime = 0;
				this.api.volume = 0;
				console.log("ready ", this.api.getDefaultMedia());
			}
		);
	}

	// async ionViewDidEnter() {
	// 	const res: any = await this._videoPlayer.initPlayer({ mode: "embedded", url: this._url, playerId: "fullscreen", componentTag: "app-home" });
	// }
	// async playVideo(playUrl: string) {
	//   try {
	//     this.videoOptions = {
	//       volume: 0.7
	//     }
	//     // this.videoUrl = "https://whatstik.s3.amazonaws.com/upload/video/1597899346_1131284985.mp4";
	//     this.videoUrl = playUrl;
	//     this.videoPlayer.play(this.videoUrl, this.videoOptions);
	//   } catch (error) {
	//     console.log(error);

	//   }
	// }

	// async play(url: string) {
	//   document.addEventListener('jeepCapVideoPlayerPlay', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail) }, false);
	//   document.addEventListener('jeepCapVideoPlayerPause', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail) }, false);
	//   document.addEventListener('jeepCapVideoPlayerEnded', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerEnded ', e.detail) }, false);
	//   // const res: any = await this.videoPlayer.initPlayer({ mode: "fullscreen", url: url, playerId: "#videoPlayer" });
	//   const res: any = await this.videoPlayer.initPlayer({ mode: "fullscreen", url: this._url, playerId="fullscreen", componentTag="my-page" });
	//   console.log('result of init ', res)
	// }

	private _addListenersToPlayerPlugin() {
		this._handlerPlay = this._videoPlayer.addListener('jeepCapVideoPlayerPlay', (data: any) => {
			console.log('Event jeepCapVideoPlayerPlay ', data);
		}, false);
		this._handlerPause = this._videoPlayer.addListener('jeepCapVideoPlayerPause', (data: any) => {
			console.log('Event jeepCapVideoPlayerPause ', data);
		}, false);
		this._handlerEnded = this._videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data: any) => {
			console.log('Event jeepCapVideoPlayerEnded ', data);

		}, false);
		this._handlerExit = this._videoPlayer.addListener('jeepCapVideoPlayerExit', async (data: any) => {
			console.log('Event jeepCapVideoPlayerExit ', data)
		}, false);
		this._handlerReady = this._videoPlayer.addListener('jeepCapVideoPlayerReady', async (data: any) => {
			console.log('Event jeepCapVideoPlayerReady ', data)
			console.log("testVideoPlayerPlugin testAPI ", this._testApi);
			console.log("testVideoPlayerPlugin first ", this._first);
			if (this._testApi && this._first) {
				// test the API
				this._first = false;
				console.log("testVideoPlayerPlugin calling isPlaying ");
				const isPlaying = await this._videoPlayer.isPlaying({ playerId: "fullscreen" });
				console.log('const isPlaying ', isPlaying)
				this._apiTimer1 = setTimeout(async () => {
					const pause = await this._videoPlayer.pause({ playerId: "fullscreen" });
					console.log('const pause ', pause)
					const isPlaying = await this._videoPlayer.isPlaying({ playerId: "fullscreen" });
					console.log('const isPlaying after pause ', isPlaying)
					let currentTime = await this._videoPlayer.getCurrentTime({ playerId: "fullscreen" });
					console.log('const currentTime ', currentTime);
					let muted = await this._videoPlayer.getMuted({ playerId: "fullscreen" });
					console.log('initial muted ', muted);
					const setMuted = await this._videoPlayer.setMuted({ playerId: "fullscreen", muted: !muted.value });
					console.log('setMuted ', setMuted);
					muted = await this._videoPlayer.getMuted({ playerId: "fullscreen" });
					console.log('const muted ', muted);
					const duration = await this._videoPlayer.getDuration({ playerId: "fullscreen" });
					console.log("duration ", duration);
					// valid for movies havin a duration > 25
					const seektime = currentTime.value + 0.5 * duration.value < duration.value - 25 ? currentTime.value + 0.5 * duration.value
						: duration.value - 25;
					const setCurrentTime = await this._videoPlayer.setCurrentTime({ playerId: "fullscreen", seektime: (seektime) });
					console.log('const setCurrentTime ', setCurrentTime);
					const play = await this._videoPlayer.play({ playerId: "fullscreen" });
					console.log("play ", play);
					this._apiTimer2 = setTimeout(async () => {
						const setMuted = await this._videoPlayer.setMuted({ playerId: "fullscreen", muted: false });
						console.log('setMuted ', setMuted);
						const setVolume = await this._videoPlayer.setVolume({ playerId: "fullscreen", volume: 0.5 });
						console.log("setVolume ", setVolume);
						const volume = await this._videoPlayer.getVolume({ playerId: "fullscreen" });
						console.log("Volume ", volume);
						this._apiTimer3 = setTimeout(async () => {
							const pause = await this._videoPlayer.pause({ playerId: "fullscreen" });
							console.log('const pause ', pause);
							const duration = await this._videoPlayer.getDuration({ playerId: "fullscreen" });
							console.log("duration ", duration);
							const volume = await this._videoPlayer.setVolume({ playerId: "fullscreen", volume: 1.0 });
							console.log("Volume ", volume);
							const setCurrentTime = await this._videoPlayer.setCurrentTime({ playerId: "fullscreen", seektime: (duration.value - 3) });
							console.log('const setCurrentTime ', setCurrentTime);
							const play = await this._videoPlayer.play({ playerId: "fullscreen" });
							console.log('const play ', play);
						}, 10000);
					}, 10000);

				}, 5000);
			}
		}, false);
		this._handlerPlaying = this._videoPlayer.addListener('jeepCapVideoPlayerPlaying', async (data: any) => {
			console.log('Event jeepCapVideoPlayerPlaying ', data)
		}, false);

	}

}

