import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import LineupItem from '../../Lineup/LineupItem';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 1,
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const BasicTabs = ({ userlineup, userPosts, user }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          {user?.ministry === 'VIA' && <Tab label='Lineup' {...a11yProps(0)} />}
          <Tab label='Posts' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {userlineup.length > 0 ? (
          userlineup.map((l, i) => {
            return (
              <LineupItem
                key={l.id}
                lineup={l}
                isBordered
                isLast={userlineup.length - 1 === i}
              />
            );
          })
        ) : (
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            No lineup yet.
          </Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {userPosts.length > 0 ? (
          userPosts.map((p) => {
            return <LineupItem key={p.id} lineup={p} isBordered />;
          })
        ) : (
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            No post yet.
          </Typography>
        )}
      </TabPanel>
    </Box>
  );
};

export default BasicTabs;
