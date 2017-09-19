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
    if(configuration.fieldOne && configuration.fieldOne.name){
      let index = this.getPosition(configuration.field.name);
      this.card.value = CommonProvider.formatValue(recordset.rows[0][index], configuration.field.format, configuration.field.formatPrecision);
    }
  }

  protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
    const template = `
      <div class="board-card">
        <div class="card-four">
          <div class="card-four-right">
            <div class="card-four-right-header">
              <span>rotulo</span>
              <span>valor</span>
            </div>
            <div class="card-four-right-footer">
              <span>rotulo</span>
              <span>valor</span>
            </div>
          </div>
          <div class="card-four-left">
            <div class="card-four-left-header">
              <span>icon</span>
            </div>
            <div class="card-four-left-footer">
              <span>rotulo</span>
              <span>valor</span>
            </div>
          </div>
        </div>
      </div>
    `;
    element.innerHTML = template;
  }

}
