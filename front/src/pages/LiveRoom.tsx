import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoComponent from "../components/organisms/VideoComponent";
import io from "socket.io-client";

const socket = io("ws://localhost:4000", {
  path: "/",
  transports: ["websocket"],
  secure: true,
});

socket.io.on("open", () => {
  console.log("open");
  socket.emit("test", () => {
    return document.createElement("div")
  });
  console.log(new MediaStream());
});

function LiveRoom() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const [room, setRoom] = useState<any>({});
  const handleHome = () => {
    navigate("/");
  };
  useEffect(() => {}, []);
  return (
    <Box>
      {JSON.stringify(user)}
      <Typography component='h3' variant='h3' align='center' gutterBottom>
        Live
      </Typography>
      <VideoComponent />
      <Button onClick={handleHome}>Home</Button>
    </Box>
  );
}

export default LiveRoom;
