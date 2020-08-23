import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';

import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from 'capacitor-video-player';
const { CapacitorVideoPlayer, Device } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  videoOptions: VideoOptions;
  videoUrl: string;

  videos: any;
  videoPlayer: any;
  // constructor(private videoPlayer: VideoPlayer, private menu: MenuController) { }
  constructor(private menu: MenuController) {
    this.videos = [
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        subtitle: "By Blender Foundation",
        thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
        title: "Big Buck Bunny"
      },
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        subtitle: "By Blender Foundation",
        thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
        title: "Elephant Dream"
      }
    ];
  }

  async ngAfterViewInit() {
    // Playing a video.
    // this.videoPlayer.play('https://whatstik.s3.amazonaws.com/upload/video/1597899346_1131284985.mp4').then(() => {
    //   console.log('video completed');
    // }).catch(err => {
    //   console.log(err);
    // });
    const info = await Device.getInfo();
    if (info.platform === "ios" || info.platform === "android") {
      this.videoPlayer = CapacitorVideoPlayer;
    } else {
      this.videoPlayer = PluginsLibrary.CapacitorVideoPlayer
    }

  }

  // async playVideo() {
  //   try {
  //     this.videoOptions = {
  //       volume: 0.7
  //     }
  //     this.videoUrl = "https://whatstik.s3.amazonaws.com/upload/video/1597899346_1131284985.mp4";
  //     this.videoPlayer.play(this.videoUrl, this.videoOptions);
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  async play(url: string) {
    document.addEventListener('jeepCapVideoPlayerPlay', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail) }, false);
    document.addEventListener('jeepCapVideoPlayerPause', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail) }, false);
    document.addEventListener('jeepCapVideoPlayerEnded', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerEnded ', e.detail) }, false);
    const res: any = await this.videoPlayer.initPlayer({ mode: "fullscreen", url: url });
  }

}
