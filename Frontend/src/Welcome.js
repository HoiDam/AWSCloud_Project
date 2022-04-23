import { Container } from "@mui/material";
import { Typography } from "@mui/material";

function Welcome(){

    return (
        <div>
            <Container >
                <Typography variant='h4' style={{display: 'inline-block'}}>
                    Welcome !
                    
                    This is a simple web application built by

                    ZENG, Qianxin 20020238D
                    Leung Chun Ho, Alvin 20024387d
                </Typography>

            </Container>

        </div>
    )
}

export default Welcome;