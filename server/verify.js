const myQuery = require('./db')

const verifyUser = (req,res,next)=>{
    return verify(req,res,next, false)
}

const verifyAdmin = (req,res,next)=>{
    return verify(req,res,next, true)
}

const verify = async (req, res, next, flag)=>{
    try{
        const {userID} = req.body
        if (!userID)
            return res.status(400).json({ err: true, msg: 'usrID is missing' })
        
        //get user's data from DB
        const qry = `SELECT * FROM users WHERE id = "${userID}" and is_admin = ${flag}`
        const user = await myQuery(qry)
        if (!user.length) return res.status(400).json({err:true, msg:"You don't have permission to call this route."})

        next()

    }catch(err){
        console.log(err)
        res.status(500).json({err:true, msg:err.message})
    }
}

module.exports = {verifyUser, verifyAdmin}