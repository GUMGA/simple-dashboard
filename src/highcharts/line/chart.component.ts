import { BaseHighChart } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration } from '../';

export class Line extends BaseHighChart {

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
    configuration.axisY.forEach(axisY => {
      if(axisY && axisY.name){
        let indexAxisY = this.getPosition(axisY.name), values:Array<any> = [];
        recordset.rows.forEach((row, index) => {
          let value = row[indexAxisY];
          values.push(Number(value));
        });
        let color = axisY.color && axisY.color.value ? axisY.color.value : '#ff0000';
        this.addSerie(axisY.label ? axisY.label : axisY.name, values, color);
      }
    });
  }

  protected getHighChartConfiguration(configuration: Configuration) {
    return {
          title: configuration.title,
          lang: {
              noData: "Sem dados para apresentar"
          },
          subtitle: {
              text: '',
              x: -20
          },
          xAxis: {
              categories: this.categories,
              labels: {
                  formatter: function() {
                      return this.value
                  },
                  style: {
                  }
              }
          },
          legend: {
              itemStyle: {
              }
          },
          yAxis: {
              gridLineWidth:  1,
              title: {
                  text: ''
              },
              labels: {
              }
          },
          exporting: {
              enabled: false
          },
          series:  this.series,
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled:  true
                  },
                  showInLegend: true
              }
          },
          credits: {
              enabled:false
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
