import './feed.style.scss';
import {BaseFeed} from '../base'
import {Configuration}  from '../../common/configuration';
import {RecordSet} from '../../common/interfaces';
import {Http} from '../../common/providers';

export class FeedOne extends BaseFeed {
    private rows: Array<any>;

    protected onInit(): void {
        this.feed = {}
        this.rows = []
    }

    protected processRecordSet(recordset: RecordSet, configuration: Configuration) {
        this.feed = Object.assign({}, configuration);

        return new Promise((resp, rej) => {
            Http.get('https://api.rss2json.com/v1/api.json?api_key=ujup0b0pmnaopbegaarakuwkszlawudfqgursdzi&rss_url='
            + encodeURIComponent(this.feed.url))
                .then((respAPI:any) => {
                    this.rows = respAPI.items;
                    resp(this.rows);
                })
        });       

    }

    private getFeedItens(){
        return this.rows.reduce((prev, next) => {
            return prev += `
                <div class="item">
                    <div class="dashboard-feed-item">
                        ${next.content}
                        <span class="clearfix"></span>
                    </div>
                </div>
            `;
        }, '');
    }

    protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
        const template = `
            <div class="feed-container">
                <div class="feed-header">
                    <h3>${this.feed.title || ''}</h3>
                </div>
                <div class="feed-body">
                    ${this.getFeedItens()}
                    <span class="clearfix"></span>
                </div>
                <span class="clearfix"></span>
            </div>  
        `;
        element.innerHTML = template;
    }
}