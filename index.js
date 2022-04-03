const fetch = require('node-fetch');

//https://glass.epos.ubi.pt:8080/GlassFramework/webresources/products/attributes/network

const PPPROD='https://glass.epos.ubi.pt:8080/GlassFramework/webresources';
const PPDEV='http://10.0.7.65:8083/GlassFramework/webresources';

const localhost='http://localhost:8080/GlassFramework/webresources';

const base=PPPROD;

const attribuites="/products/attributes/"
const stations="/products/"

attrQueries =[
    "network",
	"analysis_center?type=timeseries",
    "analysis_center?type=velocities",
    "reference_frame",
    "otl_model",
    "antenna_model",
    "sampling_period",
    "format",
    "network",
    "analysis_center?type=timeseries",
    "analysis_center?type=velocities",
    "reference_frame",
    "otl_model",
    "antenna_model",
    "sampling_period",
    "format"
]

stnQueries=[
    "stations", //get all stations
]

velQueries=[
    "0026/LTK-EUREF/enu/json?tectonic_plate=EURA",
    "CASC/ROB-EUREF/enu/json",
]

async function fetchData( url ) {
    console.log("Testing " + url);
    try {
	    response = await fetch(url);
        const data = await response.json();
        if ( Array.isArray(data) )
            console.log("Data is Array Length "+data.length);
        else
            console.log("Data is typeof " + typeof (data) );
        //console.log(data);
        return data;
    } catch (error) {
	    console.log("FAILED ")
        console.log(error);
        return null;
    }
    
    /*data.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
        });
        console.log('-------------------');
    });*/
}

async function testQueries( type ,queries ) {

   for (i=0;i<queries.length;i++)
   {
    console.log("<"+queries[i]+">")
    url=base + type + queries[i];
    const response = await fetchData( url );
  }
}

async function main() {

 await testQueries( attribuites,attrQueries );

 await testQueries( stations, stnQueries );
}


main();