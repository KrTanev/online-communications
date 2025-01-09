import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, List, Typography } from '@mui/material';

import { IconWrapper } from '../../common/IconWrapper';
import { ChannelListItem, ChannelListItemType } from './ChannelListItem';

//TODO: Change with request
const mockChannels: ChannelListItemType[] = [
  { id: 0, name: 'Sport', ownerId: 1, participants: ['qw,we,er'] },
  { id: 1, name: 'Technology', ownerId: 1, participants: ['sd,fd,gf'] },
  { id: 2, name: 'History', ownerId: 1, participants: ['hg,er,tr'] },
];

type ChannelsProps = {
  selectedChannelId: number;
  onChannelClick: (id: number) => void;
};

export const Channels = ({ selectedChannelId, onChannelClick }: ChannelsProps) => {
  const handleAddClick = () => console.log('clicked');

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography>Available channels</Typography>

        <IconWrapper onClick={handleAddClick}>
          <AddIcon />
        </IconWrapper>
      </Box>
      <Divider />

      <List sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        {mockChannels.map((x) => (
          <ChannelListItem
            key={x.id}
            item={x}
            onClick={onChannelClick}
            onEditClick={(id) => console.log('edited', id)}
            onDeleteClick={(id) => console.log('deleted', id)}
            selected={x.id === selectedChannelId}
          />
        ))}
      </List>
    </Box>
  );
};
