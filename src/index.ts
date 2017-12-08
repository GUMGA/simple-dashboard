declare function require(name: string);
import * as Highcharts from 'highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import * as NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import * as SolidGauge from 'highcharts/modules/solid-gauge';
import * as HighchartsMapsModule from 'highcharts/modules/map';
import * as HighchartsHeatMapsModule from 'highcharts/modules/heatmap';
import {Bar, Line, Pie, GaugeV1, GaugeV2, BarLine, BarLinePie, Maps} from './highcharts';
import {CardOne, CardTwo, CardThree, CardFive, CardFour} from './cards';
import {FeedOne} from './feed'
import {TableOne} from './table'
import {YoutubeOne} from './youtube'
import {IframeOne} from './iframe'
import {TextOne} from './text'
import {ImageOne} from './image'



HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
SolidGauge(Highcharts);
HighchartsMapsModule(Highcharts);
HighchartsHeatMapsModule(Highcharts);

declare let window;
window.Highcharts = window.Highcharts || Highcharts;

window.mf = window.mf || {
    Chart: {
        Bar: Bar,
        Line: Line,
        Pie: Pie,
        GaugeV1: GaugeV1,
        GaugeV2: GaugeV2,
        BarLine: BarLine,
        BarLinePie: BarLinePie,
        Maps: Maps
    },
    Card: {
        CardOne: CardOne,
        CardTwo: CardTwo,
        CardThree: CardThree,
        CardFive: CardFive,
        CardFour: CardFour
    },
    Feed: {
        FeedOne: FeedOne
    },
    Table: {
        TableOne
    },
    Youtube: {
        YoutubeOne: YoutubeOne
    },
    Iframe: {
        IframeOne: IframeOne
    },
    Text: {
        TextOne: TextOne
    },
    Image: {
        ImageOne: ImageOne
    }
}

export namespace SimpleDashboard {

    export function create() {
        return window.mf;
    }

}
