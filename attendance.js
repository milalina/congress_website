//fetch data

const getAtAGlanceData = async (val) => {
    console.log(val)
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

const processRawData = async (data) => {

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
            console.log(sum)
            average = sum / data.length
        }
        return Math.round(average);
    }

    const votesD = countVotesWPartyPct('D', undefined);
    const votesR = countVotesWPartyPct('R', undefined);
    const votesI = countVotesWPartyPct('I', undefined);
    const votesTotal = countVotesWPartyPct(undefined, 'total');
    // create arrays to display in a table
    const id = "at-a-glance"
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
        id,
        headArray,
        dataArray
    };
}