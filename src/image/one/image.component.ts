import './image.style.scss';
import {BaseImage} from '../base'
import {Configuration}  from '../../common/configuration';
import {RecordSet} from '../../common/interfaces';
import {CommonProvider} from '../../common/providers';
import {Http} from '../../common/providers';

declare let window;

export class ImageOne extends BaseImage {

    protected onInit(): void {

    }

    protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
        const template = `
            <div class="image-container">
                <img src="${configuration.url}"/>
            </div>
        `;
        element.innerHTML = template;
    }

}