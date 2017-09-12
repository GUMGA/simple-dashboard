import { Configuration } from './configuration';
import { RecordSet } from '../common/interfaces';

declare let window;

export abstract class BaseHighChart {

  private configuration : Configuration;
  private recordset : RecordSet;
  private element: HTMLElement;


  constructor(element: HTMLElement, recordset: RecordSet, configuration: Configuration) {
    this.element = element;
    this.recordset = recordset;
    this.configuration  = Object.assign({}, new Configuration(), configuration);
    this.render();
  }

  protected abstract onInit():void;
  protected abstract processRecordSet(recordset: RecordSet, configuration: Configuration):void;
  protected abstract getHighChartConfiguration(configuration: Configuration) : any;

  public render() :void {
    this.onInit();
    this.processRecordSet(this.recordset, this.configuration);
    window.Highcharts.chart(this.element, this.getHighChartConfiguration(this.configuration));
  };

  protected getPosition(column: string): number {
    return this.recordset.columns.indexOf(column);
  }

  protected getFontSize(){
    switch (this.configuration.boardFontSize) {
      case 'SMALL':
        return 11;
      case 'MEDIUM':
        return 18;
      case 'LARGE':
        return 25;
      default:
        return 11;
    }
  }

}
