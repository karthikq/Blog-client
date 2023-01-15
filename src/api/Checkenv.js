/** @format */

function Checkenv() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:4000";
  } else {
    return "https://busy-gold-buffalo-veil.cyclic.app";
  }
}
export default Checkenv;
