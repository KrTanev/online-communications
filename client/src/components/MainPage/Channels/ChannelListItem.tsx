import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Box, ListItem } from '@mui/material';
import { grey } from '@mui/material/colors';

import { IconWrapper } from '../../common/IconWrapper';

export type ChannelListItemType = {
  id: number;
  name: string;
  ownerId: number;
  participants: string[];
};

type ChannelListItemProps = {
  item: ChannelListItemType;
  selected: boolean;
  onClick: (id: number) => void;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
};

export const ChannelListItem = ({
  item,
  selected,
  onClick,
  onEditClick,
  onDeleteClick,
}: ChannelListItemProps) => {
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
          <IconWrapper onClick={() => onEditClick(item.id)} tooltipTitle="Edit">
            <ModeEditOutlineIcon />
          </IconWrapper>

          <IconWrapper onClick={() => onDeleteClick(item.id)} tooltipTitle="Delete">
            <DeleteIcon />
          </IconWrapper>
        </Box>
      </Box>
    </ListItem>
  );
};
