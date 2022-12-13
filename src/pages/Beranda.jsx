import React, { useContext, useEffect, useState } from "react";
import CarouselSection from "../components/Carousel";
import { Card, Container, Navbar as NavbarMusic } from "react-bootstrap";
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
      navigate("/");
    }
  };
  // const userId = state.user.id

  const { data: userPrem, refetch } = useQuery("userCache", async () => {
    const response = await API.get(`/user/${state.user.id}`);
    console.log("res", response.data);
    return response.data.data;
  });

  // fetching API get all musics
  const { data: musics } = useQuery("musicsCache", async () => {
    const response = await API.get("/musics");
    // console.log(response.data);
    return response.data.data;
  });

  useEffect(() => {
    checkAuth();
    refetch();
  }, [state]);

  return (
    <>
      <Container className="mb-5">
        <CarouselSection />
        <div className="d-flex">
          <div class="row row-cols-4 gap-3 px-5">
            {userPrem?.transaction.subscription === "Active" ||
            state.user.status === "admin" ? (
              <>
                {musics?.map((item) => (
                  <Card
                    style={{
                      width: "192px",
                      height: "240px",
                      cursor: "pointer",
                    }}
                    className="mt-5 card-mp3"
                    onClick={() => setMusicId(item)}
                  >
                    <Card.Img
                      variant="top"
                      src={item?.thumbnail}
                      className="mp3-img pt-2"
                    />
                    <Card.Body>
                      <div className="text-white cards">
                        <div className="d-flex justify-content-between">
                          <p className="fs-title">{item?.title}</p>
                          <p className="fs-year">{item?.year}</p>
                        </div>
                        <p className="title-mp3">{item?.singer.name}</p>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </>
            ) : (
              <>
                {musics?.map((item) => (
                  <Card
                    style={{
                      width: "192px",
                      height: "240px",
                      cursor: "pointer",
                    }}
                    className="mt-5 card-mp3"
                    //kirim item ke func handle play
                    onClick={() => navigate("/sub-premium")}
                  >
                    <Card.Img
                      variant="top"
                      src={item?.thumbnail}
                      className="mp3-img pt-2"
                    />
                    <Card.Body>
                    <Card.Body>
                      <div className="text-white cards">
                        <div className="d-flex justify-content-between">
                          <p className="fs-title">{item?.title}</p>
                          <p className="fs-year">{item?.year}</p>
                        </div>
                        <p className="title-mp3">{item?.singer.name}</p>
                      </div>
                    </Card.Body>
                    </Card.Body>
                  </Card>
                ))}
              </>
            )}
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
