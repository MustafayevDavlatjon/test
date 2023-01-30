const elInput = document.querySelector("[data-input-name]");
const elGetBtn = document.querySelector("[data-get-btn]");
const elForm = document.querySelector("form");
const elTemplate = document.querySelector("template");
const elBox = document.querySelector(".card");

async function getRequest() {
  const response = await fetch(
    `https://api.nationalize.io?name=${elInput.value}`
  );

  const data = await response.json();

  elBox.innerHTML = "";
  function createCard(data) {
    var elCard = elTemplate.content.cloneNode(true);
    var flag = data.country_id.toLowerCase();
    elCard.querySelector("span").classList.add("fi", `fi-${flag}`);
    elCard.querySelector("h2").innerHTML = data.country_id;
    elCard.querySelector("p").innerHTML =
      Math.ceil(data.probability * 100) + "&#37";
    return elCard;
  }

  for (i = 0; i < data.country.length; i++) {
    country = data.country[i];
    elBox.appendChild(createCard(country));
  }
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getRequest();
});
