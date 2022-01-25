import React from "react";
import { Fab, Box } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        position: "relative"
    },
    image: {
        height: 200,
        width: "auto",
        marginRight: 20
    },
    button: {
        position: "absolute",
        top: -10,
        right: 5
    }
}));

const Image = (props) => {
    const classes = useStyles();

    const handleDelete = (event) => {
        if (props.onDelete) {
            props.onDelete(props.index);
        }
    }

    return (
        <Box className={classes.root}>
            <img src={props.src} alt="" className={classes.image}/>
            <Fab disabled={props.disabled} color="secondary" aria-label="delete image" size="small" onClick={handleDelete} className={classes.button}>
                <DeleteIcon color="primary" disabled={props.disabled}/>
            </Fab>
        </Box>
    );
}

export default Image;