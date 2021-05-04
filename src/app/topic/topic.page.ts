import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit {

  public topic: string;
  generalData: any;
  error: any;

  constructor(private generalService: GeneralService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.topic = this.activatedRoute.snapshot.paramMap.get('id');
    /**
     * Load general setting
     */
    console.log(this.topic)
    // this.generalService.getGeneralData().subscribe(async (response) => {
    //   if (response['status'] == 0) {
    //     this.toastr.error('There are no general data available', 'No general Found', {
    //       disableTimeOut: true
    //     });
    //   }
    //   this.generalData = response['data'];
    // }, error => {
    //   this.error = error;
    // });
  }


}
