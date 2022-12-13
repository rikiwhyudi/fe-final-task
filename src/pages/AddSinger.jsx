import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { API } from "../config/api";
import { UserContext } from "../context/UserContext";

function AddSinger() {
  const title = "Add Artist";
  document.title = "Coways | " + title;

  const navigate = useNavigate();
  const [state] = useContext(UserContext)

  // console.log("=====>", state.isLogin)

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

  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    name: "",
    thumbnail: "",
    old: "",
    category: "",
    start_career: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    //create image url for preview
    if (e.target.type === "file") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("name", form.name);
      formData.set("old", form.old);
      formData.set("category", form.category);
      formData.set("start_career", form.start_career);
      console.log(formData);
      const response = await API.post("/singer", formData);

      alert("Data artist berhasil di tambahkan")
      console.log("data berhasil di tambahkan", response.data.data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Header />
      <Container>
        <div className="d-flex flex-column justify-content-center add">
          <p>Add Artist</p>
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
          <form
            className="form-section"
            onSubmit={(e) => handleSubmit.mutate(e)}
          >
            <div className="d-flex align-items-center">
              <input
                className="form-add-1"
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Artist"
                required
              />
              <input
                type="file"
                name="thumbnail"
                className="customFile"
                id="thumbnail"
                onChange={handleChange}
                hidden
                required
              />
              <label
                htmlFor="upload"
                className="customFile ps-4"
                for="thumbnail"
              >
                Attach Thumbnail
                <span>
                  <img src="/assets/img/attach.svg" className="me-2" alt="attach" />
                </span>
              </label>
            </div>

            <input
              className="form-add"
              type="number"
              name="old"
              onChange={handleChange}
              placeholder="Old"
              required
            />

            <input
              className="form-add"
              type="text"
              name="category"
              onChange={handleChange}
              placeholder="Solo"
              required
            />

            <input
              className="form-add"
              type="number"
              name="start_career"
              onChange={handleChange}
              placeholder="Start a Career"
              required
            />

            <div className="d-grid justify-content-center">
              <button className="btn-add">Add Artist</button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}

export default AddSinger;
