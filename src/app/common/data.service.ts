import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient,private settingService:SettingsService) { }
  getYearsData()
  {   
    console.log('getYearsData');
    return this.http.get(this.settingService.ApiUrl);   
  }
  getLocalYearsData()
  {
    return this.settingService.getYearsData;
   ;
  }
}
