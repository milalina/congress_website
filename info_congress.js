
export const provideData = (valueForDataFetch)=>{
    fetch(`https://api.propublica.org/congress/v1/116/${valueForDataFetch}/members.json`, {
        method: "GET",
        headers: {
            "X-API-Key": "pwaHYLY2XBBDFcdsVoQ7KhmtyYTvQV8WzxMTFuXi"
        }
    })
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data.results[0].members);
        let memberArray = data.results[0].members;
        return memberArray;
    })
    .catch(function (error) {
        console.log(error);
    });
}