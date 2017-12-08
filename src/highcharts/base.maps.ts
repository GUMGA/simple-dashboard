import './base.style.scss';
import { Configuration }  from '../common/configuration';
import { CommonProvider} from '../common/providers';

declare let window;

export abstract class BaseHighChartMaps {

  private configuration : Configuration;
  private element: HTMLElement;


  constructor(element: HTMLElement, configuration: any) {
    this.element = element;
    this.configuration  = Object.assign({}, new Configuration(), configuration);
    this.render();
  }

  protected abstract onInit():void;
  protected abstract getHighChartConfiguration(configuration: Configuration) : any;
  
  public render() :void {
    this.onInit();
    window.Highcharts.mapChart(this.element, this.getHighChartConfiguration(this.configuration));
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
