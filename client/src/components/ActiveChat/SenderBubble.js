import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  imagelist: {
    display: "flex",
    flexFlow: "row wrap"
  },
  image: {
    height: 200,
    width: "auto",
    flexGrow: 1,
    objectFit: "cover",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
    overflow: "hidden"
  },
  hidden: {
    display: "none"
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, attachments, text } = props;

  let imagelist = null;
  if (attachments !== null) {
    imagelist = attachments.map( img => {
      return <img src={img} alt="" key={img} className={classes.image}/>;
    });
  }


  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={text !== "" && text !== null ? classes.text : classes.hidden}>{text}</Typography>
        <Box className={classes.imagelist}>
          {imagelist}
        </Box>
      </Box>
    </Box>
  );
};

export default SenderBubble;
