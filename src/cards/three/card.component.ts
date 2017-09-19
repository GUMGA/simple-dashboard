import './card.style.scss';
import { BaseCard } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration }  from '../../common/configuration';
import { CommonProvider} from '../../common/providers';

export class CardThree extends BaseCard {

  card: any;

  protected onInit(): void {
    this.card = {};
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
    this.card = Object.assign({}, configuration.field);
    if(configuration.color && configuration.color.value){
      this.card.color = configuration.color.value;
    }
    if(configuration && configuration.icon && configuration.icon.value){
      this.card.icon = configuration.icon.value;
    }
    if(configuration && configuration.fontColor && configuration.fontColor.value){
      this.card.fontColor = configuration.fontColor.value;
    }
    if(configuration && configuration.iconColor && configuration.iconColor.value){
      this.card.iconColor = configuration.iconColor.value;
    }
    if(configuration.fieldOne && configuration.fieldOne.name){
      this.card.fieldOne = Object.assign(configuration.fieldOne , { value: recordset.rows[0][this.getPosition(configuration.fieldOne.name)] });
    }
    if(configuration.fieldTwo && configuration.fieldTwo.name){
      this.card.fieldTwo = { value: recordset.rows[0][this.getPosition(configuration.fieldTwo.name)] };
    }
    if(configuration.fieldThree && configuration.fieldThree.name){
      this.card.fieldThree = { value: recordset.rows[0][this.getPosition(configuration.fieldThree.name)] };
    }
  }

  protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
    const template = `
      <div class="board-card" style="background-color: ${this.card.color}">
        <div class="card-four">
          <div class="card-four-right">
            <div class="card-four-right-header">
              <span style="color: ${this.card.fontColor}">${this.card.fieldOne.label || ''}</span>
              <span style="color: ${this.card.fontColor}">${this.card.fieldOne.value || ''}</span>
            </div>
            <div class="card-four-right-footer">
              <span style="color: ${this.card.fontColor}">${this.card.fieldTwo.label || ''}</span>
              <span style="color: ${this.card.fontColor}">${this.card.fieldTwo.value || ''}</span>
            </div>
          </div>
          <div class="card-four-left">
            <div class="card-four-left-header">
              <span>icon</span>
            </div>
            <div class="card-four-left-footer">
                <span style="color: ${this.card.fontColor}">${this.card.fieldThree.label || ''}</span>
                <span style="color: ${this.card.fontColor}">${this.card.fieldThree.value || ''}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    element.innerHTML = template;
  }

}
