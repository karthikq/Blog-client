/** @format */

import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import UserPostdetails from "../../components/UserPostDetails/UserPostdetails";
import Fields from "../fields/Fields";
import "./Home.styles.scss";

import { Link } from "react-router-dom";

const Home = (props) => {
  const [likedPost, setLikedPost] = useState("");
  const [imgState, setimgState] = useState(false);
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    const maxlike = props.posts.map((item) =>
      item.usersPost.filter((item) => {
        return item.like >= 1 ? item : "";
      })
    );

    const item = maxlike.filter((item) => item.length > 0 && item);

    const randomNumber = Math.floor(Math.random() * item.length);

    const data = { ...item[randomNumber] };
    setLikedPost(data[0]);
    setimgState(true);
    // console.log(item[randomNumber][0]);
    // setLikedPost(item[randomNumber][0]);
    return () => setimgState(false);
  }, [props.posts]);
  console.log("====================================");
  console.log(props.posts);
  console.log("====================================");
  return (
    <React.Fragment>
      <div className="home-container">
        <div className="home-contents">
          {imgState && likedPost ? (
            <>
              <div className="home-left-details">
                <h1>
                  <span className="home-t-span">Title</span> :{" "}
                  {likedPost?.title}
                </h1>
                <UserPostdetails post={likedPost} userclass="avatar" />
                <span className="post-details">
                  {" "}
                  <span className="home-t-span">Description</span> :
                  {likedPost?.description.length > 20 ? (
                    <>
                      {likedPost.description.substring(0, 100) + "... "}
                      {/* <Link
                        className="readtag"
                        to={`/post/?postId=${likedPost.post_Id}&field=${likedPost.fieldName}`}>
                        Read more
                      </Link> */}
                    </>
                  ) : (
                    likedPost.description
                  )}
                </span>
                <Link
                  to={`/post/?postId=${likedPost.post_Id}&field=${likedPost.fieldName}`}
                  className="a-tag"
                >
                  Read More
                </Link>
              </div>
              <div className="home-right-details">
                <img src={likedPost?.image} alt="mostliked" />
              </div>
              {/* <div className="open-home-item">
                <RiShareBoxFill />
              </div> */}
            </>
          ) : (
            <div className="loader-div">
              <div className="img-loading"></div>
            </div>
          )}
        </div>
      </div>
      <div>
        {props.posts.map((item, index) => (
          <Fields item={item} key={index} />
        ))}
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps)(Home);
