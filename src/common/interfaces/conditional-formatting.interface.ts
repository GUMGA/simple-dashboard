import { StringValue } from './index';

export interface ConditionalFormatting {
    condition: any;
    value: any;
    color: StringValue;
    field: string;
}
