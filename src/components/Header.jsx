import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Tooltip,
    Chip,
} from '@mui/material';
import {
    Brightness4,
    Brightness7,
    CurrencyExchange,
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <AppBar
            position='static'
            elevation={0}
            sx={{
                mb: 4,
                borderRadius: 3,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            }}
        >
            <Toolbar>
                <Box display='flex' alignItems='center' flexGrow={1}>
                    <CurrencyExchange sx={{ mr: 2, fontSize: 32 }} />
                    <Typography variant='h4' component='h1' fontWeight='bold'>
                        SimpleSwap
                    </Typography>
                </Box>

                <Tooltip
                    title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                    <IconButton
                        onClick={toggleTheme}
                        color='inherit'
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                            },
                        }}
                    >
                        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
