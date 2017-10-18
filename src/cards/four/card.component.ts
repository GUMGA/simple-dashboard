import './card.style.scss';
import { BaseCard } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration }  from '../../common/configuration';
import { CommonProvider} from '../../common/providers';

export class CardFour extends BaseCard {

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
    if(configuration.field && configuration.field.description){
      this.card.description = configuration.field.description;
    }
  }

  protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
    const template = `
      <div class="board-card">
        <div class="card-four" style="background-color: ${this.card.color}">
          <div class="content">
            <div class="card-four-icon">
              <div class="card-four-icon-center" style="background-color: ${this.card.color}; border-color: ${this.card.color};">
                  <i style="color: ${this.card.iconColor}" class="${this.card.icon || ''}"></i>
              </div>
            </div>
            <div class="card-four-detail">
              <div class="card-four-detail-header">
                <span style="color: ${this.card.fontColor}">${this.card.value || ''}</span>
              </div>
              <div class="card-four-detail-body">
                <span style="color: ${this.card.fontColor}">${this.card.label || ''}</span>
              </div>
              <div class="card-four-detail-footer">
                <textarea disabled style="color: ${this.card.fontColor}">${this.card.description || ''}</textarea>
              </div>
            </div>
          </div>
          ${super.handlingLastUpdate(configuration)}
        </div>
      </div>
    `;
    element.innerHTML = template;
  }

}
