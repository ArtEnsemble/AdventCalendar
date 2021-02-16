// ie11
const calendar = document.querySelector(".calendar");
const explorer = document.querySelector("#ie11");
calendar.style.display = "";
explorer.style.display = "none";

//GET LIST DATA
const today = new Date();
var listURL =
  _spPageContextInfo.webAbsoluteUrl +
  "/_api/web/lists/GetByTitle('Gratitude')/items?$Select=Title,Date,Quote,Publish,Author0,Author0/Name,Author0/FirstName,Author0/LastName,Author0/Department&$Expand=Author0,Author0/Name";

//var dates =[];
var listData;

var spData = new XMLHttpRequest();
spData.addEventListener("load", reqListener);
spData.open("GET", listURL);
spData.setRequestHeader("Accept", "application/json; odata=verbose");
spData.send();

function reqListener() {
  var listJSON = JSON.parse(this.responseText);
  listData = listJSON.d.results;
  //console.log(listData);

  listData.forEach(function (data) {
    var quote = data.Quote;

    var date = data.Date.split("T")[0];
    var pubDate = new Date(data.Date);

    if (pubDate <= today || data.Publish) {
      var calendarEl = document.querySelector(
        "[data-date='" + date + "'] .day__back"
      );
      calendarEl.innerHTML = `<p>${quote}</p><figure><figcaption><span class="name">${data.Author0.FirstName} ${data.Author0.LastName},</span><span class="title">${data.Title}</span></figcaption></figure>`;
      document
        .querySelector(`[data-date='${date}']`)
        .classList.add("published");
      document
        .querySelector(`[data-date='${date}']`)
        .addEventListener("click", function (el) {
          this.classList.toggle("spotlight");
          document
            .querySelector(".snowflakes")
            .classList.add("snowflakes__falling");
        });
    }
  });
}

/* const days = Array.from(document.querySelectorAll('.published'));

*/

const emptyDays = Array.from(document.querySelectorAll(".day"));

emptyDays.forEach(function (el) {
  el.addEventListener("click", function (el) {
    if (!this.classList.contains("published")) {
      this.classList.add("nopeeking");
    }
  });
});
