declare function require(name: string);
import * as Highcharts from 'highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import * as NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import * as SolidGauge from 'highcharts/modules/solid-gauge';
import * as FunnelChart from 'highcharts/modules/funnel';
import * as HighchartsMapsModule from 'highcharts/modules/map';
import * as HighchartsHeatMapsModule from 'highcharts/modules/heatmap';
import * as HighchartsBorderRadius from 'highcharts-border-radius';
import 'leaflet/dist/leaflet.css';
import * as Leaflet from 'leaflet/dist/leaflet-src.js';
import {Bar, Line, Pie, GaugeV1, GaugeV2, BarLine, BarLinePie, Maps, Funnel, Radar} from './highcharts';
import {CardOne, CardTwo, CardThree, CardFive, CardFour} from './cards';
import {FeedOne} from './feed'
import {TableOne} from './table'
import {YoutubeOne} from './youtube'
import {IframeOne} from './iframe'
import {TextOne} from './text'
import {ImageOne} from './image'
import {MapBox} from './leaflet'


HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
SolidGauge(Highcharts);
FunnelChart(Highcharts);
HighchartsMapsModule(Highcharts);
HighchartsHeatMapsModule(Highcharts);
HighchartsBorderRadius(Highcharts);

declare let window;
window.Highcharts = window.Highcharts || Highcharts;
window.Leaflet = Leaflet;

window.Highcharts.theme = {
    colors: [
        "rgb(244, 67, 54)"
        , "rgb(233, 30, 99)"
        , "rgb(156, 39, 176)"
        , "rgb(103, 58, 183)"
        , "rgb(63, 81, 181)"
        , "rgb(33, 150, 243)"
        , "rgb(3, 169, 244)"
        , "rgb(0, 188, 212)"
        , "rgb(0, 150, 136)"
        , "rgb(76, 175, 80)"
        , "rgb(139, 195, 74)"
        , "rgb(205, 220, 57)"
        , "rgb(255, 235, 59)"
        , "rgb(255, 193, 7)"
        , "rgb(255, 152, 0)"
        , "rgb(255, 87, 34)"
        , "rgb(121, 85, 72)"
        , "rgb(158, 158, 158)"
        , "rgb(96, 125, 139)"
    ]
};

window.Highcharts.setOptions(window.Highcharts.theme);


window.mf = window.mf || {
    Chart: {
        Bar: Bar,
        Line: Line,
        Pie: Pie,
        GaugeV1: GaugeV1,
        GaugeV2: GaugeV2,
        BarLine: BarLine,
        BarLinePie: BarLinePie,
        Radar: Radar,
        Funnel: Funnel,
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
    },
    Leaflet: {
        Map: MapBox
    }
}

export namespace SimpleDashboard {

    export function create() {
        return window.mf;
    }

}
