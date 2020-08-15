import notfound from "../notfound.png";

function main() {
  const APP_KEY = "nYXRWb7Jcggei941LcopzmRXMt5DorpvdFukBMwQ";
  let page = 1;
  const baseURL = `https://cors-anywhere.herokuapp.com/https://api-illustrations.icons8.com/api/v2/illustrations?token=${APP_KEY}`;

  const getIllustrations = async (page) => {
    try {
      let listIllustration = document.querySelector("#listIllustration");
      listIllustration.innerHTML = `
      <div class="loading col-12">
        <div class="loading-container">
          <div class="load"></div>
          <h2>Loading</h2>
        </div>
      </div>`;
      const response = await fetch(`${baseURL}&perPage=21&page=${page}`);
      const responseJson = await response.json();
      // console.log(responseJson.illustrations);
      renderAll(responseJson.illustrations);
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const searchIllustration = async (name) => {
    try {
      let listIllustration = document.querySelector("#listIllustration");
      listIllustration.innerHTML = `
      <div class="loading col-12">
        <div class="loading-container">
          <div class="load"></div>
          <h2>Loading</h2>
        </div>
      </div>`;
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api-illustrations.icons8.com/api/v2/illustrations/search?query=${name}&token=nYXRWb7Jcggei941LcopzmRXMt5DorpvdFukBMwQ`
      );
      const responseJson = await response.json();
      // console.log(responseJson.illustrations);
      if (responseJson.illustrations.length > 0) {
        renderAll(responseJson.illustrations);
      } else {
        listIllustration.innerHTML = `
        <div class="loading col-12">
          <div class="loading-container">
            <img src="${notfound}" class="not-found" alt="Not Found" />
            <h2>Sorry, illustration not found.</h2>
          </div>
        </div>
        `;
      }
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const renderAll = (illustrations) => {
    let listIllustration = document.querySelector("#listIllustration");
    listIllustration.innerHTML = `
    <div class="col-12" id="illustration">
      <h2>Illustration</h2>
    </div>
    `;

    illustrations.forEach((illustration) => {
      listIllustration.innerHTML += `
                <a href="${
                  illustration.urls.thumb.url
                }" target="_blank" class="col-lg-4 col-md-6 col-sm-12 text-decoration-none" style="margin-top: 12px;">
                    <div class="card px-4 pt-4">
                      <img class="card-img-top card-illustration" src="${
                        illustration.urls.thumb.url
                      }">
                        <div class="card-body text-center text-dark">
                            <p class="mb-1">${
                              illustration.heading === null
                                ? "Illustration"
                                : illustration.heading
                            }</p>
                            <span class="text-muted">Author : ${
                              illustration.author.name
                            }</span>
                        </div>
                    </div>
                </a>
            `;
    });
    if (illustrations.length > 20) {
      listIllustration.innerHTML += `<div class="col-12 mt-5">
      <button class="btn-outline-dark btn btn-block button-next">Next Page</button>
      </div>`;

      const button = document.querySelector(".button-next");
      // let page = 1;
      button.addEventListener("click", (e) => {
        listIllustration.innerHTML = `
        <div class="col-12">
          <h2>Illustration</h2>
        </div>
        `;
        page += 1;
        getIllustrations(page);
      });
    }
  };

  const searchBtn = document.querySelector("#btn-search");
  const inputSearch = document.querySelector("#search");
  searchBtn.addEventListener("click", () => {
    if (inputSearch.value === "") {
      alert("Input Search is required");
    } else {
      searchIllustration(inputSearch.value);
      inputSearch.value = "";
    }
  });

  inputSearch.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
      if (inputSearch.value === "") {
        alert("Input Search is required");
      } else {
        searchIllustration(inputSearch.value);
        inputSearch.value = "";
      }
    }
  });

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  if (document.contains(document.querySelector("#listIllustration"))) {
    document.addEventListener("DOMContentLoaded", () => {
      getIllustrations(page);
    });
  }
}

export default main;
