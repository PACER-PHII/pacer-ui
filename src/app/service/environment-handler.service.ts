import { Injectable} from '@angular/core';
import {Config} from "../domain/config";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentHandlerService {
  config: Config;
  constructor(private configService: ConfigService) {
    this.config = this.configService.config;
  }
  getBaseApiURL(): string {
    let baseApiUrl = this.config.api;
    if (!baseApiUrl.endsWith("/")) {
      baseApiUrl = baseApiUrl.concat("/");
    }
    return baseApiUrl;
  }
}
