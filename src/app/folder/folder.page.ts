import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-folder',
	templateUrl: './folder.page.html',
	styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
	public folder: string;
	generalData: any;
	error: any;

	constructor(private generalService: GeneralService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.folder = this.activatedRoute.snapshot.paramMap.get('id');
		/**
		 * Load general setting
		*/
		this.generalService.getGeneralData().subscribe(async (response) => {
			if (response['status'] == 0) {
				this.toastr.error('There are no general data available', 'No general Found', {
					disableTimeOut: true
				});
			}
			this.generalData = response['data'];
		}, error => {
			this.error = error;
		});
	}

}
