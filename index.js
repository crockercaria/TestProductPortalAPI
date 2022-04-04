const fetch = require('node-fetch');
const fs = require('fs');
const env  = require("./env");

//var sprintf = require('sprintf-js').sprintf,
//    vsprintf = require('sprintf-js').vsprintf;
//     msg=sprintf('%6s\t%5d\t%5d     %.2f  %s', )

const current=env.env.PPDEVext;
console.log(current)

var streamBadReqs = fs.createWriteStream("badReqests.txt", {flags:'w'});  
//a for appending
streamBadReqs.write("Bad Request Details\n"); 
streamBadReqs.write( JSON.stringify(current) +"\n"); 

attrQueries =[
    "/products/attributes/network",
	"/products/attributes/analysis_center?type=timeseries",
    "/products/attributes/analysis_center?type=velocities",
    "/products/attributes/reference_frame",
    "/products/attributes/otl_model",
    "/products/attributes/antenna_model",
    "s/products/attributes/ampling_period",  //missing s
    "/products/attributes/format",
    "/products/attributes/network",
    "/products/attributes/analysis_center?type=timeseries",
    "/products/attributes/analysis_center?type=velocities",
    "/products/attributes/reference_frame",
    "/products/attributes/otl_model",
    "/products/attributes/antenna_model",
    "/products/attributes/sampling_period",
    "/products/attributes/format"
]

stnQueries=[
    "/products/stations", //get all stations
]

velQueries=[
    "0026/LTK-EUREF/enu/json?tectonic_plate=EURA",
    "CASC/ROB-EUREF/enu/json",
]

async function fetchData( url ) {
    //console.log("Testing " + url);
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
        streamBadReqs.write( url +"\n"); 
        return null;
    }
    
    /*data.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
        });
        console.log('-------------------');
    });*/
}

async function testQueries( queries ) {

   for (i=0;i<queries.length;i++)
   {
    console.log("<"+queries[i]+">")
    url= current.protocol + "://"+ current.host + current.gf + queries[i];
    const response = await fetchData( url );
  }
}

async function main() {

 await testQueries( attrQueries );

 await testQueries( stnQueries );
}


main();
