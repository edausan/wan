/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, Suspense } from 'react';
import { SpeedDialIcon } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AppCtx } from './../../App';
// import LineupItem from './LineupItem';
import { Link } from 'react-router-dom';
import { ADMIN } from '../../data';
import { useSelector } from 'react-redux';
import { selectLineups } from '../../redux/slices/lineupsSlice';
import { selectUsers } from './../../redux/slices/usersSlice';
import LineupLoading from './LineupLoading';

const LineupItem = React.lazy(() => import('./LineupItem'));

const Lineup = () => {
  const lineups = useSelector(selectLineups);
  const { users, currentUser } = useSelector(selectUsers);
  const { scrollToTop } = useContext(AppCtx);
  // const [lineups, setLineup] = useState([]);

  useEffect(() => {
    scrollToTop();
    // setLineups(data);
    // setLineup(data);
  }, []);

  useEffect(() => {
    console.log({ lineups, currentUser });
  }, [lineups, currentUser]);

  // const actions = [
  //   { icon: <Cancel />, name: 'Cancel', action: () => {} },
  //   { icon: <ClearAll />, name: 'Clear', action: () => {} },
  //   { icon: <Save />, name: 'Save', action: () => {} },
  // ];

  // const sorted = lineups.sort(
  //   (a, b) => new Date(b.date_created) - new Date(a.date_created)
  // );

  return (
    <section className="pb-[100px] pt-3">
      {lineups
        .slice()
        .map((l) => ({
          ...l,
          worship_leader: users.filter(
            (u) => u.uid === l.worship_leader.uid
          )[0],
        }))
        .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
        .map((lineup) => {
          return (
            <Suspense key={lineup.id} fallback={<LineupLoading />}>
              <LineupItem lineup={lineup} />
            </Suspense>
          );
        })}

      {(currentUser?.user_metadata?.ministry === 'VIA' ||
        currentUser?.user?.uid === ADMIN) && (
        <Link to="/lineup/new">
          <button className="fixed bottom-[86px] right-[26px] w-[40px] h-[40px]  bg-white text-black rounded-full z-50">
            <span className="motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-white text-black rounded-full z-40 opacity-30"></span>
            <SpeedDialIcon className="relative z-50" openIcon={<Add />} />
          </button>
        </Link>
      )}
    </section>
  );
};

export default React.memo(Lineup);
