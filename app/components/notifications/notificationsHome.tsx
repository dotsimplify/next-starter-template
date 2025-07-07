import React from "react";
import NotifyComp from "./NotifyComp";
import { API_TAGS } from "@/constants";

async function getNotifications() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-notifications/home`,
    {
      next: { tags: [API_TAGS.NOTIFICATIONS] },
    }
  );

  return res.json();
}

const notificationsHome = async () => {
  const data = await getNotifications();
  return <NotifyComp notifications={data} />;
};

export default notificationsHome;
