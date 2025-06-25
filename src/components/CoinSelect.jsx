import React from 'react';
import { FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material';

const CoinSelect = ({ coins, coin, updateCoin }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
                <InputLabel id='coin-select-label'>Select Coin</InputLabel>
                <Select
                    labelId='coin-select-label'
                    value={coin}
                    onChange={updateCoin}
                    label='Select Coin'
                    sx={{
                        fontSize: '1.1rem',
                    }}
                >
                    {Object.keys(coins).map((c) => (
                        <MenuItem value={c} key={c} sx={{ fontSize: '1rem' }}>
                            {coins[c].name} ({c.toUpperCase()})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CoinSelect;
