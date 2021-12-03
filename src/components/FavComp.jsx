/** @format */

import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

const FavComp = (props) => {
  return (
    <div>
      {props.user.userData.fav?.find(
        (el) => el.fav_postId === props.post.post_Id
      ) ? (
        <div className={props.itemClass}>
          <BsFillHeartFill
            title="Add to favourites"
            className={props.iconClass + " " + props.favClass}
            onClick={() => props.removeFav(props.post)}
          />
        </div>
      ) : (
        <div
          className={props.itemClass}
          onClick={() => props.addFav(props.post)}>
          <BsFillHeartFill
            title="Remove from favourite"
            className={props.iconClass}
          />
        </div>
      )}
    </div>
  );
};

export default FavComp;
