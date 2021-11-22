/** @format */

import React from "react";
import UserPostdetails from "../../components/UserPostDetails/UserPostdetails";
import "./fields.styles.scss";
import { FcLikePlaceholder } from "react-icons/fc";
import { FiDownloadCloud } from "react-icons/fi";
import UserLikes from "../../components/UserLikes";

import {
  DislikePost,
  LikePost,
  removedisLikes,
  removeLikes,
} from "../../redux/actions/post";
import { connect } from "react-redux";
import ImageFlip from "../../ImageFlip/ImageFlip";

const Fields = (props) => {
  return (
    <div className="field-container">
      <div className="field-header">
        <div className="field-header-name">
          <div className="box"></div>
          <h2>{props.item?.fieldName} </h2>
        </div>
        <span className="field-header-span">
          All {props.item?.fieldName} articles
        </span>
      </div>
      <div className="field-contents">
        <div className="field-left-content">
          <ImageFlip
            imageLink={props.item?.usersPost[0].image}
            imageClass={"post-left-img"}
          />
          <h3>{props.item.usersPost[0]?.title}</h3>
          <UserPostdetails post={props.item?.usersPost[0]} userclass="avatar" />
          <span>
            {props.item.usersPost[0]?.description.substring(0, 20) + "..."}
          </span>
        </div>
        <div className="field-right-content">
          {props.item.usersPost.map((post, index) => (
            <div className="field-right-items" key={index}>
              <div className="field-fav">
                <FcLikePlaceholder className="fav-icon" />
              </div>
              <h3>{post.title} </h3>
              <UserPostdetails post={post} userclass="avatar" />
              <span className="field-desp">
                {post.description.substring(0, 100) + "..."}
              </span>
              <div className="field-likes">
                <UserLikes
                  props={props}
                  item={post}
                  itemclass={"likes"}
                  iconClass={"like-icons"}
                  dislikeClass={"like-icons dislike"}
                />
              </div>
              <p className="post-date">{post.date?.substring(0, 19)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { user: state.Auth };
};

export default connect(mapStateToProps, {
  LikePost,
  removeLikes,
  removedisLikes,
  DislikePost,
})(Fields);
