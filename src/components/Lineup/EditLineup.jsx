/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  lazy,
  useMemo,
  useRef,
} from "react";
import { Grid, Card, Snackbar, Alert } from "@mui/material";

import { LINEUP } from "../../data";
import { AppCtx } from "../../App";
import { GetAllSongs, UpdateLineup, GetAllLineups } from "@/Firebase/songsApi";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { FirebaseApp } from "../../Firebase";
import { SaveTwoTone } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingScreen from "@components/CustomComponents/LoadingScreen";

const Service = lazy(() => import("./Service"));
const LineupCard = lazy(() => import("./LineupCard"));

export const EditLineupCtx = createContext(null);

const NewLineup = () => {
  const params = useParams();
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  const history = useHistory();

  const { scrollToTop } = useContext(AppCtx);
  const [date, setDate] = useState(null);
  const [lineupData, setLineupData] = useState([]);
  const [service, setService] = useState(null);
  const [openService, setOpenService] = useState(false);

  const { data } = useQuery({ queryKey: ["songs"], queryFn: GetAllSongs });
  const lineupQuery = useQuery({ queryKey: ["lineups"], queryFn: GetAllLineups });

  const mutatedLineup = useMutation({ mutationKey: "update-lineup", mutationFn: UpdateLineup });
  const dateRef = useRef(null);

  useEffect(() => {
    scrollToTop();
  }, [data]);

  useEffect(() => {
    getSundayOfCurrentWeek();
  }, []);

  useEffect(() => {
    if (params.id && data.length > 0) GetLineup();
  }, [params.id, data]);

  useEffect(() => {
    if (dateRef.current !== null) {
      // throw new Error(error)({ dateRef: dateRef.current.value });
      const lineup = lineupQuery.data?.filter((l) => l.id === params.id)[0];
      const date = moment(lineup?.date).format("YYYY-MM-DD");
      setDate(date);
      // throw new Error(error)({ date, lineup_date: lineup?.date });
      dateRef.current.value = date;
    }
  }, []);

  useEffect(() => {}, [dateRef.current]);

  const handleDateChange = () => {
    setDate(dateRef.current.value);
  };

  const GetLineup = () => {
    try {
      // const lineup = await GetSingleLineup({ id: params.id });
      const lineup = lineupQuery.data?.filter((l) => l.id === params.id)[0];
      if (lineup?.id) {
        setService(lineup?.service);
        setDate(lineup?.date);
        dateRef.current.value = moment(lineup?.date).format("yyyy-dd-mm");
        if (data?.length > 0) {
          const lineupda_data = lineup?.songs.map((song) => {
            const song_data = data.filter((s) => s.id === song.id)[0];
            return { ...song_data, ...song };
          });

          const updated = LINEUP.map((l) => {
            const f = lineupda_data.filter((d) => d.label === l.label)[0];
            if (f) {
              return f;
            }
            return l;
          });

          setLineupData(updated);
        }
      }
    } catch (error) {}
  };

  const handleUpdate = () => {
    const data = {
      id: params.id,
      lineup: {
        service,
        songs: lineupData,
        date: moment(dateRef.current?.value).format("LLLL"),
        date_updated: moment(new Date()).format("LLLL"),
        updated_by: {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      },
    };

    mutatedLineup.mutate(data);
  };

  useEffect(() => {
    if (mutatedLineup.isSuccess && !mutatedLineup.isLoading && !mutatedLineup.isError) {
      history.push("/lineup");
    }
  }, [mutatedLineup.isSuccess, mutatedLineup.isLoading, mutatedLineup.isError]);

  const getSundayOfCurrentWeek = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const last = first + 6;

    const sunday = new Date(today.setDate(last));
    setDate(sunday);
    return sunday;
  };

  const handleClose = () => {
    // setSaved(false);
  };

  return useMemo(() => {
    return (
      <section className="relative p-3 w-full max-w-[680px] mt-0 mx-auto">
        <LoadingScreen status={mutatedLineup.isLoading} />

        <Snackbar
          open={mutatedLineup.isSuccess}
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            {params.id ? "Lineup successfully updated" : "New Lineup successfully created!"}
          </Alert>
        </Snackbar>

        {lineupData?.length > 0 && service && (
          <button
            className="fixed bottom-[86px] right-[26px] w-[40px] h-[40px]  bg-green-500 text-white rounded-full z-50"
            onClick={handleUpdate}
            disabled={mutatedLineup.isLoading}
          >
            <span className="motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-green-500 text-black rounded-full z-40 opacity-30"></span>
            <SaveTwoTone />
          </button>
        )}

        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 2, mb: 2 }} disableElevation>
              <button
                onClick={() => setOpenService(true)}
                className="p-2 w-full bg-sky-400 text-white rounded-md mb-4"
              >
                {service ? service : "Select Worship Service"}
              </button>

              <Service
                setOpen={setOpenService}
                open={openService}
                service={service}
                setService={setService}
              />

              <input
                ref={dateRef}
                value={dateRef.current?.value}
                onChange={handleDateChange}
                className="w-full p-2"
                type="date"
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <Card>
              {lineupData?.length > 0 &&
                data?.length > 0 &&
                LINEUP.map((category, idx) => {
                  return (
                    <LineupCard
                      key={`${category.id}~${idx}`}
                      setLineupData={setLineupData}
                      category={category}
                      songs={data}
                      saving={mutatedLineup.isLoading}
                      lineupData={lineupData}
                      songData={lineupData.filter((s) => s?.label === category.label)[0]}
                    />
                  );
                })}
            </Card>
          </Grid>
        </Grid>
      </section>
    );
  }, [lineupData, data, mutatedLineup.isLoading, mutatedLineup.isSuccess, dateRef.current?.value]);
};

export default React.memo(NewLineup);
