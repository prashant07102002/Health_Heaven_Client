import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, removeItem } from "../Utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, showToast } from "../state";
import { axiosClient } from "../Utils/axiosClient";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [services, setServices] = React.useState(null);

  const [loggedInUser, setLoggedInUser] = React.useState(
    useSelector((store) => store.user)
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenServiceMenu = (e) => {
    setServices(e.currentTarget);
  };

  const handleCloseServiceMenu = () => {
    setServices(null);
  };

  const handleLogout = async () => {
    removeItem(KEY_ACCESS_TOKEN);
    try {
      const response = await axiosClient.get("/auth/logout");
      console.log(response);
      dispatch(setLogout());
      setLoggedInUser(null);
      if (response.status === "Ok") {
        dispatch(
          showToast({
            type: "Success",
            message: response.result,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          type: "Error",
          message: error,
        })
      );
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => navigate("/")}
          >
            HEALTH HEAVEN
          </Typography>

          {/* Nav Items For NonMobileScreens */}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex" },
              justifyContent: "flex-start",
              gap: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "0.5rem 1rem",
                ml: "5rem",
                "&:hover": {
                  backgroundColor: "#1b1b1b",
                  cursor: "pointer",
                },
                borderRadius: "0.25rem",
              }}
              onClick={() => navigate("/")}
            >
              <HomeIcon />
              <Typography sx={{ ml: "0.25rem" }}>Home</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "0.5rem 1rem",
                "&:hover": {
                  backgroundColor: "#1b1b1b",
                  cursor: "pointer",
                },
                borderRadius: "0.25rem",
              }}
              onClick={() => navigate("/about")}
            >
              <EmojiPeopleIcon />
              <Typography sx={{ ml: "0.25rem" }}>About Us</Typography>
            </Box>

            {/* Expanded Services */}
            <Box
              onClick={handleOpenServiceMenu}
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "0.5rem 1rem",
                "&:hover": {
                  backgroundColor: "#1b1b1b",
                  cursor: "pointer",
                },
                borderRadius: "0.25rem",
              }}
            >
              <HomeRepairServiceIcon />
              <Typography sx={{ m: "0 0.25rem" }}>Services</Typography>
              <ExpandMoreIcon />
            </Box>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={services}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(services)}
              onClose={handleCloseServiceMenu}
            >
              <MenuItem onClick={() => navigate("/services/findGyms")}>
                <Typography textAlign="center">Find Gyms</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/services/store")}>
                <Typography textAlign="center">Buy Suppliments</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/services/dietPlanner")}>
                <Typography textAlign="center">Diet Planner</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/services/resources")}>
                <Typography textAlign="center">Excercise Resources</Typography>
              </MenuItem>
            </Menu>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "0.5rem 1rem",
                "&:hover": {
                  backgroundColor: "#1b1b1b",
                  cursor: "pointer",
                },
                borderRadius: "0.25rem",
              }}
            >
              <PersonIcon />
              <Typography sx={{ ml: "0.25rem" }}>Account</Typography>
            </Box>
          </Box>

          {loggedInUser ? (
            <>
              <Box>
                <Typography>
                  {`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 0, ml: "1rem" }}>
                <Tooltip
                  title="Open settings"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <AccountCircleIcon />
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={() => navigate(`/signup`)}>
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
