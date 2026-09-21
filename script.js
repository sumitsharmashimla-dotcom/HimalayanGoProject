const hotels=[
['🏔️','Snow Valley Retreat','Shimla','₹3,499 / night','4.7'],
['🌲','Pine Crest Suites','Kufri','₹4,299 / night','4.6'],
['🏡','Mountain View Stay','Fagu','₹2,799 / night','4.5']
];
document.getElementById('date').valueAsDate=new Date();
function render(){document.getElementById('hotelCards').innerHTML=hotels.map(h=>`<article class="card"><div class="pic">${h[0]}</div><div class="cardbody"><div class="rating">★ ${h[4]} • ${h[2]}</div><h3>${h[1]}</h3><small>Mountain view • Wi‑Fi • Breakfast</small><div class="price">${h[3]}</div><button class="primary" onclick="book('${h[1]}')">View & book</button></div></article>`).join('')}
function book(n){alert(`Demo booking selected: ${n}\n\nLive booking will work after connecting a hotel partner/API.`)}
function openPay(t){document.getElementById('modalTitle').textContent=t;document.getElementById('modal').style.display='flex'}
function closePay(){document.getElementById('modal').style.display='none'}
function demoPay(){alert('Demo only: payment gateway/API is not connected yet.')}
document.getElementById('searchBtn').onclick=()=>{document.getElementById('hotels').scrollIntoView({behavior:'smooth'});render()}
document.getElementById('loginBtn').onclick=()=>alert('Login module ready for backend integration.');
render();
