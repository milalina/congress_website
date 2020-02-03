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
            let memberArray = data.results[0].members;
            const spinner = document.getElementById('spinner')
            spinner.style.display = ('none')
            let module = import('./home.js')
                .then((module) => {
                    module.buildInfoTable('congress', ['Name', 'Party', 'State', 'Years in Office', '% Votes w/ Party'], memberArray)
                })
        })
        .catch((error) => {
            console.log(error);
        });
}