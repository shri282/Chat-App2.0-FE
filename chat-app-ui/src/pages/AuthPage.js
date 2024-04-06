import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { Container } from '@mui/material';

function AuthPage() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <Container sx={{ width: '100%', typography: 'body1', margin:'250px', marginLeft: '500px'}}>
            <Box sx={{ width: '44%', backgroundColor: 'white', marginBottom:'10px', padding: '8px', fontSize:'20px' , display: 'flex', justifyContent: 'center'}}>CHAT-APP</Box>
            <Box sx={{ width: '45%', typography: 'body1', backgroundColor: 'white'}}>
                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Item One" value="1" />
                    <Tab label="Item Two" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"><Login></Login></TabPanel>
                <TabPanel value="2"><SignUp></SignUp></TabPanel>
                </TabContext>
            </Box>
        </Container>
    );
}

export default AuthPage