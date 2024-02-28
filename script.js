var restCountry = "https://restcountries.com/v3.1/all";

async function api() {
  var url = await fetch(restCountry);
  var out = await url.json();
  var parent = document.getElementById("countryRow");

  for (let i of out) {
    try {
      var data_cont = document.createElement("div");
      data_cont.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-3"); // Adjusting column breakpoints for responsiveness

      var card = document.createElement("div");
      card.classList.add("card");

      var card_body = document.createElement("div");
      card_body.classList.add("card-body");

      // Name
      var country_name = document.createElement("h3");
      country_name.classList.add("card-title");
      country_name.innerText = i.name.common;
      card_body.appendChild(country_name);

      // Flag
      var country_flag = document.createElement("img");
      country_flag.classList.add("card-img-top");
      country_flag.setAttribute("src", i.flags.png);
      card_body.appendChild(country_flag);

      // Capital
      var country_capital = document.createElement("p");
      country_capital.classList.add("card-text");
      country_capital.innerText = "Capital: " + i.capital[0];
      card_body.appendChild(country_capital);

      // Region
      var country_region = document.createElement("p");
      country_region.classList.add("card-text");
      country_region.innerText = "Region: " + i.region;
      card_body.appendChild(country_region);

      // Country code
      var country_code = document.createElement("p");
      country_code.classList.add("card-text");
      country_code.innerText = "Country Code: " + i.cca3;
      card_body.appendChild(country_code);

      // Click button
      var click_btn = document.createElement("button");
      click_btn.classList.add("btn", "btn-primary");
      click_btn.setAttribute("type", "button");
      click_btn.setAttribute("data-lat", i.latlng[0]);
      click_btn.setAttribute("data-lng", i.latlng[1]);
      click_btn.setAttribute("data-name", i.name.common);
      click_btn.innerText = "Click for Weather";
      card_body.appendChild(click_btn);

      card.appendChild(card_body);
      data_cont.appendChild(card);
      parent.appendChild(data_cont);
    } catch (err) {
      console.log(err);
    }
  }
}
api();

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("btn")) {
    event.preventDefault();
    var lat = parseFloat(event.target.getAttribute("data-lat"));
    var lng = parseFloat(event.target.getAttribute("data-lng"));
    var name = { id: event.target.getAttribute("data-name") };
    clicking(lat, lng, name);
  }
});

async function clicking(lat, lng, name) {
  var WAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=06e423ec0af839c485470951f60c3f6b`;
  fetch(WAPI)
    .then((response) => response.json())
    .then((data) => {
      alert(`
        For ${name.id}  
        Current Humidity is ${data.main.humidity}
        Current Pressure is ${data.main.pressure}
        Current Temperature is ${data.main.temp}`);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
