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
    console.log("res",response.data);
    return response.data.data;
  });


  
  const listPlay = userPrem?.transaction.subscription === "Active"
  console.log("listPlay", listPlay);
  
  // fetching API get all musics
  const { data: musics } = useQuery("musicsCache", async () => {
    const response = await API.get("/musics");
    // console.log(response.data);
    return response.data.data;
  });
  
  // const handlePlay = () => {
  //   if (userPrem.transaction.subscription === "" || userPrem.transaction.subscription === "No Active") {
  //     navigate("/sub-premium")
  //   } else {
  //     musics?.map(item => setMusicId(item))
  //     alert(userPrem.transaction.subscription)
  //     // alert("test")
  //   }
  // }
  // console.log(musicId)

  useEffect(() => {
    checkAuth()
    refetch()
  }, [state])

  // console.log("user: ",state.user);

  return (
    <>
      <Container className="mb-5">
        <CarouselSection />
        <div className="d-flex">
          <div class="row row-cols-4 gap-3 justify-content-center">
          
            {(listPlay) ? (
              <>
               {musics?.map((item) => (
              <Card
                style={{ width: "18rem", cursor: "pointer" }}
                className="mt-5 card-mp3"
                //kirim item ke func handle play
                onClick={() => setMusicId(item)}
              >
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

              </>
            ) : (
              <>       
               {musics?.map((item) => (
              <Card
                style={{ width: "18rem", cursor: "pointer" }}
                className="mt-5 card-mp3"
                //kirim item ke func handle play
                onClick={() => navigate("/sub-premium")}
              >
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