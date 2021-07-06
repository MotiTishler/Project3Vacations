const router = require('express').Router()

const myQuery = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/register', async (req,res)=>{
    try{

        const {name, username, password} = req.body
        if (!name || !username || !password)
        return res.status(400).json({ err: true, msg: 'missing some info' })
        
        //check username is unique
        const u = await myQuery(`SELECT * from users where username = '${username}'`)
        if (u.length) return res.status(400).json({err:true, msg:'username already exists'})

        //hash password
        const hash = await bcrypt.hash(password, 10)

        //create query
        const qry = `INSERT INTO users(name, username, pwd) VALUES ("${name}", "${username}", "${hash}")`

        //run query to save user in DB
        await myQuery(qry)
        res.status(201).json({err:false, msg:'user was added successfully'})
    }catch(err){
        console.log(err)
        res.status(500).json({err:true, msg:err})
    }

})

router.post('/login', async (req,res)=>{
    try{
        const {username, password} = req.body
        if (!username || !password)
            return res.status(400).json({ err: true, msg: 'missing some info' })
        
        //get user's data from DB
        const qry = `SELECT * FROM users WHERE username = "${username}"`
        const user = await myQuery(qry)
        if (!user.length) return res.status(400).json({err:true, msg:'no such username'})

        //make sure data is correct
        const correctPWD = await bcrypt.compare(password, user[0].pwd)        
        if (!correctPWD) return res.status(401).json({err:true, msg:'wrong password'})
        
        //create token
        const token = jwt.sign({
            ...user[0], // set all data from DB in the token
            pwd:'My Secret Password? Really?'   //except of the password
        },
        process.env.MY_SECRET_KEY)

        //return token to user
        res.status(200).json({err:false, token})

    }catch(err){
        console.log(err)
        res.status(500).json({err:true, msg:err.message})
    }
})

module.exports = router