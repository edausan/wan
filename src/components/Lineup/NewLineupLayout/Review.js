import dayjs from "dayjs";
import React from "react";
import UserQuery from "@api/userQuery";

const Review = ({ service, date, songs, edit, editLineup }) => {
  const dateCreated = dayjs().format("dddd, MMMM DD, YYYY hh:mm A");
  const { currentUser } = UserQuery();

  return (
    <section className="text-left w-full px-8 h-full max-h-[100%] overflow-auto">
      <div className="py-4 pb-2 sticky top-0 left-0 bg-white border-b border-slate-100">
        <div>{service}</div>
        <div className="text-sm">{dayjs(date).format("dddd, MMMM DD, YYYY")}</div>
        <div className="text-sm">{currentUser.displayName}</div>
        <div>
          <small className="text-slate-400 text-xs">
            {edit && <span>Date Created:</span>}
            {edit ? editLineup.date_created : dateCreated}
          </small>
          {edit && (
            <small className="text-slate-400 text-xs block">Date Updated: {dateCreated}</small>
          )}
        </div>
      </div>

      <div className="bg-white py-4 pt-0">
        {songs.map((song, idx) => {
          return (
            <div key={`${song.id}~${idx}~${song.label}`} className="mb-2">
              <small className="text-sky-500">{song.label}</small>
              <div>{song.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Review;
