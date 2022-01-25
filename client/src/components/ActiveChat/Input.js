import React, { useState } from "react";
import { FormControl, FilledInput, InputAdornment, IconButton, Box } from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import Image from "./Image";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
    position: "relative"
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  },
  image: {
    height: 200,
    width: "auto",
    marginRight: 20
  },
  imagelist: {
    display: "flex",
    flexFlow: "row wrap",
    position: "absolute",
    bottom: 85,
    backgroundColor: "white",
    width: "100%",
    padding: 5,
    borderRadius: 8,
  },
  hidden: {
    display: "none",
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text === "" && images.length === 0) {
      return;
    }
    setDisabled(true);
    // first get any images that were added uploaded onto the cloud
    const uploads = [];
    if (images.length !== 0) {
      for (let i = 0; i < images.length; i++) {
        const data = new FormData();
        data.append("file", images[i]);
        data.append("upload_preset", "yvzoqkzc");
        data.append("cloud_name","drzbxeoao");
        await fetch("https://api.cloudinary.com/v1_1/drzbxeoao/image/upload", {
          method: "post",
          body: data
        })
        .then(resp => resp.json())
        .then(data => {
          uploads.push(data.url);
        })
        .catch(err => console.log(err));
      }
    }

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: text,
      attachments: uploads,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user
    };

    await postMessage(reqBody);
    setText("");
    setImages([]);
    setDisabled(false);
  };

  const handleImage = async (event) => {
    const img = event.target.files[0]; 
    if (img == null) return;
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = readerEvent => {
      setImages(images => [...images, readerEvent.target.result]);
    }
    document.getElementById('file-input').value = null;
  }

  const handleImageDelete = (index) => {
    setImages(images => {
      const update = [...images];
      update.splice(index, 1);
      return update;
    });
  }

  const imagelist = images.map( (img, index) => {
    return <Image src={img} key={index} index={index} onDelete={handleImageDelete} disabled={disabled}/>;
  })

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Box className={images.length > 0 ? classes.imagelist : classes.hidden}>
        {imagelist}
      </Box>
      <FormControl fullWidth hiddenLabel disabled={disabled}>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <IconButton disabled={disabled} color="secondary" aria-label="upload image" size="medium" onClick={() => document.getElementById('file-input').click()}>
                <AddPhotoAlternateIcon color="primary" disabled={disabled}/>
              </IconButton>
              <input id="file-input" type="file" accept="image/*" style={{display: "none"}} onChange={handleImage}/>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <LoadingButton
                onClick={handleSubmit}
                color="primary"
                endIcon={<SendIcon />}
                loading={disabled}
                disabled={(images.length === 0 && text === "")}
                loadingPosition="end"
                variant="contained"> 
                Send
              </LoadingButton>
            </InputAdornment>
            
          }
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
