import React from 'react';
import { withFirebase } from  '../Firebase';
import loader from './loader.gif';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PoolIcon from '@mui/icons-material/Pool';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { GiHighKick, GiButterflyKnife, GiPistolGun, GiBoxingGlove } from "react-icons/gi";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

function ActivityList(props) {
    const {loading, activities, editActivity,setOpenSnackbar, setSnackbarMsg, setEditing} = props;

    const deleteActivity = (i) => {
        // Get key of activity in firebase
       const activityKey = Object.keys(activities)[i];
       // Connect to our firebase API
       const emptyActivity = {
            date: null,
            duration: null,
            type: null,
            name: null,
       };

       props.firebase.updateActivity(props.authUser.uid, emptyActivity, activityKey);

       // Show notification
       setOpenSnackbar(true);
       setSnackbarMsg('Deleted activity');
       setTimeout(() => {
        setOpenSnackbar(false)
       }, 3000)

       // stop editing
       setEditing(false);
    }

    return (
        <>
            { 
                loading === true 
                    ? <img src={loader} alt={loader}></img> 
                    : ''
            }
            
            {
                activities === 'not set' || activities === null
                    ? <p>No activities added yet.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                Object.values(activities).map((activity, i) => {
                                    let {name, type, duration} = activity;
                                    switch(activity.type) {
                                        case 1:
                                            type = "Weights";
                                            break;
                                        case 2:
                                            type = "Running";
                                            break;
                                        case 3:
                                            type = "Swimming";
                                            break;
                                        case 4:
                                            type = <>Basketball<SportsBasketballIcon/></>;
                                            break;
                                        case 5:
                                            type = "Recovery";
                                            break;
                                        case 6:
                                            type = "Muy Thai";
                                            break;
                                        case 7:
                                            type = "Krav Maga";
                                            break;
                                        case 8:
                                            type = "Boxing";
                                            break;
                                        case 9:
                                            type = "Cycling";
                                            break;
                                        default:
                                            type = "Not set";
                                    };
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{type}</TableCell>
                                            <TableCell>{duration}</TableCell>
                                            <TableCell>
                                                <DeleteIcon 
                                                    onClick={e => deleteActivity(i)}
                                                />
                                                <EditIcon
                                                    onClick={e => editActivity(activity, i)}
                                                    style={{marginLeft:"20px"}}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};

export default withFirebase(ActivityList);