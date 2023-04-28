import { AppBar, Avatar, Stack, Toolbar, Typography, styled } from "@mui/material";
import { School } from "@mui/icons-material";
import { Link } from "react-router-dom";

//Customizing Toolbar
const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

function Navbar() {
    return(
        <AppBar >
            <StyledToolbar>
                <Stack direction="row" alignItems="center" gap={2}>
                    <Link to="/"><School sx={{fontSize: 50, color: "white", textDecoration: "none"}}  /></Link>
                    <Typography component={Link} to="/" variant="h6" sx={{color:"white", textDecoration:"none", display: {xs: "none", sm:"block"}}}>TechClass</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
                    <Avatar alt="Ajithkumar" src="https://randomuser.me/api/portraits/men/11.jpg" sx={{height: 40, width:40}} />
                    <Typography variant="span">Ajithkumar K</Typography>
                </Stack>
            </StyledToolbar>
        </AppBar>
    );
}

export default Navbar;