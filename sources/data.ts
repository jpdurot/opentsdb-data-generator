

export class Data
{
    private metric:string;
    private value:number;
    private timestamp:number;
    private tags:any;
    constructor(metric:string,
                value:number,
                timestamp:number,
                quality:number)
    {
        this.metric = metric;
        this.value = value;
        this.timestamp = timestamp;
        this.tags={};
        this.tags.quality = quality;
    }

    toJson():string
    {
        return JSON.stringify(this);
    }
}