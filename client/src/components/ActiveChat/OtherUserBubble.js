import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
    overflow: "hidden"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
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
  hidden: {
    display: "none"
  }
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, attachments, otherUser } = props;
  
  let imagelist = null;
  if (attachments !== null) {
    imagelist = attachments.map( img => {
      return <img src={img} alt="" key={img} className={classes.image}/>;
    });
  }


  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box className={classes.bubble}>
          <Typography className={text !== "" && text !== null ? classes.text : classes.hidden}>{text}</Typography>
          <Box className={classes.imagelist}>
            {imagelist}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
