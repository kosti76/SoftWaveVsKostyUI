import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../common/data.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { SettingsService } from '../common/settings.service';

import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs/Subscription';
import { mobiscroll, MbscDatetimeOptions } from '@mobiscroll/angular';

mobiscroll.settings = {
  theme: 'ios'
};
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
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  // date: Date;
  //   dateTop: Date;
  //   dateCenter: Date;
  //   dateBubble: Date;
  //   dateInline: Date;

  //   dateSettings: MbscDatetimeOptions = {
  //       display: 'bottom'
  //   };
  //   dateTopSettings: MbscDatetimeOptions = {
  //       display: 'top'
  //   };
  //   dateCenterSettings: MbscDatetimeOptions = {
  //       display: 'center'
  //   };
  //   dateBubbleSettings: MbscDatetimeOptions = {
  //       display: 'bubble'
  //   };
  //   dateInlineSettings: MbscDatetimeOptions = {
  //       display: 'inline'
  //   };
  //   now:Date = new Date();
  //   dateFormatSettings: MbscDatetimeOptions = {
  //     dateWheels: 'mm - MM  yy',
  //     dateFormat: 'mm/yy',
  //     min: this.now,
  //     max: new Date(this.now.getFullYear() + 10, this.now.getMonth()),
  //     minWidth: 100
  // };
  year: number;
  years: yearDetails[];
  selectedYear: number;
  form: FormGroup;
  selectedYearDetails: yearDetails;
  selectYear: string = "Select year";
  private subscription: Subscription;

  constructor(private authService: MsalService, private fb: FormBuilder, private http: HttpClient, private datasrv: DataService, private settingService: SettingsService, private broadcastService: BroadcastService) {
    //this.years = new Array<yearDetails>();

    this.form = this.fb.group({
      cboYears: []
    });
    console.log('constructor');


  }
  color(percent: number) {
    let res: string;
    switch (true) {
      case (percent > 80): {
        res = "accent";
        break;
      }
      case (percent >20): {
        res = "warn";
        break;
      }
      default: {
        res = "primary";
        break;
      }
    }
console.log("color:"+res);
    return res;
  }
  yearChanged(event: MatSelectChange) {
    console.log('yearChanged', event.value);
    this.selectedYearDetails = this.years.find(x => x.year === this.selectedYear);
    this.selectYear = this.selectedYear.toString();
    //console.log(this.selectedYearDetails.categories[1].title);
    // this.form.controls['circle1'].value=this.selectedYearDetails.circle1;
    // this.form.controls['circle2'].value=this.selectedYearDetails.circle2;

  }
  ngOnInit() {
    console.log('ngOnInit');
    this.datasrv.getYearsData()
      .map((response) => response)
      .subscribe((result: any[]) => {
        this.years = new Array<yearDetails>();
        console.log('ngOnInit:DataComponent 11' + result);
        for (let item of result) {
          //debugger;
          let _year = new yearDetails();
          _year.year = item.year;
          _year.circle1 = item.circle1;
          _year.circle2 = item.circle2;
          _year.categories = item.categories;
          this.years.push(_year);
        }
      }, (error) => {
        console.error(" Http getYearsData failed" + JSON.stringify(error));
      });

    this.subscription = this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      console.log("acquire token success " + JSON.stringify(payload));
    });

    //will work for acquireTokenSilent and acquireTokenPopup
    this.subscription = this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
      console.log("acquire token failure " + JSON.stringify(payload))
      if (payload.errorDesc.indexOf("consent_required") !== -1 || payload.errorDesc.indexOf("interaction_required") != -1) {

      }
    });
  }
  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
