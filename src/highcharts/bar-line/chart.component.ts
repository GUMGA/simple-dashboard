import { BaseHighChart } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration } from '../';
import { CommonProvider} from '../../common/providers';

export class BarLine extends BaseHighChart {

  private categories: Array<string>;
  private series: Array<any>;
  private titleY: any;

  protected onInit(): void {
    this.categories = new Array();
    this.series     = new Array();
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
    let indexAxisX = this.getPosition(configuration.axisX.name);
    let indexColumnAxisY = this.getPosition(configuration.columnAxisY.name)
    let seriesColumnAxisY = [];
    recordset
          .rows
          .forEach((row) => {
              var categorieValue = row[indexAxisX];
              categorieValue = CommonProvider.formatValue(categorieValue, configuration.axisX.format, configuration.axisX.formatPrecision)
              this.addCategorie(categorieValue);
              var value = row[indexColumnAxisY];
              var color = this.getConditionFormatColor(configuration.columnAxisY.name, value, configuration) || this.getConditionFormatColor(configuration.axisX.name, row[indexAxisX], configuration);
              if(color) {
                  seriesColumnAxisY.push({y:Number(value), color: color});
              } else {
                  seriesColumnAxisY.push(Number(value));
              }
          });

    this.addSerieColumn(configuration.columnAxisY.label, seriesColumnAxisY, configuration.columnAxisY.color.value);
    configuration.lineAxisY.forEach((axisY) => {
        let indexLineAxisY = this.getPosition(axisY.name);
        let seriesLineAxisY = [];
        recordset
            .rows
            .forEach(function(row) {
                seriesLineAxisY.push(Number(row[indexLineAxisY]));
            });
        var color = axisY.color && axisY.color.value ? axisY.color.value : '#ff0000'
        this.addSerieSpline(axisY.name, seriesLineAxisY, color);
    });
  }

  protected getConditionFormatColor(column, value, configuration: Configuration){
    var result = undefined;
    configuration
        .conditionalsFormatting
        .filter(function(data) {
            return column && data.field.toLowerCase() === column.toLowerCase();
        })
        .forEach(function(data) {
            if(CommonProvider.isConditionalFormatting(data.condition, value, data.value)) {
                result = data.color.value;
            }
        });

    return result;
  }

  protected addCategorie(name:string):void {
    this.categories.push(name);
  }

  protected addSerieColumn(name, values, color):void {
    this.titleY = name;
    this.series.push({name: name, data:values, color: color, type: 'column', yAxis: 1, dataLabels: {
      style: {
        fontSize: this.getFontSize() + "px"
      }
    }})
  }

  protected addSerieSpline(name, values, color):void {
    this.series.push({name: name, data:values, color: color, type: 'spline', yAxis: 1, dataLabels: {
      style: {
        fontSize: this.getFontSize() + "px"
      }
    }})
  }

  protected getHighChartConfiguration(configuration: Configuration) {
    return {
        chart: {
            zoomType: false,
            className: 'responsive-chart'
        },
        title: {
            text: configuration ? configuration.title.text : 'Título do Grafico',
            style: {
              fontSize: (this.getFontSize() + 7) +"px"
            }
        },
        lang: {
            noData: "Sem dados para apresentar"
        },
        subtitle: {
            text: ''
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        legend: {
            enabled: configuration ? configuration.showLegendAxisY : true,
            itemStyle: {
              fontSize: this.getFontSize()+"px"
            }
        },
        xAxis: [
            {
                categories: this.categories,
                labels: {
                  style: {
                    fontSize: this.getFontSize()+"px"
                  }
                }
            }
        ],
        tooltip: {
            enabled: configuration ? !configuration.dataLabelAxisY : false,
            formatter: function () {
                return CommonProvider.formatValue(this.y, this.format, this.precision)
            }
        },
        yAxis: [
            {
                gridLineWidth: configuration ? configuration.showGridLineWidthAxisY ? 1 : 0 : 1,
                title: {
                    text: ''
                },
                opposite: true
            },
            {
                gridLineWidth: configuration ? configuration.showGridLineWidthAxisY ? 1 : 0 : 1,
                title: {
                    text: configuration ? configuration.columnAxisY.label : this.titleY,
                    style: {
                      fontSize: this.getFontSize()+"px"
                    }
                },
                labels: {
                    formatter: function () {
                        return CommonProvider.formatValue(this.value, this.format, this.precision)
                    },
                    style: {
                      fontSize: this.getFontSize()+"px"
                    }
                }
            }
        ],
        series: this.series,
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: configuration ? configuration.dataLabelAxisY : true,
                    formatter: function () {
                        return CommonProvider.formatValue(this.y, this.format, this.precision)
                    }
                }
            },
            spline: {
                dataLabels: {
                    enabled: configuration ? configuration.dataLabelAxisY : true,
                    formatter: function () {
                        return CommonProvider.formatValue(this.y, this.format, this.precision)
                    }
                }
            }
        }
    }
  }

}
