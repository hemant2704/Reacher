import React from 'react';
import Identicon from 'identicon.js';
import photo from '../photo.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';

const Navbar = (props) => {
  return (
    <AppBar elevation={0} position="fixed" sx={{ backgroundColor: 'transparent' }}>
      <Toolbar>
        <Typography sx={{ textShadow: '10px 10px 5px #d16ba5', flexGrow: 1, fontSize: '36px', fontWeight: 600 }}>
          Reacher
        </Typography>
        <Tooltip title={props.account === undefined?null:props.account } placement="bottom-start">
          <Button color="inherit" sx={{ fontWeight: 600 }}>
            {props.account === undefined && null}

            {props.account !== undefined && (props.account === '0x0' ? props.account : props.account.slice(0, 5) + "..." + props.account.slice(props.account.length - 3))}

          </Button>
        </Tooltip>
        {
          props.account !== '0x0' &&
          <img style={{ borderRadius: 4 }} width='30' height='30' src={`data:image/png;base64,${new Identicon(props.account, 30).toString()}`} />
        }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;