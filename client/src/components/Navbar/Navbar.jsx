import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Logout from '../Logout/Logout';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import FilterSection from '../FilterSection/FilterSection';
import { palette } from "../../ColourPalette";
import { useStyles } from './styles';

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [redirectToProfile, setRedirectToProfile] = React.useState(null);

  const user = useSelector((store) => store.userReducer.user);

  const isSmallScreen = window.matchMedia('(max-width: 1300px)')

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  if (redirectToProfile) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return <Redirect to={redirectToProfile} />;
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div style={{backgroundColor: palette.blueDark}}>
      <MenuItem onClick={() => setRedirectToProfile("/profile")}>
        <Button className={classes.buttonProfile}>{user && user.username}</Button>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Logout />
      </MenuItem>
      </div>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? (
        <div style={{backgroundColor: palette.blueDark}}>
          <MenuItem onClick={handleProfileMenuOpen}>
            <Button
              className={classes.buttonProfileMobile}
              onClick={() => setRedirectToProfile("/profile")}
            >
              {user && user.username}
            </Button>
          </MenuItem>
          <MenuItem>
              <Logout />
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            <SignIn />
          </MenuItem>
          <MenuItem>
            <SignUp />
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div>
      <AppBar position="fixed" className={classes.backgroundNavbar}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          {/* traer post mas recientes y hacer reload*/}
          <Link to="/" style={{textDecoration: 'none'}}>
            <Button
              variant="h6"
              noWrap
              onClick={() => <Redirect to="/" />}
              className={classes.memeland}
            >
              Memeland
            </Button>
          </Link>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
          {isSmallScreen.matches && user && (
            <div style={{marginTop: "-10px" }}>
              <FilterSection />
            </div>
          )}

          <div className={classes.grow} />
          {user ? (
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <img
                  src={user && user.image}
                  alt="user"
                  width="40"
                  height="40"
                  style={{ borderRadius: "100%" }}
                ></img>
              </IconButton>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div>
                  <Button
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <SignIn />
                  </Button>
                </div>
                <div>
                  <Button
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <SignUp />
                  </Button>
                </div>
              </div>
            </>
          )}

          {user && (
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
