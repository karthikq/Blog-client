/** @format */

import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Inputfield from "../../components/navbar/Input";
import "./auth.styles.scss";
import Resizer from "react-image-file-resizer";
import Animation from "../../lottie/Animation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import imageCompression from "browser-image-compression";

import { connect } from "react-redux";

import Checkenv from "../../api/Checkenv";
import facebookIcon from "./Github.png";
import CropImage from "../../components/CropImage/CropImage";
import { async } from "@firebase/util";
import ImageUpload from "../../customhook/ImageUpload";
import toast, { Toaster } from "react-hot-toast";
import { RiPassportLine, RiUserFill, RiUserLine } from "react-icons/ri";
import { MdPassword } from "react-icons/md";

const schema = yup
  .object()
  .shape({
    username: yup.string(),
    email: yup.string().email(),
    password: yup
      .string()
      .matches(
        "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
        "Minimum eight characters, at least one letter and one number"
      ),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const Authform = ({
  header,
  loginState,
  handleLogin,
  nameExists,
  emailExists,
  passwordErr,
  noEmail,
}) => {
  const [porfilebase64, setporfilebase64] = useState("");
  const [passwordType, setpaswordType] = useState("password");
  const [Imageblob, setImageblob] = useState("");
  const [userData, setuserData] = useState("");
  const [btnStatus, setbtnStatus] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const progressBar = useRef(null);
  const authBtn = useRef(null);

  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const handlePofileImage = async (e) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    setImageblob(e.target.files[0]);

    const compressedImg = await imageCompression(e.target.files[0], options);
    const src = URL.createObjectURL(compressedImg);
    setporfilebase64(src);
  };
  const handleImage = (url, details) => {
    toast.dismiss();
    if (url) {
      handleLogin(details, url, setbtnStatus);
    }
  };

  const onsubmit = (data) => {
    setbtnStatus(true);
    if (loginState) {
      handleLogin(data, setbtnStatus);
    } else {
      previewCanvasRef.current.toBlob(
        async (blob) => {
          if (!blob) {
            toast.dismiss();
            toast.error("please crop th Image to continue");
          } else {
            blob.name = Imageblob.name;

            toast.loading("Uploading Image please wait...");
            ImageUpload(blob, progressBar.current, handleImage, toast, data);
          }
        },
        "image/png",
        1
      );

      // try {
      //   Resizer.imageFileResizer(
      //     e.target.files[0],
      //     300,
      //     300,
      //     "JPEG",
      //     80,
      //     0,
      //     (uri) => {
      //       setporfilebase64(uri);
      //       // this.setState({ newImage: uri });
      //     },
      //     "base64",
      //     200,
      //     200
      //   );
      // } catch (err) {
      //   console.log(err);
      // }
    }
  };
  // const handleClick = async () => {
  //   const res = await axios.get("http://localhost:4000/auth/google/login");
  //   console.log(res.data);
  // };
  return (
    <div className="auth-container">
      <div className="auth-contents">
        <h1>{header}</h1>
        <form className="auth-form" onSubmit={handleSubmit(onsubmit)}>
          <div className="auth-left">
            {!loginState && (
              <React.Fragment>
                <Inputfield>
                  <input
                    type="text"
                    required
                    {...register("username", {
                      required: "this field is required",
                    })}
                  />
                  <div className="underline"> </div>
                  <label>
                    {" "}
                    <RiUserLine style={{ color: "#35c26b" }} /> Username
                  </label>
                </Inputfield>

                <span className="auth-errors">
                  {errors.username && errors.username.message}
                </span>
                <span className="auth-errors">
                  {nameExists && "username already exists"}
                </span>
              </React.Fragment>
            )}
            <Inputfield>
              <input type="text" required {...register("email")} />
              <div className="underline"> </div>
              <label>
                {" "}
                <AiOutlineMail style={{ color: "#35c26b" }} /> Email
              </label>
            </Inputfield>
            <span className="auth-errors">
              {errors.email && errors.email.message}
            </span>
            <span className="auth-errors">
              {emailExists && "email already exists"}
            </span>
            <span className="auth-errors">
              {noEmail && "Email doesn't exists"}
            </span>
            <Inputfield>
              <input type={passwordType} required {...register("password")} />
              <div className="underline"> </div>
              <label>
                <MdPassword style={{ color: "#35c26b" }} /> Password
              </label>
              <div
                className="check-password"
                onClick={() =>
                  setpaswordType((preVlaue) =>
                    preVlaue === "text" ? "password" : "text"
                  )
                }>
                {passwordType === "text" ? "Hide" : "show"}
              </div>
            </Inputfield>
            <span className="auth-errors">
              {errors.password && errors.password.message}
            </span>
            <span className="auth-errors">
              {passwordErr && "Wrong password!"}
            </span>
            {!loginState && (
              <React.Fragment>
                <Inputfield>
                  <input
                    type="password"
                    required
                    {...register("confirmpassword")}
                  />
                  <div className="underline"> </div>
                  <label>
                    {" "}
                    <MdPassword style={{ color: "#35c26b" }} /> Confirm Password
                  </label>
                </Inputfield>{" "}
                <span className="auth-errors">
                  {errors.confirmpassword && errors.confirmpassword.message}
                </span>
                <Inputfield>
                  <input
                    type="file"
                    required
                    onChange={handlePofileImage}
                    accept=".jpg, .png, .jpeg"
                  />
                  <div className="underline"> </div>
                  <label className="profile-label">Profile Image</label>
                </Inputfield>
                <div className="uploaded-img">
                  {porfilebase64 ? (
                    <>
                      {/* <img src={porfilebase64} alt="profile url" /> */}
                      <CropImage
                        Upimg={porfilebase64}
                        imgRef={imgRef}
                        onLoad={onLoad}
                        setCompletedCrop={setCompletedCrop}
                        previewCanvasRef={previewCanvasRef}
                        completedCrop={completedCrop}
                      />
                      <div className="progress-bar-reg">
                        <span ref={progressBar}></span>
                      </div>
                    </>
                  ) : (
                    <div>
                      <Animation w={180} h={180} name="loginAn" />
                    </div>
                  )}
                </div>
              </React.Fragment>
            )}
            <div className="no-account">
              {!loginState ? (
                <p>
                  Have an account <Link to="/user/login">Login</Link>
                </p>
              ) : (
                <p>
                  Don't have an account
                  <Link to="/user/register">Register</Link>
                </p>
              )}
            </div>
          </div>
          {/* //from ceratestyles */}
          <div className="auth-btn">
            <button disabled={btnStatus} type="submit">
              {header === "Sign In" ? header : " Create account"}
            </button>
          </div>{" "}
          <p className="opt">Or continue with</p>
          <div className="social-login">
            <a className="social-atag" href={Checkenv() + "/auth/google"}>
              <div className="circle-bg">
                <FcGoogle className="social-icon" title="Facebook Sign in" />{" "}
              </div>
            </a>

            <a className="social-atag" href={Checkenv() + "/auth/github"}>
              <div className="circle-bg auth-border">
                <AiFillGithub
                  className="social-icon github-icon"
                  title="Facebook Sign in"
                />
              </div>
            </a>
          </div>
        </form>
        <Toaster />
      </div>{" "}
    </div>
  );
};
const mapStatetoProps = (state, props) => {
  return {
    nameExists: state.Auth.usernameExists,
    emailExists: state.Auth.useremailExists,
    passwordErr: state.Auth.passwordErr,
    noEmail: state.Auth.noEmail,
  };
};
export default connect(mapStatetoProps)(Authform);
