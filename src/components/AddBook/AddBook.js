import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Addbook.css";
import SideNav from "../SideNav/SideNav";

const AddBook = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL, setImageURL] = useState(null);

  const onSubmit = (data) => {
    const bookData = {
      name: data.name,
      authorname: data.authName,
      price: data.price,
      imageURL: imageURL,
    };
    const url = `https://mysterious-bastion-60676.herokuapp.com/addBook`;
    console.log(bookData);
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookData),
    }).then((res) => console.log("server side response"));
  };
  const handleImgUpload = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "43e2db0acea534d5ddd6e1d6fa094725");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="d-flex">
      <div className="col-md-3 col-sm-3">
        <SideNav />
      </div>
      <div className="added-page col-md-9 col-sm-9">
        <h1>Add Book</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">
            <h5>Book Name</h5>
          </label>
          <br />
          <input name="name" className="input-field" placeholder="Enter book name" ref={register} />
          <br />
          <label htmlFor="">
            <h5>Author Name</h5>
          </label>
          <br />
          <input
            name="authName" className="input-field"
            placeholder="Enter author name"
            ref={register}
          />
          <br />
          <label htmlFor="">
            <h5>Price</h5>
          </label>
          <br />
          <input name="price" className="input-field" placeholder="Enter price" ref={register} />
          <br />
          <label htmlFor="">
            <h5>Add Image</h5>
          </label>
          <br />
          <input
            name="exampleRequired" className="input-field"
            type="file"
            onChange={handleImgUpload}
          />
          <br />
          <input className="btn btn-info input-field" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddBook;
