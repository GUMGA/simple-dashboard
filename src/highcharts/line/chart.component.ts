import { BaseHighChart } from '../base';
import { RecordSet } from '../../common/interfaces';
import { Configuration } from '../../common/configuration';
import { CommonProvider } from '../../common/providers';

export class Line extends BaseHighChart {

    private categories: Array<string>;
    private series: Array<any>;

    protected onInit() {
        this.categories = new Array();
        this.series = new Array();
    }

    protected processRecordSet(recordset: RecordSet, configuration: Configuration) {
        recordset.rows.forEach(row => {
            let categorieValue = row[this.getPosition(configuration.axisX.name)];
            this.addCategorie(categorieValue);
        });
        if(configuration.dynamicColumns) {
            configuration.axisY = [];
            this.recordset.columns
                .filter((column) => configuration.axisX.name != column)
                .forEach((column) => configuration.axisY.push({name: column, label:column}));
        }
        configuration.axisY.forEach(axisY => {
            if (axisY && axisY.name) {
                let indexAxisY = this.getPosition(axisY.name), values: Array<any> = [], colorAxisY = undefined;
                recordset.rows.forEach((row, index) => {
                    let value = row[indexAxisY];
                    values.push(Number(value));
                    if (index == recordset.rows.length - 1) {
                        colorAxisY = this.getConditionFormatDataColor(axisY.name, row[indexAxisY], configuration);
                    }
                });
                let color = colorAxisY ? colorAxisY : axisY.color ? axisY.color.value : undefined;
                this.addSerie(axisY.label ? axisY.label : axisY.name, values, color);
            }
        });
    }

    private getConditionFormatDataColor(name, value, configuration: Configuration) {
        var color = undefined;
        configuration
            .conditionalsFormatting
            .filter(function (data) {
                return data.field == name
            })
            .forEach(function (data) {
                if (CommonProvider.isConditionalFormatting(data.condition, value, data.value)) {
                    color = data.color.value;
                }
            })
        return color;
    }


    protected getHighChartConfiguration(configuration: Configuration) {
        return {
            colors: configuration.dynamicColumns && configuration.colorPalette ? CommonProvider.getColorByPaletteKey(configuration.colorPalette, configuration.invertedColorPalette) : CommonProvider.getColorsPaletteDefault(configuration.invertedColorPalette) ,
            chart: {
                spacingBottom: 50,
                spacingTop: 20
            },
            title: {
                text: configuration && configuration.title ? configuration.title : '',
                style: {
                    fontSize: (this.getFontSize() + 7) + "px"
                }
            },
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
                    formatter: function () {
                        let mask = configuration.axisX && configuration.axisX.format ? configuration.axisX.format : configuration.format;
                        return CommonProvider.formatValue(this.value, mask, configuration.axisX.formatPrecision);
                    },
                    style: {
                        fontSize: this.getFontSize() + "px"
                    }
                }
            },
            legend: {
                itemStyle: {
                    fontSize: this.getFontSize() + "px"
                }
            },
            yAxis: {
                gridLineWidth: configuration.showGridLineWidthAxisY ? 1 : 0,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {

                        return CommonProvider.formatValue(this.value, configuration.format, configuration.formatPrecision)
                    },
                    style: {
                        fontSize: this.getFontSize() + "px"
                    }
                }
            },
            tooltip: {
                enabled: configuration ? !configuration.dataLabelAxisY : false,
                formatter: function () {
                    return CommonProvider.formatValue(this.y, configuration.format, configuration.formatPrecision)
                }
            },
            exporting: {
                enabled: false
            },
            series: this.series,
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: configuration ? configuration.dataLabelAxisY : true,
                        formatter: function () {
                            return CommonProvider.formatValue(this.y, configuration.format, configuration.formatPrecision)
                        },
                        style: {
                            fontSize: this.getFontSize() + "px"
                        }
                    },
                    showInLegend: configuration ? configuration.showLegendAxisY : true
                }
            },
            credits: {
                enabled: false
            }
        }
    }

    private addCategorie(name: string): void {
        this.categories.push(name);
    }

    private addSerie(name: string, values: Array<any>, color: string): void {
        this.series.push({
            name: name,
            data: values,
            color: color,
            dataLabels: {}
        }
        );
    }

}
