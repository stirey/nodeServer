// const { delete } = require("../server/controllers/usercontroller")

/* *************************
 **** DISPLAY BY USER ******
************************** */
function displayMine() {
    const accessToken = localStorage.getItem('SessionToken')
    fetch('http://localhost:3000/journal/mine', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken
        })
    })
    .then(
        function (response) {
            return response.json()        
        })
    .catch(
        function (error) {
            console.error('Error:', error)
        })    
        //chaining another .then onto the promise that accepts the response and console logs it. We will use this response further in the code.
    .then(function (response) {
        console.log(response)
// display variable is set up referring to the div with id of journals. the for loop checks if there are any elements in that div and removes them before displaying more. 
        let display = document.getElementById('journals')
        for (i = 0; i = display.childNodes.length; i++) {
            display.removeChild(display.firstChild)
        }

// the if else statement will handle what is displayed on the page and how. If the .length is 0, there are no posts and a msg will be displayed
    if (response.length === 0) {

        let display = document.getElementById('journals')
        //this will create an h5 header
        let header = document.createElement('h5')
        // header is created, given text and given a class
        display.appendChild(header)
        header.textContent = "You haven't made any posts yet!"
        header.setAttribute("class", "noPosts")

    } else {
        for (i = 0; i < response.length; i++) {
// here we are starting off the for loop to go through each item in the response and then setting up some variable to make it easier to refer to the information in the next step
            let display = document.getElementById('journals')
            let card = document.createElement('div')
            let body = document.createElement('div')
            let header = document.createElement('h5')
            let subtitle = document.createElement('h6')
            let para = document.createElement('p')
            let editBtn = document.createElement('button')
            let deleteBtn = document.createElement('button')

            let current = response[i]
            let title = current.title;
            let date = current.date;
            let entry = current.entry;
        // here we utilize the variables we set up previously to add some things to the DOM. I created cards that display the info for each journal post as well as some Edit and Delete buttons.
            display.appendChild(card)
            card.appendChild(body)
            body.appendChild(header)
            body.appendChild(subtitle)
            body.appendChild(para)
            body.appendChild(editBtn)
            body.appendChild(deleteBtn)

            card.setAttribute('id', current.id)
            card.setAttribute('class', 'card')
            body.setAttribute('class', 'card-body')
            header.setAttribute('class', 'card-title')
            subtitle.setAttribute('class', 'card-subtitle mb-2 text muted')
            para.setAttribute('class', 'card-text')

            editBtn.setAttribute('class', 'btn btn-dark editBtn')
            editBtn.setAttribute('type', 'button')
            //notice the id we are calling to access a specific journal post
            editBtn.setAttribute('onclick', `editJournal(${current.id})`)

            deleteBtn.setAttribute('class', 'btn btn-dark deleteBtn')
            deleteBtn.setAttribute('type', 'button')
            deleteBtn.setAttribute('onclick', `deleteJournal(${current.id})`)

            header.textContent = title
            subtitle.textContent = date
            para.textContent = entry
            editBtn.textContent = 'Edit'
            deleteBtn.textContent = 'Delete'

            }
        }   
    })
}
    
    
/* *************************
****** DISPLAY ALL *********
************************** */
    function displayAll() {
        fetch('http://localhost:3000/journal', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(
            function (response) {
                return response.json()
            })
        .catch(
            function (error) {
                console.error('Error:', error)
            })
        .then(function (response) {
            console.log(response)

            let display = document.getElementById('journals')
            for (i = 0; i = display.childNodes.length; i++) {
                display.removeChild(display.firstChild)
            }

            if (response.length === 0) {
                let display = document.getElementById('journals')
                let header = document.createElement('h5')

                display.appendChild(header)
                header.textContent = "There are not any posts yet!"
                header.setAttribute("class", "noPosts")
            } else {

                for (i = 0; i < response.length; i++) {
                    let card = document.createElement('div')
                    let body = document.createElement('div')
                    let header = document.createElement('h5')
                    let subtitle = document.createElement('h6')
                    let para = document.createElement('p')
                    let display = document.getElementById('journals')

                    let current = response[i]
                    let title = current.title;
                    let date = current.date;
                    let entry = current.entry;

                    display.appendChild(card)
                    card.appendChild(body)
                    body.appendChild(header)
                    body.appendChild(subtitle)
                    body.appendChild(para)

                    card.setAttribute('id', current.id)
                    card.setAttribute('class', 'card')
                    body.setAttribute('class', 'card-body')
                    header.setAttribute('class', 'card-title')
                    subtitle.setAttribute('class', 'card-subtitle mb-2 text muted')
                    para.setAttribute('class', 'card-text')

                    header.textContent = title
                    subtitle.textContent = date
                    para.textContent = entry


                }
            }
        })    
    }
    
    
/* *************************
***** DISPLAY BY TITLE *****
************************** */
    function displayByTitle() {
    let journalTitle = document.getElementById('searchBar').value;
    console.log(journalTitle)
    fetch(`http://localhost:3000/journal/${journalTitle}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(
        function (response) {
            return response.json()
        })
    .catch(
        function (error) {
            console.error('Error:', error)
        })
    .then(function (response) {
        console.log(response)

        let display = document.getElementById('journals')
            for (i = 0; i = display.childNodes.length; i++) {
                display.removeChild(display.firstChild)
            }
        if (response.length === 0) {
            let display = document.getElementById('journals')
            let header = document.createElement('h5')

            display.appendChild(header)
            header.textContent = "There are not any posts on this topic."
            header.setAttribute("class", "noPosts")
    } else {
        for (i = 0; i < response.length; i++) {
            let card = document.createElement('div')
            let body = document.createElement('div')
            let header = document.createElement('h5')
            let subtitle = document.createElement('h6')
            let para = document.createElement('p')
            let display = document.getElementById('journals')

            let current = response[i]
            let title = current.title;
            let date = current.date;
            let entry = current.entry;

            display.appendChild(card)
            card.appendChild(body)
            body.appendChild(header)
            body.appendChild(subtitle)
            body.appendChild(para)

            card.setAttribute('id', current.id)
            card.setAttribute('class', 'card')
            body.setAttribute('class', 'card-body')
            header.setAttribute('class', 'card-title')
            subtitle.setAttribute('class', 'card-subtitle mb-2 text muted')
            para.setAttribute('class', 'card-text')

            header.textContent = title
            subtitle.textContent = date
            para.textContent = entry
            }  
        }
    })
}