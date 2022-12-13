import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { API } from "../config/api";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";

function AddMusic() {
  const title = "Add Music";
  document.title = "Coways | " + title;

  const [state] = useContext(UserContext)

  const navigate = useNavigate();

    // fetching API get all singers
    const { data: singer } = useQuery("singersCache", async () => {
      const response = await API.get("/singers");
      // console.log(response.data);
      return response.data.data;
    });


  // const [singer, setSinger] = useState([])

  // const getSingerID = async () => {
  //   try {
  //     const res = await API.get(`/singers`);
  //     setSinger(res.data.data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };


  const checkAuth = () => {
    if (state.isLogin === false) {
        navigate("/")
    } else if (state.user.status === "customer") {
        navigate("/dashboard")
    }
}

useEffect(() => {
    checkAuth()
}, [])

  // console.log(singer[0].id)


  const [preview, setPreview] = useState(null); //For image preview
  const [mp3, setMp3] = useState(null); //For mp3 preview
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    year: "",
    singer_id: "",
    music_file: "" ,
  });

  // console.log(form)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    //create image url for preview
    if (e.target.name === "thumbnail") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    } else if (e.target.name === "music_file") {
      const url = URL.createObjectURL(e.target.files[0]);
      setMp3(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("title", form.title);
      formData.set("year", form.year);
      formData.set("singer_id", form.singer_id);
      formData.set("music_file", form.music_file[0], form.music_file[0].name);

      console.log(formData);

      const response = await API.post("/music", formData);

      alert("Music berhasil di tambahkan");
      // console.log("data music berhasil di tambahkan", response.data.data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Header />
      <Container>
        <div className="d-flex flex-column justify-content-center add">
          <p>Add Music</p>
          <div className="d-flex justify-content-end me-5 mb-3 pe-3">
            {preview && (
              <div className="prev-img">
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
          </div>
          <form className="form-section" onSubmit={(e) => handleSubmit.mutate(e)} >
            <div className="d-flex align-items-center">
              <input
                className="form-add-1"
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
              />
              <input
                type="file"
                name="thumbnail"
                className="customFile"
                id="thumbnail"
                onChange={handleChange}
                hidden
              />
              <label htmlFor="upload" className="customFile ps-4" for="thumbnail">
                Attach Thumbnail
                <span>
                  <img src="/assets/img/attach.svg" className="me-2" alt="attach"/>
                </span>
              </label>
            </div>
            <input
              className="form-add"
              type="number"
              name="year"
              onChange={handleChange}
              placeholder="Year"
            />
          
            <select
              onChange={handleChange}
              className="form-select form-select-lg mb-3"
              aria-label="form-select-lg" name="singer_id"
              >
              <option value="" className="d-none" selected disabled>Singer ID</option>
              { singer?.map((data) => (
              <option value={data?.id}>{data?.name}</option>
              ))}
            </select>

            <div className="d-flex align-items-center">
              <input
                type="file"
                name="music_file"
                className="file_mp3"
                id="music_file"
                onChange={handleChange}
                hidden
              />
              <label htmlFor="upload" className="file_mp3" for="music_file">
                Attache
              </label>
              {mp3 && (
              <div className="ms-3 px-2 prev-mp3">
                {mp3}
              </div>
            )}
            </div>
            <div className="d-grid justify-content-center">
              <button className="btn-add">Add Music</button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}

export default AddMusic;
