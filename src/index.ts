import * as Highcharts  from 'highcharts';
import { Bar, Line, Pie } from './highcharts';

declare let window;

window.Highcharts = window.Highcharts || Highcharts;

window.mf = window.mf || {
  Chart: {
    Bar : Bar,
    Line: Line,
    Pie : Pie
  }
}

export default window.mf;
