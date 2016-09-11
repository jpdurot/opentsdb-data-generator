import { IDataGenerator } from './IDataGenerator';
import { Data } from '../Data';

export class RandomGenerator implements IDataGenerator
{
    private metricName:string;
    private minValue:number;
    private maxValue:number;

    constructor()
    {
        this.metricName = "<Not defined>";
    }

    generateData():Data
    {
        var value:number = Math.floor(Math.random() * (this.maxValue - this.minValue + 1) + this.minValue)
        var timestamp:number = new Date().getTime();
        return new Data(this.metricName,value, timestamp, 192);
    }

    init(metricName:string, options:any)
    {
        this.metricName = metricName,
        this.minValue = options.minValue;
        this.maxValue = options.maxValue;

    }
}