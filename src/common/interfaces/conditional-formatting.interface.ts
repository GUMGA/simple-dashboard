import { StringValue } from './index';

export interface ConditionalFormatting {
    icon: any;
    condition: any;
    value: any;
    color: StringValue;
    field: string;
    compareOtherField: boolean,
    fieldCompare: string,
    typeColor: string;
}
