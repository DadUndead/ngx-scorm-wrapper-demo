/*******************************************************************************
 ** this function will convert seconds into hours, minutes, and seconds in
 ** CMITimespan type format - HHHH:MM:SS.SS (Hours has a max of 4 digits &
 ** Min of 2 digits
 *******************************************************************************/
const convertTotalSeconds = (totalSeconds): string => {
  let sec = (totalSeconds % 60);

  totalSeconds -= sec;
  const tmp = (totalSeconds % 3600);  // of seconds in the total # of minutes
  totalSeconds -= tmp;                // of seconds in the total # of hours

  // convert seconds to conform to CMITimespan type (e.g. SS.00)
  sec = Math.round(sec * 100) / 100;

  let strSec = sec.toString();
  let strWholeSec = strSec;
  let strFractionSec = '';

  if (strSec.indexOf('.') !== -1) {
    strWholeSec = strSec.substring(0, strSec.indexOf('.'));
    strFractionSec = strSec.substring(strSec.indexOf('.') + 1, strSec.length);
  }

  if (strWholeSec.length < 2) {
    strWholeSec = '0' + strWholeSec;
  }
  strSec = strWholeSec;

  if (strFractionSec.length) {
    strSec = strSec + '.' + strFractionSec;
  }

  let hour: number;
  let min: number;

  if ((totalSeconds % 3600) !== 0) {
    hour = 0;
  } else {
    hour = (totalSeconds / 3600);
  }
  if ((tmp % 60) !== 0) {
    min = 0;
  } else {
    min = (tmp / 60);
  }

  const strHour = (hour.toString().length < 2) ? `0${hour}` : hour;
  const strMin = (min.toString().length < 2) ? `0${min}` : min;

  return `${strHour}:${strMin}:${strSec}`;
};

export default convertTotalSeconds;
