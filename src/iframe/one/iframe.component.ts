import './iframe.style.scss';
import {BaseIframe} from '../base'
import {Configuration}  from '../../common/configuration';
import {RecordSet} from '../../common/interfaces';
import {CommonProvider} from '../../common/providers';
import {Http} from '../../common/providers';

declare let window;

export class IframeOne extends BaseIframe {

    private rows: Array<any>;
    private columns: Array<any>;

    protected onInit(): void {
        this.rows = [];
        this.columns = [];
    }

    protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
    }

    protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
        const template = `
            <div class="iframe-container">
                <div class="iframe-header">
                    <h3>${configuration.title || ''}</h3>
                </div>
                <div class="iframe-body">
                    ${configuration.code}
                </div>
            </div>
        `;
        element.innerHTML = template;
    }

}