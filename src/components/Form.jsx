import React, { useState, useEffect, useMemo } from 'react';
import {
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    Fade,
    Slide,
    Alert,
    Snackbar,
    CircularProgress,
} from '@mui/material';
import {
    SwapHoriz,
    TrendingUp,
    AccountBalanceWallet,
    CheckCircle,
    Error,
} from '@mui/icons-material';
import CoinSelect from './CoinSelect';
import ValueSelect from './ValueSelect';

const useExchangeCalculator = (coins, sellCoin, getCoin) => {
    return useMemo(() => {
        if (!coins || !coins[sellCoin] || !coins[getCoin]) return 0;
        return coins[getCoin].value / coins[sellCoin].value;
    }, [coins, sellCoin, getCoin]);
};

const Form = ({ coins }) => {
    const [sell, setSell] = useState(0);
    const [get, setGet] = useState(0);
    const [sellCoin, setSellCoin] = useState('btc');
    const [getCoin, setGetCoin] = useState('eth');
    const [showSwap, setShowSwap] = useState(false);
    const [isFormLoading, setIsFormLoading] = useState(true);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        type: 'success',
    });

    const exchangeRate = useExchangeCalculator(coins, sellCoin, getCoin);

    // Simulate form loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFormLoading(false);
        }, 800); // Show loading for 800ms

        return () => clearTimeout(timer);
    }, []);

    const recalculateGet = (val) => {
        if (val && val > 0) {
            const calculatedValue = (val * exchangeRate).toFixed(6);
            setGet(calculatedValue);
        } else {
            setGet(0);
        }
    };

    const updateSell = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setSell(value);
        recalculateGet(value);
    };

    const updateGet = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setGet(value);
    };

    const updateSellCoin = (e) => {
        const newCoin = e.target.value;
        if (newCoin === getCoin) {
            setGetCoin(sellCoin);
        }
        setSellCoin(newCoin);
        recalculateGet(sell);
    };

    const updateGetCoin = (e) => {
        const newCoin = e.target.value;
        if (newCoin === sellCoin) {
            setSellCoin(getCoin);
        }
        setGetCoin(newCoin);
        recalculateGet(sell);
    };

    const swapCoins = () => {
        const tempCoin = sellCoin;
        setSellCoin(getCoin);
        setGetCoin(tempCoin);
        recalculateGet(sell);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!sell || sell <= 0) return;

        setShowSwap(true);
        setNotification({
            open: true,
            message: `Successfully exchanged ${sell} ${sellCoin.toUpperCase()} for ${get} ${getCoin.toUpperCase()}`,
            type: 'success',
        });

        setTimeout(() => {
            setGet(0);
            setSell(0);
            setShowSwap(false);
        }, 2000);
    };

    const closeNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (sell > 0) {
                const calculatedValue = (sell * exchangeRate).toFixed(6);
                setGet(calculatedValue);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [sell, exchangeRate]);

    if (isFormLoading) {
        return (
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                minHeight='300px'
                flexDirection='column'
                gap={2}
            >
                <CircularProgress size={60} />
                <Typography variant='body1' color='text.secondary'>
                    Loading exchange form...
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Fade in timeout={800}>
                <Box>
                    <Card
                        elevation={3}
                        sx={{ borderRadius: 3, overflow: 'hidden' }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Box display='flex' alignItems='center' mb={3}>
                                <AccountBalanceWallet
                                    sx={{ mr: 1, color: 'primary.main' }}
                                />
                                <Typography
                                    variant='h5'
                                    component='h2'
                                    fontWeight='600'
                                >
                                    Crypto Exchange
                                </Typography>
                            </Box>

                            <form onSubmit={handleSubmit}>
                                <Grid
                                    container
                                    spacing={3}
                                    alignItems='center'
                                    justifyContent='center'
                                    sx={{ mb: 3 }}
                                >
                                    <Grid item xs={12} md={5}>
                                        <Box
                                            display='flex'
                                            flexDirection='column'
                                            gap={2}
                                            height='100%'
                                        >
                                            <ValueSelect
                                                name='sell'
                                                label='You sell'
                                                text={sell}
                                                updateValue={updateSell}
                                            />
                                            <CoinSelect
                                                coins={coins}
                                                coin={sellCoin}
                                                updateCoin={updateSellCoin}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        md={2}
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <Box
                                            sx={{
                                                p: 1,
                                                borderRadius: '50%',
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 48,
                                                height: 48,
                                                cursor: 'pointer',
                                                transition:
                                                    'all 0.2s ease-in-out',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'primary.dark',
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                            onClick={swapCoins}
                                            title='Swap coins'
                                        >
                                            <SwapHoriz />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={5}>
                                        <Box
                                            display='flex'
                                            flexDirection='column'
                                            gap={2}
                                            height='100%'
                                        >
                                            <ValueSelect
                                                text={get}
                                                updateValue={updateGet}
                                                name='get'
                                                label='You get approximately'
                                                readOnly={true}
                                            />
                                            <CoinSelect
                                                coins={coins}
                                                coin={getCoin}
                                                updateCoin={updateGetCoin}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                {sell > 0 && get > 0 && (
                                    <Slide direction='up' in timeout={500}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                mb: 3,
                                                borderRadius: 2,
                                                backgroundColor: 'info.light',
                                                color: 'info.contrastText',
                                            }}
                                        >
                                            <Box
                                                display='flex'
                                                alignItems='center'
                                            >
                                                <TrendingUp sx={{ mr: 1 }} />
                                                <Typography variant='body2'>
                                                    Exchange Rate: 1{' '}
                                                    {sellCoin.toUpperCase()} ={' '}
                                                    {exchangeRate.toFixed(6)}{' '}
                                                    {getCoin.toUpperCase()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Slide>
                                )}

                                <Box display='flex' justifyContent='center'>
                                    <Button
                                        variant='contained'
                                        type='submit'
                                        size='large'
                                        disabled={!sell || sell <= 0}
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1.1rem',
                                            minWidth: 200,
                                        }}
                                    >
                                        {showSwap
                                            ? 'Processing...'
                                            : 'Exchange Now'}
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </Fade>

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={closeNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={closeNotification}
                    severity={notification.type}
                    icon={
                        notification.type === 'success' ? (
                            <CheckCircle />
                        ) : (
                            <Error />
                        )
                    }
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Form;
