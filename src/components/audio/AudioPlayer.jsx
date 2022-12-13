import React from "react";
import { Navbar } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function AudioPlay({ musicId }) {
  // console.log("====>", musicId);
  // alert(musicId.music_file)

  return (
    <div>
      <Navbar fluid className="fixed-bottom container mp3">
        <div className="d-flex align-items-center">
          <img src={musicId?.thumbnail} alt="thumbnail" className="img-music" />
          <span className="text-mp3 fluid">
            {musicId?.title}&nbsp;-&nbsp;{musicId?.singer.name}
          </span>
          <p></p>
        </div>
        <AudioPlayer autoPlay src={musicId?.music_file} layout="horizontal" className="mp3-player" />
      </Navbar>
    </div>
  );
}

export default AudioPlay;