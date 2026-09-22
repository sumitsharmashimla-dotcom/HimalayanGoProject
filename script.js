const hotels = [
    ['Snow Valley Resort', 'Shimla', '₹3,499 / night', '4.7'],
    ['Pine Crest Suites', 'Kufri', '₹4,299 / night', '4.6'],
    ['Mountain View Stay', 'Fagu', '₹2,799 / night', '4.5']
];

document.getElementById('date').valueAsDate = new Date();

function render() {
    document.getElementById('hotelCards').innerHTML = hotels.map(h => `
        <article class="card">
            <div class="pic">${h[0]}</div>
            <h3>${h[0]}</h3>
            <p>${h[1]} • ${h[2]} • ⭐ ${h[3]}</p>
            <button onclick="book('${h[0]}')">Book Now</button>
        </article>
    `).join('');
}

function openPay(serviceName) {
    document.getElementById('modalTitle').textContent = "Pay for: " + serviceName;
    document.getElementById('modal').style.display = 'flex';
}

function closePay() {
    document.getElementById('modal').style.display = 'none';
}

async function submitService() {
    const target = document.getElementById('targetInput').value;
    const amount = document.getElementById('amount').value;
    const provider_id = document.getElementById('provider_id').value;
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerText = "Processing...";

    const BACKEND_URL = 'https://himalayangoproject-production.up.railway.app';

    try {
        const response = await fetch(BACKEND_URL + '/api/recharge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: target, amount: amount, provider_id: provider_id })
        });

        const data = await response.json();
        resultDiv.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        resultDiv.innerText = "Error: Backend server se connect nahi ho paya.";
    }
}

document.getElementById('searchBtn').onclick = () => document.getElementById('hotels').scrollIntoView({behavior: 'smooth'});
render();
