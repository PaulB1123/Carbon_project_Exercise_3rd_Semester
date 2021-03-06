"use strict";

// window.addEventListener("DOMContentLoaded", start);
import { displayLoading } from "./main.js";

let urlType = "";
const input = document.querySelector("#button");

input.addEventListener("click", URLUser);

async function URLUser() {
  urlType = document.querySelector("input").value;
  console.log(urlType);
  generateSpeedresult(urlType);
  return urlType;
}

function getVal(urlType) {
  const url = `https://kea-alt-del.dk/websitecarbon/site/?url=${urlType}`;

  console.log(url);

  //fetch de data
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      handleData(data);
    })
    .catch((e) => {
      console.error("An error occured:", e.message);
    });
}

async function generateSpeedresult(urlType) {
  let pagespeedData;
  displayLoading();
  console.log(urlType);
  const pagespeedUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=URLHOLDER&key=AIzaSyC6HZGXOkPSk7mNaYyl4AO2e_PHLCJ3pFQ";
  await fetch(pagespeedUrl.replace("URLHOLDER", urlType))
    .then((data) => {
      return data.json();
    })

    .then((data) => {
      pagespeedData = data;
      handleLightHouseData(data);
      console.log(data);
    });

  getVal(urlType);
}

function handleData(green) {
  // document.querySelector(".green").textContent = green.green;
  let greenData;
  let greenScale;
  if (green.green === true) {
    greenData = "Yes";
  } else {
    greenData = "No";
  }
  document.querySelector("#section_with_numbers .is_website_green").innerHTML = `<span >${greenData}</span> `;
  console.log(greenData);
  greenScale = green.cleanerThan * 100;
  console.log(greenScale);
  document.querySelector(".your_scores .your_score-text").innerHTML = `<p>Congratulations, your website is greener than ${greenScale}% of the sites tested.</p>`;
}

function handleLightHouseData(timing) {
  console.log(timing.lighthouseResult.timing.total);
  document.querySelector(".your_scores .your_score-text_v2").innerHTML = `<p>The total timing to fetch was ${timing.lighthouseResult.timing.total}ms. The LightHouse score is: ${timing.lighthouseResult.categories.performance.score}. The site
  has the envioronment benchark of ${timing.lighthouseResult.environment.benchmarkIndex}.</p>`;
  document.querySelector(".text_chart_v2 .your_score-text").innerHTML = `A more detailed report is available for professionals involved in the development of green websites. <br>Download report HERE.`;
}

export function start() {
  console.log(url);
}
