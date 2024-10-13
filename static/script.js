const processorInput = document.getElementById('processorInput');
const ramInput = document.getElementById('ramInput');
const storageInput = document.getElementById('storageInput');
const priceInput = document.getElementById('priceInput');
const batteryInput = document.getElementById('batteryInput');
const displayInput = document.getElementById('displayInput');
const nameInput = document.getElementById('nameInput');
const weightInput = document.getElementById('weightInput');

const form = document.querySelector('form');
const stack = document.querySelector('.stack_container');

const charts = {};

const req = await fetch('/api/data');
const database = await req.json();

const chartsConfig = [
    { elementId: 'displayCanvas', label: 'Display (Inches)', dataKey: 'displayInInches', color: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' },
    { elementId: 'ramCanvas', label: 'RAM (GB)', dataKey: 'ramInGB', color: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' },
    { elementId: 'priceCanvas', label: 'Price (Rúpia)', dataKey: 'price', color: 'rgba(192, 75, 192, 0.2)', borderColor: 'rgba(192, 75, 192, 1)' },
    { elementId: 'storageCanvas', label: 'Storage (GB)', dataKey: 'storageInGB', color: 'rgba(75, 75, 192, 0.2)', borderColor: 'rgba(75, 75, 192, 1)' },
    { elementId: 'processorCanvas', label: 'Processor Speed (GHz)', dataKey: 'processor', color: 'rgba(192, 192, 75, 0.2)', borderColor: 'rgba(192, 192, 75, 1)' },
    { elementId: 'batteryCanvas', label: 'Battery (Hours)', dataKey: 'batteryInHours', color: 'rgba(192, 192, 75, 0.2)', borderColor: 'rgba(192, 192, 75, 1)' },
    { elementId: 'weightCanvas', label: 'Weight (KG)', dataKey: 'weightInKg', color: 'rgba(192, 192, 75, 0.2)', borderColor: 'rgba(192, 192, 75, 1)' },
];

chartsConfig.forEach(({ elementId, label, dataKey, color, borderColor }) => {
    const ctx = document.getElementById(elementId).getContext('2d');
    const dataValues = database.map(item => item[dataKey]);

    charts[elementId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: database.map(item => item.name),
            datasets: [{
                label,
                data: dataValues,
                backgroundColor: color,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: { scales: { y: { beginAtZero: true } } }
    });
});

const postData = () => fetch('/api/data/update', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(database)
});

const updateChart = ({ elementId, dataKey }) => {
    const chart = charts[elementId];
    const dataValues = database.map(item => item[dataKey]);
    chart.data.labels = database.map(item => item.name);
    chart.data.datasets[0].data = dataValues;
    chart.update();
}

const appendToStack = (specs) => {
    const element = document.createElement('div');
    element.classList.add('element');

    const hamburger = document.createElement('div');
    hamburger.innerHTML = '<span></span>';
    element.appendChild(hamburger);

    const h2 = document.createElement('h2');
    h2.textContent = specs;
    element.appendChild(h2);

    const delBtn = document.createElement('button');
    delBtn.classList.add('remove');
    delBtn.type = 'button';
    delBtn.innerHTML = `<img src="static/remove.svg" alt="Remove" height="40px">`;
    element.appendChild(delBtn);

    delBtn.addEventListener('click', () => {
        const currentIndex = Array.from(stack.children).indexOf(element);
        database.splice(currentIndex, 1);
        element.remove();
        chartsConfig.forEach(config => updateChart(config));
        postData();
    });

    stack.appendChild(element);
}

const clearForm = () => {
    processorInput.value = '';
    ramInput.value = '';
    storageInput.value = '';
    priceInput.value = '';
    batteryInput.value = '';
    displayInput.value = '';
    nameInput.value = '';
    weightInput.value = '';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const computer = {
        name: nameInput.value,
        price: parseFloat(priceInput.value),
        processor: parseFloat(processorInput.value),
        ramInGB: parseFloat(ramInput.value),
        storageInGB: parseFloat(storageInput.value),
        displayInInches: parseFloat(displayInput.value),
        batteryInHours: parseFloat(batteryInput.value),
        weightInKg: parseFloat(weightInput.value)
    };

    database.push(computer);
    appendToStack(`${computer.name} | ${computer.ramInGB}GB RAM | ${computer.storageInGB}GB Storage | Rs. ${computer.price}`);

    chartsConfig.forEach(config => updateChart(config));
    clearForm();
    postData();    
});

database.forEach(computer => appendToStack(`${computer.name} | ${computer.ramInGB}GB RAM | ${computer.storageInGB}GB Storage | Rs. ${computer.price}`));

const elem = new Sortable(document.querySelector('.stack_container'), {
    handle: '.element > div:first-child',
    animation: 150,
    ghostClass: 'ghost',
});