import { Data } from '../data';
import {IOutputConnector} from './IOutputConnector';

export class KafkaConnector implements IOutputConnector
{

    send (data:Array<Data>)
    {

    }

    getStats():any{
            return {
                success : 0,
                failed : 0,
                error : 0,
                requests : 0,
                pendingRequests : 0
            };
        }
}