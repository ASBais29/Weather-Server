const request=require('request')

const forecast=(keycode,location,callback)=>{
    const url='http://dataservice.accuweather.com/forecasts/v1/daily/1day/'+keycode+'?apikey=m0ZB5GwQQXkE07du48MSGmJoiL93HRtG&metric=true'

    request({url: url,json:true}, (error,response)=>{
        if(error)
        {
            callback('Unable to connect', undefined)
        }
        else if(response.body.error)
        {
            callback('URL error', undefined)
        }
        else{
            callback(undefined,{
                data: response.body.DailyForecasts[0].Temperature,
               location:location,
               forecast: response.body.Headline.Text
            })
        }
        })
}
module.exports=forecast