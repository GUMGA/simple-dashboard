import { Title, Field, ConditionalFormatting } from '../common/interfaces';

export class Configuration {

    title = {} as Title;
    axisX = {} as Field;
    axisY = [] as Array<Field>;
    dataSeries = {} as Field;
    labelField = {} as Field;
    conditionalsFormatting = [] as Array<ConditionalFormatting>;

    constructor() {

    }

}
