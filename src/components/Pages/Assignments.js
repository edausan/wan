import React, { useContext, useState } from 'react';
import { Grid, Card, Typography, Fab } from '@mui/material';
import SetAssignment from './Assignment/SetAssignment';
import { Add, AddCircleOutlineTwoTone } from '@mui/icons-material';
import { AppCtx } from './../../App';
import { Link } from 'react-router-dom';

const Assignments = () => {
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{ height: '100vh', paddingBottom: 150 }}
    >
      {[1, 2, 3].map(() => {
        return <SetAssignment isViewing={true} />;
      })}

      <Link
        to={`/assignments/new`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Fab
          sx={{
            position: 'fixed',
            bottom: 66,
            right: 16,
          }}
        >
          <Add />
        </Fab>
      </Link>
    </Grid>
  );
};

export default Assignments;
