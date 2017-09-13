import * as Highcharts  from 'highcharts';
import * as HighchartsMore  from 'highcharts/highcharts-more';
import * as HighchartsExporting  from 'highcharts/modules/exporting';
import * as NoDataToDisplay  from 'highcharts/modules/no-data-to-display';
import * as SolidGauge  from 'highcharts/modules/solid-gauge';
import { Bar, Line, Pie, GaugeV1, GaugeV2, BarLine } from './highcharts';

HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
SolidGauge(Highcharts);

declare let window;

window.Highcharts = window.Highcharts || Highcharts;

window.mf = window.mf || {
  Chart: {
    Bar : Bar,
    Line: Line,
    Pie : Pie,
    GaugeV1: GaugeV1,
    GaugeV2: GaugeV2,
    BarLine: BarLine
  }
}

export default window.mf;
