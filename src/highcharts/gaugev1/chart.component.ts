import { BaseHighChart } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration }  from '../../common/configuration';
import { CommonProvider} from '../../common/providers';

export class GaugeV1 extends BaseHighChart {

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
                      return CommonProvider.formatValue(this.y, configuration.format, configuration.precision)
                  }
              }
          });
  }

  protected getHighChartConfiguration(configuration: Configuration) {
    return {
        chart: {
            type: 'solidgauge'
        },
        lang: {
            noData: "Sem dados para apresentar"
        },
        title: {
            text: configuration && configuration.title ? configuration.title.text : 'Titulo do grafico',
            style: {
              fontSize: (this.getFontSize() + 7) + "px"
            }
        },
        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        tooltip: {
            enabled: false
        },
        yAxis: {
            stops: [
                [0.1, configuration.beginningColor ? configuration.beginningColor : '#5cb85c'], // green
                [0.5, configuration.middleColor ? configuration.middleColor : '#f0ad4e'], // yellow
                [0.9, configuration.endColor ? configuration.endColor : '#d9534f'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 0,
            title: {
                y: -70
            },
            labels: {
                y: 20,
                style: {
                  fontSize: this.getFontSize() + "px"
                },
                formatter: function () {
                    return CommonProvider.formatValue(this.value, configuration.format, configuration.precision)
                }
            },
            min: this.minimumValue,
            max: this.maximumValue,
            tickPositioner: () => {
                return [this.minimumValue, this.maximumValue];
            }
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: this.series
    }
  }

}
