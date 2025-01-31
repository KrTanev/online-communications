import type { Dispatch, SetStateAction } from 'react';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';

type TextFieldShowInputAdornmentProps = {
  showInput: boolean;
  setShowInput: Dispatch<SetStateAction<boolean>>;
};

export const TextFieldShowInputAdornment = (props: TextFieldShowInputAdornmentProps) => {
  const { showInput, setShowInput } = props;

  return (
    <InputAdornment position="end">
      <Tooltip title={showInput ? 'Hide password' : 'Show password'}>
        <IconButton
          onClick={() => setShowInput((show) => !show)}
          onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
          }}
          edge="end"
        >
          {showInput ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
};
