import { Autocomplete, Avatar, TextField } from '@mui/material';

const CryptoSelector = ({ selected, onChange, options = [] }) => {

  return (
    <Autocomplete
      options={options}
      value={selected}
      getOptionLabel={(option) => option.name}
      onChange={(_, newValue) => onChange(newValue)}
      isOptionEqualToValue={(option, value) => option.symbol === value?.symbol}
      renderOption={(props, option) => (
        <li {...props}>
          <Avatar src={option.logo_url} alt={option.symbol} sx={{ width: 24, height: 24, mr: 1 }} />
          {option.name} ({option.symbol})
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Criptomoneda"
          variant="outlined"
          fullWidth
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            },
          }}
        />
      )}
      sx={{ mt: 2 }}
    />
  );
};

export default CryptoSelector;
