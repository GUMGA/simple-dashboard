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

    this.applyFieldOne(configuration, recordset);
    this.applyFieldTwo(configuration, recordset);
    this.applyFieldThree(configuration, recordset);

  }

  protected applyFieldOne(configuration, recordset){
    if(configuration.fieldOne && configuration.fieldOne.name && recordset.rows && recordset.rows[0]){
      let valueOne = recordset.rows[0][this.getPosition(configuration.fieldOne.name)];
      this.card.fieldOne = Object.assign(configuration.fieldOne ,
        { value: CommonProvider.formatValue(valueOne, configuration.fieldOne.format, configuration.fieldOne.formatPrecision)}
      );
      this.getConditionalsFormatting(configuration, configuration.fieldOne.name).forEach(data => {
        this.applyConditionalsFormatting(data.condition, valueOne, data.value, data);
      });
    }else{
      this.card.fieldOne = Object.assign({}, configuration.fieldOne);
    }
  }

  protected applyFieldTwo(configuration, recordset){
    if(configuration.fieldTwo && configuration.fieldTwo.name && recordset.rows && recordset.rows[0]){
      let valueTwo = recordset.rows[0][this.getPosition(configuration.fieldTwo.name)];
      this.card.fieldTwo = Object.assign(configuration.fieldTwo ,
        { value: CommonProvider.formatValue(valueTwo, configuration.fieldTwo.format, configuration.fieldTwo.formatPrecision)}
      );
      this.getConditionalsFormatting(configuration, configuration.fieldTwo.name).forEach(data => {
        this.applyConditionalsFormatting(data.condition, valueTwo, data.value, data);
      });
    }else{
      this.card.fieldTwo = Object.assign({}, configuration.fieldTwo);
    }
  }

  protected applyFieldThree(configuration, recordset){
    if(configuration.fieldThree && configuration.fieldThree.name && recordset.rows && recordset.rows[0]){
      let valueThree = recordset.rows[0][this.getPosition(configuration.fieldThree.name)];
      this.card.fieldThree = Object.assign(configuration.fieldThree ,
        { value: CommonProvider.formatValue(valueThree, configuration.fieldThree.format, configuration.fieldThree.formatPrecision)}
      );
      this.getConditionalsFormatting(configuration, configuration.fieldThree.name).forEach(data => {
        this.applyConditionalsFormatting(data.condition, valueThree, data.value, data);
      });
    }else{
      this.card.fieldThree = Object.assign({}, configuration.fieldThree);
    }
  }

  protected getConditionalsFormatting(configuration: Configuration, field: string){
    if(configuration.conditionalsFormatting) {
      return configuration.conditionalsFormatting.filter(data => data.field == field);
    }
    return [];
  }

  protected applyConditionalsFormatting(condition, value, conditionValue, data){
    if(CommonProvider.isConditionalFormatting(condition, value, conditionValue)) {
        if(data.icon && data.icon.value) {
            this.card.icon = data.icon.value;
        }
        if(data.color && data.color.value) {
            this.card.color = data.color.value;
        }
    }
  }

  protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
    const template = `
      <div class="board-card" style="background-color: ${this.card.color}; border-color: ${this.card.color};">
        <div class="card-three">
          <div class="content">
            <div class="card-three-right">
              <div class="card-three-right-header">
                <span style="color: ${this.card.fontColor}">${this.card.fieldOne.label || ''}</span>
                <span class="value" style="color: ${this.card.fontColor}">${this.card.fieldOne.value || ''}</span>
              </div>
              <div class="card-three-right-footer">
                <span style="color: ${this.card.fontColor}">${this.card.fieldTwo.label || ''}</span>
                <span class="value" style="color: ${this.card.fontColor}">${this.card.fieldTwo.value || ''}</span>
              </div>
            </div>
            <div class="card-three-left">
              <div class="card-three-left-header">
                <i style="color: ${this.card.iconColor}" class="${this.card.icon || ''}"></i>
              </div>
              <div class="card-three-left-footer">
                  <span style="color: ${this.card.fontColor}">${this.card.fieldThree.label || ''}</span>
                  <span class="value" style="color: ${this.card.fontColor}">${this.card.fieldThree.value || ''}</span>
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
