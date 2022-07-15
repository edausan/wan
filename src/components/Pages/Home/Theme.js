import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Chip } from '@mui/material';
import { useState } from 'react';

const BG =
  'https://firebasestorage.googleapis.com/v0/b/wan-belleview.appspot.com/o/other%2Fwallpaper-hd.jpg?alt=media&token=0e108488-af85-452c-9e1e-7e625fff7946';

const Theme = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CardMedia component='img' height='140' image={BG} alt='A Healing Hope' />
      <CardContent className='pb-2'>
        <p className='text-md mb-2'>A Healing Hope</p>
        <p className='text-sm'>
          <i>
            But he was pierced for our transgressions, he was crushed for our
            iniquities; the punishment that brought us peace was on him, and by
            his wounds we are healed. (Isaiah 53:5, NIV)
          </i>
          {!open && (
            <button
              onClick={() => setOpen(true)}
              className='text-sm text-sky-400 ml-2'
            >
              Read more
            </button>
          )}
        </p>

        {open && (
          <p className='my-2 text-sm'>
            We all are broken, sick, and in need of healing. Some of us require
            a pill, a medical procedure, or a surgery. But many others require a
            kind of healing no hospital could provide: relief for a troubled,
            uneasy mind, wholeness for a weeping, grieving heart, and solace for
            a tired, restless soul. For all that ails us—body, mind, heart, and
            soul—our hope is that Jesus is not just our Healer, He also is our
            healing. “By His stripes, we are healed.”{' '}
            {open && (
              <button
                onClick={() => setOpen(false)}
                className='text-sm text-sky-400 ml-2'
              >
                Read less
              </button>
            )}
          </p>
        )}

        <p className='text-xs mt-4'>
          Source:{' '}
          <a
            href='https://jilworldwide.org/theme/a-healing-hope/'
            target='_black'
            no-referrerPolicy=''
            className='underline text-sky-400'
          >
            jilworldwide.org/theme/a-healing-hope/
          </a>
        </p>
      </CardContent>
      <CardActions className='justify-end'>
        <Chip label='July' size='small' />
        <Chip label='2022' size='small' />
        <Chip label='Theme' size='small' />
      </CardActions>
    </Card>
  );
};

export default Theme;
