import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
function Welcome(){

    return (
        <div>
            <Container >
                <Grid m={2}>
                <Typography variant='h3' style={{display: 'inline-block'}}>
                    Welcome !
                </Typography>   
                </Grid>
                <Grid m={2}>
                <Typography variant='h4' style={{display: 'inline-block'}}>
                This is a simple web application built by
                </Typography>
                </Grid>
                <Grid m={2}>
                <Typography variant='h4' style={{display: 'inline-block'}}>
                ZENG, Qianxin 20020238D
                </Typography>
                </Grid>
                <Grid m={2}>
                <Typography variant='h4' style={{display: 'inline-block'}}>
                Leung Chun Ho, Alvin 20024387d
                </Typography>
                </Grid>


            </Container>

        </div>
    )
}

export default Welcome;