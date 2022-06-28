import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { IconButton, Typography } from '@mui/material';
import {
  AccountCircleTwoTone,
  AddCircleOutline,
  Event,
  EventTwoTone,
  ExpandMore,
  MicTwoTone,
  MoreVert,
  SaveAltOutlined,
  SaveOutlined,
  Schedule,
  SupervisedUserCircleTwoTone,
  TodayTwoTone,
} from '@mui/icons-material';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '../../../Firebase';
import { GetVIA } from './../../../Firebase/authApi';
import { SetAssignments } from '../../../Firebase/assignmentApi';
import { useHistory } from 'react-router-dom';

const auth = getAuth(FirebaseApp);
const SetAssignment = ({ isViewing }) => {
  const history = useHistory();
  const user = auth.currentUser;

  const [viewing, setViewing] = useState(isViewing);
  const [via, setVia] = useState([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [assignments, setAssignments] = useState({
    belleview: {
      date: null,
      wl: null,
      backups: [],
    },
    lumina: {
      date: null,
      wl: null,
      backups: [],
    },
    youth: {
      date: null,
      wl: null,
      backups: [],
    },
  });

  console.log({ assignments });

  useEffect(() => {
    setViewing(isViewing);
  }, [isViewing]);

  useEffect(() => {
    handleGetVIA();
  }, []);

  const handleSetAssignments = async () => {
    setSaving(true);
    const res = await SetAssignments({ assignments });

    if (res) {
      setSaving(false);
      setSuccess(true);
      history.push('/assignments');
      console.log({ res });
    }
  };

  const handleGetVIA = async () => {
    const VIA = await GetVIA();
    const altered = VIA.map((v) => {
      return {
        ...v,
        is_wl: false,
        is_backup: false,
        location: null,
      };
    });
    setVia(altered);
  };

  console.log({ via });

  const commonProps = {
    setAssignments,
    setViewing,
    viewing,
    via,
    setVia,
  };

  return (
    <Card sx={{ width: '100%', mb: 2 }}>
      <CardHeader
        avatar={<Avatar src={user.photoURL} alt={user.displayName} />}
        title={user.displayName}
        subheader={moment().startOf('seconds').fromNow()}
        action={
          <IconButton aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant='h6'>Assignments</Typography>
        <Service
          title='Belleview'
          expand
          assignment={assignments.belleview}
          {...commonProps}
        />
        <Service
          title='Lumina'
          isLumina
          assignment={assignments.lumina}
          {...commonProps}
        />
        <Service
          title='Youth Service'
          isYS
          assignment={assignments.youth}
          {...commonProps}
        />
      </CardContent>
      {assignments.belleview.date &&
        assignments.belleview.wl &&
        assignments.belleview.backups.length > 0 && (
          <>
            <Divider />
            <CardActions sx={{ justifyContent: 'right' }}>
              <Button
                startIcon={<SaveOutlined />}
                onClick={handleSetAssignments}
              >
                Save
              </Button>
            </CardActions>
          </>
        )}
    </Card>
  );
};

const Service = ({
  title,
  via,
  setVia,
  expand,
  isLumina,
  isYS,
  assignment,
  viewing,
  setAssignments,
  setViewing,
}) => {
  const user = auth.currentUser;
  const [date, setDate] = useState(new Date());
  const [worshipLeader, setWorshipLeader] = useState(null);
  const [recentWL, setRecentWL] = useState(null);
  const [backups, setBackups] = useState([]);
  const [expanded, setExpanded] = useState(expand);

  useEffect(() => {
    switch (title) {
      case 'Belleview':
        setAssignments((ass) => ({
          ...ass,
          belleview: {
            date,
            wl: worshipLeader,
            backups,
          },
        }));
        break;
      case 'Lumina':
        setAssignments((ass) => ({
          ...ass,
          lumina: {
            date,
            wl: worshipLeader,
            backups,
          },
        }));
        break;
      case 'Youth Service':
        setAssignments((ass) => ({
          ...ass,
          youth: {
            date,
            wl: worshipLeader,
            backups,
          },
        }));
        break;

      default:
        break;
    }
  }, [worshipLeader, backups, date]);

  useEffect(() => {
    getSundayOfCurrentWeek();
  }, []);

  useEffect(() => {
    worshipLeader && handleUpdateVIA();
  }, [worshipLeader]);

  useEffect(() => {
    const updated = via.map((v) => {
      const idx = backups.findIndex((b) => b === v.uid);
      if (idx >= 0) {
        return {
          ...v,
          is_backup: true,
          location: title,
        };
      } else {
        return {
          ...v,
          is_backup: false,
          location: null,
        };
      }
    });

    setVia(updated);
  }, [backups]);

  const handleRemoveWL = () => {
    console.log({ recentWL, worshipLeader });
    const updated = via.map((v) => {
      if (v.uid === recentWL) {
        return {
          ...v,
          is_wl: false,
          location: null,
        };
      }

      return v;
    });

    setRecentWL(worshipLeader);
    // setVia(updated);
    setTimeout(() => {
      handleUpdateVIA(updated);
    }, 100);
  };

  const handleDateChange = (newValue) => {
    console.log({ newValue });
    setDate(newValue);
  };

  const handleUpdateVIA = (update) => {
    const vias = update || via;
    const updated = vias.map((v) => {
      if (v.uid === worshipLeader) {
        return {
          ...v,
          is_wl: true,
          location: title,
        };
      } else {
        return {
          ...v,
          is_wl: false,
          location: null,
        };
      }
    });

    setVia(updated);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setBackups(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const getSundayOfCurrentWeek = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const last = first + (isYS ? 4 : 6);

    const sunday = new Date(today.setDate(last));
    setDate(sunday);
    return sunday;
  };

  return (
    <Accordion
      expanded={expanded}
      disableGutters
      sx={{ boxShadow: 'none', py: 0, background: 'none' }}
    >
      <AccordionSummary
        sx={{ px: 0 }}
        expandIcon={<ExpandMore />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        onClick={() => setExpanded(!expanded)}
      >
        <ListItem sx={{ py: 0 }}>
          <ListItemText
            primary={isYS ? 'Youth Service' : `Worship Service | ${title}`}
            primaryTypographyProps={{ sx: { fontSize: 14, width: 190 } }}
          />
          <ListItemText
            secondary={moment(date).format('l')}
            secondaryTypographyProps={{ sx: { fontSize: 12 } }}
          />
        </ListItem>
      </AccordionSummary>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            {!viewing ? (
              <IconButton onClick={getSundayOfCurrentWeek} sx={{ p: 0 }}>
                <EventTwoTone color='secondary' />
              </IconButton>
            ) : (
              <EventTwoTone />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  inputFormat='dddd LL'
                  label='Date'
                  value={viewing ? assignment.date : date}
                  onChange={(value) => handleDateChange(value)}
                  disabled={viewing}
                  renderInput={(params) => {
                    console.log({ params });
                    return (
                      <TextField
                        {...params}
                        fullWidth
                        size='small'
                        variant='standard'
                        sx={
                          viewing
                            ? {
                                '& > .MuiInput-root:before': {
                                  borderBottomStyle: 'none !important',
                                },
                                '& svg': {
                                  display: 'none',
                                },
                              }
                            : {}
                        }
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccountCircleTwoTone />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormControl
                variant='standard'
                fullWidth
                disabled={viewing || via.length <= 0}
                sx={
                  viewing
                    ? {
                        '& > .MuiInput-root:before': {
                          borderBottomStyle: 'none !important',
                        },
                        '& svg': {
                          display: 'none',
                        },
                      }
                    : {}
                }
              >
                <InputLabel id='wl'>Worship Leader</InputLabel>
                <Select
                  value={viewing ? assignment.wl : worshipLeader}
                  onChange={(e) => setWorshipLeader(e.target.value)}
                >
                  {via
                    .filter((v) => v.displayName)
                    .map((v) => {
                      return (
                        <MenuItem
                          key={v.uid}
                          value={v.uid}
                          disabled={v.is_wl || (isLumina && v.is_backup)}
                        >
                          {v.displayName || v.email}{' '}
                          {v.is_wl && (
                            <MicTwoTone
                              color='text.secondary'
                              sx={{ ml: 1, fontSize: 14 }}
                            />
                          )}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SupervisedUserCircleTwoTone />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormControl
                variant='standard'
                fullWidth
                className='backup'
                multiline
                disabled={viewing || via.length <= 0}
                sx={
                  viewing
                    ? {
                        '& > .MuiInput-root:before': {
                          borderBottomStyle: 'none !important',
                        },

                        '& svg': {
                          display: 'none',
                        },
                      }
                    : {}
                }
              >
                <InputLabel id='wl'>Backup Singers</InputLabel>
                <Select
                  multiple
                  value={viewing ? assignment.backups : backups}
                  onChange={handleChange}
                >
                  {via
                    .filter((v) => v.displayName)
                    .map((v) => {
                      return (
                        <MenuItem
                          key={v.uid}
                          value={v.uid}
                          disabled={v.is_wl || (isLumina && v.is_backup)}
                        >
                          {v.displayName || v.email}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            }
          />
        </ListItem>
        {!viewing && user.uid === assignment.wl && (
          <ListItem sx={{ justifyContent: 'right' }}>
            <Button startIcon={<AddCircleOutline />} size='small'>
              Add Lineup
            </Button>
          </ListItem>
        )}
      </List>
    </Accordion>
  );
};

export default SetAssignment;
