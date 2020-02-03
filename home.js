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
const spinner =document.getElementById('spinner')
spinner.style.display='none';

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
  spinner.style.display = ('block')
  const tableDiv = document.getElementById("congress");
  tableDiv.innerHTML = '';
  let module = import('./info_congress.js')
    .then((module) => {
      module.provideData('house')
    });
})
linkInfoSenate.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
  spinner.style.display = ('block')
  const tableDiv = document.getElementById("congress");
  tableDiv.innerHTML = '';
  let module = import('./info_congress.js')
  .then((module) => {
    module.provideData('senate')
  });
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

export const buildInfoTable = (id, headArray, dataArray) => {
  console.log(dataArray)
  const tableDiv = document.getElementById(id);
  tableDiv.innerHTML='';
  const tbl = document.createElement('table');
  const tblHead = document.createElement('thead');
  const tblBody = document.createElement('tbody');

  for (let i = 0; i < headArray.length; i++) {
    const headCell = document.createElement('th');
    headCell.textContent = (headArray[i]);
    tblHead.appendChild(headCell);
  }
  tbl.appendChild(tblHead);
  tableDiv.appendChild(tbl);
  for (let j = 0; j < dataArray.length; j++) {
    const tblRow = document.createElement('tr')

    const tblCellName = document.createElement('td')
    const tblCellParty = document.createElement('td')
    const tblCellState = document.createElement('td')
    const tblCellSeniority = document.createElement('td')
    const tblCellNameVotes = document.createElement('td')

    if (dataArray[j].middle_name === null) {
      tblCellName.textContent = (`${dataArray[j].first_name} ${dataArray[j].last_name}`)
    } else {
      tblCellName.textContent = (`${dataArray[j].first_name} ${dataArray[j].middle_name} ${dataArray[j].last_name}`)
    }
    tblCellParty.textContent =(dataArray[j].party)
    tblCellState.textContent =(dataArray[j].state)
    tblCellSeniority.textContent =(dataArray[j].seniority)
    tblCellNameVotes.textContent=(dataArray[j].votes_with_party_pct)
    tblRow.appendChild(tblCellName)
    tblRow.appendChild(tblCellParty)
    tblRow.appendChild(tblCellState)
    tblRow.appendChild(tblCellSeniority)
    tblRow.appendChild(tblCellNameVotes)
    tblBody.appendChild(tblRow)
  }
  tbl.appendChild(tblBody)
}