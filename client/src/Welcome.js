import {
    Box,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    bg: {
        position: "relative",
        height: "100vh",
        backgroundImage: "url(/img/bg-img.png)",
        backgroundSize: "cover",
        flex: "35%",
        zIndex: "0",
    },
    fade: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(79,145,239,0.8)",
        zIndex: "1",
    },
    container: {
        position: "relative",
        top: "30%",
        zIndex: "2",
    },
    text: {
        textAlign: "center",
        fontSize: "25px",
        width: "300px",
        marginLeft: "auto",
        marginRight: "auto",
        color: "white",
        fontWeight: "lighter",
    },
    img: {
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: "75px",
        height: "80px",
        width: "80px",
    }
}));

const Welcome = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.bg}>
            <Box className={classes.fade}/>
            <Box className={classes.container}>
                <img src="/img/bubble.svg" alt="" className={classes.img}/>
                <Typography variant="h1" className={classes.text}>Converse with anyone with any language</Typography>
            </Box>
        </Box>
    );
}

export default Welcome;