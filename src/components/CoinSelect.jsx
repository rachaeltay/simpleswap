import React from 'react';
import {
  FormControl, Select, MenuItem, Grid, TextField,
} from '@mui/material';

function CoinSelect(props) {
  const {
    coins, coin, text, updateCoin, updateText, label, name, readOnly = false,
  } = props;
  const itemStyle = { mt: 2, mb: 2 };
  const formStyle = {
    ml: 1, mr: 1, width: 200, textAlign: 'left',
  };

  return (
    <Grid item sx={itemStyle}>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        type="number"
        name={name}
        onChange={updateText}
        value={text}
        InputProps={{ inputProps: { min: 0, readOnly } }}
      />
      <FormControl sx={formStyle}>
        <Select
          value={coin}
          onChange={updateCoin}
        >
          {Object.keys(coins).map((c) => <MenuItem value={c} key={c}>{coins[c].name}</MenuItem>)}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default CoinSelect;
