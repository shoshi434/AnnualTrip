const orangeField = {
        '& label.Mui-focused': { color: 'darkorange' },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: 'orange' },
            '&.Mui-focused fieldset': { borderColor: 'darkorange' },
        },
    };

const orangeFieldWhite = {
        '& label': { color: 'white' },
        '& label.Mui-focused': { color: 'darkorange' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'orange' },
            '&.Mui-focused fieldset': { borderColor: 'darkorange' },
        },
        '& .MuiInputBase-input': { color: 'white' },
    };

export { orangeField, orangeFieldWhite };