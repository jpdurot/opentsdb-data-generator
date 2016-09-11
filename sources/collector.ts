import { Data } from './data';
import { Sender } from './sender';

export class Collector
{
    private dataBuffer:Array<Data>;

    constructor(private sender:Sender,private packetSize:number)
    {
        this.dataBuffer = new Array<Data>();
    }

    push(data:Data)
    {
        this.dataBuffer.push(data);
        if (this.dataBuffer.length >= this.packetSize)
        {
            var dataToSend = this.dataBuffer.slice(0);
            // Clear data buffer
            this.dataBuffer.length = 0;
            this.send(dataToSend);
        }
    }

    private send(data:Array<Data>)
    {
        this.sender.send(data);
    }


}