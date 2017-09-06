import { BaseHighChart } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration } from '../';

export class Line extends BaseHighChart {

  private categories: Array<string>;
  private series: Array<any>;

  protected onInit() {
    // this.categories = new Array();
    // this.series     = new Array();
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration) {

  }

  protected getHighChartConfiguration(configuration: Configuration) {

  }

  private addCategorie(name:string):void {
  }

  private addSerie(name:string, values:Array<any>, color: string):void {
  }

}
