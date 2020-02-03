function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
//function myFunction() taken from https://www.w3schools.com/howto/howto_js_read_more.asp

const divForHomePage = document.getElementById('text')
const divForCongress = document.getElementById('congress');
const divForAttendance = document.getElementById('attendance');
const divForLoyalty = document.getElementById('loyalty')

const linkForHomePage = document.getElementById('home')
const linkInfoHouse = document.getElementById('info-house')
const linkInfoSenate = document.getElementById('info-sentate')
const linkAttendanceHouse = document.getElementById('attendance-house')
const linkAttendanceSenate = document.getElementById('attendance-senate')
const linkLoyaltyHouse = document.getElementById('loyalty-house')
const linkLoyalySenate = document.getElementById('loyalty-senate')

//ADD EVENT LISTENERS TO LINKS

linkForHomePage.addEventListener('click', () => {
  divForHomePage.style.display = ('block')
});

linkInfoHouse.addEventListener('click', () => {
  divForHomePage.style.display = ('none');
  let module = import('./info_congress.js')
  .then((module) => {
    let data = module.provideData("house");
  })
  .then((data)=>
  buildTable('congress', ['Name', 'Party', 'State', 'Years in Office', '% Votes w/ Party'], data));
});
linkInfoSenate.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
  buildTable('congress', ['Name', 'Party', 'State', 'Years in Office', '% Votes w/ Party'])
});
linkAttendanceHouse.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
});
linkAttendanceSenate.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
});
linkLoyaltyHouse.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
});
linkLoyalySenate.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
});

//BUILD TABLES

const buildTable = (id, headArray, dataArray) => {
  console.log(dataArray)
  const tableDiv = document.getElementById(id);
  const tbl = document.createElement('table');
  const tblHead = document.createElement('thead');
  const tblBody = document.createElement('tbody');

  for (let i=0; i< headArray.length; i++) {
    const headCell = document.createElement('th');
    headCell.textContent = (headArray[i]);
    tblHead.appendChild(headCell);
  }
  tbl.appendChild(tblHead);
  tableDiv.appendChild(tbl);
}