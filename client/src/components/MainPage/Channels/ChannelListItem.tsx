import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Box, ListItem } from '@mui/material';
import { grey } from '@mui/material/colors';

import { AccessibleChannelsResponse } from '../../../api/types/channels';
import { IconWrapper } from '../../common/IconWrapper';

type ChannelListItemProps = {
  item: AccessibleChannelsResponse;
  selected: boolean;
  onClick: (id: AccessibleChannelsResponse) => void;
  onEditClick: (id: AccessibleChannelsResponse) => void;
  onDeleteClick: (id: AccessibleChannelsResponse) => void;
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
      onClick={() => onClick(item)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box>{item.channelName}</Box>

        <Box>
          <IconWrapper onClick={() => onEditClick(item)} tooltipTitle="Edit">
            <ModeEditOutlineIcon />
          </IconWrapper>

          <IconWrapper onClick={() => onDeleteClick(item)} tooltipTitle="Delete">
            <DeleteIcon />
          </IconWrapper>
        </Box>
      </Box>
    </ListItem>
  );
};
