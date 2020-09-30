if(localStorage.getItem("name") !== null){
    window.location.href = "dashboard.html";
}

document.querySelector('#google').addEventListener('click',function (){
    //alert("Hello");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result);
        window.localStorage.setItem("name",result.additionalUserInfo.profile.name);
        window.localStorage.setItem("picture",result.additionalUserInfo.profile.picture);
        window.localStorage.setItem("userId",firebase.auth().currentUser.uid);


        window.location.href = 'dashboard.html';


    }).catch(function(error) {
        var errorCode = error.code;
        console.log(errorCode)
        var errorMessage = error.message;
        console.log(errorMessage)
        console.log("Login Failed");
    });
})