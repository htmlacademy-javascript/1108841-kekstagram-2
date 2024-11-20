const isMeeting = (workStart, workEnd, meetingStart, meetingDuration) => {
  const toMinutes = (time) => time.split(':').reduce((h, m) => h * 60 + +m);
  return (
    toMinutes(meetingStart) >= toMinutes(workStart) &&
    toMinutes(meetingStart) + meetingDuration <= toMinutes(workEnd)
  );
};
isMeeting();
