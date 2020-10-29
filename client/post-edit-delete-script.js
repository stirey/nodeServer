/* *************************
 *** POST JOURNAL ***
************************** */
function postJournal() {
    // here we are setting up some variables that reference our input fields in the DOM 
    let title = document.getElementById('title').value
    let date = document.getElementById('date').value
    let entry = document.getElementById('entry').value
    // variable accessToken is set up to store the SessionToken in local storage
    const accessToken = localStorage.getItem('SessionToken')
    // this variable stores the information for the body of the request
    let newEntry = { journal: { title: title, date: date, entry: entry} }
    //  console.log('postJournal Function Called')
    // utilizing the uRL we have set up on the server-side to refer to the journal/create route
    fetch('http://localhost:3000/journal/create', {
        // since we are referring to a route that uses POST we need to make sure that the method utilized matches that
        method: 'POST',
        headers: new Headers({
        //remember that the accessToken variable we set up a moment ago stores the SessionToken that is in localStorage. If you look back in the server to the journal/create subroute you will see that we have made this a protected route with the use of validateSession. This means that a token is required in order to access this route. This is why we send it over with the other headers (similar to what we did in Postman when testing this route). 
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }),
        body: JSON.stringify(newEntry) // information entered via the input field is turned into a jsonified string
    })
    .then(response => {
        console.log(response.json())
        displayMine()
    })
    .catch((err) => {
        console.log(err)
    })
    }
    
    
    /* *************************
     *** UPDATE JOURNAL ***
    ************************** */
    function editJournal(postId) {
        console.log(postId)
        //storing the url that we will use in the fetch as well as session token on the line below. postId is the parameter below since this enpoint utilizes a variable to append the id of the journal entry we want to update.
        const fetch_url = `http://localhost:3000/journal/update/${postId}`
        const accessToken = localStorage.getItem('SessionToken')
        // storing info regarding the DOM. postId is being used to get the id assigned to each specific card for each post
        let card = document.getElementById(postId)
        let input = document.createElement('input')

        // checking to see how many child nodes the card currently contains. If less than 2, we want to create an additional one which will be an input field used for editing. If more than 2, it means the input field already exists and we are in edit mode so we wouldn't want to create it again.
        if (card.childNodes.length < 2) {
            // these handle the creation of the inputs within the cards as well as giving some attributes that change how it appears on the page and gives an id. 
            card.appendChild(input)
            input.setAttribute('type', 'text')
            input.setAttribute('id', 'updatedEntry')
            input.setAttribute('placeholder', 'Edit your journal entry')
        } else {
            // storing the value of the updateEntry input in the variable updated
            let updated = document.getElementById('updatedEntry').value
            // store the updatedEntry info.
            let updateEntry = { journal: { entry: updated} };
            // starting the fetch method for the update endpoint. REaching out to the journal/update/endpoint that was stored in the fetch_url variable that was in the previous step and using the postId passed as a parameter to access a specific journal entry
            const response = fetch(fetch_url, {
                method: 'PUT', // using PUT since that matches the method used on the backend.
                headers: {
                    'Content-Type': 'application/json',
                    // We are also sending the token through with the request since this is a protected route and a token is needed to verify that the user is logged in.
                    'Authorization': accessToken
                },
                body: JSON.stringify(updateEntry)
            })
              .then(response => {
                  return response.json();
              })
              .then(data => {
                  console.log(data)
                  displayMine();
              })
              // The final thing we are doing here is removing the input from the card so that it is no longer displayed once it is updated.
              card.removeChild(card.lastChild)
        } 
    }
    
    
    /* *************************
     *** DELETE JOURNAL ***
    ************************** */
    function deleteJournal(postId) {
        console.log('deleteJournal working')
        console.log(postId)

        const fetch_url = `http://localhost:3000/journal/delete/${postId}`
        const accessToken = localStorage.getItem('SessionToken')

        fetch(fetch_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        })

            .then(response => {
                console.log(response);
                displayMine()
            })
    }