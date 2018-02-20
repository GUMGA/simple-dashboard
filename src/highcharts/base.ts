import './base.style.scss';
import { Configuration }  from '../common/configuration';
import { RecordSet } from '../common/interfaces';
import { CommonProvider} from '../common/providers';

declare let window;

export abstract class BaseHighChart {

  private configuration : Configuration;
  protected recordset : RecordSet;
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
  protected abstract getHighChartConfiguration(configuration: Configuration) : any;
  
  public render() :void {
    this.onInit();
    this.processRecordSet(this.recordset, this.configuration);
    window.Highcharts.chart(this.element, this.getHighChartConfiguration(this.configuration));
    this.handlingLastUpdate(this.element, this.configuration);
  };
  
  protected handlingLastUpdate(element: HTMLElement, configuration: Configuration){
    if(!configuration.showlastUpdate || !configuration.lastUpdate) return;
    let container = element.getElementsByClassName('highcharts-container');
    if(container && container[0]){
        let template = `
            <div class="board-last-update">
            Atualizado ${CommonProvider.formatValue(configuration.lastUpdate, 'datahora#dd/MM/yyyy HH:mm')}
            </div>
        `;
        let child = document.createElement('div');
        child.className = 'last-update-container';
        child.innerHTML = template;
        container[0].appendChild(child);
    }
  }

  protected getPosition(column: string): number {
    return this.recordset.columns.filter(column => column != null).indexOf(column);
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
