/* *************************
*** USER SIGNUP ***
************************** */
//allows a new user to signup for our journal app
function userSignUp() {
    //  console.log('userSignUp Function Called')
    let userEmail = document.getElementById('emailSignup').value;
    let userPass = document.getElementById('pwdSignup').value;
    let newUserData = { user: { email: userEmail, password: userPass } };
    console.log(`NEWUSERDATA ==> ${newUserData.user.email}  ${newUserData.user.password}`)
    
    fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData)
    })
    .then(response => response.json())
    .then(function (response) {
        console.log(response.sessionToken);
        let token = response.sessionToken;
        localStorage.setItem('SessionToken', token);
        tokenChecker()
    })
    .catch((err) => {
        console.log(err)
    })

    }
    
    
    /* *************************
    *** USER LOGIN ***
    ************************** */
    function userLogin() {
        let userEmail = document.getElementById('emailLogin').value;
        let userPass = document.getElementById('pwdLogin').value;
    
     console.log(userEmail, userPass);

    let userData = { user: { email: userEmail, password: userPass } };
    console.log(`USERDATA ==> ${userData.user.email}  ${userData.user.password}`)
    fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)

    })
    .then(response => response.json())
    .then(function (response) {
        console.log(response.sessionToken);
        let token = response.sessionToken;
        localStorage.setItem('SessionToken', token);
        tokenChecker()
    })
    .catch((err) => {
        console.log(err)
    })
    }
    
    
    /* *************************
    *** USER LOGOUT ***
    ************************** */
   // this is the same setItem method within local storage that we used when a user signs up or logs in, however here we are setting the sessionToken to be undefined. After this function is run by clicking the logout button the user will no longer have a token and will not be able to access any protected routes.
    function userLogout() {
        localStorage.setItem('SessionToken', undefined)
        //console.log what the sessionToken is now set to. If you look in the browser you should see 'sessionToken ==> undefined' once you clik logot. The next line calls the tokenChecker function which we will add to later on. 
        console.log(`sessionToken ==> ${localStorage.sessionToken}`)
        tokenChecker()
    //  console.log('userLogout Function Called')
    }
    
     
    /* *************************
     *** TOKEN CHECKER FUNCTION ***
    ************************** */
    function tokenChecker() {
        // these variables will help us interact with the Dom more easily
        let display = document.getElementById('journals')
        let header = document.createElement('h5')
        let accessToken = localStorage.getItem('SessionToken')
        let text = 'Login or signup to get started!'
        // removes all child nodes within the journals div. this way the message we may want to display doesn't get appended to the end of a bunch of journal card.
        for (i = 0; i = display.childNodes.length; i++) {
            display.removeChild(display.firstChild)
        }
        // a conditional to check whether or not there is a token. If not a token, we add a header with a the message contained within the "text" variable on line 86
        if (accessToken === 'undefined') {
            display.appendChild(header);
            header.textContent = text
            header.setAttribute('id', 'defaultLogin');
        } else {
            null
        }
    
    }
    // Finally we call the tokenChecker function. We want to call it right away so as soon as the browser goes to the Journal webpage it checks if there is a token in local storage or not and displays the message accordingly. 
    tokenChecker()