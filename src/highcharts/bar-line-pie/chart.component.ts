import { BaseHighChart } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration } from '../';
import { CommonProvider} from '../../common/providers';

export class BarLinePie extends BaseHighChart {

  private categories: Array<string>;
  private series: Array<any>;
  private titleY: any;
  private regExpDateTime: any;
  private regExpDate: any;
  private qtdPie: any;

  protected onInit(): void {
    this.categories = new Array();
    this.series     = new Array();
    this.regExpDate = new RegExp('^(?:[0-9]{2})?[0-9]{2}.[0-3]?[0-9].[0-3]?[0-9]$|^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$');
    this.regExpDateTime = new RegExp('^(?:[0-9]{2})?[0-9]{2}.[0-3]?[0-9].[0-3]?[0-9]T[0-9]{2}.[0-9]{2}.[0-9]{2}Z$|^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}T[0-9]{2}.[0-9]{2}.[0-9]{2}Z');
    this.qtdPie = 1;
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
    let indexAxisX = this.getPosition(configuration.axisX.name);
    let seriesColumnAxisY = [];
    configuration
          .axisY
          .forEach((objAxisY) => {
              seriesColumnAxisY = []
              if (objAxisY.type === 'column') {
                  let indexColumnAxisY = this.getPosition(objAxisY.name)
                  recordset
                      .rows
                      .forEach(row => {
                          let categorieValue = row[indexAxisX];
                          if (this.regExpDate.test(categorieValue)) {
                              categorieValue = CommonProvider.formatValue(categorieValue, 'data#dd/MM/yyyy', 2);
                          } else {
                              if (this.regExpDateTime.test(categorieValue)) {
                                  categorieValue = CommonProvider.formatValue(categorieValue, 'datahora#dd/MM/yyyy HH:mm', 2);
                              }
                          }
                          this.addCategorie(categorieValue);
                          let value = row[indexColumnAxisY];
                          let color = this.getConditionFormatColor(objAxisY.name, value, configuration) || this.getConditionFormatColor(configuration.axisX.name, row[indexAxisX], configuration);
                          if (color) {
                              seriesColumnAxisY.push({y: Number(value), color: color});
                          } else {
                              seriesColumnAxisY.push(Number(value));
                          }

                      });
              }

              let color = objAxisY.color && objAxisY.color.value ? objAxisY.color.value : '#ff0000'
              if (objAxisY.type === 'spline') {
                  let indexLineAxisY = this.getPosition(objAxisY.name);
                  let seriesLineAxisY = [];
                  recordset
                      .rows
                      .forEach((row) => {
                          seriesLineAxisY.push(Number(row[indexLineAxisY]));
                          this.addSerieSpline(objAxisY.name, seriesLineAxisY, this.getConditionFormatColor(objAxisY.name, recordset.rows[recordset.rows.length-1][indexLineAxisY], configuration) || color);
                      });
              } else if (objAxisY.type === 'column') {
                  this.addSerieColumn(objAxisY.label, seriesColumnAxisY, color);
              } else if (objAxisY.type === 'pie') {
                  objAxisY.showValues = configuration ? configuration.dataLabelAxisY : true;
                  let indexPieAxisY = this.getPosition(objAxisY.name);
                  let indexPieLabelAxisY = this.getPosition(objAxisY.label);
                  let seriesPieAxisY = [];
                  recordset
                      .rows
                      .forEach(row => {
                          seriesPieAxisY.push({
                              name: row[indexPieLabelAxisY],
                              y: Number(row[indexPieAxisY])
                          });
                      });
                  this.addSeriePie(objAxisY.name, seriesPieAxisY, objAxisY);
              }
          })

          configuration.pies.forEach((pie) => {
            if (pie.data) {
                let namePie = pie.name;
                let posLabel = this.getPieLabelPosition(namePie, pie);
                let indexDataSeries = this.getPositionPie(pie.dataSeries.name, pie);
                let indexLabelField = this.getPositionPie(pie.labelField.name, pie);
                let seriesPieAxisY = [];
                pie.data.rows
                    .forEach((row) => {
                        seriesPieAxisY.push({
                            name: row[indexLabelField],
                            y: Number(row[indexDataSeries]),
                            color: this.getConditionFormatLabelColorPie(row[indexLabelField], pie) || this.getConditionFormatDataColorPie(row[indexDataSeries], pie)
                        });
                    })
                pie.showValues = configuration ? configuration.dataLabelAxisY : true;
                this.addSeriePie(pie.labelField.name, seriesPieAxisY, pie);
            }
        })

  }

