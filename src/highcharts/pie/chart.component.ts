import { BaseHighChart } from '../base';
import { RecordSet } from '../../common/interfaces';
import { CommonProvider } from '../../common/providers';
import { Configuration } from '../../common/configuration';
import { pSBC } from '../../color.js'

export class Pie extends BaseHighChart {

  private serie: any;

  protected onInit() {
    this.serie = {
      data: []
    };
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration) {
    if (configuration.dataSeries && configuration.dataSeries.name && configuration.labelField && configuration.labelField.name) {
      let indexDataSeries = this.getPosition(configuration.dataSeries.name);
      let indexLabelField = this.getPosition(configuration.labelField.name);
      if (recordset) {
        recordset.rows = recordset.rows || [];
      }
      recordset.rows.forEach(row => {
        this.addSerie(row[indexLabelField], row[indexDataSeries],
          this.getConditionFormatLabelColor(configuration, row[indexLabelField], row) || this.getConditionFormatLabelColor(configuration, row[indexDataSeries], row),
          configuration);
      })
    }
  }

  protected getHighChartConfiguration(configuration: Configuration) {
    const colors = configuration.colorPalette ? CommonProvider.getColorByPaletteKey(configuration.colorPalette, configuration.invertedColorPalette) : CommonProvider.getColorsPaletteDefault(configuration.invertedColorPalette)
    
    return {
      colors: configuration.gradientMode ? colors.map((hex) => {
        return {
          linearGradient: {
              cx: 0.5,
              cy: 0.2,
              r: 0.5
          },
          stops: [
            [0, pSBC(hex, 0)],
            [1, pSBC(hex, 50)],
          ]
        }
      }) : colors,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        zoomType: false,
        backgroundColor: configuration.backgroundColor,
        border: false,
        borderRadius: '8px',
        spacingBottom: 24,
        spacingLeft: 24,
        spacingRight: 24,
        spacingTop: 24,
      },
      lang: {
        noData: "Sem dados para apresentar"
      },
      title: {
        text: configuration && configuration.title ? configuration.title : '',
        style: {
          fontSize: (this.getFontSize() + 7) + 'px'
        }
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        itemStyle: {
            fontSize: this.getFontSize() + "px",
            color: '#666',
            fontWeight: 'bold',
            fontFamily: '"Montserrat", sans-serif',
        }
      },
      tooltip: {
        formatter: function () {
          return CommonProvider.formatValue(this.y, configuration.format, configuration.formatPrecision);
        },
        enabled: !configuration.showValues ? true : false
      },
      plotOptions: {
        pie: {
          borderWidth: 0,
          borderColor: null,
          allowPointSelect: false,
          slicedOffset: 0,
          cursor: 'pointer',
          border: false,
          dataLabels: {
            enabled: configuration.showValues ? true : false,
            style: {
              fontSize: this.getFontSize() + "px",
                color: '#666',
                fontWeight: 'bold',
                fontFamily: '"Montserrat", sans-serif',
            },
            formatter: function () {
              return '<b>' + CommonProvider.formatValue(this.y, configuration.format, configuration.formatPrecision) + '</b>'
            },
          },
          showInLegend: configuration.showLegend
        }
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [Object.assign({
        innerSize: configuration.donutMode ? '50%' : '0%',
        sliced: false,
      }, this.serie)]
    };
  }

  private addSerie(name: string, value: any, color: string, configuration: Configuration): void {
    let categorieValue = CommonProvider.formatValue(name, configuration.labelField.format, configuration.labelField.formatPrecision)
    this.serie.data.push({
      name: categorieValue, y: Number(value), color: color, dataLabels: {
        style: {
          fontSize: this.getFontSize() + 'px'
        }
      }
    });
  }

  private getConditionFormatLabelColor(configuration: Configuration, value: any, row): string {
    let color = undefined;
    if (configuration.hasOwnProperty('conditionalsFormatting')) {
      configuration.conditionalsFormatting.forEach(conditionalsFormatting => {
        if (conditionalsFormatting.compareOtherField) {
          conditionalsFormatting.value = row[this.getPosition(conditionalsFormatting.fieldCompare)];
        }
        if (CommonProvider.isConditionalFormatting(conditionalsFormatting.condition, value, conditionalsFormatting.value)) {
          color = conditionalsFormatting.color.value;
        }
      })
    }
    return color;
  }

}
