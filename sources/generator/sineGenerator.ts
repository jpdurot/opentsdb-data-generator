import { IDataGenerator } from './IDataGenerator';
import { Data } from '../Data';

export class SineGenerator implements IDataGenerator
{
    private metricName:string;
    private amplitude:number;
    private duration:number;
    private sineData:any;

    constructor()
    {
        this.metricName = "<Not defined>";
        this.sineData=[];
    }

    generateData():Data
    {
        var timestamp:number = new Date().getTime();
        var value:number = this.sineData[(timestamp % this.sineData.length)];
        return new Data(this.metricName,value, timestamp, 192);
    }

    init(metricName:string, options:any)
    {
        this.metricName = metricName,
        this.amplitude = options.amplitude;
        this.duration = options.duration;
        for (var i=0; i<this.duration;i++)
        {
            this.sineData[i] = this.amplitude* Math.sin(2*3.141592654*i/this.duration);
        }



    }
}