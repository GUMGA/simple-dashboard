import './youtube.style.scss';
import {BaseYoutube} from '../base'
import {Configuration}  from '../../common/configuration';
import {RecordSet} from '../../common/interfaces';
import {CommonProvider} from '../../common/providers';
import {Http} from '../../common/providers';

declare let window;

export class YoutubeOne extends BaseYoutube {

    private rows: Array<any>;
    private columns: Array<any>;
    private VIDEO_ID;
    private KEY_YOUTUBE_API;
    private YOUTUBE_INFO_API;
    private URL_IFRAME;

    protected onInit(): void {
        this.rows = [];
        this.columns = [];
        this.KEY_YOUTUBE_API = 'AIzaSyC7E4dZ4EneRmSzVMs2qhyJYGoTK49FCYM';
        this.YOUTUBE_INFO_API = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&key=' + this.KEY_YOUTUBE_API + '&id=';
    }

    protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
        this.VIDEO_ID = this.getParamsURL(configuration.url)['v'];
        let autoPlay = configuration.startAutomatically ? 1 : 0;
        let URL_IFRAME = 'https://www.youtube.com/embed/' + this.VIDEO_ID;
        this.URL_IFRAME = URL_IFRAME+'?rel=0&amp;autoplay='+autoPlay;
    }

    private getParamsURL(url: string){
        let vars = {}, hash;
        let hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
        const template = `
            <div class="youtube-container">
                <iframe src="${this.URL_IFRAME}" allowfullscreen frameborder="0"></iframe>
            </div>
        `;
        element.innerHTML = template;
    }

}