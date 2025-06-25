import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <AppBar
            position='static'
            elevation={0}
            sx={{
                mb: 4,
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }}
        >
            <Toolbar sx={{ px: 0 }}>
                <Typography
                    variant='h4'
                    component='h1'
                    fontWeight='600'
                    sx={{
                        color: 'text.primary',
                        flexGrow: 1,
                    }}
                >
                    SimpleSwap
                </Typography>

                <Tooltip
                    title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                    <IconButton
                        onClick={toggleTheme}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                                color: 'text.primary',
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
