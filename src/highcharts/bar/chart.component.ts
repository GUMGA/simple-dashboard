import { BaseHighChart } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration } from '../';
import { CommonProvider} from '../../common/providers';

export class Bar extends BaseHighChart {

  private categories: Array<string>;
  private series: Array<any>;

  protected onInit() {
    this.categories = new Array();
    this.series     = new Array();
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration) {
      recordset.rows.forEach(row => {
        let categorieValue = row[this.getPosition(configuration.axisX.name)];
        this.addCategorie(categorieValue);
      });
      var indexAxisX = this.getPosition(configuration.axisX.name);
      configuration.axisY.forEach(axisY => {
        if(axisY && axisY.name){
          let indexAxisY = this.getPosition(axisY.name), values:Array<any> = [];
          recordset.rows.forEach((row, index) => {
             let value = row[indexAxisY];
             let color = this.getConditionFormatColor(axisY.name, value, configuration) || this.getConditionFormatColor(configuration.axisX.name, row[indexAxisX], configuration)
             if(color) {
                 values.push({y:Number(value), color: color});
             } else {
                 values.push(Number(value));
             }
          });
          let color = axisY.color && axisY.color.value ? axisY.color.value : '#ff0000';
          this.addSerie(axisY.label ? axisY.label : axisY.name, values, color);
        }
      })
  }

  private getConditionFormatColor(column, value, configuration: Configuration) {
    let result = undefined;
    configuration.conditionalsFormatting = configuration.conditionalsFormatting || [];
    configuration
        .conditionalsFormatting
        .filter(function(data) {
            return data.field && data.field.toLowerCase() === column.toLowerCase();
        })
        .forEach(function(data) {
            if(CommonProvider.isConditionalFormatting(data.condition, value, data.value)) {
                result = data.color.value;
            }
        });

    return result;
  }

  protected getHighChartConfiguration(configuration: Configuration) {
    let stacking = (!configuration.stacking || configuration.stacking === 'DISABLE') ? null : configuration.stacking.toLowerCase();
    return {
        chart: {
            type: 'column',
            zoomType: false
        },
        lang: {
            noData: "Sem dados para apresentar"
        },
        title: {
          text: configuration.title.text,
          style: {
            fontSize: (this.getFontSize() + 7) +"px"
          }
        },
        xAxis: {
            categories: this.categories,
            title: {
                text: configuration ? configuration.titleAxisY : 'Titulo do eixo horizontal'
            },
            labels: {
              style: {
                fontSize: this.getFontSize() + "px"
              }
            }
        },
        legend: {
            enabled: configuration ? configuration.showLegendAxisY : true,
            itemStyle: {
              fontSize: this.getFontSize() + "px"
            }
        },
        tooltip: {
            enabled: configuration ? !configuration.dataLabelAxisY : false,
            formatter: function () {
                return CommonProvider.formatValue(this.y, configuration.format, configuration.precision);
            }
        },
        zAxis: {
          labels: {
            style: {
              fontSize: this.getFontSize() + "px"
            }
          }
        },
        yAxis: {
            gridLineWidth: configuration ? configuration.showGridLineWidthAxisY ? 1 : 0 : 1,
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return CommonProvider.formatValue(this.value, configuration.format, configuration.precision);
                },
                style: {
                  fontSize: this.getFontSize() + "px"
                }
            }
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: this.series,
        plotOptions: {
            column: {
                stacking: stacking,
                dataLabels: {
                    enabled: configuration ? configuration.dataLabelAxisY : true,
                    formatter: function () {
                        return CommonProvider.formatValue(this.y, configuration.format, configuration.precision);
                    }
                }
            }
        }
      }
  }

  private addCategorie(name:string):void {
    this.categories.push(name);
  }

  private addSerie(name:string, values:Array<any>, color: string):void {
    this.series.push({
        name: name,
        data: values,
        color: color,
        dataLabels: {}
      }
    );
  }

}
