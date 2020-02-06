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
const spinner = document.getElementById('spinner')
spinner.style.display = 'none';
divForCongress.style.display = ('none');

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
  spinner.style.display = 'none';

});
linkInfoHouse.addEventListener('click', () => {
  divForHomePage.style.display = ('none');
  spinner.style.display = ('block')
  const tableDiv = document.getElementById("congress-info-table-div");
  tableDiv.innerHTML = '';
  let module = import('./info_congress.js')
    .then((module) => {
      module.provideData('house')
    });
})
linkInfoSenate.addEventListener('click', () => {
  divForCongress.style.display = ('none');
  divForHomePage.style.display = ('none')
  spinner.style.display = ('block')
  const tableDiv = document.getElementById("congress-info-table-div");
  tableDiv.innerHTML = '';
  let module = import('./info_congress.js')
    .then((module) => {
      module.provideData('senate')
    });
});
linkAttendanceHouse.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
  divForCongress.style.display = ('none');
  spinner.style.display = ('block')
  const houseRawData = async (val) => {
    const data = await getAtAGlanceData(val)
    const processData = await processRawData(data)
      .then(processData => buildAttendanceTable(processData))
    // buildAttendanceTable(data)
    // console.log(processData)
    // return processData;
  }
  houseRawData('house')
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

//-----------------------INFO PAGE------------------------------

//BUILD CHECKBOXES FOR INFO PAGE

const buildCheckBoxes = (arr) => {
  const pageDiv = document.getElementById('check-boxes-div');
  const captionTag = document.createElement('p')
  captionTag.textContent = ('Filter by Party:')
  pageDiv.appendChild(captionTag)
  const formDiv = document.createElement('form');
  for (let i = 0; i < arr.length; i++) {
    const inputDiv = document.createElement('input');
    const labelTag = document.createElement('label');
    if (arr[i] == 'D') {
      labelTag.textContent = ('Democrat')
    } else if (arr[i] == 'R') {
      labelTag.textContent = ('Republican')
    } else {
      labelTag.textContent = ('Independent')
    }
    inputDiv.setAttribute('type', 'checkbox');
    inputDiv.setAttribute('name', 'party');
    inputDiv.setAttribute('value', arr[i]);
    inputDiv.addEventListener('click', () => {
      readCheckboxesValue();
    })
    formDiv.appendChild(inputDiv);
    formDiv.appendChild(labelTag);
  }
  pageDiv.appendChild(formDiv)
}
buildCheckBoxes(['D', 'R', 'I'])

//BUILD DROPDOWN FOR INFO PAGE

export const buildDropdown = (arr) => {
  const dropdownDiv = document.getElementById('dropdown-div')
  dropdownDiv.innerHTML = ''
  const uniqueStatesArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (uniqueStatesArray.indexOf(arr[i].state) === -1) {
      uniqueStatesArray.push(arr[i].state)
    }
  }
  uniqueStatesArray.sort()
  const selectDiv = document.createElement('select')
  console.log(dropdownDiv)
  dropdownDiv.appendChild(selectDiv)
  selectDiv.id = 'selectedState'
  selectDiv.addEventListener('change', () => {
    readCheckboxesValue()
  })
  const optionAll = document.createElement('option')
  optionAll.textContent = ('ALL STATES')
  optionAll.setAttribute = ('value', 'all')
  selectDiv.appendChild(optionAll)
  for (let j = 0; j < uniqueStatesArray.length; j++) {
    const optionState = document.createElement('option')
    optionState.textContent = (uniqueStatesArray[j])
    optionState.setAttribute = ('value', uniqueStatesArray[j])
    selectDiv.appendChild(optionState)
  }
}

const readCheckboxesValue = () => {
  const checkBoxesValue = Array.from(document.querySelectorAll('input[name=party]:checked')).map(elt => elt.value)
  const selectedState = document.querySelector('#selectedState').value
  let module = import('./info_congress.js')
    .then((module) => {
      module.createFilteredMemberArray(checkBoxesValue, selectedState)
    })
}

//BUILD TABLE FOR INFO PAGE

export const buildInfoTable = (id, headArray, dataArray) => {
  console.log(dataArray)
  const tableDiv = document.getElementById(id);
  tableDiv.innerHTML = '';
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
    const tblCellVotes = document.createElement('td')

    if (dataArray[j].middle_name === null) {
      tblCellName.textContent = (`${dataArray[j].first_name} ${dataArray[j].last_name}`)
    } else {
      tblCellName.textContent = (`${dataArray[j].first_name} ${dataArray[j].middle_name} ${dataArray[j].last_name}`)
    }
    tblCellParty.textContent = (dataArray[j].party)
    tblCellState.textContent = (dataArray[j].state)
    tblCellSeniority.textContent = (dataArray[j].seniority)
    tblCellVotes.textContent = (dataArray[j].votes_with_party_pct)
    tblRow.appendChild(tblCellName)
    tblRow.appendChild(tblCellParty)
    tblRow.appendChild(tblCellState)
    tblRow.appendChild(tblCellSeniority)
    tblRow.appendChild(tblCellVotes)
    tblBody.appendChild(tblRow)
  }
  tbl.appendChild(tblBody)
}

//Build table for attendance page

const buildAttendanceTable = (data) => {
  spinner.style.display = 'none';
  const {
    id,
    headArray,
    dataArray,
  } = data;
  const tableDiv = document.getElementById(id);
  tableDiv.innerHTML = '';
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
    const tblCell1 = document.createElement('td')
    const tblCell2 = document.createElement('td')
    const tblCell3 = document.createElement('td')
    tblCell1.textContent = dataArray[j].name;
    tblCell2.textContent = dataArray[j].reps;
    tblCell3.textContent = dataArray[j].voted_w_party;
    tblRow.appendChild(tblCell1)
    tblRow.appendChild(tblCell2)
    tblRow.appendChild(tblCell3)
    tblBody.appendChild(tblRow)
  }
  tbl.appendChild(tblBody)
}