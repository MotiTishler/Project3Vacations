import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {follow, unfollow, editVacationsRequest, deleteVacation} from '../actionCreators' 

import { Card, Typography, Badge, Grid , IconButton, CardActionArea, CardActions, CardMedia, CardContent, makeStyles} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const cardStyles = makeStyles({
    root: {
        maxWidth: 345,
      },
      media: {
        height: 190,
      },
})

export default function VacationCard({vacation, myPush}) {
    const user = useSelector(state=>state.user.data)
    const dispatch = useDispatch()

    const onFolloew = async ()=>{

        // send POST to server
        await dispatch(follow(user.id , vacation.id))

    }

    const onUnFolloew = async ()=>{
        
        //send DELETE to server (from followers table)
        await dispatch(unfollow(user.id , vacation.id))

    }

    const onEdit = async ()=>{
        
        // send vacationID to global state
        await dispatch(editVacationsRequest(vacation.id))
        
        // open addit.jsx to edit vacation
        myPush('/edit')
    }

    const onDelete = async ()=>{
        
        //send DELETE to server (from vacations table) 
        await dispatch(deleteVacation(vacation.id, user.id, false))
    }

    useEffect(()=>{
        //console.log(vacation)
    },[])

    const classes = cardStyles()
    
    return (
        <div>
            <Grid item>
                <Card variant="outlined" className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                                className={classes.media}
                                image={`/images/${vacation.image_path}`} 
                                title="vacation image"
                                alt="vacation image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" >
                                {vacation.name}
                            </Typography>
                            <Typography gutterBottom variant="body2" color="textSecondary" >
                                {vacation.description}
                            </Typography>
                            <Typography gutterBottom variant="body2" color="textSecondary" >
                                {vacation.from_date? `${vacation.nice_from_date} - ${vacation.nice_to_date}`:"All year long."}
                            </Typography>
                            <Typography gutterBottom variant="body2" color="textSecondary" >
                                {vacation.price? ` ${vacation.price} NIS` : "FREE! Don't call us, we'll call you!"}
                            </Typography>
                            <Typography gutterBottom variant="body2" color="textSecondary" >
                                {vacation.notes}
                            </Typography>    
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {user.is_admin? (
                            <>
                                <IconButton aria-label="edit" onClick={onEdit}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={onDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        ):vacation.is_followed? (
                            <>
                                <IconButton aria-label="follow"  onClick={onUnFolloew}>
                                    <FavoriteIcon style={{fill: "red"}}/>
                                </IconButton>
                                <Badge badgeContent={vacation.vac_count} color="primary"></Badge>
                            </>
                        ):(
                            <>
                                <IconButton aria-label="follow"  onClick={onFolloew}>
                                    <FavoriteBorderIcon style={{fill: "grey"}}/>
                                </IconButton>
                                <Badge badgeContent={vacation.vac_count} color="primary"></Badge>
                            </>
                        )}
                    </CardActions>
                </Card>
            </Grid>   
        </div>
    )
}
