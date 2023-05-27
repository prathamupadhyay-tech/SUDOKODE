import React from "react";
import { useEffect } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const AddBlog = ({ setisAddBlog }) => {
  const [isDisabled, setisDisabled] = React.useState(false);
  const Location = useLocation();
  const userId = localStorage.getItem("userId");
  const ourUser = localStorage.getItem("Name");
  let descriptionEdit;
  let titleEdit;
  let _id;
  if (!Location.state.add) {
    titleEdit = Location.state.title.title;
    descriptionEdit = Location.state.description.description;
    _id = Location.state.id.id;
  } else {
    titleEdit = "";
    descriptionEdit = "";
    _id = undefined;
  }
  const [allInputs, setallInputs] = React.useState({
    title: titleEdit,
    description: descriptionEdit,
  });
  useEffect(() => {
    setisDisabled(
      allInputs.title.length > 0 && allInputs.description.length > 0
    );
  }, [allInputs.title, allInputs.description]);

  const navigate = useNavigate();

  const sendRequest = async () => {
    const user = {
      title: allInputs.title,
      description: allInputs.description,
      ourUser: userId,
    };
    let res;
    try {
      if (!_id)
        res = await axios.post(`http://localhost:5000/api/blog/addBlog`, user);
      else
        res = await axios.put(
          `http://localhost:5000/api/blog/updateBlog/${_id}`,
          user
        );
    } catch (err) {
      setallInputs({
        title: "",
        description: "",
      });
      return console.log(err);
    }
    const data = await res.data;
    const description = data.newBlog.description;
    const title = data.newBlog.title;
    const id = data.newBlog._id;
    navigate("/myBlogs/:id", {
      state: {
        description: { description },
        ourUser: { ourUser },
        title: { title },
        id: { id },
      },
    });
    return data;
  };

  const handleIt = (e) => {
    setallInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          boxShadow="10px 10px 20px #ccc"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin={20}
          padding={5}
          marginTop={0}
          borderRadius={5}
        >
          <Typography variant="h3">Add A Post</Typography>
          <Typography
            style={{ fontSize: "1.7rem" }}
            marginTop={5}
            marginBottom={2}
            marginRight="auto"
          >
            Title
          </Typography>
          <TextField
            fullWidth
            name="title"
            onChange={handleIt}
            value={allInputs.title}
            placeholder="Title"
            label="Title"
            multiline
            rows={1}
            variant="outlined"
          />
          <Typography
            style={{ fontSize: "1.7rem" }}
            marginTop={2}
            marginBottom={2}
            marginRight="auto"
          >
            Description
          </Typography>
          <TextField
            fullWidth
            name="description"
            onChange={handleIt}
            value={allInputs.description}
            label="Description"
            multiline
            rows={10}
            variant="outlined"
            placeholder="description"
          />
          <Button
            type="submit"
            disabled={!isDisabled}
            sx={{ borderRadius: 5 }}
            variant="contained"
          >
            Post!
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
