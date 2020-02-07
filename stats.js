//fetch data

const getAtAGlanceData = async (val) => {
    const response = await fetch(
        `https://api.propublica.org/congress/v1/116/${val}/members.json`, {
            method: "GET",
            headers: {
                "X-API-Key": "pwaHYLY2XBBDFcdsVoQ7KhmtyYTvQV8WzxMTFuXi"
            }
        }
    )
    const data = await response.json();
    memberArray = data.results[0].members;
    return memberArray;
}

const processRawDataForGlanceTable = async (id, data) => {

    //count total N of members

    const countTotalReps = (val => {
        return data.filter(member => member.party === val).length;
    })

    const totalDemocrats = countTotalReps('D');
    const totalRepublicans = countTotalReps('R');
    const totalIndependents = countTotalReps('I');

    totalAll = totalDemocrats + totalRepublicans + totalIndependents;
    // count % of votes
    const countVotesWPartyPct = (party, total) => {
        let average = 0;
        let sum = 0;
        if (party) {
            let pct = [];
            pct.push(data.filter(member => member.party === party))
            pct[0].forEach(member => {
                if (member.votes_with_party_pct == null || member.votes_with_party_pct == undefined) {
                    member.votes_with_party_pct = 0
                }
            })
            pct[0].forEach(member => {
                sum += member.votes_with_party_pct
            })
            average = sum / pct[0].length
        } else {
            data.forEach(member => {
                sum += member.votes_with_party_pct
            })
            average = sum / data.length
        }
        return Math.round(average);
    }

    const votesD = countVotesWPartyPct('D', undefined);
    const votesR = countVotesWPartyPct('R', undefined);
    const votesI = countVotesWPartyPct('I', undefined);
    const votesTotal = countVotesWPartyPct(undefined, 'total');
    // create arrays to display in a table
    const tId = id
    const headArray = ['Party', 'No. of Reps', '% Voted w/ Party']
    const dataArray = [{
            name: "Democrates",
            reps: totalDemocrats,
            voted_w_party: votesD
        },
        {
            name: "Republicans",
            reps: totalRepublicans,
            voted_w_party: votesR
        },
        {
            name: "Independents",
            reps: totalIndependents,
            voted_w_party: votesI
        },
        {
            name: "Total",
            reps: totalAll,
            voted_w_party: votesTotal
        }
    ]
    return {
        tId,
        headArray,
        dataArray
    };
}


const processRawDataForLeastTable = async (data) => {
    console.log(data)
    let votesArray = [];
    let lowAttendMemberArray = []
    data.forEach(member => votesArray.push(member.missed_votes))
    votesArray.sort((a, b) => {
        return b - a;
    })
    cutOffPoint = votesArray[Math.round(votesArray.length * 0.1)]
    lowAttendMemberArray.push(data.filter(member => member.missed_votes >= cutOffPoint))
    const headArray = ['Name', 'No of Missed Votes', '% Missed']
    let dataArray = [ ];
    for(var i=0; i<lowAttendMemberArray[0].length; i++){
        dataArray.push( {
         name: lowAttendMemberArray[0][i].first_name +' '+ lowAttendMemberArray[0][i].last_name,
         number:lowAttendMemberArray[0][i].missed_votes, 
         pct:lowAttendMemberArray[0][i].missed_votes_pct
        })
    }
    const id = "a-least"
    return{id, headArray, dataArray}
}


const processRawDataForMostTable = async (data) => {
    let votesArray = [];
    let lowAttendMemberArray = []
    data.forEach(member => votesArray.push(member.missed_votes))
    votesArray.sort((a, b) => {
        return b - a;
    })
    cutOffPoint = votesArray[Math.round(votesArray.length * 0.9)]
    lowAttendMemberArray.push(data.filter(member => member.missed_votes <= cutOffPoint))
    const headArray = ['Name', 'No of Missed Votes', '% Missed']
    let dataArray = [ ];
    for(var i=0; i<lowAttendMemberArray[0].length; i++){
        dataArray.push( {
         name: lowAttendMemberArray[0][i].first_name +' '+ lowAttendMemberArray[0][i].last_name,
         number:lowAttendMemberArray[0][i].missed_votes, 
         pct:lowAttendMemberArray[0][i].missed_votes_pct
        })
    }
    const id = "a-most"
    return{id, headArray, dataArray}

}

const processRawDataForLeastTable1 = async (data) => {
    console.log(data)
    let votesArray = [];
    let lowAttendMemberArray = []
    data.forEach(member => votesArray.push(member.votes_with_party_pct))
    votesArray.sort((a, b) => {
        return b - a;
    })
    console.log(votesArray)
    cutOffPoint = votesArray[Math.round(votesArray.length * 0.9)]
    console.log(votesArray[Math.round(votesArray.length * 0.9)])
    lowAttendMemberArray.push(data.filter(member => member.votes_with_party_pct <= cutOffPoint))
    const headArray = ['Name', 'No Party Votes', '% Party Votes']
    let dataArray = [ ];
    for(var i=0; i<lowAttendMemberArray[0].length; i++){
        let number_party_votes = lowAttendMemberArray[0][i].total_votes*lowAttendMemberArray[0][i].votes_with_party_pct/100
        dataArray.push( {
         name: lowAttendMemberArray[0][i].first_name +' '+ lowAttendMemberArray[0][i].last_name,
         number:  Math.round(number_party_votes),
         pct:lowAttendMemberArray[0][i].votes_with_party_pct
        })
    }
    const id = "a-least"
    return{id, headArray, dataArray}
}


const processRawDataForMostTable1 = async (data) => {
    let votesArray = [];
    let lowAttendMemberArray = []
    data.forEach(member => votesArray.push(member.votes_with_party_pct))
    votesArray.sort((a, b) => {
        return b - a;
    })
    cutOffPoint = votesArray[Math.round(votesArray.length * 0.1)]
    lowAttendMemberArray.push(data.filter(member => member.votes_with_party_pct >= cutOffPoint))
    const headArray = ['Name', 'No Party Votes', '% Party Votes']
    let dataArray = [ ];
    for(var i=0; i<lowAttendMemberArray[0].length; i++){
        let number_party_votes = lowAttendMemberArray[0][i].total_votes*lowAttendMemberArray[0][i].votes_with_party_pct/100
        dataArray.push( {
         name: lowAttendMemberArray[0][i].first_name +' '+ lowAttendMemberArray[0][i].last_name,
         number: Math.round(number_party_votes), 
         pct:lowAttendMemberArray[0][i].votes_with_party_pct
        })
    }
    const id = "a-most"
    return{id, headArray, dataArray}

}