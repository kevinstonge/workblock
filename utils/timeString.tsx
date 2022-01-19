import { ReactElement } from 'react';

const timeString = (progress: number, duration?: number): any => {
  //pass only progress for time elapsed
  //pass progress and duration for time remaining
  const ts: number = duration ? duration - progress : progress;
  const h = Math.floor(ts / 60 / 60);
  const m = Math.floor(ts / 60 - h * 60);
  const s = Math.floor(ts - (m * 60 - h * 60 * 60)); //only used for countdown time display (UI feature mostly)
  const lz = (n: number) => (n < 10 ? `0${n}` : n);
  const data = { hh: lz(h), mm: lz(m), ss: lz(s) };

  return {
    jsx: (
      <>
        <span className="hh">{data.hh}:</span>
        <span className="mm">{data.mm}:</span>
        <span className="ss">{data.ss}</span>
      </>
    ),
    data,
    rawData: { h, m, s },
  };
};
export default timeString;
