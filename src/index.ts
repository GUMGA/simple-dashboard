import * as Highcharts  from 'highcharts';
import { Bar } from './highcharts';

declare let window;

window.Highcharts = window.Highcharts || Highcharts;

window.mf = window.mf || {
  Chart: {
    Bar: Bar
  }
}

export default window.mf;
