import React, { useContext, useState } from "react";
import CarouselSection from "../components/Carousel";
import { Card, Container, Navbar as NavbarMusic} from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";
import AudioPlay from "../components/audio/AudioPlayer";

function Beranda() {
  const title = "Dashboard";
  document.title = "Coways | " + title;


  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [musicId, setMusicId] = useState("");

  //check status login
   const checkAuth = () => {
    if (state.isLogin === false) {
      navigate("/")
    }
   }

  checkAuth()

  // fetching API get all musics
  const { data: musics } = useQuery("musicsCache", async () => {
    const response = await API.get("/musics");
    // console.log(response.data);
    return response.data.data;
  });


  // console.log(musicId)

  return (
    <>
      <Container className="mb-5">
        <CarouselSection />
        <div className="d-flex">
        <div class="row row-cols-4 gap-3 justify-content-center">
        {musics?.map((item) => (
          <Card style={{ width: "18rem", cursor: "pointer"}} className="mt-5 card-mp3" onClick={() => setMusicId(item)}>
            <Card.Img
              variant="top"
              src={item?.thumbnail}
              className="px-3 pt-3"
            />
            <Card.Body>
              <Card.Title className="text-white d-flex justify-content-between">
                <p>{item?.title}</p>
                <p className="fs-6">{item?.year}</p>
              </Card.Title>
              <Card.Text>
                <p className="title-mp3">{item?.singer.name}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        </div>
        </div>

      {musicId === "" ? (
          <></>
        ) : (
          <NavbarMusic className="fixed-bottom">
            <AudioPlay musicId={musicId} />
          </NavbarMusic>
        )}
      </Container>

    </>
  );
}

export default Beranda;
