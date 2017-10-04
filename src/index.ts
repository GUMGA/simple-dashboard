import * as Highcharts  from 'highcharts';
import * as HighchartsMore  from 'highcharts/highcharts-more';
import * as HighchartsExporting  from 'highcharts/modules/exporting';
import * as NoDataToDisplay  from 'highcharts/modules/no-data-to-display';
import * as SolidGauge  from 'highcharts/modules/solid-gauge';
import { Bar, Line, Pie, GaugeV1, GaugeV2, BarLine, BarLinePie } from './highcharts';
import { CardOne, CardTwo, CardThree, CardFive, CardFour } from './cards';
import { FeedOne } from './feed'

declare let window;

window.Highcharts = window.Highcharts || Highcharts;

window.mf = window.mf || {
  Chart: {
    Bar : Bar,
    Line: Line,
    Pie : Pie,
    GaugeV1: GaugeV1,
    GaugeV2: GaugeV2,
    BarLine: BarLine,
    BarLinePie: BarLinePie,
    CardOne: CardOne,
    CardTwo: CardTwo,
    CardThree: CardThree,
    CardFive: CardFive,
    CardFour: CardFour
  },
  Feed: {
    FeedOne: FeedOne
  }
}

export namespace SimpleDashboard {

  export function create(){
    return window.mf;
  }

}
