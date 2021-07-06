// init.
const express = require('express')
const app = express()

app.use(require('cors')())

app.use(express.json())

const env = require('dotenv')
env.config()

const myQuery = require('./db') 

const {verifyAdmin} = require('./verify')

//middlewares
app.use('/user', require('./users'))
app.use('/vacation', require('./vacations'))


//server routes
app.get('/hello', (req,res)=>{
    return res.status(200).send("Hello")
})

app.get('/report', async (req,res)=>{
    try{
        //create query
        const qry = `SELECT id, name, vac_count, is_active FROM vacations V 
        join
        (select vac_id, count(user_id) as vac_count from followers group by vac_id) F 
        on V.id = F.vac_id 
        ORDER BY vac_count DESC, name`

        //get data from DB
        const data = await myQuery(qry)
        
        //return answer to client
        await myQuery(qry)
        res.status(200).json({err:false, data})

    }catch(err){
        console.log(err)
        res.status(500).json({err:true, msg:err})
    }
})

//listen
const port = 1000
app.listen(port, ()=>console.log(`server is running on port ${port}`))