import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, List, Typography } from '@mui/material';

import { IconWrapper } from '../../common/IconWrapper';
import { FriendItemType, FriendListItem } from './FriendListItem';

const mockFriends: FriendItemType[] = [
  { id: 11, name: 'Ivan', friendIdOne: 1, friendIdTwo: 2 },
  { id: 12, name: 'Georgi', friendIdOne: 1, friendIdTwo: 2 },
  { id: 13, name: 'Pesho', friendIdOne: 1, friendIdTwo: 2 },
];

type FriendsProps = {
  selectedFriendId: number;
  onFriendClick: (id: number, name: string) => void;
};

export const Friends = ({ selectedFriendId, onFriendClick }: FriendsProps) => {
  const handleAddClick = () => console.log('clicked'); // TODO: add friend

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography>Available Friends</Typography>

        <IconWrapper onClick={handleAddClick}>
          <SearchIcon />
        </IconWrapper>
      </Box>
      <Divider />

      <List sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        {mockFriends.map((x) => (
          <FriendListItem
            key={x.id}
            item={x}
            onClick={onFriendClick}
            // TODO: implement onDeleteClick
            onDeleteClick={(id) => console.log('deleted', id)}
            selected={x.id === selectedFriendId}
          />
        ))}
      </List>
    </Box>
  );
};
