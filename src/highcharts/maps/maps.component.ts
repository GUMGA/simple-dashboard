import { BaseHighChartMaps } from '../base.maps';
export class Maps extends BaseHighChartMaps {
    

  private series: Array<any>;

  protected onInit() {
    this.series     = new Array();
  }

  protected getHighChartConfiguration(configuration: any) {
    return configuration;
  }

}
