import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const pages = ['Summary', 'Monitor'];
const pagesURL = ['/Summary', '/Monitor'];

const ResponsiveAppBar = () => {
  return (
    <AppBar position="static" style={{ background: '#ADD8E6' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            color="black"
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 4, display: { xs: 'none', md: 'flex' } }}
          >
            Ma Cloud
          </Typography>

            {pages.map((page, index) => (
                <Button component={Link} to={pagesURL[index]} color="primary">

                    <Typography
                        key={index}
                        variant="body1"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        {page}
                    </Typography>
                </Button>
            ))}

          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
