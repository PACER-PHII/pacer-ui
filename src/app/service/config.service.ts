import { Injectable } from '@angular/core';
import {Config} from "../domain/config";
import { HttpBackend, HttpClient } from "@angular/common/http";
import {catchError, map, of} from "rxjs";
import packageInfo from "../../../package.json";
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  defaultConfigPath = '../../assets/config/config.json'
  config: Config = new Config();

  private http: HttpClient
  packageInfo = packageInfo;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  loadConfig() {
    let configPath = this.defaultConfigPath;
    return this.http.get<Config>(configPath).pipe(
      map(config => {
        config.version = "v" + this.packageInfo.version;
        this.config = config;
        return true;
      }),
      catchError(error => {
        console.error(error);
        this.config = new Config();
        return of(false);
      })
    )
  }
}
