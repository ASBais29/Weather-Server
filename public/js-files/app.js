//console.log('Client side file is running')

// fetch('http://localhost:3000/weather?address=!').then((response)=>{
// response.json().then((data)=>{
//     if(data.error)
//     {
//         console.log(data.error)
//     }
//     else{
//         console.log(data)
//     }
   
// })
// }) 
const weatherData=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#m1')
const msg2=document.querySelector('#m2')
const msg3=document.querySelector('#m3')
const msg4=document.querySelector('#m4')
msg1.textContent='From Backend: '
weatherData.addEventListener('submit', (event)=>{
    event.preventDefault()
    console.log('Testing')
    const location=search.value
    msg2.textContent=''

fetch('http://localhost:3000/weather?address='+location).then((response)=>{
response.json().then((data)=>{
    if(data.error)
    {
        msg3.textContent=data.error
    }
    else{
        msg3.textContent='Minimum: '+data.data.Minimum.Value+'\n'+'Maximum: '+data.data.Maximum.Value+'\n'+'Location: '+data.location
        msg4.textContent=data.forecast
    }
   
})
}) 


})