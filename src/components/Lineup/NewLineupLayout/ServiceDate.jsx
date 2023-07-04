import React, { useState } from "react";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Service from "../Service";
import { Add } from "@mui/icons-material";

const ServiceDate = ({ handleDateChange, date, setService, service }) => {
  const [openService, setOpenService] = useState(false);

  return (
    <section className="flex-1 w-full px-8 flex flex-col items-center justify-center">
      <Service
        setOpen={setOpenService}
        open={openService}
        service={service}
        setService={setService}
      />

      <button
        onClick={() => setOpenService(true)}
        className="p-2 w-full bg-sky-400 rounded-md mb-4 text-white"
      >
        {service || (
          <span>
            <Add /> Select Worship Service
          </span>
        )}
      </button>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          className={`${!service ? "opacity-50 blur-[2px]" : ""}`}
          disabled={!service}
          onChange={handleDateChange}
          value={dayjs(date)}
          componentsProps={{
            actionBar: {
              actions: [],
            },
          }}
        />
      </LocalizationProvider>
    </section>
  );
};

export default ServiceDate;
