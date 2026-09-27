require("dotenv").config();
const express=require("express");
const cors=require("cors");

const app=express();
const PORT=process.env.PORT||3000;
const PAY2ALL_TOKEN=process.env.PAY2ALL_TOKEN;

app.use(cors());
app.use(express.json());
app.use(express.static("."));

function requireToken(res){
  if(!PAY2ALL_TOKEN){res.status(500).json({success:false,error:"PAY2ALL_TOKEN is not configured on the server."});return false}
  return true;
}
async function pay2all(payload){
  const response=await fetch("https://pay2all.in/api/v1/recharge",{
    method:"POST",
    headers:{
      "Authorization":"Bearer "+PAY2ALL_TOKEN,
      "Accept":"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(payload)
  });
  const text=await response.text();
  let data; try{data=JSON.parse(text)}catch{data={raw:text}}
  return {status:response.status,ok:response.ok,data};
}

app.get("/api/health",(req,res)=>res.json({success:true,appName:"HimalayanGo",status:"online"}));

app.post("/api/recharge",async(req,res)=>{
  try{
    if(!requireToken(res))return;
    const {number,amount,provider_id}=req.body;
    if(!number||!amount||!provider_id)return res.status(400).json({success:false,error:"number, amount and provider_id are required"});
    const result=await pay2all({number:String(number),amount,provider_id,client_id:"HimalayanGo_Recharge_"+Date.now()});
    res.status(result.ok?200:502).json({success:result.ok,appName:"HimalayanGo",rechargeResponse:result.data});
  }catch(e){res.status(500).json({success:false,error:e.message})}
});

app.post("/api/utility",async(req,res)=>{
  try{
    if(!requireToken(res))return;
    const {consumer_number,amount,provider_id,customer_mobile}=req.body;
    if(!consumer_number||!amount||!provider_id||!customer_mobile)return res.status(400).json({success:false,error:"consumer_number, amount, provider_id and customer_mobile are required"});
    const result=await pay2all({number:String(customer_mobile),account:String(consumer_number),amount,provider_id,client_id:"HimalayanGo_Utility_"+Date.now()});
    res.status(result.ok?200:502).json({success:result.ok,appName:"HimalayanGo",utilityResponse:result.data});
  }catch(e){res.status(500).json({success:false,error:e.message})}
});

app.post("/api/travel",async(req,res)=>{
  try{
    if(!requireToken(res))return;
    const {destination,amount,booking_type}=req.body;
    if(!destination||!amount||!booking_type)return res.status(400).json({success:false,error:"destination, amount and booking_type are required"});
    // This preserves your existing Pay2All-style route. A genuine travel API should replace this call.
    const result=await pay2all({number:process.env.TRAVEL_CUSTOMER_MOBILE||"",amount,provider_id:booking_type,client_id:"HimalayanGo_Travel_"+Date.now(),destination});
    res.status(result.ok?200:502).json({success:result.ok,appName:"HimalayanGo",travelResponse:result.data});
  }catch(e){res.status(500).json({success:false,error:e.message})}
});

app.listen(PORT,()=>console.log(`HimalayanGo backend running on ${PORT}`));