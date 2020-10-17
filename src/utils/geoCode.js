const request=require('request')

const geoCode=(address,callback)=>{
  const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5zaHVtYW4yOSIsImEiOiJja2diMXo2dDcwY3V1MnBxbjkxcWU4bHZsIn0.Nel1fb_XLqRfsMBFFF66mg'  
  //const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5zaHVtYW4yOSIsImEiOiJja2c3Z2J3c2EwNzVyMndxb29mejE1djVnIn0.CJLTLRMWz57NUOxwrWaseA'
    request({url:url,json:true},(error,response)=>{
     
 
 if(error){
  callback('Unable to connect to net', undefined)
 }else if(response.body.features.length===0)
 {
  callback('Unable to find location', undefined)
 }else{
   callback(undefined,{
     lat:response.body.features[0].center[1],
     lon:response.body.features[0].center[0],
     name: response.body.features[0].place_name
   })
 }
    })
 }
module.exports=geoCode 