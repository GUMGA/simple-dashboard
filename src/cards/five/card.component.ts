import './card.style.scss';
import { BaseCard } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration }  from '../../common/configuration';
import { CommonProvider} from '../../common/providers';

export class CardFive extends BaseCard {

  card: any;

  protected onInit(): void {
    this.card = {};
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
    this.card = Object.assign({}, configuration.field);
    if(configuration.field && configuration.field.name && recordset.rows && recordset.rows[0]){
      let index = this.getPosition(configuration.field.name);
      this.card.value = CommonProvider.formatValue(recordset.rows[0][index], configuration.field.format, configuration.field.formatPrecision);
    }
    if(configuration.field && configuration.field.icon && configuration.field.icon.value){
      this.card.icon = configuration.field.icon.value;
    }
    if(configuration.field && configuration.field.color && configuration.field.color.value){
      this.card.color = configuration.field.color.value;
    }
    if(configuration.field && configuration.field.fontColor && configuration.field.fontColor.value){
      this.card.fontColor = configuration.field.fontColor.value;
    }
    if(configuration.field && configuration.field.iconColor && configuration.field.iconColor.value){
      this.card.iconColor = configuration.field.iconColor.value;
    }
  }

  protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
    const template = `
      <div class="board-card" style="background-color: ${this.card.color}">
        <div class="board-five">
          <div class="board-five-header">
            <span style="color: ${this.card.fontColor}">${this.card.title || ''}</span>
          </div>
          <div class="board-five-body">
            <i style="color: ${this.card.iconColor}" class="${this.card.icon || ''}"></i>
          </div>
          <div class="board-five-footer">
             <span class="board-five-footer-value" style="color: ${this.card.fontColor}">${this.card.value || ''}</span>
             <span style="color: ${this.card.fontColor}">${this.card.label || ''}</span>
          </div>
        </div>
      </div>
    `;
    element.innerHTML = template;
  }

}
