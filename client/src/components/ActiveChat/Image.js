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
    const { src, disabled, index, onDelete } = props;

    const handleDelete = (event) => {
        if (onDelete) {
            onDelete(index);
        }
    }

    return (
        <Box className={classes.root}>
            <img src={src} alt="" className={classes.image}/>
            <Fab disabled={disabled} color="secondary" aria-label="delete image" size="small" onClick={handleDelete} className={classes.button}>
                <DeleteIcon color="primary" disabled={disabled}/>
            </Fab>
        </Box>
    );
}

export default Image;