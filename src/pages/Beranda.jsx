import React, { useContext, useState, useEffect } from "react";
import CarouselSection from "../components/Carousel";
import { Card, Container } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

function Beranda() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);

  console.log("ini isi state beranda js", state.isLogin);

  const [music, setMusic] = useState([]);

  const getMusic = async () => {
    try {
      const res = await API.get("/musics");
      setMusic(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state.isLogin === "false") {
      navigate("/");
    } else {
      getMusic();
    }
  }, []);

  return (
    <>
      <Container className="mb-5">
        <CarouselSection />
        <div className="d-flex">
        <div class="row row-cols-4 gap-3 justify-content-center">
        {music.map((data) => (
          <Card style={{ width: "18rem" }} className="mt-5 card-mp3">
            <Card.Img
              variant="top"
              src={data.thumbnail}
              className="px-3 pt-3"
            />
            <Card.Body>
              <Card.Title className="text-white d-flex justify-content-between">
                <p>{data.title}</p>
                <p className="fs-6">{data.year}</p>
              </Card.Title>
              <Card.Text>
                <p className="title-mp3">{data.singer.name}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        </div>
        </div>
      </Container>
    </>
  );
}

export default Beranda;
