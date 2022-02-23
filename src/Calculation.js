
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const DefaultValues = {
  totalTime: 120,
  loadTime: 1,
  unloadTime: 2,
  boatsCount: 20,
  locationTime: 10
}

const Calculation = () => {
  const classes = useStyles();

  const [totalTime, setTotalTime] = useState(DefaultValues.totalTime);
  const [loadTime, setloadTime] = useState(DefaultValues.loadTime);
  const [unloadTime, setUnloadTime] = useState(DefaultValues.unloadTime);
  const [boatsCount, setBoatsCount] = useState(DefaultValues.boatsCount);
  const [locationTime, setLocationTime] = useState(DefaultValues.locationTime);

  const [amount, setAmount] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const queryString = new URLSearchParams({
      totalTime, loadTime, unloadTime, boatsCount, locationTime
    }).toString();
    fetch(`http://localhost:5000/stones-amount?${queryString}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAmount(data.amount)
      })
  };
  const setAsDefault = e => {
    e.preventDefault();
    setAmount(null)
    setTotalTime(DefaultValues.totalTime)
    setloadTime(DefaultValues.loadTime)
    setUnloadTime(DefaultValues.unloadTime)
    setBoatsCount(DefaultValues.boatsCount)
    setLocationTime(DefaultValues.locationTime)
  }

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Total Time"
          variant="filled"
          value={totalTime}
          type="number"
          min={1}
          max={100}
          required
          onChange={e => {setTotalTime(e.target.value); setAmount(null)}}
        />

        <TextField
          label="A block loading time"
          variant="filled"
          value={loadTime}
          type="number"
          min={1}
          max={100}
          required
          onChange={e => {setloadTime(e.target.value); setAmount(null)}}
        />

        <TextField
          label="A block Unloading time"
          variant="filled"
          value={unloadTime}
          type="number"
          min={1}
          max={100}
          required
          onChange={e => {setUnloadTime(e.target.value); setAmount(null)}}
        />

        <TextField
          label="Total number of Boats"
          variant="filled"
          value={boatsCount}
          type="number"
          min={1}
          max={100}
          required
          onChange={e => {setBoatsCount(e.target.value); setAmount(null)}}
        />

        <TextField
          label="Time between locations"
          variant="filled"
          value={locationTime}
          type="number"
          min={1}
          max={100}
          required
          onChange={e => {setLocationTime(e.target.value); setAmount(null)}}
        />

        <div>
          <Button variant="contained" color="secondary" onClick={setAsDefault}>
            Set As default
          </Button>
        </div>

        <div>
          <Button type="submit" variant="contained" color="primary">
            Get Maxium Amounts of stones
          </Button>
        </div>
      </form>
      {amount === 0 && <p>No Delivered Stones</p>}
      {amount > 0 && <h4 color="primary">You can deliver a maximum of {amount} stones now.</h4>}
    </>
  );
};

export default Calculation;