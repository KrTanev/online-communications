import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Box, ListItem } from '@mui/material';

import { FriendsResponse } from '../../../api/types/friends';
import { IconWrapper } from '../../common/IconWrapper';

type FriendListItemProps = {
  item: FriendsResponse;
  selected: boolean;
  onClick: (id: number, friendId: number, friendName: string) => void;
  onDeleteClick: (id: number) => void;
};

export const FriendListItem = ({ item, selected, onClick, onDeleteClick }: FriendListItemProps) => {
  return (
    <ListItem
      sx={{
        borderRadius: 4,
        bgcolor: selected ? '#68B36B' : 'white',
        ':hover': {
          cursor: 'pointer',
          bgcolor: !selected ? '#68B36B' : undefined,
        },
      }}
      onClick={() => onClick(item.friendshipId, item.friendId, item.friendName)} // Check name
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box>{item.friendName}</Box>

        <Box>
          <IconWrapper onClick={() => onDeleteClick(item.friendId)} tooltipTitle="Delete">
            <PersonRemoveIcon />
          </IconWrapper>
        </Box>
      </Box>
    </ListItem>
  );
};
