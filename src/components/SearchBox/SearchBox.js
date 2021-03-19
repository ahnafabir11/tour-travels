import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const SearchBox = ({ handleDestination, selectedDate, handleDateChange, handleSearch })=> {
  return (
    <div>
      <TextField
        className="my-2 w-100"
        label="Pick From"
        variant="outlined"
        name='pickFrom'
        onChange={handleDestination}
      />
      <TextField
        className="my-2 w-100"
        label="Pick To"
        variant="outlined"
        name='pickTo'
        onChange={handleDestination}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className="w-100 my-2"
          margin="normal"
          label="Selete Date"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <Button
        className="w-100 my-2"
        variant="contained"
        color="primary"
        size="large"
        style={{ backgroundColor: '#fd8350' }}
        onClick={handleSearch}
      > Search
      </Button>
    </div>
  )
}

export default SearchBox
