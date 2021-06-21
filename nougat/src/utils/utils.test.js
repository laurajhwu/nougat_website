import getTimeRange from "./getTimeRange.js";

describe("time range", () => {
  const timeSettings = {
    start_time: "11:00",
    end_time: "13:00",
    interval: 30,
  };

  it("should return correct time range when interval is 30 minutes", () => {
    const func = getTimeRange("2020/6/20", timeSettings).map(
      (time) =>
        `${time.getHours()}:${
          time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
        }`
    );
    const expected = ["11:00", "11:30", "12:00", "12:30", "13:00"];
    expect(func).toEqual(expected);
  });

  it("should return correct time range when interval is 120 minutes", () => {
    const func = getTimeRange("2020/6/20", {
      ...timeSettings,
      interval: 120,
    }).map(
      (time) =>
        `${time.getHours()}:${
          time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
        }`
    );
    const expected = ["11:00", "13:00"];
    expect(func).toEqual(expected);
  });

  it("should only reach up to the max time lesser than or equal to the end time", () => {
    const func = getTimeRange("2020/6/20", {
      ...timeSettings,
      interval: 14,
    }).map(
      (time) =>
        `${time.getHours()}:${
          time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
        }`
    );
    const expected = [
      "11:00",
      "11:14",
      "11:28",
      "11:42",
      "11:56",
      "12:10",
      "12:24",
      "12:38",
      "12:52",
    ];
    expect(func).toEqual(expected);
  });
});
