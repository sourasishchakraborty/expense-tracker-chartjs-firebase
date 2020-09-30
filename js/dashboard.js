if(localStorage.getItem("name") === null){
    window.location.href = "home.html";
}
let user_id = localStorage.getItem("userId");
// code to display the expenses
firebase.database().ref('users/' + user_id).on('value',function(snapshot){
    //console.log(snapshot.val());
    let data = snapshot.val();
    $('#expense_table').html('');
    let counter =1;
    for(let id in data ){
        console.log(data[id].amount);
        document.querySelector('#expense_table').innerHTML += `
            <tr>
               <td>${counter}</td>
               <td>${data[id].name}</td>
               <td>${data[id].type}</td>
               <td>${data[id].amount}</td>
               <td>${data[id].category}</td>
               <td>${data[id].date}</td>
            </tr>
        `;
        counter++;
    }


});



document.querySelector('#user_image').setAttribute('src',localStorage.getItem('picture'));
document.querySelector('#user_name').textContent = localStorage.getItem('name');

document.querySelector('#logout').addEventListener('click',function (){
    //alert("hello");

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        localStorage.removeItem("name");
        localStorage.removeItem("picture");
        localStorage.removeItem("userId");

        window.location.href = "home.html";
    }).catch(function(error) {
        // An error happened.
        alert("Some error occurred!")
    });
})


document.querySelector('#add_expense').addEventListener('click',function () {
    //alert("hello");
    let expenseName = document.querySelector('#expense_name').value;
    let expenseType = document.querySelector('#expense_type').value;
    let expenseAmount = document.querySelector('#expense_amount').value;
    let expenseDate = document.querySelector('#expense_date').value;
    let expenseTime = document.querySelector('#expense_time').value;
    let expenseCategory = document.querySelector('#expense_category').value;

    let response = insertData(expenseName,expenseType,expenseAmount,expenseDate,expenseTime,expenseCategory);
    if(response){
        //close the modal
        //display success message
        $('#exampleModal').modal('hide');

        let message = document.querySelector('#message')
            message.innerHTML='<p style="padding: 10px;background-color: green;color: white;">Expense Added Successfully</p>'
    }else{
        //display error message in the modal itself
    }
})

function insertData(name,type,amount,date,time,category){


    firebase.database().ref('users/' + user_id).push({
        name:name,
        type:type,
        amount:amount,
        date:date,
        time:time,
        category:category
    },function (error){
        return 0;
    });
    return 1;
}