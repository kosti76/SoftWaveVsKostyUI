import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private appConfig: any;
  
  constructor(private http: HttpClient) { }
  async loadAppConfig() {
    
    const data = await this.http.get('assets/configs/settings.json')
      .toPromise();
    this.appConfig = data;
  }
  get OAuthSettings() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.OAuthSettings;
  }
  get ApiUrl() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.ApiUrl;
  }
  get getYearsData() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.data;
  }
}
