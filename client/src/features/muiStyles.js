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

const tableStyles = {
    backgroundColor: "#1e1e1e",
    width: "100%",
    height: "430px",
    overflow: "auto",
    "&::-webkit-scrollbar": { width: "8px", height: "8px" },
    "&::-webkit-scrollbar-track": { backgroundColor: "#2b2828" },
    "&::-webkit-scrollbar-thumb": { backgroundColor: "orange", borderRadius: "4px" },
    "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "darkorange" }
};

const tableTitle ={
     color: "orange",
      fontWeight: 700,
       width: "40%", 
       position: "sticky", 
       top: 0, zIndex: 1, 
       backgroundColor: "#2b2828" 
    };

export { 
    orangeField, 
    orangeFieldWhite , 
    tableStyles,
    tableTitle
};