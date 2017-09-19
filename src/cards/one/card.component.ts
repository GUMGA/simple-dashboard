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
    if(configuration.field && configuration.field.name){
      let index = this.getPosition(configuration.field.name);
      this.card.value = recordset.rows[0][index];
    }
  }

  protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
    const template = `
      <div class="board-card">
        <div class="card-one">
          <div class="card-one-icon">
            <span>${this.card.icon || ''}</span>
          </div>
          <div class="card-one-detail">
            <div class="card-one-detail-header">
              <span>${this.card.title || ''}</span>
            </div>
            <div class="card-one-detail-body">
              <span>${this.card.value || ''}</span>
            </div>
            <div class="card-one-detail-footer">
              <span>${this.card.label || ''}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    element.innerHTML = template;
  }

}
