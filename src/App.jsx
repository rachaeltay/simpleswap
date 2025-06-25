import React from 'react';
import {
    Box,
    Container,
    CircularProgress,
    Alert,
    AlertTitle,
    Fade,
} from '@mui/material';
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import Header from './components/Header';
import Form from './components/Form';
import useCoinGecko from './helper/useCoinGecko';

function AppContent() {
    const [data, error, loading] = useCoinGecko('exchange_rates');

    if (error) {
        return (
            <Container maxWidth='md' sx={{ mt: 4 }}>
                <Alert severity='error' variant='filled'>
                    <AlertTitle>Error</AlertTitle>
                    {`Oops! There was an error: ${error.message}`}
                </Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 3 }}>
            <Container maxWidth='md'>
                <Header />
                <Fade in={!loading} timeout={500}>
                    <Box>
                        {loading ? (
                            <Box
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                minHeight='200px'
                            >
                                <CircularProgress size={60} />
                            </Box>
                        ) : (
                            data && <Form coins={{ ...data.rates }} />
                        )}
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
}

function App() {
    return (
        <ThemeProviderWrapper>
            <AppContent />
        </ThemeProviderWrapper>
    );
}

export default App;
