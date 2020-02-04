var memberArray;
export const provideData = (valueForDataFetch) => {
    fetch(`https://api.propublica.org/congress/v1/116/${valueForDataFetch}/members.json`, {
            method: "GET",
            headers: {
                "X-API-Key": "pwaHYLY2XBBDFcdsVoQ7KhmtyYTvQV8WzxMTFuXi"
            }
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data.results[0].members);
            memberArray = data.results[0].members;
            const spinner = document.getElementById('spinner')
            spinner.style.display = ('none')
            const divForCongress = document.getElementById('congress');
            divForCongress.style.display = ('block');
            let module = import('./home.js')
                .then((module) => {
                    module.buildInfoTable('congress-info-table-div', ['Name', 'Party', 'State', 'Years in Office', '% Votes w/ Party'], memberArray)
                    module.buildDropdown(memberArray);
                })
        })
        .catch((error) => {
            console.log(error);
        });
}

export const createFilteredMemberArray = (arr, state) => {
    let memberArray1=[];
    memberArray1=memberArray
    
    if (state != 'ALL STATES'){
        memberArray1 = memberArray.filter(member=>
            member.state == state
        )
    }else{memberArray1=memberArray}
 
   let filteredMemberArray = [];
   if (arr.length>0 && arr.length <3) {
       arr.forEach(val => {
           filteredMemberArray.push(memberArray1.filter(member => member.party == val))
           if (filteredMemberArray.length == 2) {
               let arr1=[]
               arr1.push(filteredMemberArray[0].concat(filteredMemberArray[1]))
               filteredMemberArray=arr1;
           }
       })
   } else{
       filteredMemberArray=[];
       filteredMemberArray.push(memberArray1);
   }
    let module = import('./home.js')
        .then((module) => {
            module.buildInfoTable('congress-info-table-div', ['Name', 'Party', 'State', 'Years in Office', '% Votes w/ Party'], filteredMemberArray[0])
        })
}