import React from "react";
import { FaStar } from "react-icons/fa";

const CommentSection = ({ name, star, date, comment }) => {
  return (
    <div className="d-flex align-items-center justify-content-between margin px-3">
      <div className="d-flex align-items-start">
        <img src="https://i.pravatar.cc/150?img=3" alt="profile" style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
        <div className="ms-2">
          <h6 className="m-0">{name}</h6>
          <div className="d-flex align-items-center">
            {[...Array(star)].map((_, index) => {
              return (
                <FaStar key={index} color="#FF7315" size={15} style={{ marginRight: "2px" }} />
              );
            })}
          </div>
          <p className="m-0" style={{ color: "#787878" }}>
            {date}
          </p>
          <div className="d-flex align-items-center">
            <p className="m-0 my-3">{comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
