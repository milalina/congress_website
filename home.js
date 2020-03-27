const divForHomePage = document.getElementById('text')
const divForCongress = document.getElementById('congress');
const divForAttendance = document.getElementById('attendance');
const divForLoyalty = document.getElementById('loyalty')
const spinner = document.getElementById('spinner')
spinner.style.display = 'none';
divForCongress.style.display = ('none');
divForAttendance.style.display = ('none');
divForLoyalty.style.display = ('none');

const linkForHomePage = document.getElementById('home')
const linkInfoHouse = document.getElementById('info-house')
const linkInfoSenate = document.getElementById('info-sentate')
const linkAttendanceHouse = document.getElementById('attendance-house')
const linkAttendanceSenate = document.getElementById('attendance-senate')
const linkLoyaltyHouse = document.getElementById('loyalty-house')
const linkLoyalySenate = document.getElementById('loyalty-senate')
const dropdownAndCheckboxes = document.getElementById('filters')

//ADD EVENT LISTENERS TO LINKS

linkForHomePage.addEventListener('click', () => {
  divForHomePage.style.display = ('block')
  spinner.style.display = ('none');
  divForCongress.style.display = ('none');
  divForAttendance.style.display = ('none');
  divForLoyalty.style.display = ('none');

});
linkInfoHouse.addEventListener('click', () => {
  divForHomePage.style.display = ('none');
  divForAttendance.style.display = ('none');
  divForLoyalty.style.display = ('none');
  addText('house');
  spinner.style.display = ('block');
  dropdownAndCheckboxes.style.display = ('none')
  const tableDiv = document.getElementById("congress-info-table-div");
  tableDiv.innerHTML = '';
  let module = import('./info_congress.js')
    .then((module) => {
      module.provideData('house')
    });
})
linkInfoSenate.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
  divForAttendance.style.display = ('none');
  divForLoyalty.style.display = ('none');
  dropdownAndCheckboxes.style.display = ('none')
  addText('senate');
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
  divForLoyalty.style.display = ('none');
  divForAttendance.style.display = ('none');
  spinner.style.display = ('block')
  addText('text-on-att');
  const houseAtAGlanceHead = document.getElementById("a-at-glance-table-head")
  houseAtAGlanceHead.textContent = "House at a Glance"
  const houseRawData = async (val) => {
    const data = await getAtAGlanceData(val)
    const dataForLeast = await processRawDataForLeastTable("a-least", data)
      .then(dataForLeast => buildMostLeastAttTable(dataForLeast))
      .then(divForAttendance.style.display = ('block'))
    const dataForMost = await processRawDataForMostTable("a-most", data)
      .then(dataForMost => buildMostLeastAttTable(dataForMost))
    const dataForAtAGlanceTable = await processRawDataForGlanceTable("at-a-glance", data)
      .then(dataForAtAGlanceTable => buildAttendanceTable(dataForAtAGlanceTable))

  }
  houseRawData('house')
});
linkAttendanceSenate.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
  divForCongress.style.display = ('none');
  divForLoyalty.style.display = ('none');
  divForAttendance.style.display = ('none');
  spinner.style.display = ('block')
  addText('text-on-att');
  const senateAtAGlanceHead = document.getElementById("a-at-glance-table-head")
  senateAtAGlanceHead.textContent = "Senate at a Glance"
  const houseRawData = async (val) => {
    const data = await getAtAGlanceData(val)
    const dataForLeast = await processRawDataForLeastTable("a-least", data)
      .then(dataForLeast => buildMostLeastAttTable(dataForLeast))
      .then(divForAttendance.style.display = ('block'))
    const dataForMost = await processRawDataForMostTable("a-most", data)
      .then(dataForMost => buildMostLeastAttTable(dataForMost))
    const dataForAtAGlanceTable = await processRawDataForGlanceTable("at-a-glance", data)
      .then(dataForAtAGlanceTable => buildAttendanceTable(dataForAtAGlanceTable))

  }
  houseRawData('senate')
});
linkLoyaltyHouse.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
  divForCongress.style.display = ('none');
  divForAttendance.style.display = ('none');
  divForLoyalty.style.display = ('none');
  spinner.style.display = ('block')
  addText('text-on-loy');
  const houseAtAGlanceHead = document.getElementById("l-at-glance-table-head")
  houseAtAGlanceHead.textContent = "House at a Glance"
  const houseRawData = async (val) => {
    const data = await getAtAGlanceData(val)
    const dataForLeast = await processRawDataForLeastTable1("l-a-least", data)
      .then(dataForLeast => buildMostLeastAttTable(dataForLeast))
      .then(divForLoyalty.style.display = ('block'))
    const dataForMost = await processRawDataForMostTable1("l-a-most", data)
      .then(dataForMost => buildMostLeastAttTable(dataForMost))
    const dataForAtAGlanceTable = await processRawDataForGlanceTable("l-at-a-glance", data)
      .then(dataForAtAGlanceTable => buildAttendanceTable(dataForAtAGlanceTable))

  }
  houseRawData('house')
});
linkLoyalySenate.addEventListener('click', () => {
  divForHomePage.style.display = ('none')
  divForCongress.style.display = ('none');
  divForAttendance.style.display = ('none');
  divForLoyalty.style.display = ('none');
  spinner.style.display = ('block')
  addText('text-on-loy');
  const senateAtAGlanceHead = document.getElementById("l-at-glance-table-head")
  senateAtAGlanceHead.textContent = "Senate at a Glance"
  const houseRawData = async (val) => {
    const data = await getAtAGlanceData(val)
    const dataForLeast = await processRawDataForLeastTable1("l-a-least", data)
      .then(dataForLeast => buildMostLeastAttTable(dataForLeast))
      .then(divForLoyalty.style.display = ('block'))
    const dataForMost = await processRawDataForMostTable1("l-a-most", data)
      .then(dataForMost => buildMostLeastAttTable(dataForMost))
    const dataForAtAGlanceTable = await processRawDataForGlanceTable("l-at-a-glance", data)
      .then(dataForAtAGlanceTable => buildAttendanceTable(dataForAtAGlanceTable))

  }
  houseRawData('senate')

});

