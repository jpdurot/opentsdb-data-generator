import { Data } from '../data';

export interface IOutputConnector
{

    send(data:Array<Data>);
    getStats():any;
}