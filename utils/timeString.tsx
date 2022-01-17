import { ReactElement } from 'react';

const timeString = (progress: number, duration?: number): ReactElement => {
  //pass only progress for time elapsed
  //pass progress and duration for time remaining
  const ts: number = duration ? duration - progress : progress;
  const h = Math.floor(ts / 60 / 60);
  const m = Math.floor(ts / 60 - h * 60 * 60);
  const s = Math.floor(ts - (m * 60 - h * 60 * 60));
  const lz = (n: number) => (n < 10 ? `0${n}` : n);
  const { hh, mm, ss } = { hh: lz(h), mm: lz(m), ss: lz(s) };

  return (
    <>
      <span className="hh">{hh}:</span>
      <span className="mm">{mm}:</span>
      <span className="ss">{ss}</span>
    </>
  );
};
export default timeString;
