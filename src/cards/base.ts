import { Configuration }  from '../common/configuration';
import { RecordSet } from '../common/interfaces';

export abstract class BaseCard {

  private configuration : Configuration;
  private recordset : RecordSet;
  private element: HTMLElement;


  constructor(element: HTMLElement, recordset: RecordSet, configuration: Configuration) {
    this.element = element;
    this.recordset = recordset;
    if(this.recordset){
      this.recordset.columns = this.recordset.columns || [];
      this.recordset.rows = this.recordset.rows || [];
    }
    this.configuration  = Object.assign({}, new Configuration(), configuration);
    this.render();
  }

  protected abstract onInit():void;
  protected abstract processRecordSet(recordset: RecordSet, configuration: Configuration):void;
  protected abstract generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration):void;

  public render() :void {
    this.onInit();
    this.processRecordSet(this.recordset, this.configuration);
    this.generateTemplate(this.element, this.recordset, this.configuration);
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
