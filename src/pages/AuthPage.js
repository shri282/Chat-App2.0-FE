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
        <Container sx={{ width: '100%', typography: 'body1', marginTop:'5%', marginLeft:'28%', marginBottom:'20px'}}>
            <Box sx={{ width: '44%', backgroundColor: 'white', marginBottom:'10px', padding: '8px', fontSize:'20px' , display: 'flex', justifyContent: 'center', fontWeight:800, color:'grey' }}>
            CHAT-APP
            </Box>
            <Box sx={{ width: '45%', typography: 'body1', backgroundColor: 'white'}}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'}}>
                        <TabList sx={{width:'100%', display:'flex', flexDirection:'row'}} onChange={handleChange} aria-label="lab API tabs example">
                            <Tab sx={{width:'50%', '&.Mui-selected': { background: 'lightblue' }}} label="Login" value="1" />
                            <Tab sx={{width:'50%', '&.Mui-selected': { background: 'lightblue' }}} label="SignUp" value="2" />
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