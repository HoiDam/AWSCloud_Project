
import React, { useState, useEffect, useReducer } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Chart from './Chart';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Monitor(){

    const [driverList,setDriverList] = useState([]);
    const [dataset,setDataset] = useState({});
    const [currentSpeed,setCurrentSpeed] = useState({});
    const [overspeed,setOverspeed] = useState(1);

    const [updated,setUpdated] = useState(0);

    let requestOptions = {
        method: 'GET'        
    };
    let dummy = () => {
        fetch("https://x5do3lvlbc.execute-api.us-east-1.amazonaws.com/getDriverList", requestOptions)
        .then(response => response.json())
        .then(result => {
            setDriverList(result)
            for (let i = 0; i < result.length; i++) {
                let driDict = dataset
                driDict[result[i]] = []
                // console.log(driverID)
                setDataset({...driDict})
                let speedDict = currentSpeed
                speedDict[result[i]] = 0
                setCurrentSpeed({...speedDict})
            }
        })
        fetch("https://x5do3lvlbc.execute-api.us-east-1.amazonaws.com/getOverspeedThreshold", requestOptions)
        .then(response => response.json())
        .then(result => {
            setOverspeed(result["overspeedThreshold"])
        })

    }
    
    async function updateDatabase(){
        let driDict = dataset
        let speedDict = currentSpeed
        for (let i = 0; i<driverList.length; i++){
            var url = "https://x5do3lvlbc.execute-api.us-east-1.amazonaws.com/insertSpeedTick/"+driverList[i]
            await fetch(url, requestOptions)
                .then(response => response.json())
            var driverID = driverList[i]
            var url = "https://x5do3lvlbc.execute-api.us-east-1.amazonaws.com/getSpeedHistory/"+driverID
            await fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    driDict[driverID] = result
                    speedDict[driverID] = result[result.length-1][1]
                })
        }
        setCurrentSpeed({...speedDict})
        setDataset({...driDict})
        setUpdated(updated+1)
        console.log("Updated",updated)
    }
    
    useEffect(() => {
        if (updated == 0){
            dummy()
        }
        const interval = setInterval(async() => {
            updateDatabase()
        }, 3000);
        return () => {clearInterval(interval)}
    },[updated]);
      

    return (
        <div>
            <Container maxWidth="xl">
                {/* {dataset === {} ? <Typography variant="h4">Loading...</Typography> :
                    <div> */}
                {driverList.map((driverID, index) => (
                    <div>
                        {dataset[driverID] === [] ? <Typography variant="h4">Loading...</Typography> :
                            <div>
                                <Grid>
                                    <Item xs={12}>
                                        {currentSpeed[driverID] >= overspeed ? 
                                        <Typography variant="body1" style={{color: 'red'}}>
                                            <b>{driverID}</b> Current Speed: {currentSpeed[driverID]} (OVERSPEEDING)
                                        </Typography>
                                        :
                                        <Typography variant="body1">
                                            <b>{driverID}</b> Current Speed: {currentSpeed[driverID]}
                                        </Typography>
                                        }
                                        
                                    </Item>
                                </Grid>
                                <Grid>
                                    <Item xs={12}>
                                        <Chart data={dataset[driverID]} driverID={driverID}></Chart>
                                    </Item>
                                </Grid> 
                            </div>
                        }
                    </div>
                ))}
                {/* </div> } */}
            </Container>
        </div>
    )
}

export default Monitor;