import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Box, ListItem } from '@mui/material';

import { AccessibleChannelsResponse } from '../../../api/types/channels';
import { useAuthorization } from '../../../providers/AuthorizationProvider';
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
  const { authUser } = useAuthorization();

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

        {item.ownerId === authUser?.id && (
          <Box>
            <IconWrapper onClick={() => onEditClick(item)} tooltipTitle="Edit">
              <ModeEditOutlineIcon />
            </IconWrapper>

            <IconWrapper onClick={() => onDeleteClick(item)} tooltipTitle="Delete">
              <DeleteIcon />
            </IconWrapper>
          </Box>
        )}
      </Box>
    </ListItem>
  );
};