  protected getConditionFormatColor(column, value, configuration: Configuration){
    let result = undefined;
    configuration.conditionalsFormatting = configuration.conditionalsFormatting || []
    configuration
        .conditionalsFormatting
        .filter(function (data) {
            return data.field && column && data.field.toLowerCase() === column.toLowerCase();
        })
        .forEach(function (data) {
            if (CommonProvider.isConditionalFormatting(data.condition, value, data.value)) {
                result = data.color.value;
            }
        });

    return result;
  }

  protected addSeriePie(name, values, pie):void {
    pie = pie || {};
    if (this.regExpDate.test(name)) {
        name = CommonProvider.formatValue(name, 'data#dd/MM/yyyy', 2);
    } else {
        if (this.regExpDateTime.test(name)) {
            name = CommonProvider.formatValue(name, 'datahora#dd/MM/yyyy HH:mm', 2);
        }
    }
    this.series.push({
        name: name, data: values, type: 'pie', yAxis: 1, dataLabels: {
            style: {
                fontSize: this.getFontSize() + "px"
            },
            enabled: pie.showValues
        }, center: [this.qtdPie + '0%', '20%'], size: '40%',
        showInLegend: pie.showLegend,
    })
    this.qtdPie += 3;
  }

  protected getPieLabelPosition(name, pie) {
     let position = undefined;
     if (pie.data) {
         pie.data.columns
             .forEach(function (data, index) {
                 if (name && name.toLowerCase() === data.toLowerCase()) {
                     position = index;
                 }
             });
     }

     return position;
  }

  protected getPositionPie(column, pie) {
    let position = undefined;
    if (pie.data) {
        pie.data
            .columns
            .forEach(function (data, index) {
                if (column && column.toLowerCase() === data.toLowerCase()) {
                    position = index;
                }
            });
    }

  return position;
  }

  protected getConditionFormatLabelColorPie(value, pie) {
    let color = undefined;
    pie.conditionalsFormatting = pie.conditionalsFormatting || []
    pie.conditionalsFormatting
        .filter(function (data) {
            return data.field == pie.labelField.name
        })
        .forEach(function (data) {
            if (CommonProvider.isConditionalFormatting(data.condition, value, data.value)) {
                color = data.color.value;
            }
        })
    return color;
  }

  protected getConditionFormatDataColorPie(value, pie) {
    let color = undefined;
    pie.conditionalsFormatting = pie.conditionalsFormatting || []
    pie.conditionalsFormatting
        .filter(function (data) {
            return data.field == pie.dataSeries.name
        })
        .forEach(function (data) {
            if (CommonProvider.isConditionalFormatting(data.condition, value, data.value)) {
                color = data.color.value;
            }
        })
    return color;
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
        lang: {
            noData: "Sem dados para apresentar"
        },
        title: {
            text: configuration ? configuration.title.text : 'Título do Grafico',
            style: {
                fontSize: (this.getFontSize() + 7) + "px"
            }
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
                fontSize: this.getFontSize() + "px"
            }
        },
        xAxis: {
            categories: this.categories,
            labels: {
                style: {
                    fontSize: this.getFontSize() + "px"
                }
            }
        },
        tooltip: {
            enabled: configuration ? !configuration.dataLabelAxisY : false,
            formatter: function () {
                return CommonProvider.formatValue(this.y, configuration.format, configuration.precision)
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
                    text: configuration ? configuration.axisY.label : this.titleY,
                    style: {
                        fontSize: this.getFontSize() + "px"
                    }
                },
                labels: {
                    formatter: function () {
                        return CommonProvider.formatValue(this.value, configuration.format, configuration.precision)
                    },
                    style: {
                        fontSize: this.getFontSize() + "px"
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
                        return CommonProvider.formatValue(this.y, configuration.format, configuration.precision)
                    }
                }
            },
            spline: {
                dataLabels: {
                    enabled: configuration ? configuration.dataLabelAxisY : true,
                    formatter: function () {
                        return CommonProvider.formatValue(this.y, configuration.format, configuration.precision)
                    }
                }
            }
        }
    }
  }

}
