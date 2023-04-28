import { LibraryBooks, LocalLibrary, ModeNight, People } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { Link } from "react-router-dom";

function Sidebar({mode, setMode}) {
    return(
        <Box flex={1} p={2} mt={10} sx={{ display: {xs: "none", sm: "block" }}}>
            <Box position="sticky">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/students">
                            <ListItemIcon>
                                <People />
                            </ListItemIcon>
                            <ListItemText primary="Students" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/teachers">
                            <ListItemIcon>
                                <LocalLibrary />
                            </ListItemIcon>
                            <ListItemText primary="Teachers" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/courses">
                            <ListItemIcon>
                                <LibraryBooks />
                            </ListItemIcon>
                            <ListItemText primary="Courses" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ModeNight />
                            </ListItemIcon>
                            <Switch onClick={() => {setMode((mode === "light") ? "dark": "light")}} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}

export default Sidebar;