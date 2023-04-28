import { Card, CardContent, Stack, Typography } from "@mui/material";

function Cards({name, count, image}) {
    return(
        <Card sx={{ minWidth: 300, height: 120, display:"flex", alignItems: "center", justifyContent: "space-around"}}>
            <CardContent>
                <img  className="img-logo" src={image} alt={`${image}`} />
            </CardContent>

            <Stack direction="column" alignItems="flex-end">
                <Typography variant="h6" fontWeight="400">
                    {name}
                </Typography>
                <span  style={{fontSize: "50px"}}>{count}</span>
            </Stack>
    </Card>
    );
}

export default Cards;