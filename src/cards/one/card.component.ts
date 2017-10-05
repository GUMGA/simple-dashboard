import './card.style.scss';
import { BaseCard } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration }  from '../../common/configuration';
import { CommonProvider} from '../../common/providers';

export class CardOne extends BaseCard {

  card: any;

  protected onInit(): void {
    this.card = {};
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
    this.card = Object.assign({}, configuration.field);
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
    if(configuration.field && configuration.field.name){
      let index = this.getPosition(configuration.field.name);
      if(recordset.rows && recordset.rows[0]){
        let cardValue = recordset.rows[0][index];
        this.card.value = CommonProvider.formatValue(cardValue, configuration.field.format, configuration.field.formatPrecision);
        configuration.conditionalsFormatting.forEach(condition => {
          if (CommonProvider.isConditionalFormatting(condition.condition, cardValue, condition.value)) {
              if (condition.icon && condition.icon.value) {
                  this.card.icon = condition.icon.value;
              }
              if (condition.color && condition.color.value) {
                  this.card.color = condition.color.value;
              }
          }
        })
      }      
    }
  }

  protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
    const template = `
      <div class="board-card">
        <div class="card-one">
          <div class="card-one-icon" style="background-color: ${this.card.color}">
            <i style="color: ${this.card.iconColor}" class="${this.card.icon || ''}"></i>
          </div>
          <div class="card-one-detail">
            <div class="card-one-detail-header">
              <span style="color: ${this.card.fontColor}">${this.card.title || ''}</span>
            </div>
            <div class="card-one-detail-body">
              <div style="color: ${this.card.fontColor}">${this.card.value || ''}</div>
            </div>
            <div class="card-one-detail-footer">
              <span style="color: ${this.card.fontColor}">${this.card.label || ''}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    element.innerHTML = template;
  }

}
