import { IDataGenerator } from './IDataGenerator';
import { Data } from '../data';

export class StaticDataGenerator implements IDataGenerator
{
    private metricName:string;
    private value:number;

    constructor()
    {
        this.metricName = "<Not defined>";
    }

    generateData():Data
    {
        var timestamp:number = new Date().getTime();
        var value:number = this.value
        return new Data(this.metricName,value, timestamp, 192);
    }

    init(metricName:string, options:any)
    {
        this.metricName = metricName;
        this.value = options.value;

    }
}
