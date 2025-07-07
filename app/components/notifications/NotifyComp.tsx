import React from "react";

interface Notification {
  _id: string;
  content: string;
  // Add other properties if they exist in your notification objects
}

interface NotifyCompProps {
  notifications: Notification[];
}

const NotifyComp: React.FC<NotifyCompProps> = ({ notifications }) => {
  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <>
      {notifications.map((one) => (
        <div
          key={one._id}
          className="box-border text-center relative flex flex-col max-w-full mx-auto bg-white overflow-hidden border-0 rounded mt-2 "
        >
          <div
            className="p-5 border border-dashed border-red-500 text-sm font-semibold bg-yellow-400 rounded-[20px] text-center uppercase 
            [&_h3]:text-[0.9rem]
            [&_p]:inline [&_p]:mb-0 [&_p]:align-middle
            [&_a]:inline-block [&_a]:align-middle
            [&_p_a_img]:max-w-[200px] [&_p_a_img]:inline [&_p_a_img]:align-middle"
            dangerouslySetInnerHTML={{ __html: one.content }}
          />
        </div>
      ))}
    </>
  );
};

export default NotifyComp;
