import { BaseHighChart } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration }  from '../../common/configuration';
import { CommonProvider} from '../../common/providers';

export class GaugeV2 extends BaseHighChart {

  private minimumValue = 0;
  private maximumValue = 0;
  private series: Array<any>;

  protected onInit(): void {
    this.series = new Array();
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
    if(configuration.fixedValue) {
        this.minimumValue = configuration.minimumValue.value;
        this.maximumValue = configuration.maximumValue.value;
    } else {
        this.minimumValue = this.getData(configuration.minimumValue.name, recordset);
        this.maximumValue = this.getData(configuration.maximumValue.name, recordset);
    }
    this.addSerie(configuration.currentValue.label, this.getData(configuration.currentValue.name, recordset), configuration);
  }

  protected getData(name, recordset: RecordSet){
    let index = recordset.columns.indexOf(name)
    recordset.rows = recordset.rows || [];
    return recordset.rows[0] && recordset.rows[0][index] ? recordset.rows[0][index] : 0;
  }

  protected addSerie(name, value, configuration: Configuration){
      this.series.push(
          {
              name:name,
              data: [value],
              dataLabels: {
                  style: {
                    fontSize: this.getFontSize() + "px"
                  },
                  formatter: function () {
                      return CommonProvider.formatValue(this.y, configuration.currentValue.format, configuration.precision)
                  }
              }
          });
  }

  protected getHighChartConfiguration(configuration: Configuration) {
    return {
      chart: {
          type: 'gauge',
          plotBackgroundColor: 'transparent',
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          backgroundColor: 'transparent',
          plotShadow: false,
          spacingTop: 0,
          spacingLeft: 0,
          spacingRight: 0,
          spacingBottom: 0
      },
      lang: {
          noData: "Sem dados para apresentar"
      },
      title: {
          text: configuration && configuration.title ? configuration.title : '',
          style: {
            fontSize: (this.getFontSize() + 7) +"px"
          }
      },

      pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
              borderWidth: 1,
              backgroundColor : 'transparent',
              outerRadius: '109%'
          }]
      },
      yAxis: {
          min: this.minimumValue,
          max: this.maximumValue,
          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#000',
          tickPixelInterval: 30,
          tickWidth: 1,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#000',
          labels: {
              step: 2,
              style: {
                fontSize: this.getFontSize() +"px"
              },
              formatter: function () {
                return CommonProvider.formatValue(this.value, configuration.currentValue.format, configuration.precision)
              },
              rotation: 'auto'
          },
          title: {
              text: ''
          },
          plotBands: Object.assign([], configuration.bands) || [{from:0, to:40, color:'#5cb85c'},{from:40, to:70, color:'#f0ad4e'},{from:70, to:100, color:'#d9534f'}]
      },
      credits: {
          enabled: false
      },
      exporting: {
          enabled: false
      },
      series:  this.series
    }
  }

}
