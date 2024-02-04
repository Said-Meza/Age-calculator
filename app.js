
const d= document,
$form=d.querySelector(".form__date");
$formlabelnumber=d.querySelectorAll(".date_input[required]"),
   date= new Date(),
$years=d.getElementById("resultyear");
$months=d.getElementById("resultmonth");
$days=d.getElementById("resultdays");

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
function cal_age({day, month ,year}){

  const cumple = new Date(`${month} ${day} ${year}`), // Ajusta el formato de la fecha para que sea MM DD YYYY
          now = new Date(),
          diferenciaEnMilisegundos = now - cumple,
          duracion = new Date(diferenciaEnMilisegundos),
          years = duracion.getUTCFullYear() - 1970,
          months = duracion.getUTCMonth(),
           days = duracion.getUTCDate() - 1;

    // console.log(`cumpleaños: ${cumple}`)
    // console.log(`fechaactual: ${now}`)

    // Calcula la diferencia en milisegundos
     
    // console.log(`diferencia : ${diferenciaEnMilisegundos}`)

    // Convierte la diferencia a un objeto de duración para facilitar los cálculos
     
    // console.log(`conversion a objeto(duracion) : ${diferenciaEnMilisegundos}`)

    // Extrae los componentes individuales de la duración
    // console.log(`años sin restar : ${duracion.getUTCFullYear()}`)

      // Resta 1970 porque getUTCFullYear devuelve el año completo
    // console.log(`años : ${años}`)

    
    // console.log(`meses : ${meses}`)
     // Resta 1 porque getUTCDate devuelve el día del mes (1-31)
    // console.log(`dias : ${dias}`)
    // const horas = duracion.getUTCHours();
    // const minutos = duracion.getUTCMinutes();
    // const segundos = duracion.getUTCSeconds();

    // console.log(`Diferencia: ${años} años, ${meses} meses, ${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos.`);
   
    console.log(`Diferencia: ${years} años, ${months} meses, ${days} días`);

  $years.textContent=`${years}`;
  $months.textContent=`${months}`;
  $days.textContent=`${days}`;
}

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

    if(e.target.matches(".form__date"))
    {

      //pequeña validacion por si esta vacia la variable de formlabelinputs
      if (!$formlabelnumber) alert("algo esta mal");
           

      $formlabelnumber.forEach(el=>{
    
       
        if(el.value==="" || el.value==="0" || el.value===0)
        {
          validinputs(el.name,el.value,date);
        
        }

      })

      let day=$formlabelnumber[0].value,
        month=$formlabelnumber[1].value,
        year=$formlabelnumber[2].value;

       
        cal_age({day,month,year});
    
      
    }
    $form.reset()

});