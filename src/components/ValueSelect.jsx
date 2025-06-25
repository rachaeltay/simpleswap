import React from 'react';
import { TextField, Box } from '@mui/material';

const ValueSelect = ({ label, name, updateValue, text, readOnly = false }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <TextField
                id={`${name}-field`}
                label={label}
                variant='outlined'
                type='number'
                name={name}
                onChange={updateValue}
                value={text}
                fullWidth
                InputProps={{
                    inputProps: {
                        min: 0,
                        readOnly,
                        step: 'any',
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        fontSize: '1.1rem',
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                    },
                }}
            />
        </Box>
    );
};

export default ValueSelect;
