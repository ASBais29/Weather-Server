const request=require('request')

const keyCode=(latitude,longitude,name,callback)=>{
    const url='http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=V2ulnTdGmp2kUASIJDIaAePSnGvRATaE&q='+latitude+'%2C'+longitude

    request({url: url,json:true}, (error,response)=>{
        if(error)
        {
            callback('Unable to connect to weather service!', undefined)
        }
        else if(response.body.error)
        {
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined,{
                data: response.body.Key,
                location: name
            })
        }
        })
}
module.exports=keyCode
