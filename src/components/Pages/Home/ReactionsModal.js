import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const ReactionsModal = ({
  reactions,
  friends,
  setOpen,
  open,
  handleReactions,
}) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Card className='p-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[250px]'>
        <CardHeader
          className='py-0'
          title={<span className='text-sm'>Reactions</span>}
        />
        <CardContent className='px-1 py-0 !pb-0'>
          <List className='max-h-[360px] overflow-auto p-0'>
            {reactions?.map((react) => {
              const user = friends?.filter((f) => f.uid === react?.uid)[0];
              return (
                <Link to={`/profile/${user?.uid}`}>
                  <ListItemButton className='px-2'>
                    <ListItemIcon
                      className={`${
                        handleReactions(react.reaction)?.color.split('text')[1]
                      }`}
                    >
                      {handleReactions(react.reaction)?.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span className='text-sm'>{user?.displayName}</span>
                      }
                    />
                  </ListItemButton>
                </Link>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ReactionsModal;
