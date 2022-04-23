
import React, { useState, useEffect } from 'react';
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
                setDataset(driDict)
                let speedDict = currentSpeed
                speedDict[result[i]] = 0
                setCurrentSpeed(speedDict)
            }
        })
    }
    
    useEffect(() => {
        dummy()
        const insert_interval = setInterval(async() => {
            for (let i = 0; i<driverList.length; i++){
                var url = "https://x5do3lvlbc.execute-api.us-east-1.amazonaws.com/insertSpeedTick/"+driverList[i]
                await fetch(url, requestOptions)
                    .then(response => response.json())
                    .catch(error => console.log('error', error)); 
                var driverID = driverList[i]
                var url = "https://x5do3lvlbc.execute-api.us-east-1.amazonaws.com/getSpeedHistory/"+driverID
                await fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        let driDict = dataset
                        driDict[driverID] = result
                        setDataset({...driDict})
                        let speedDict = currentSpeed
                        speedDict[driverID] = result[result.length-1][1]
                        setCurrentSpeed({...speedDict})
                        console.log("Updated")
                    })
                    .catch(error => console.log('error', error));
            }
            }, 1000);
        return () => {clearInterval(insert_interval)}
      },[]);
      

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
                                        <Typography variant="body1">
                                            <b>{driverID}</b> Current Speed: {currentSpeed[driverID]}
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid>
                                    <Item xs={12}>
                                        <Chart data={dataset[driverID]}></Chart>
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