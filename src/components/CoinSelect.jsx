import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

const CoinSelect = ({ coins, coin, updateCoin }) => {
  const formStyle = {
    ml: 1,
    mr: 1,
    width: 200,
    textAlign: 'left',
  };

  return (
    <FormControl sx={formStyle}>
      <Select
        value={coin}
        onChange={updateCoin}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        }}
      >
        {Object.keys(coins).map((c) => (
          <MenuItem value={c} key={c}>
            {coins[c].name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CoinSelect;
