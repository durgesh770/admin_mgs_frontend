const moment = require("moment");
import Chip from "../components/ui/Chip";
import _ from "lodash";

export function formatMinutesToHoursAndMinutes(minutes) {
  const duration = moment.duration(minutes, "minutes");
  const hours = duration.hours();
  const remainingMinutes = duration.minutes();
  const formattedTime = `${hours} hr ${remainingMinutes} min`;
  return formattedTime;
}

export function stringToSlug(inputString) {
  return inputString.toLowerCase().replace(/\s+/g, "-");
}

export function removeEmptyValues(obj) {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      result[key] = obj[key];
    }
  }
  return result;
}

export function getInitialLetter(name) {
  const nameParts = name.split(" ");
  let final = "";

  if (nameParts.length > 1) {
    const firstLetter = nameParts[0]?.charAt(0);
    const secLetter = nameParts[1]?.charAt(0);
    final = firstLetter + secLetter;
  } else {
    final = name.charAt(0);
  }
  const capitalizedInitial = final?.toUpperCase();
  return capitalizedInitial;
}


export function convertSchedule(input) {
  const output = {};
  if (input?._id) {
    delete input["_id"];
  }

  for (const day in input) {
    const schedule = input[day];

    if (schedule?.length > 0) {
      output[day.substring(0, 3).toLocaleUpperCase()] = schedule.map((slot) => {
        const startTime = formatTime(slot.start_time);
        const endTime = formatTime(slot.end_time);
        return `${startTime} to ${endTime}`;
      });
    } else {
      output[day.substring(0, 3).toLocaleUpperCase()] = [];
    }
  }

  return output;
}

export function formatTime(time) {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return ` ${formattedHours}:${formattedMinutes} ${period}`;
}

export const convertStringTimeToNumber = (time = "") =>
  Number(time.replace(":", ""));

export const convertNumberToStringTime = (number) =>
  `${String(number).padStart(4, "0").slice(0, 2)}:${String(number)
    .padStart(4, "0")
    .slice(2)}`;

export const removeQuery = (router, removeArr = []) => {
  const searchParams = new URLSearchParams(window.location.search);

  removeArr.forEach((key) => {
    searchParams.set(key, "");
  });

  const query = searchParams.toString();
  const url = `${window.location.pathname}?${query}`;

  router.replace(url);
};

export const areAllElementsUnique = (arr) => new Set(arr).size == arr.length;

// Function to get query from URL
export const getQueryFromUrl = () => {
  const urlParams = new URLSearchParams(window?.location.search);
  const queryObject = {};

  for (const [key, value] of urlParams.entries()) {
    queryObject[key] = value;
  }
  return queryObject;
};

