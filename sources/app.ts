/// <reference path="../typings/index.d.ts" />




import { Collector } from './collector';
import { Sender } from './sender';
import { Data } from './data';
import { IDataGenerator} from './generator/IDataGenerator';
import { RandomGenerator} from './generator/randomGenerator';
import { SineGenerator} from './generator/sineGenerator';
import { BooleanGenerator} from './generator/booleanGenerator';
import { StaticDataGenerator} from './generator/staticDataGenerator';

// Implemented generators
var generatorsType:any =
{
    "random" : RandomGenerator,
    "sine": SineGenerator,
    "boolean" : BooleanGenerator,
    "static" : StaticDataGenerator
};

console.log("Reading config...");
var config = require(process.argv[2]);

console.log("Initializing...")

// Instanciate generators
var generators:Array<IDataGenerator> = 
[
];

config.metrics.forEach(element => {
    if (generatorsType[element.generator] !== null && generatorsType[element.generator] !== undefined){
        var gen:IDataGenerator = new generatorsType[element.generator]();
        gen.init(element.name, element);
        generators.push(gen);
    }
});

// Init fresuencies (acquisition and stats)
var dataRate = config.acquisitionRate;
var statsRate = config.statsRate;

//setTimeout(endGeneration,duration);

// Init base objects
var sender:Sender = new Sender(config.historianUrl);
var collector:Collector = new Collector(sender,config.packetSize);
var lastStats = {
    success:0,
    failed:0,
    error:0,
    requests : 0
}

console.log("Init done :");
console.log(generators.length + " metrics at "+ dataRate + " ms");
console.log("Stats will be sent at " + statsRate + " ms");
// Start process
console.log("Starting...");
var timerId = setInterval(generateData, dataRate);
var statsTimer = setInterval(sendStats,statsRate);

function sendStats()
{
    var newStats = sender.getStats();
    var currentTime = new Date().getTime();
    collector.push(new Data("stats.success",newStats.success-lastStats.success, currentTime, 192));
    collector.push(new Data("stats.failed",newStats.failed-lastStats.failed, currentTime, 192));
    collector.push(new Data("stats.error",newStats.error-lastStats.error, currentTime, 192));
    collector.push(new Data("stats.requests",newStats.requests-lastStats.requests, currentTime, 192));
    collector.push(new Data("stats.pendingRequests",newStats.pendingRequests, currentTime, 192));
    lastStats = newStats;
}

function generateData()
{
    var begin = new Date().getTime();
    generators.forEach(generator => {
        collector.push(generator.generateData());
    });
    var end = new Date().getTime();
    if (end-begin >= dataRate)
    {
        console.log("WARNING : generation rate is too high !! (" + (end-begin) + ")");
    }
}

function endGeneration()
{
    clearInterval(timerId);
    clearInterval(statsTimer);
    console.log("End of collect");
    console.log("Stats = " + JSON.stringify(sender.getStats()));
}

