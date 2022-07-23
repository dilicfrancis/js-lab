const locationForm = document.querySelector("form");
const query = document.querySelector("input");
const successMessage = document.querySelector("#succeed");
const otherMessage = document.querySelector("#other");

locationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  successMessage.textContent = "";
  otherMessage.textContent = "loading...";

  fetch("/weather?address=" + query.value)
    .then((response) => response.json())
    .then((content) => {
      if (content.error) {
        otherMessage.textContent = content.message || content.error;
        return;
      }
      successMessage.textContent = content.forecast;
      otherMessage.textContent =
        "This is the weather forecast for " + content.location;
    });
});
