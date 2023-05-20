//function to get the user current longitude and latitude
(function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        console.log("Not supported");
    }
})();
var long;var lat;
function showPosition(position){
    long=position.coords.longitude;
    lat=position.coords.latitude;
    //console.log(long);
    //console.log(lat);
    getUserData(lat,long);
}

async function getUserData(lat,long){
    let url=`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=b2544361742f483da8d082f308d18e5e`;
    let response = await fetch(url);
    let location=await response.json();
   // console.log(location);
    renderResultOnDom(location);
}
const container1=document.getElementById("self-container");

function renderResultOnDom(location){
    if(location.results){
        let result=location.results[0];
        //console.log(result);
        container1.innerHTML="";
        //1st element
       let p1=document.createElement("p");
       p1.innerText= 'Name of Time Zone : '+ `${result.timezone.name}`;
       container1.appendChild(p1);
        //2nd element
       let div1=document.createElement("div");
       div1.className="lat";
       let span1=document.createElement("span");
       span1.innerText= 'Lat : '+ `${result.lat}`;
       div1.appendChild(span1);
       let span2=document.createElement("span");
       span2.innerText= 'Long : '+ `${result.lon}`;
       div1.appendChild(span2);
       container1.appendChild(div1);
        //3rd Element
       let p3=document.createElement("p");
       p3.innerText= 'Offset STD : '+ `${result.timezone.offset_STD}`;
       container1.appendChild(p3);
        //4th Element
       let p4=document.createElement("p");
       p4.innerText= 'Offset STD Seconds : '+ `${result.timezone.offset_STD_seconds}`;
       container1.appendChild(p4);
        //5th Element
        let p5=document.createElement("p");
        p5.innerText= 'Offset DST : '+ `${result.timezone.offset_DST}`;
        container1.appendChild(p5);
         //6th Element
        let p6=document.createElement("p");
        p6.innerText= 'Offset DST Seconds : '+ `${result.timezone.offset_DST_seconds}`;
        container1.appendChild(p6);
         //7rd Element
       let p7=document.createElement("p");
       p7.innerText= 'Country : '+ `${result.country}`;
       container1.appendChild(p7);
        //8th Element
       let p8=document.createElement("p");
       p8.innerText= 'Postcode : '+ `${result.postcode}`;
       container1.appendChild(p8);
        //9th Element
        let p9=document.createElement("p");
        p9.innerText= 'City : '+ `${result.city}`;
        container1.appendChild(p9);
    }else{
        console.log("No location found");
    } 
}

const button=document.getElementById("btn");
button.addEventListener("click",function(){
    getUserByAddress();
});

async function getUserByAddress(){
    const inp=document.getElementById("input");
    let val=inp.value;
   // console.log(val);

    const str=await convertInputValueToString(val);
    //let url=`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(val)}&apiKey=b2544361742f483da8d082f308d18e5e`
   
    let url=`https://api.geoapify.com/v1/geocode/search?text=${str}&format=json&apiKey=b2544361742f483da8d082f308d18e5e`;
    let response = await fetch(url);
    let location=await response.json();
    console.log(location);
    errorP.style.display="none";
    renderResultOn2ndDom(location);
    inp.value="";
}
async function convertInputValueToString(val){
    let str="";
    const arr=val.split(",");
    let count=arr.length;
    if(arr.length>0){
        arr.forEach(element => {
            count--;
            const nxtArr=element.split(" ");
            nxtArr.forEach(item => {
                if(str.length==0 && item.length>0){
                    str=str+item;
                }else if(item.length>0){
                str=str+"%20"+item; 
                }
            });
            if(count>1){
                str=str+"%2C";
            }
        });
    }
    return str;
}


const displayContainer=document.getElementById("inner-container");
const container2=document.getElementById("result-container");
const errorP=document.getElementById("errorP");

function renderResultOn2ndDom(location){
    if(location.results.length>0){
        let result=location.results[0];
        displayContainer.style.visibility='visible';
        //console.log(result);
        container2.innerHTML="";
        //1st element
       let p1=document.createElement("p");
       p1.innerText= 'Name of Time Zone : '+ `${result.timezone.name}`;
       container2.appendChild(p1);
        //2nd element
       let div1=document.createElement("div");
       div1.className="lat";
       let span1=document.createElement("span");
       span1.innerText= 'Lat : '+ `${result.lat}`;
       div1.appendChild(span1);
       let span2=document.createElement("span");
       span2.innerText= 'Long : '+ `${result.lon}`;
       div1.appendChild(span2);
       container2.appendChild(div1);
        //3rd Element
       let p3=document.createElement("p");
       p3.innerText= 'Offset STD : '+ `${result.timezone.offset_STD}`;
       container2.appendChild(p3);
        //4th Element
       let p4=document.createElement("p");
       p4.innerText= 'Offset STD Seconds : '+ `${result.timezone.offset_STD_seconds}`;
       container2.appendChild(p4);
        //5th Element
        let p5=document.createElement("p");
        p5.innerText= 'Offset DST : '+ `${result.timezone.offset_DST}`;
        container2.appendChild(p5);
         //6th Element
        let p6=document.createElement("p");
        p6.innerText= 'Offset DST Seconds : '+ `${result.timezone.offset_DST_seconds}`;
        container2.appendChild(p6);
         //7rd Element
       let p7=document.createElement("p");
       p7.innerText= 'Country : '+ `${result.country}`;
       container2.appendChild(p7);
        //8th Element
       let p8=document.createElement("p");
       p8.innerText= 'Postcode : '+ `${result.postcode}`;
       container2.appendChild(p8);
        //9th Element
        let p9=document.createElement("p");
        p9.innerText= 'City : '+ `${result.city}`;
        container2.appendChild(p9);
    }else{
        console.log("location not found");
        errorP.style.display="block";
    } 
}

