const express =require('express')
const path = require('path'); 
const hbs=require('hbs')
const app=express()
const geoCode=require('./utils/geoCode.js')
const forecast=require('./utils/forecast.js')
const keyCode=require('./utils/keyCode.js')


//define paths for Express cofiguration
const indexpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const parpath=path.join(__dirname,'../templates/partials')

//Setup handlebars engone and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(parpath)
//setup static directory to serve 
app.use(express.static(indexpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Anshuman Bais'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Anshuman Bais'
    })
})

app.get('/help',(req,res)=>{ 
    res.render('help',{
        title:'Help',
       msg:'Everything will be alright',
       name: 'Anshuman Bais' 
    })
})

app.get('/weather',(request,response)=>{
    if(!request.query.address)
    {
       return response.send({
            error: 'Address not provided.'
        })
    }

            geoCode(request.query.address,(error,data)=>{
              
                if(error)
                {
                    return response.send({error})
                }
                
                keyCode(data.lat,data.lon,data.name,(error,data)=>{
                    if(error)
                    {
                        return response.send({error})
                    }
                 // console.log(keydata.data)  
                      forecast(data.data,data.location,(error,data)=>{
                        if(error)
                        {
                            return response.send({error})
                        }
                        response.send(data)
                
                      })
                
                
                    })
                
                })


        

    
})
app.get('/help/*',(request,response)=>{
    response.render('404',{
        title:'Error',
        perror:'Help section not found',
        name:'Anshuman Bais'
    })
})
app.get('*',(request,response)=>{
    response.render('404',{
        title:'Error',
        perror:'Page Not found!',
        name:'Anshuman Bais'
    })
})

app.listen(3000,()=>{
    console.log('Server is running good and fine...')
})