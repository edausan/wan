import { Add } from "@mui/icons-material";
import React from "react";
import TextArea from "@components/CustomComponents/TextArea";

const SongLyrics = ({ song }) => {
  const { verse, pre_chorus, chorus, bridge } = song?.lyrics || {
    verse: "",
    pre_chorus: "",
    chorus: "",
    bridge: "",
  };

  const noLyrics = !verse && !pre_chorus && !chorus && !bridge;

  const isWorship = song?.tags.findIndex((tag) => tag === "Worship" || tag === "Solemn") >= 0;

  return (
    <section className={`p-4 pt-0 ${song?.media?.youtube ? "mt-0" : "mt-0"}`}>
      <div className="p-4">
        <Part label="Verse" value={verse} isWorship={isWorship} />
        <Part label="Pre-chorus" value={pre_chorus} isWorship={isWorship} />
        <Part label="Chorus" value={chorus} isWorship={isWorship} />
        <Part label="Bridge" value={bridge} isWorship={isWorship} />
      </div>
    </section>
  );
};

const Part = ({ label = "", value, isWorship = false }) => {
  return (
    !!value && (
      <div>
        <small className={`font-semibold ${isWorship ? "text-orange-500" : "text-sky-500"}`}>
          {label}:
        </small>
        <TextArea value={value} color="#000" />
      </div>
    )
  );
};

export default SongLyrics;
