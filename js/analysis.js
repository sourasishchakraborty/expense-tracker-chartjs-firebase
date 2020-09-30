let user_id = localStorage.getItem('userId');
let ref = firebase.database().ref('/users/' + user_id);



ref.on('value',function (snapshot) {
    let data = snapshot.val();

    category_list = [];
    amount = [];
    let income = 0;
    let expense = 0;


    for (let id in data) {


        if (category_list.includes(data[id].category)) {

            console.log(data[id].category);
            let index = category_list.indexOf(data[id].category);
            amount[index] += Number(data[id].amount);
            console.log(index);

        } else {
            category_list.push(data[id].category);
            amount.push(Number(data[id].amount));
        }

        if (data[id].type === 'credit') {
            income += Number(data[id].amount);
        } else {
            expense += Number(data[id].amount);
        }


    }

    let mychart = document.querySelector('#bar_graph').getContext('2d');

    let expenseChart = new Chart(mychart, {
        type: 'bar',
        data: {
            labels: category_list,
            datasets: [{
                label: 'Category wise Expense',
                data: amount,
                backgroundColor: ['#8623dd','#f5ff39']
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })

});