import * as Highcharts  from 'highcharts';
import { Bar, Line } from './highcharts';

declare let window;

window.Highcharts = window.Highcharts || Highcharts;

window.mf = window.mf || {
  Chart: {
    Bar : Bar,
    Line: Line
  }
}

export default window.mf;
