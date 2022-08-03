import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Friends = ({ setOpenFriends, friends, id }) => {
  return (
    <Card
      sx={{
        mb: 2,
        position: 'relative',
      }}
    >
      <CardContent>
        <Typography
          variant='body2'
          sx={{ mb: 1, alignItems: 'center', display: 'flex' }}
          onClick={() => setOpenFriends(true)}
        >
          Friends •{' '}
          {friends.filter((f) => f.uid !== id).filter((f) => f.uid).length}
          <Button
            disabled={friends.length <= 0}
            size='small'
            variant='text'
            sx={{
              fontSize: 12,
              ml: 1,
              pb: 0,
              pt: '2px',
              textTransform: 'capitalize',
            }}
            onClick={
              friends.length <= 0 ? () => {} : () => setOpenFriends(true)
            }
          >
            Show more
          </Button>
        </Typography>
        <Grid
          container
          spacing={1}
          justifyContent='center'
          alignItems='stretch'
        >
          {friends
            .filter((f) => f.uid !== id)
            .filter((f) => f.uid)
            .slice(0, 10)
            .map((f) => {
              return (
                <Grid
                  key={f.uid}
                  item
                  alignItems='stretch'
                  display='flex'
                  justifyContent='center'
                  sx={{ width: 60 }}
                >
                  {f.uid ? (
                    <Link
                      to={`/profile/${f.uid}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        width: '100%',
                      }}
                    >
                      <Avatar
                        alt={f.displayName}
                        src={f.photoURL}
                        className='w-[50px] h-[50px]'
                      />
                      {/* <Card
                      sx={{
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        minHeight: 62,
                        maxHeight: 62,
                        overflow: 'hidden',
                      }}
                      variant='outlined'
                    >
                      {f.photoURL ? (
                        <CardMedia
                          component='img'
                          alt={f.displayName}
                          src={f.photoURL}
                          height={60}
                          sx={{ p: 0 }}
                        />
                      ) : (
                        <Avatar sx={{ m: 'auto', mt: '3px' }} />
                      )}

                      <CardContent
                        sx={{
                          padding: '2px',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          paddingBottom: '2px !important',
                          background: theme.palette.background.paper,
                          backdropFilter: 'blur(1px)',
                        }}
                      >
                        <Typography
                          variant='caption'
                          sx={{
                            textOverflow: 'ellipsis',
                            width: 50,
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            fontSize: 12,
                          }}
                        >
                          <div
                            style={{
                              textOverflow: 'ellipsis',
                              // width: 50,
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}
                          >
                            {f.displayName
                              ? f.displayName.split(' ')[0]
                              : f.email.split('@gmail.com')[0]}
                          </div>
                        </Typography>
                      </CardContent>
                    </Card> */}
                    </Link>
                  ) : (
                    <Card
                      sx={{
                        p: 1,
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'auto',
                      }}
                    >
                      <CardMedia component='div' alt={f.displayName || f.email}>
                        <Avatar aria-label='recipe' src={f.photoURL}></Avatar>
                      </CardMedia>
                      <CardContent>
                        <Typography variant='caption' sx={{ mt: 1 }}>
                          <div
                            style={{
                              textOverflow: 'ellipsis',
                              width: 37,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}
                          >
                            {f.displayName
                              ? f.displayName.split(' ')[0]
                              : f.email.split('@gmail.com')[0]}
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              );
            })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Friends;
