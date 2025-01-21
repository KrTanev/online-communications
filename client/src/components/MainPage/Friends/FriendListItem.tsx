import DeleteIcon from '@mui/icons-material/Delete';
import { Box, ListItem } from '@mui/material';
import { grey } from '@mui/material/colors';

import { IconWrapper } from '../../common/IconWrapper';

export type FriendItemType = {
  id: number;
  name: string;
  friendIdOne: number;
  friendIdTwo: number;
};

type FriendListItemProps = {
  item: FriendItemType;
  selected: boolean;
  onClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
};

export const FriendListItem = ({ item, selected, onClick, onDeleteClick }: FriendListItemProps) => {
  return (
    <ListItem
      sx={{
        borderRadius: 4,
        bgcolor: selected ? 'gray' : 'white',
        ':hover': {
          cursor: 'pointer',
          bgcolor: !selected ? grey[500] : undefined,
        },
      }}
      onClick={() => onClick(item.id)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box>{item.name}</Box>

        <Box>
          <IconWrapper onClick={() => onDeleteClick(item.id)} tooltipTitle="Delete">
            <DeleteIcon />
          </IconWrapper>
        </Box>
      </Box>
    </ListItem>
  );
};
