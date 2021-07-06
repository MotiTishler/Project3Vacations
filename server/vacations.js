const router = require('express').Router()
const myQuery = require('./db')
const {verifyUser, verifyAdmin} = require('./verify')

//get vacations list for a specific user
router.get("/:userID", async(req,res)=>{
    try{
        //create query
        const qry = `SELECT  
            id, name, description, image_path, from_date, DATE_FORMAT(from_date,'%d/%m/%Y') as nice_from_date, to_date,  DATE_FORMAT(to_date,'%d/%m/%Y') as nice_to_date, price, notes, 
            ifnull(vac_count, 0) vac_count, ifnull(is_followed, 0) is_followed
        FROM vacations V 
        left join
        (select vac_id, count(user_id) as vac_count from followers group by vac_id) F on V.id = F.vac_id 
        left join 
        (SELECT vac_id, 1 is_followed FROM blahtours.followers where user_id = ${req.params.userID}) I on V.id = I.vac_id
        WHERE is_active = 1
        ORDER BY is_followed DESC, name, from_date`

        //get data from DB
        const vacs = await myQuery(qry)
        
        //return answer to client
        res.status(200).json({err:false, vacs})

    }catch(err){
        console.log(err)
        res.status(500).json({err:true, msg:err})
    }
})

// add new vacation
router.post("/new", verifyAdmin, async (req,res)=>{
    try{
        //extract vacation's data from req.body
        const { name, description, image_path, from_date, to_date, price, notes } = req.body
        //const {v} = req.body
        //if (!v.name || !v.description || !v.from_date || !v.to_date || !v.price)
        if (!name || !description || !from_date || !to_date || !price)
        return res.status(400).json({ err: true, msg: 'missing some info' })

        //check if vacation alredy exists
        if ((await myQuery(`SELECT * from vacations where name = '${name}' and from_date = '${from_date}' and to_date = '${to_date}'`)).length)
        return res.status(400).json({err:true, msg:'vacation already exists'})

        //create INSERT query
        const qry = `INSERT INTO vacations(name,description,image_path,from_date,to_date,price,notes)
        VALUES("${name}", "${description}" ,"${image_path || ''}" ,DATE_ADD('${from_date}', INTERVAL 3 HOUR) , DATE_ADD('${to_date}', INTERVAL 3 HOUR) ,"${price || 1}" ,"${notes || ''}")`

        //execute query
        await myQuery(qry)
        res.status(201).json({err:false, msg:'vacation was added successfully'})

    }catch(err){
        console.log(err)
        res.status(500).json({err:true, msg:err.message})
    }
})

//follow
router.post("/follow", verifyUser, async(req,res)=>{
    try{
        //extract data from req.body
        const {userID, vacID} = req.body
        if (!userID || !vacID)
        return res.status(400).json({ err: true, msg: 'missing some info' })

        //check if already follows
        if ((await myQuery(`SELECT * from followers where user_id = ${userID} and vac_id = ${vacID}`)).length)
        return res.status(400).json({err:true, msg:'you already follows this vacation'})

        //create INSERT query
        const qry = `INSERT INTO followers(user_id, vac_id)
        VALUES (${userID}, ${vacID})`

        //execute query
        await myQuery(qry)
        res.status(201).json({err:false, msg:'follow was added successfully'})

    }catch(err){
        console.log(err)
        res.status(500).json({err:true, msg:err})
    }
})

//unfollow
router.delete("/follow", verifyUser, async(req,res)=>{
    try{
        //extract data from req.body
        const {userID, vacID} = req.body
        if (!userID || !vacID)
        return res.status(400).json({ err: true, msg: 'missing some info' })

        //create DELETE query
        const qry = `DELETE FROM followers WHERE user_id = ${userID} AND vac_id = ${vacID}`

        //execute query
        await myQuery(qry)
        res.status(200).json({err:false, msg:'follow was deleted successfully'})

    }catch(err){
        console.log(err)
        res.status(500).json({err:true, msg:err})
    }
})

//delete vacation = mark it as not active
router.put('/', verifyAdmin, async (req,res)=>{
    try{
        //extract data from req.body
        const {vacID, isActive} = req.body
        if (!vacID)
        return res.status(400).json({ err: true, msg: 'missing some info' })

        //check if vacation exists
        if (!(await myQuery(`SELECT * from vacations where id = ${vacID} `)).length)
        return res.status(400).json({err:true, msg:"vacation doesn't exists"})

        //create UPDATE query
        const qry = `UPDATE vacations SET is_active = ${isActive} WHERE id = ${vacID}`

        //execute query
        await myQuery(qry)
        res.status(200).json({err:false, msg: `${isActive? 'vacation is active again':'vacation is closed'}`})

    }catch(err){
        console.log(err)
        res.status(500).json({err:true, msg:err})
    }
})

//update (active) vacation
router.put('/update', verifyAdmin, async (req,res)=>{
    try{
        //extract data from req.body
        //const {vacation} = req.body
        //if (!vacation)
        const { id, name, description, image_path, from_date, to_date, price, notes } = req.body
        if (!id || !name || !description || !from_date || !to_date || !price)
        return res.status(400).json({ err: true, msg: 'missing some info' })

        //check if vacation exists
        if (!(await myQuery(`SELECT * from vacations where id = ${id} `)).length)
        return res.status(400).json({err:true, msg:"vacation doesn't exists"})

        //create UPDATE query
        const qry = `UPDATE vacations SET  
                        name = '${name}',
                        description = '${description}',
                        image_path = '${image_path || ""}',
                        from_date = DATE_ADD('${from_date}', INTERVAL 3 HOUR),
                        to_date = DATE_ADD('${to_date}', INTERVAL 3 HOUR),
                        price = ${price},
                        notes = '${notes || ""}'
                    WHERE id = ${id}`

        //execute query
        await myQuery(qry)
        res.status(200).json({err:false, msg: `vacation was updated successfully`})

    }catch(err){
        console.log(err)
        res.status(500).json({err:true, msg:err})
    }
})

module.exports = router