//-----------------------INFO PAGE------------------------------

//BUILD CHECKBOXES FOR INFO PAGE

const buildCheckBoxes = (arr) => {
  const pageDiv = document.getElementById('check-boxes-div');
  pageDiv.style.paddingRight = ('70px')
  pageDiv.style.display = ('inline-block')
  const captionTag = document.createElement('p')
  captionTag.style.display = ('inline-block')
  captionTag.textContent = ('Filter by Party:')
  pageDiv.appendChild(captionTag)
  const formDiv = document.createElement('form');
  formDiv.style.display = ('inline-block')
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
  dropdownDiv.style.display = ('inline-block')
  dropdownDiv.style.paddingLeft = ('70px')
  dropdownDiv.innerHTML = ''
  const captionTag = document.createElement('p')
  captionTag.style.display = ('inline-block')
  captionTag.textContent = ('Filter by State:')
  dropdownDiv.appendChild(captionTag)
  const uniqueStatesArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (uniqueStatesArray.indexOf(arr[i].state) === -1) {
      uniqueStatesArray.push(arr[i].state)
    }
  }
  uniqueStatesArray.sort()
  const selectDiv = document.createElement('select')
  dropdownDiv.style.display = ('inline-block')
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
  dropdownAndCheckboxes.style.display = ('block');
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
    tblCellParty.classList = 'centered-content'
    tblCellState.classList = 'centered-content'
    tblCellSeniority.classList = 'centered-content'
    tblCellVotes.classList = 'centered-content'
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
    tId,
    headArray,
    dataArray,
  } = data;
  const tableDiv = document.getElementById(tId)
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

const buildMostLeastAttTable = (data) => {
  console.log(data)
  const {
    tId,
    headArray,
    dataArray,
  } = data;
  const tableDiv = document.getElementById(tId)
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
  dataArray.sort((a, b) => {
    return b.pct - a.pct;
  })
  for (let j = 0; j < dataArray.length; j++) {
    const tblRow = document.createElement('tr')
    const tblCell1 = document.createElement('td')
    const tblCell2 = document.createElement('td')
    const tblCell3 = document.createElement('td')
    tblCell1.textContent = dataArray[j].name;
    tblCell2.textContent = dataArray[j].number;
    tblCell3.textContent = dataArray[j].pct;
    tblRow.appendChild(tblCell1)
    tblRow.appendChild(tblCell2)
    tblRow.appendChild(tblCell3)
    tblBody.appendChild(tblRow)
  }
  tbl.appendChild(tblBody)
}

const addText = (id) => {
  if (id === 'text-on-loy') {
    document.getElementById(id).innerHTML = `
  <h4>Party Loyalty</h4>
  <p class="justify">Those who consider themselves to be strong partisans, strong Democrats and strong Republicans respectively, tend to be the most faithful in voting for their party's nominee for office and legislation that backs their party's agenda. </p>
`
  } else if (id === 'text-on-att') {
    document.getElementById(id).innerHTML = `
<h4>Attendance</h4>
<p class="justify">The Constitution specifies that a majority of members constitutes a quorum to do business in each house. Representatives and senators rarely force the presence of a quorum by demanding quorum calls; thus, in most cases, debates continue even if a majority is not present.</p>

<p class="justify">The Senate uses roll-call votes; a clerk calls out the names of all the senators, each senator stating "aye" or "no" when his or her name is announced. The House reserves roll-call votes for the most formal matters, as a roll-call of all 435 representatives takes quite some time; normally, members vote by electronic device. In the case of a tie, the motion in question fails. In the Senate, the Vice President may (if present) cast the tiebreaking vote.</p>
`
  } else if (id === 'house') {
    document.getElementById('congress-text').innerHTML = `
    <h4>Congressmen</h4>
    <p class="justify">The major power of the House is to pass federal legislation that affects the entire country, although its bills must also be passed by the Senate and further agreed to by the U.S. President before becoming law (unless both the House and Senate re-pass the legislation with a two-thirds majority in each chamber). The House has some exclusive powers: the power to initiate revenue bills, to impeach officials (impeached officials are subsequently tried in the Senate), and to elect the U.S. President in case there is no majority in the Electoral College.</p>
    <p class="justify">Each U.S. state is represented in the House in proportion to its population as measured in the census, but every state is entitled to at least one representative. </p>  	    
    `
  } else {
    document.getElementById('congress-text').innerHTML = `
    <h4>Senators</h4>
    <p class="justify">First convened in 1789, the composition and powers of the Senate are established in Article One of the U.S. Constitution. Each state is represented by two senators, regardless of population, who serve staggered six-year terms. The Senate has several exclusive powers not granted to the House, including consenting to treaties as a precondition to their ratification and consenting to or confirming appointments of Cabinet secretaries, federal judges, other federal executive officials, military officers, regulatory officials, ambassadors, and other federal uniformed officers, as well as trial of federal officials impeached by the House.</p>
    `
  }
}

addText('text-on-loy');