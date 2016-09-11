import { Data } from './data';

var client = require('restler');


export class Sender 
{
    private historianUrl:string;
    private stats:any;
    constructor(private host:string)
    {
        this.historianUrl = host + "/api/put?summary";
        this.stats = {
            success : 0,
            failed : 0,
            error : 0,
            requests : 0,
            pendingRequests : 0
        };
    }

    send(data:Array<Data>)
    {
        this.stats.requests++;
        this.stats.pendingRequests++;
       client.postJson(this.historianUrl,data).on('complete', (responseData, response) =>
        {
            this.stats.pendingRequests--;
            if (responseData.success || responseData.failed)
            {
                this.stats.success+= responseData.success;
                this.stats.failed+= responseData.failed;
            }
            else
            {
                this.stats.error+= data.length;
            }
        })
    }

    getStats():any{
        return {
            success : this.stats.success,
            failed : this.stats.failed,
            error : this.stats.error,
            requests : this.stats.requests,
            pendingRequests : this.stats.pendingRequests,
        };
    }
}