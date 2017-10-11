import './feed.style.scss';
import {BaseFeed} from '../base'
import {Configuration}  from '../../common/configuration';
import {RecordSet} from '../../common/interfaces';


export class FeedOne extends BaseFeed {
    private rows: Array<any>;

    protected onInit(): void {
        this.feed = {}
        this.rows = []
    }

    protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
        this.feed = Object.assign({}, configuration);

        recordset.rows.forEach(row => {
            let content = ""
            let img = ""
            if(row.content) {
                let value = new RegExp('<img.*(src="(.*))">').exec(row.content);
                if(value.length === 3) {
                    img = value[2]
                }
            }

            this.rows.push({title: row.title, img: img, content: content})
        });

    }

    protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
        const template = `
            <div class="feed-container">
                <div class="feed-header">
                    <h3>${this.feed.title}</h3>
                </div>
                <div class="feed-body">
                    <div class="item">
                        <div class="photo">
                            <img src="">
                        </div>
                        <div class="content">
                            <div class="title">
                                <div>

                                </div>
                            </div>
                            <div class="description">

                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        `;
        element.innerHTML = template;
    }
}