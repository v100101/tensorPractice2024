import { AppBar, Box, IconButton, SxProps } from '@mui/material';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const getHeaderSx = (isMatchingMobile: boolean, isInternal: boolean): SxProps => {
  if(isInternal) {
    return {
      height: 125, 
      boxShadow: 'none',
      borderRadius: 50,
      maxWidth: '100%',
      margin: '0 auto'
    };
  } else if(isMatchingMobile) {
    return {
      height: 65, 
      boxShadow: 'none', 
      borderEndStartRadius: 50,
      borderEndEndRadius: 50,
      maxWidth: '100%',
      margin: '0 auto',
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    };
  }
  return (
    {
      height: 85, 
      boxShadow: 'none', 
      borderEndStartRadius: 50,
      borderEndEndRadius: 50,
      width: WIDTH_RELATIVE_TO_SCREEN,
      margin: '0 auto',
      marginBottom: 5
    }
  );
}

export default function MainAppBar({isOnMainPage = false, isInternal = false}: {isOnMainPage?: boolean, isInternal?: boolean}) {
  const {isMobile, isDesktop} = useMediaMatch();
  const [isMenuOpened, setMenuOpen] = useState<boolean>(false);

  if(isOnMainPage && isDesktop || isInternal && !isDesktop) {
    return <></>;
  } 

  const openMenu = () => setMenuOpen((isOpened) => !isOpened);
  const closeMenu = () => setMenuOpen(false);

  return (
    <AppBar
      position='static' 
      sx={ getHeaderSx(isMobile, isInternal) } 
      color={isMobile ? 'secondary' : 'primary'}>
        <h1 style={{margin: isMobile ? '0' : 'auto'}}>NeuroQuest</h1>

        <Box hidden={!isMobile} position='relative'>
          <IconButton color='inherit' onClick={openMenu}>
            <MenuIcon />
          </IconButton>

          <MobileMenu isOpened={isMenuOpened} closeMenu={closeMenu}/>
        </Box>
    </AppBar>
  );
}
