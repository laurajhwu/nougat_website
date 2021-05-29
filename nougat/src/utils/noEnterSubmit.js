export default function doNotSubmitOnEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
}
