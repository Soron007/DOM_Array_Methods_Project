const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionares');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


getRandomUser();
getRandomUser();
getRandomUser();

let data = [];

// fetch random user and add money

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');

    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),

    };

    addData(newUser);

}

//double money (map)

function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    })

    updateDOM();
}

//filter only millionaires

function showMillionaires() {
    data = data.filter((user) => user.money > 1000000);

    updateDOM();
}

//sort by richest

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

//Calculate total wealth

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc = acc + user.money), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(wealth)}</strong></h3>`;

    main.appendChild(wealthElement);


}

//add new object to data array

function addData(obj) {
    data.push(obj);

    updateDOM();
}


//Update DOM

function updateDOM(providedData = data) {
    //clear main div (line 48 only)

    main.innerHTML = '<h2><Strong>Person</Strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });

}

// format number as money 

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event listener 

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);
