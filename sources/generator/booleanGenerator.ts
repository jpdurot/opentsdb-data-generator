import { IDataGenerator } from './IDataGenerator';
import { Data } from '../data';

export class BooleanGenerator implements IDataGenerator
{
    private metricName:string;
    private changeRate:number;

    constructor()
    {
        this.metricName = "<Not defined>";
    }

    generateData():Data
    {
        var timestamp:number = new Date().getTime();
        var value:number = Math.floor(timestamp/this.changeRate) % 2;
        return new Data(this.metricName,value, timestamp, 192);
    }

    init(metricName:string, options:any)
    {
        this.metricName = metricName;
        this.changeRate = options.changeRate;

    }
}
