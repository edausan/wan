import {
  AutoStoriesTwoTone,
  CachedTwoTone,
  Favorite,
  FavoriteBorderOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import BG_JAM from '../../../assets/bg_jam.webp';
import BG_VIA from '../../../assets/bg_via.webp';
import BG_ADMIN from '../../../assets/splash-bg.webp';
import BG_TEAM from '../../../assets/bg_team.webp';
import TextArea from '../../CustomComponents/TextArea';
import { Ministries } from '../Auth/Signup';

const NewProfileLayout = ({
  user,
  paramsId,
  currentUser,
  handleHeart,
  setOpen,
}) => {
  const history = useHistory();
  const verse_count = user?.life_verse?.split('');

  const handleColor = () => {
    switch (user?.ministry) {
      case 'JAM':
        return {
          gradient: 'from-sky-700 via-sky-700',
          from: 'from-sky-700',
          bg: BG_JAM,
        };
      case 'VIA':
        return {
          gradient: 'from-pink-600 via-pink-600',
          from: 'from-pink-600',
          bg: BG_VIA,
        };
      case 'TEAM':
        return {
          gradient: 'from-yellow-600 via-yellow-600',
          from: 'from-yellow-600',
          bg: BG_TEAM,
        };
      case 'ADMIN':
        return {
          gradient: 'from-blue-600 via-blue-600',
          from: 'from-blue-600',
          bg: BG_ADMIN,
        };

      default:
        break;
    }
  };

  return (
    <section className="w-full rounded-3xl relative overflow-hidden mb-4 mobile:pb-[50%] bg-sky-500 min-h-[380px]">
      {paramsId === currentUser?.uid && (
        <>
          <IconButton
            className="z-[1003] absolute top-[16px] right-[60px] bg-gray-800"
            onClick={() => {
              history.push('/');
              window.location.reload();
            }}
          >
            <CachedTwoTone className="w-[20px] h-[20px]" />
          </IconButton>
          <Link to="/settings">
            <IconButton className="absolute z-[1003] top-[16px] right-[16px] bg-gray-800">
              <SettingsOutlined className="w-[20px] h-[20px]" />
            </IconButton>
          </Link>
        </>
      )}

      <span
        className={`absolute bottom-0 w-full h-[85%] z-[1001] bg-gradient-to-t ${
          handleColor()?.gradient
        } `}
      ></span>
      <img
        src={handleColor()?.bg}
        alt=""
        className={`w-full ${user?.ministry === 'JAM' ? 'hue-rotate-15' : ''}`}
      />

      <section className="absolute z-[1002] w-full h-full flex flex-col top-0 left-0 items-center justify-center p-6 pt-16 box-border">
        <div className="relative">
          <Avatar
            src={user?.photoURL}
            className=" w-[120px] h-[120px] z-[1002] mt-[auto] saturate-[1.1]"
            onClick={() => setOpen(true)}
          />
          <label
            className="absolute top-[80px] left-[80px] z-[1004]"
            htmlFor="icon-button-file"
          >
            <IconButton
              color="inherit"
              aria-label="upload picture"
              component="span"
              className="bg-white/50"
              onClick={handleHeart}
            >
              {user?.photoHeart?.findIndex((h) => h === currentUser.uid) >=
              0 ? (
                <Favorite
                  color="error"
                  onClick={
                    user?.photoHeart?.findIndex(
                      (h) => h === currentUser.uid
                    ) === -1
                      ? handleHeart
                      : () => setOpen(true)
                  }
                />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
          </label>
        </div>
        <div className="font-bold text-white text-xl mt-2">
          {user?.displayName}
        </div>
        <div className="text-white/75 text-sm">
          {Ministries.filter((m) => m.id === user?.ministry)[0]?.name}
        </div>
        <div className="w-[90%] mt-6 flex flex-row gap-4 items-center relative">
          <AutoStoriesTwoTone className="text-white" />
          <TextArea
            value={user?.life_verse?.substr(0, 182)}
            className="w-full"
            size=".75rem"
            styles={{ textAlign: 'left', lineHeight: '.90rem' }}
            color="#ffffffbf"
          />
          {verse_count?.length > 182 && (
            <span
              className={`absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t ${
                handleColor()?.from
              } `}
            />
          )}
        </div>
        {verse_count?.length > 182 && (
          <button className="text-xs text-white">Read More</button>
        )}

        <div className="w-full flex-grow-1 mt-3">
          {paramsId === currentUser?.uid && (
            <Link
              to="/edit_profile"
              style={{ textDecoration: 'none', width: '100%', flex: 1 }}
            >
              <button className="bg-white rounded-lg p-2 w-full font-bold text-sm place-self-end">
                Edit Profile
              </button>
            </Link>
          )}
          {/* : (
            <button className='bg-white rounded-lg p-2 w-full font-bold text-sm place-self-end'>
              Follow
            </button>
          )} */}
        </div>
      </section>
    </section>
  );
};

export default NewProfileLayout;
