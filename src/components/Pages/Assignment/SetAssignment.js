/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  useTheme,
  Typography,
  IconButton,
} from "@mui/material";
import {
  AccountCircleTwoTone,
  AddCircleOutline,
  AssignmentTwoTone,
  CheckCircleTwoTone,
  CloseTwoTone,
  EventTwoTone,
  ExpandMore,
  MicTwoTone,
  MoreVert,
  SaveOutlined,
  SupervisedUserCircleTwoTone,
} from "@mui/icons-material";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/Firebase";
import { SetAssignments } from "@/Firebase/assignmentApi";
import { Link, useHistory } from "react-router-dom";
import { AppCtx } from "@/App";
import { useSelector } from "react-redux";
import { selectUsers } from "@/redux/slices/usersSlice";
import { useQuery } from "react-query";
import { GetAllUsers } from "@/Firebase/authApi";
// import AssignmentDrawer from './AssignmentDrawer';

const AssignmentDrawer = React.lazy(() => import("./AssignmentDrawer"));

const auth = getAuth(FirebaseApp);

const SetAssignment = ({ isViewing, assignment }) => {
  const history = useHistory();
  const user = auth.currentUser;
  // const { users } = useSelector(selectUsers);

  const { scrollToTop } = useContext(AppCtx);

  const [open, setOpen] = useState(false);
  const [viewing, setViewing] = useState(isViewing);
  const [via, setVia] = useState([]);
  const [saving, setSaving] = useState(false);
  const [assignments, setAssignments] = useState({
    belleview: {
      backups: assignment?.belleview.backups || [],
      wl: assignment?.belleview.wl || null,
      date: assignment?.belleview.date || null,
    },
    lumina: {
      backups: assignment?.lumina.backups || [],
      wl: assignment?.lumina.wl || null,
      date: assignment?.lumina.date || null,
    },
    youth: {
      backups: assignment?.youth.backups || [],
      wl: assignment?.youth.wl || null,
      date: assignment?.youth.date || null,
    },
  });

  const usersQuery = useQuery("users", GetAllUsers);

  useEffect(() => {
    scrollToTop();
    assignment &&
      setAssignments({
        ...assignments,
        belleview: {
          backups: assignment.belleview.backups,
          wl: assignment.belleview.wl,
          date: assignment.belleview.date,
        },
        lumina: {
          backups: assignment.lumina.backups,
          wl: assignment.lumina.wl,
          date: assignment.lumina.date,
        },
        youth: {
          backups: assignment.youth.backups,
          wl: assignment.youth.wl,
          date: assignment.youth.date,
        },
      });
  }, [assignment]);

  useEffect(() => {
    setViewing(isViewing);
  }, [isViewing]);

  useEffect(() => {
    handleGetVIA();
  }, []);

  const handleSetAssignments = async () => {
    setSaving(true);
    const assign = {
      ...assignments,
      date_created: moment(new Date()).format("LLLL"),
      created_by: {
        uid: user.uid,
        photoURL: user?.photoURL,
        displayName: user.displayName,
      },
    };
    const res = await SetAssignments({ assignments: assign });

    if (res) {
      setSaving(false);
      history.push("/assignments");
    }
  };

  const handleGetVIA = async () => {
    const vias = usersQuery.data
      ?.filter((u) => u.ministry === "VIA")
      .map((v) => {
        return {
          ...v,
          is_wl: false,
          is_backup: false,
          location: null,
        };
      });
    setVia(vias);
  };

  const commonProps = {
    setAssignments,
    setViewing,
    viewing,
    via,
    setVia,
    saving,
  };

  return (
    <>
      <Suspense fallback={<div />}>
        <AssignmentDrawer open={open} setOpen={setOpen} assignment={assignment} />
      </Suspense>
      <Card sx={{ width: "100%", mb: !viewing ? 100 : 2 }} elevation={0} className="shadow-md">
        <CardHeader
          avatar={
            <Avatar
              src={viewing ? assignment?.created_by?.photoURL : user?.photoURL}
              alt={viewing ? assignment?.created_by?.displayName : user?.displayName}
            />
          }
          title={viewing ? assignment?.created_by?.displayName : user?.displayName}
          subheader={<small>{moment(assignment?.date_created).startOf("minute").fromNow()}</small>}
          action={
            assignment?.created_by?.uid === user.uid ? (
              <IconButton aria-label="settings" onClick={() => setOpen(true)}>
                <MoreVert />
              </IconButton>
            ) : (
              <div />
            )
          }
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body1" className="text-sm mb-2 flex items-center">
            <AssignmentTwoTone className="w-[14px] h-[14px] mr-2" />
            Worship Service Assignments
          </Typography>
          {(assignments.belleview.wl || !viewing) && (
            <Service title="Belleview" assignment={assignments.belleview} {...commonProps} />
          )}

          {(assignments.lumina.wl || assignments.lumina.backups.length > 0 || !viewing) && (
            <Service title="Lumina" isLumina assignment={assignments.lumina} {...commonProps} />
          )}

          {(assignments.youth.wl || !viewing) && (
            <Service title="Youth Service" isYS assignment={assignments.youth} {...commonProps} />
          )}
        </CardContent>
        {assignments.belleview.date &&
          assignments.belleview.wl &&
          assignments.belleview.backups.length > 0 &&
          !viewing && (
            <>
              <Divider />
              <CardActions sx={{ justifyContent: "right" }}>
                <Button startIcon={<SaveOutlined />} onClick={handleSetAssignments}>
                  Save
                </Button>
              </CardActions>
            </>
          )}
      </Card>
    </>
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
  const theme = useTheme();
  const user = auth.currentUser;
  const exist =
    user.uid === assignment.backups.filter((b) => b === user.uid)[0] || user.uid === assignment.wl;
  const [date, setDate] = useState("");
  const [worshipLeader, setWorshipLeader] = useState(null);
  const [backups, setBackups] = useState([]);
  const [expanded, setExpanded] = useState(exist);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!viewing) {
      switch (title) {
        case "Belleview":
          setAssignments((ass) => ({
            ...ass,
            belleview: {
              date,
              wl: worshipLeader,
              backups,
            },
          }));
          break;
        case "Lumina":
          setAssignments((ass) => ({
            ...ass,
            lumina: {
              date,
              wl: worshipLeader,
              backups,
            },
          }));
          break;
        case "Youth Service":
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
    }
  }, [worshipLeader, backups, date]);

  useEffect(() => {
    const complete = assignment.wl && assignment.backups.length > 0 && assignment.date;
    setCompleted(complete);
  }, [assignment]);

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

  const handleUpdateVIA = (update) => {
    const vias = update || via;
    const updated = vias.map((v) => {
      if (v.uid === worshipLeader) {
        return {
          ...v,
          is_wl: true,
          location: title,
        };
      } else if (isLumina && v.is_wl) {
        return {
          ...v,
          is_wl: true,
          location: title,
        };
      } else if (isYS && v.is_wl) {
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

  const handleDateChange = (newValue) => {
    setDate(moment(newValue).format("dddd LL"));
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setBackups(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const getSundayOfCurrentWeek = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const last = first + (isYS ? 4 : 6);

    const sunday = new Date(today.setDate(last));
    setDate(moment(sunday).format("dddd LL"));
    return sunday;
  };

  const handleClearWL = () => {
    const updated = via.map((v) => {
      if (v.uid === worshipLeader) {
        return {
          ...v,
          is_wl: false,
          location: null,
        };
      }
      return v;
    });

    setVia(updated);
  };

  return (
    <Accordion
      expanded={expanded}
      disableGutters
      sx={{ boxShadow: "none", py: 0, background: "none" }}
    >
      <AccordionSummary
        // sx={{ px: 0, color: exist ? '#90caf9' : 'inherit' }}
        className={`px-2 text-[${exist ? "#90caf9" : "inherit"}]`}
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={() => setExpanded(!expanded)}
      >
        <ListItem className="px-0 py-0">
          <ListItemText
            primary={
              isYS ? (
                <span className="flex items-center text-xs">
                  {completed && !viewing && (
                    <CheckCircleTwoTone sx={{ fontSize: 16, mr: 1 }} color="success" />
                  )}{" "}
                  {viewing && moment(assignment.date).diff(new Date()) >= 0 ? (
                    <EventTwoTone color="warning" sx={{ fontSize: 14, mr: "6px" }} />
                  ) : (
                    viewing && (
                      <CheckCircleTwoTone color="success" sx={{ fontSize: 14, mr: "6px" }} />
                    )
                  )}
                  Youth Service
                </span>
              ) : (
                <span className="flex items-center text-xs">
                  {completed && !viewing && (
                    <CheckCircleTwoTone sx={{ fontSize: 16, mr: 1 }} color="success" />
                  )}{" "}
                  {viewing && moment(assignment.date).diff(new Date()) >= 0 ? (
                    <EventTwoTone color="warning" sx={{ fontSize: 14, mr: "6px" }} />
                  ) : (
                    viewing && (
                      <CheckCircleTwoTone color="success" sx={{ fontSize: 14, mr: "6px" }} />
                    )
                  )}
                  Worship Service | {title}
                </span>
              )
            }
            className="w-[180px]"
            // primaryTypographyProps={{ sx: { fontSize: 14, width: 200 } }}
          />
          <ListItemText
            secondary={
              <span className="text-xs">
                {moment(viewing ? assignment.date : date).format("l")}
              </span>
            }
            // secondaryTypographyProps={{ sx: { fontSize: 12 } }}
          />
        </ListItem>
      </AccordionSummary>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            {!viewing ? (
              <IconButton onClick={getSundayOfCurrentWeek} sx={{ p: 0 }}>
                <EventTwoTone color="secondary" />
              </IconButton>
            ) : (
              <EventTwoTone />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              viewing ? (
                <span>{assignment.date}</span>
              ) : (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    inputFormat="dddd LL"
                    label="Date"
                    value={date}
                    onChange={(value) => handleDateChange(value)}
                    disabled={viewing}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          variant="standard"
                          sx={
                            viewing
                              ? {
                                  "& > .MuiInput-root:before": {
                                    borderBottomStyle: "none !important",
                                  },
                                  "& .Mui-disabled": {
                                    "-webkit-text-fill-color": theme.palette.text.primary,
                                    color: theme.palette.text.primary,
                                  },
                                  "& svg": {
                                    display: "none",
                                  },
                                }
                              : {}
                          }
                        />
                      );
                    }}
                  />
                </LocalizationProvider>
              )
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {worshipLeader && !viewing ? (
              <CloseTwoTone
                onClick={() => {
                  handleClearWL();
                  setWorshipLeader(null);
                }}
              />
            ) : (
              <AccountCircleTwoTone />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              <FormControl
                variant="standard"
                fullWidth
                disabled={viewing || via.length <= 0}
                sx={
                  viewing
                    ? {
                        "& > .MuiInput-root:before": {
                          borderBottomStyle: "none !important",
                        },
                        "& .MuiSelect-select": {
                          "-webkit-text-fill-color": theme.palette.text.primary,
                          color: theme.palette.text.primary,
                        },
                        "& svg": {
                          display: "none",
                        },
                      }
                    : {}
                }
              >
                <InputLabel id="wl">Worship Leader</InputLabel>
                <Select
                  value={viewing ? assignment.wl : worshipLeader}
                  onChange={(e) => setWorshipLeader(e.target.value)}
                  renderValue={(selected) => {
                    const v = via.filter((v) => v.displayName && v.uid === selected)[0];
                    return (
                      <Chip
                        key={selected}
                        label={v?.displayName}
                        avatar={<Avatar src={v?.photoURL} sx={{ width: 24, height: 24 }} />}
                      />
                    );
                  }}
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
                          <Avatar src={v.photoURL} sx={{ width: 24, height: 24, mr: 1 }} />
                          {v.displayName || v.email}{" "}
                          {v.is_wl && (
                            <MicTwoTone color="text.secondary" sx={{ ml: 1, fontSize: 14 }} />
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
            {backups.length > 0 && !viewing ? (
              <CloseTwoTone onClick={() => setBackups([])} />
            ) : (
              <SupervisedUserCircleTwoTone />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              <FormControl
                variant="standard"
                fullWidth
                className="backup"
                multiline
                disabled={viewing || via.length <= 0}
                sx={
                  viewing
                    ? {
                        "& > .MuiInput-root:before": {
                          borderBottomStyle: "none !important",
                        },
                        "& .MuiSelect-select": {
                          "-webkit-text-fill-color": theme.palette.text.primary,
                          color: theme.palette.text.primary,
                        },

                        "& svg": {
                          display: "none",
                        },
                      }
                    : {}
                }
              >
                <InputLabel id="wl">Backup Singers</InputLabel>
                <Select
                  multiple
                  multiline
                  value={viewing ? assignment.backups : backups}
                  onChange={handleChange}
                  className="backup-select"
                  renderValue={(selected) => {
                    return (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => {
                          const v = via.filter((v) => v.displayName && v.uid === value)[0];
                          return (
                            <Chip
                              key={value}
                              label={v?.displayName}
                              avatar={
                                <Avatar
                                  src={v?.photoURL}
                                  alt={v?.displayName}
                                  sx={{ width: 24, height: 24, mr: 1, ml: 1 }}
                                />
                              }
                            />
                          );
                        })}
                      </Box>
                    );
                  }}
                >
                  {via
                    .filter((v) => v.displayName)
                    .map((v, i) => {
                      return (
                        <MenuItem
                          key={v.uid}
                          value={v.uid}
                          disabled={v.is_wl || (isLumina && v.is_backup)}
                        >
                          {/* <div style={{ width: '100%', display: 'flex' }}> */}
                          <Avatar src={v.photoURL} sx={{ width: 24, height: 24, mr: 1, ml: 1 }} />
                          {v.displayName.split(" ")[0] || v.email}
                          {/* </div> */}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            }
          />
        </ListItem>
        {user.uid === assignment.wl && (
          <ListItem sx={{ justifyContent: "right" }}>
            <Link to="/lineup/new" style={{ textDecoration: "none", color: "inherit" }}>
              <Button startIcon={<AddCircleOutline />} size="small">
                Add Lineup
              </Button>
            </Link>
          </ListItem>
        )}
      </List>
    </Accordion>
  );
};

export default React.memo(SetAssignment);
