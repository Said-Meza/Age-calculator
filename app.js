
const d= document,
$form=d.querySelector(".form__date");
$formlabelnumber=d.querySelectorAll(".date_input[required]"),
   date= new Date();

// console.log($formlabelnumber)

$formlabelnumber.forEach(el => {

  const $label= d.createElement("label");
  $label.id=el.name;
  $label.textContent=`please, put a num`;
  $label.classList.add("error");
  el.insertAdjacentElement("afterend",$label);

});

function validnumber(input){            
  d.getElementById(input).style.display="block"
}
function novalidnumber(input){
  d.getElementById(input).style.display="none";
} 
function validday(input){
  if ( input > 0 && input <= 31){
    d.getElementById("spanday").classList.add("error")
  } else{
    d.getElementById("spanday").classList.remove("error")
  }
}
function validmonth(input){
  if ( input > 0 && input <= 12){
    d.getElementById("spanmonth").classList.add("error")
  } else{
    d.getElementById("spanmonth").classList.remove("error")
  }
}
function validyear(input,currentyear){
    
  if ( input > 1700 && input <= currentyear.getFullYear()){
    d.getElementById("spanyear").classList.add("error")
  } else{
    d.getElementById("spanyear").classList.remove("error")
  }
}
function validinputs(input__name,input__value, currentyear){
  
  if(input__name==="dayinput")
  {
    validday(input__value); 

  }
  else if(input__name==="monthinput")
  {
    validmonth(input__value);  
  }
  else
  {
    validyear(input__value,currentyear)
  }
} 


// console.log(d.querySelector(".error"))

d.addEventListener("keyup",e=>{

  if(e.target.matches(".date_input[required]")){
    

    let $input=e.target,
        pattern=$input.pattern || $input.dataset.pattern;
            // console.log($input.name,pattern)
            // console.log(d.getElementById($input.id))


        if (pattern && $input.value!=="") {
          //  console.log("el input tiene patron");
          //  console.log($input.value,$input.name);
          //  console.log(typeof $input.name );

            validinputs($input.name,$input.value,date);

            let regex = new RegExp(pattern);
            return !regex.exec($input.value) ?
             validnumber($input.name) 
             :novalidnumber($input.name);
        }
        if(!pattern){
            console.log("no tiene patron")
            return $input.value===""
            ?d.getElementById($input.name).style.display="block"
            :d.getElementById($input.name).style.display="none";
        }
  }
})

d.addEventListener("submit",(e)=>{

    e.preventDefault();

    // console.log(e.target)

    if(e.target.matches(".form__date"))
    {

      //pequeña validacion por si esta vacia la variable de formlabelinputs
      if (!$formlabelnumber) alert("algo esta mal");
      
      
      console.log(`${$formlabelnumber}`)

      $formlabelnumber.forEach(el=>{
    
        console.log(el)
        console.log(el.value,el.name,el.id)
        // console.log()
        // console.log()
        if(el.value==="" || el.value==="0" || el.value===0)
        {
          validinputs(el.name,el.value,date);
        //  d.getElementById(el.name).textContent=""
        
        //   console.log(`el input year es cero 0000`)
        
        }
        else
        {
          
          validinputs(el.name,el.value,date);
          
        }
       
        
      
    
      })
      
    }

});