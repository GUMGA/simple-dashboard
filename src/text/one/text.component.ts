import './text.style.scss';
import {BaseText} from '../base'
import {Configuration}  from '../../common/configuration';
import {RecordSet} from '../../common/interfaces';
import {CommonProvider} from '../../common/providers';
import {Http} from '../../common/providers';

declare let window;

export class TextOne extends BaseText {

    protected onInit(): void {

    }


    protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
        const template = `
            <div class="text-container">
                ${configuration.text}
            </div>
        `;
        element.innerHTML = template;
    }

}