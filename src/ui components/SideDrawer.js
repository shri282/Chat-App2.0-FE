import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

const drawerWidth = 55;

export default function SideDrawer(props) {
    const { navs } = props;
    const defaultBody = navs.find((ele) => ele.default);
    const [body, setBody] = React.useState(defaultBody);

    const topNavs = navs.slice(0, -2);
    const bottomNavs = navs.slice(-2);

    const renderNavList = (navList) => (
        <List sx={{ py: 1 }}>
            {navList.map((nav, index) => (
                <ListItem sx={{ width: 45, margin: 0.5 }} key={nav.id} disablePadding>
                    <ListItemButton
                        onClick={() => setBody(nav)}
                        selected={body?.name === nav.name}
                        sx={{
                            borderRadius: 2,
                            '&:hover': { backgroundColor: '#f0f0f0' },
                            '&.Mui-selected': {
                                backgroundColor: '#e0e0e0',
                                '&:hover': { backgroundColor: '#d5d5d5' },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ marginLeft: -0.5, minWidth: 26 }}>
                            {nav.icon}
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {renderNavList(topNavs)}
            {renderNavList(bottomNavs)}
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                {drawer}
            </Drawer>

            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    width: `calc(100% - ${drawerWidth}px)`,
                    height: '100vh',
                    overflow: 'hidden',
                    ml: `${drawerWidth}px`,
                    transition: 'margin 0.3s, width 0.3s',
                }}
            >
                {body.component.left}
                {body.component.right}
            </Box>
        </Box>
    );
}