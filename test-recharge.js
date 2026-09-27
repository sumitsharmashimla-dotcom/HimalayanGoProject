async function testRecharge(){
  const response=await fetch("http://localhost:3000/api/recharge",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({number:"9876543210",amount:10,provider_id:1})
  });
  console.log(await response.json());
}
testRecharge();