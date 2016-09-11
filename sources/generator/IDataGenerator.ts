import { Data } from '../data';

export interface IDataGenerator
{

    generateData():Data;
    init(metricName:string, options:any);
}