// Function to add query to URL
export const addQueryToUrl = (queryObject) => {
  const urlParams = new URLSearchParams();

  for (const key in queryObject) {
    urlParams.append(key, queryObject[key]);
  }

  const newUrl = `${window.location.origin}${window.location.pathname
    }?${urlParams.toString()}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
};

export function paramsToObject(params) {
  const paramArray = params.substring(1).split("&"); // Remove the leading '&'
  const paramObject = {};

  paramArray.forEach((param) => {
    const [key, value] = param.split("=");

    // Only add key-value pair if value is not empty
    if (value.trim() !== "") {
      paramObject[key] = value;
    }
  });

  return paramObject;
}

export const chips = (item, date) => {
  // const [open, setOpen] = useState(false)

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const itemDate = new Date(date);
  itemDate.setHours(0, 0, 0, 0);

  const daysUntilItem = Math.floor(
    (itemDate - todayDate) / (1000 * 60 * 60 * 24)
  );

  if (item?.status === "rejected") {
    return (
      <Chip
        label="REJECTED"
        color={"#fff"}
        backgroundColor={"var(--redLabel-color)"}
      />
    );
  } else if (item?.status === "reschedule") {
    return (
      <Chip
        label="RESCHEDULE"
        color={"#fff"}
        backgroundColor={"var(--orange-color)"}
      />
    );
  } else if (item?.status === "cancelled") {
    return (
      <Chip
        label="CANCELLED"
        color={"#fff"}
        backgroundColor={"var(--blackLabel-color)"}
      />
    );
  } else if (item?.status === "unapproved") {
    if (itemDate < todayDate) {
      return (
        <>
          <Chip
            label="UNAPPROVED"
            color={"#000"}
            backgroundColor={"var(--yellowLabel-color)"}
          />
          <Chip
            label="PAST"
            color={"#fff"}
            backgroundColor={"var(--blueLabel-color)"}
          />
        </>
      );
    } else {
      return (
        <Chip
          label="UNAPPROVED"
          color={"#000"}
          backgroundColor={"var(--yellowLabel-color)"}
        />
      );
    }
  } else if (item?.status === "change_request") {
    return (
      <Chip
        label="CHANGE REQUEST"
        color={"#fff"}
        backgroundColor={"var(--maroonLabel-color)"}
      />
    );
  } else if (item?.status === "completed") {
    return (
      <Chip
        label="COMPLETED"
        color={"#fff"}
        backgroundColor={"var(--blueLabel-color)"}
      />
    );
  } else if (
    item?.status === "approved" ||
    item?.status === "confirmed" ||
    item?.status === "unapproved"
  ) {
    if (itemDate.getTime() == todayDate.getTime()) {
      if (item?.status === "confirmed") {
        return (
          <>
            <Chip
              label="TODAY"
              color={"#fff"}
              backgroundColor={"var(--green-color)"}
            />
            <Chip
              label="CONFIRMED"
              color={"#fff"}
              backgroundColor={"var(--green-dim-color)"}
            />
          </>
        );
      } else {
        return (
          <>
            <Chip
              label="TODAY"
              color={"#fff"}
              backgroundColor={"var(--green-color)"}
            />
            <Chip
              label="CONF.PENDING"
              color={"#fff"}
              backgroundColor={"var(--redLabel-color)"}
            />
            {/* <ConfirmYourAppointment open={open} setOpen={setOpen} appointmentId={item.id} /> */}
          </>
        );
      }
    } else if (daysUntilItem >= 0 && daysUntilItem <= 7) {
      if (item?.status === "confirmed") {
        return (
          <>
            <Chip
              label="THIS WEEK"
              color={"#fff"}
              backgroundColor={"var(--orange-color)"}
            />
            <Chip
              label="CONFIRMED"
              color={"#fff"}
              backgroundColor={"var(--green-dim-color)"}
            />
          </>
        );
      } else {
        return (
          <>
            <Chip
              label="THIS WEEK"
              color={"#fff"}
              backgroundColor={"var(--orange-color)"}
            />
            <Chip
              label="CONF.PENDING"
              color={"#fff"}
              backgroundColor={"var(--redLabel-color)"}
            />
            {/* <ConfirmYourAppointment appointmentId={item.id} open={open} setOpen={setOpen} /> */}
          </>
        );
      }
    } else if (
      itemDate.getMonth() === todayDate.getMonth() &&
      itemDate.getFullYear() === todayDate.getFullYear()
    ) {
      return (
        <Chip
          label="THIS MONTH"
          color={"black"}
          backgroundColor={"var(--yellow-color)"}
        />
      );
    } else if (itemDate < todayDate) {
      return (
        <Chip
          label="PAST"
          color={"#fff"}
          backgroundColor={"var(--blueLabel-color)"}
        />
      );
    } else if (itemDate > todayDate) {
      return (
        <Chip
          label="UPCOMING"
          color={"#fff"}
          backgroundColor={"var(--purple-color)"}
        />
      );
    }
  } else if (item.paymentStatus == "pending") {
    return <Chip label="PENDING" color={"white"} backgroundColor="#ff0000" />;
  } else if (item.paymentStatus == "paid") {
    return <Chip label="PAID" color={"white"} backgroundColor={"var(--green-color)"} />;
  } else if (item.paymentStatus == "refunded") {
    return <Chip label="REFUNDED" color={"white"} backgroundColor={"black"} />;
  }
};

export function formatDateTable(date, start, end) {
  // Check if start and end are numbers
  if (typeof start !== "number" || typeof end !== "number") {
    // throw new Error('start and end should be numbers');
    return;
  }

  const startDate = moment(date);

  // Convert start and end to strings in HHMM format
  const startString = String(start).padStart(4, "0");
  const endString = String(end).padStart(4, "0");

  startDate.set({
    hour: Number(startString.slice(0, 2)),
    minute: Number(startString.slice(2))
  });

  const endDate = moment(date);
  endDate.set({
    hour: Number(endString.slice(0, 2)),
    minute: Number(endString.slice(2))
  });

  const formattedDate = startDate.format("DD MMM YYYY");
  const formattedStartTime = startDate.format("hh:mm A");
  const formattedEndTime = endDate.format("hh:mm A");

  return (
    <>
      {`${formattedDate} |`}
      <br />
      {` ${formattedStartTime} - ${formattedEndTime} MDT`}
    </>
  );
}

export function formatTimeRange(start, end) {
  const startHour = Math.floor(start / 100);
  const startMinute = start % 100;
  const endHour = Math.floor(end / 100);
  const endMinute = end % 100;

  const startTime = new Date();
  startTime.setHours(startHour, startMinute);
  const endTime = new Date();
  endTime.setHours(endHour, endMinute);

  const formatOptions = { hour: "numeric", minute: "2-digit", hour12: true };

  const formattedStartTime = startTime.toLocaleTimeString(
    "en-US",
    formatOptions
  );
  const formattedEndTime = endTime.toLocaleTimeString("en-US", formatOptions);

  return `${formattedStartTime} - ${formattedEndTime} MDT`;
}

export function formatTimestamp(inputTimestamp) {
  const date = new Date(inputTimestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return `${day}-${month}-${year} ${formattedHours}:${minutes} ${ampm} `;
}

export function convertOppositeOfMinutesOrTime(input) {
  if (typeof input == "number") {
    // Convert minutes to 24-hour format
    const hours = Math.floor(input / 60)
      .toString()
      .padStart(2, "0");
    const minutes = (input % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else if (typeof input == "string") {
    // Parse 24-hour format to minutes
    const [hours, minutes] = input.split(":").map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      return hours * 60 + minutes;
    }
  }

  // Return an error message if the input is not valid
  return "Invalid input";
}

export function addTimeInTime(initialTime, secondsToAdd) {
  const totalSeconds =
    Math.floor(initialTime / 100) * 60 + (initialTime % 100) + secondsToAdd;
  const resultTime = Math.floor(totalSeconds / 60) * 100 + (totalSeconds % 60);
  return resultTime;
}

export const validationCheck = (data) => {
  for (let key in data) {
    if (!data[key]) {
      return { status: false, errorAt: key };
    }
  }
  return { status: true };
};

export function isChanged(object, base) {
  function changes(object, base) {
    return _.transform(object, function (result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }

  return changes(object, base);
}


export function formatDateforHeader(date, start, end) {

  // Check if start and end are numbers
  if (typeof start !== 'number' || typeof end !== 'number') {
    throw new Error('start and end should be numbers');
  }

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const startDate = new Date(date);

  // Convert start and end to strings in HHMM format
  const startString = String(start).padStart(4, '0');
  const endString = String(end).padStart(4, '0');

  startDate.setHours(Number(startString.slice(0, 2)), Number(startString.slice(2)));
  const endDate = new Date(date);
  endDate.setHours(Number(endString.slice(0, 2)), Number(endString.slice(2)));

  const formattedDate = startDate.toLocaleDateString('en-US', dateOptions);
  const formattedStartTime = startDate.toLocaleTimeString('en-US', timeOptions);
  const formattedEndTime = endDate.toLocaleTimeString('en-US', timeOptions);

  return <>
    {`${formattedDate}`}{` ${formattedStartTime} - ${formattedEndTime} MDT`}
  </>;
}

export const LeaveCalenderChips = (item, setShowAdminComment, setOpen) => {
  if (item.status === "rejected") {
    return (
      <Chip
        label="REJECTED"
        color={"#fff"}
        onClick={() => {
          setShowAdminComment({
            dates: [item?.adminComment],
            status: false
          }), setOpen(true)
        }}
        backgroundColor={"red"}
      />
    );
  } else if (item.status === "approved") {
    return (
      <Chip
        label="APPROVED"
        color={"#fff"}
        backgroundColor={"var(--green-color)"}
      />
    );
  } else if (item.status === "pending") {
    return (
      <Chip
        label="PENDING"
        color={"#fff"}
        backgroundColor={"var(--orange-color)"}
      />
    );
  }
  return null;
};


export const getTotalDaysBetweenDates = (dates) => {
  if (dates.length > 1) {
    var date1 = new Date(dates[0]);
    var date2 = new Date(dates[1]);

    // Calculate the difference in milliseconds
    var differenceInMilliseconds = Math.abs(date2 - date1);

    // Convert milliseconds to days
    var differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    return differenceInDays + 1
  }
  return 0
}

export const getLastDate = (type) => {
  if (type.toLowerCase() == "none" || type === '') {
    return '';
  } else {
    const currentDate = new Date();
    switch (type.toLowerCase()) {
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() - 1);
        break;
      case 'biyearly':
        currentDate.setMonth(currentDate.getMonth() - 6);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      default:
        throw new Error('Invalid type. Please provide Monthly, Biyearly, Yearly, or None.');
    }

    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yyyy = currentDate.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
}

export function formatDateForFilter(inputTimestamp) {
  if (inputTimestamp != null) {
    const date = new Date(inputTimestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
}

export function getAllDatesBetween(dateArray) {
  const startDate = new Date(dateArray[0]);
  const endDate = new Date(dateArray[1]);

  // Array to store the dates
  const datesArray = [];

  // Loop through the dates from start to end, inclusive
  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    datesArray.push(new Date(date));
  }

  return datesArray;
}

export function getStartDateEndDate(dateArray) {
  const startDate = dateArray[0];
  const endDate = dateArray[dateArray.length - 1];
  return [startDate, endDate];
}
