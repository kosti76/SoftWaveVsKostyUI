import { Component, OnDestroy, OnInit } from '@angular/core';
import { BroadcastService } from "@azure/msal-angular";
import { MsalService } from "@azure/msal-angular";

import { Subscription } from "rxjs/Subscription";
import { environment } from "../environments/environment"
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { DataService } from './common/data.service';
import {MatSidenavModule} from '@angular/material/sidenav';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Msal Angular Demo';
  loggedIn: boolean;
  public userInfo: any = null;
  private subscription: Subscription;


  year: number;
  years: yearDetails[];
  selectedYear: number;
  form: FormGroup;
  selectedYearDetails: yearDetails;


  constructor(private broadcastService: BroadcastService, private authService: MsalService, private fb: FormBuilder, private datasrv: DataService) {
    //  This is to avoid reload during acquireTokenSilent() because of hidden iframe
    this.form = this.fb.group({
      cboYears: []
    });
    if (this.authService.getUser()) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }

    
    console.log('constructor');
  }
  color(percent: number) {
    let res: string;
    switch (true) {
      case (percent > 80): {
        res = "accent";
        break;
      }
      case (percent > 20): {
        res = "warn";
        break;
      }
      default: {
        res = "primary";
        break;
      }
    }
    console.log("color:" + res);
    return res;
  }
  yearChanged(event: MatSelectChange) {
    console.log('yearChanged', event.value);
    this.selectedYearDetails = this.years.find(x => x.year === this.selectedYear);

    //console.log(this.selectedYearDetails.categories[1].title);
    // this.form.controls['circle1'].value=this.selectedYearDetails.circle1;
    // this.form.controls['circle2'].value=this.selectedYearDetails.circle2;

  }
  login() {
    this.authService.loginPopup([environment.adalConfig.graphscope, environment.adalConfig.scope]);    
  }

  logout() {
    this.authService.logout();
  }


  ngOnInit() {

    this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      console.log("login failure");
      this.loggedIn = false;

    });

    this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      console.log("login success");
      this.loggedIn = true;
    });
    if(!this.loggedIn)
    {
      this.login();
    }
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
        // this.form.setValue({
        //   cboYears: 2017, 
        //   });
        //this.form.get('cboYears').setValue(this.years[0].year, {onlySelf: true});
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
