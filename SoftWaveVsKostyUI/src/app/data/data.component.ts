import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../_services/data.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { MatSelectChange } from '@angular/material';
import { SettingsService } from '../_services/settings.service';
// import {HttpServiceHelper} from "../_helpers/HttpServiceHelper_NOTUNUSE";
import { BroadcastService, MsalService } from '@azure/msal-angular';
//import { Subscription } from 'rxjs/Subscription';

export class category {
  title: string;
  value: number;
  maxvalue: number;
  percent: number;
}
export class yearDetails {
  year: number;
  circle1: number;
  circle2: number;
  categories: category[];
}

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  year: number;
  years: yearDetails[];
  selectedYear: number;
  form: FormGroup;
  selectedYearDetails: yearDetails;
  //private subscription: Subscription;
  
  constructor(private authService: MsalService,private fb: FormBuilder,private http: HttpClient, private datasrv: DataService, private settingService: SettingsService) {
    this.years = new Array<yearDetails>();
    
    this.form = this.fb.group({
      cboYears:  []
     
    });
    this.datasrv.getYearsData()
    .map((response) => response)
    .subscribe((result:any[]) => {      
      console.log('ngOnInit:DataComponent 11');
      for (let item of result) {
        //debugger;
        let _year = new yearDetails();
        _year.year =item.year;
        _year.circle1= item.circle1;
        _year.circle2= item.circle2;   
        _year.categories =item.categories; 
        this.years.push(_year);
      }
     // this.selectedYearDetails = this.years.find(x => x.year ===this.years[0].year );
      
     
      //this.form.get('cboYears').setValue(this.years[0].year);
      
    },
    (err) => console.log(err));


  }
  yearChanged(event: MatSelectChange) {
    console.log('yearChanged', event.value);
    this.selectedYearDetails = this.years.find(x => x.year === this.selectedYear);
    //console.log(this.selectedYearDetails.categories[1].title);
    // this.form.controls['circle1'].value=this.selectedYearDetails.circle1;
    // this.form.controls['circle2'].value=this.selectedYearDetails.circle2;
   
  }
  ngOnInit() {    
    // this.subscription = this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
    //   console.log("acquire token success " + JSON.stringify(payload));
    // });

    // //will work for acquireTokenSilent and acquireTokenPopup
    // this.subscription = this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
    //   console.log("acquire token failure " + JSON.stringify(payload))
    //   if (payload.indexOf("consent_required") !== -1 || payload.indexOf("interaction_required") != -1) {
    //     this.authService.acquireTokenPopup(["user.read", "mail.send"]).then((token) => {
    //       //this.getUSerProfile();
    //     }, (error) => {
    //     });
    //   }
    // });
  }
}
