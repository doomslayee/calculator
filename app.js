let btns=document.querySelectorAll(".box");
let n=""; 
let symbols=["+","-","*","/"];
let commands=["CE","DEL"];
let computeStack=[];
let refreshDisp=true;
let res=null;
let prevNumber=null;
function operate(){
    res=(computeStack.pop());
    res=res.includes(".")?parseFloat(res):parseInt(res);
    let symbol=computeStack.pop();
    let number=computeStack.pop();
    number=number.includes(".")?parseFloat(number):parseInt(number);
    if (symbol =="+")
        res=res+number;
    if(symbol=="-")
        res=number-res;
    if(symbol=="*")
        res=res*number;
    if(symbol=="/")
        res=number/res;
    console.log(res);
    computeStack.push(res.toString());
}

function displayRes(){
    var disp=document.querySelector(".disp");
    disp.textContent=res.toString();
    prevNumber=res.toString();
}
function resetDisp(){
    var disp=document.querySelector(".disp");
    disp.textContent="0";
    for(let i=0;i<computeStack.length;i++)
        computeStack.pop();
}
function addElement(ip){
    if(ip=="."){
        if( computeStack.length!=0 && 
            !symbols.includes(computeStack[computeStack.length-1]) &&
            !computeStack[computeStack.length-1].includes(".") 
        )
        {
            dispValue=computeStack.pop()+ip;
            computeStack.push(dispValue);
            var disp=document.querySelector(".disp");
            disp.textContent=dispValue;
            prevNumber=dispValue;
        }
    }
    else if (ip=="CE"){
        resetDisp();
    }
    else if(ip=="="){
        if(computeStack.length>2){
        operate();
        displayRes();
        }
    }
    else if (symbols.includes(ip)){

        if(computeStack.length>2)
        {
            operate();
            displayRes();
        }
        if (symbols.includes(computeStack[computeStack.length-1])){
            computeStack.push(prevNumber);
            operate();
            displayRes();
        }
       computeStack.push(ip);

    }
    else if(commands.includes(ip))
    {
        console.log("command detected");
    }
    else{
            let dispValue=null;
            if(computeStack.length==0 || symbols.includes(computeStack[computeStack.length-1])){
                computeStack.push(ip);
                dispValue=ip;
            }
            else{
                dispValue=computeStack.pop()+ip;
                computeStack.push(dispValue);
            }
            var disp=document.querySelector(".disp");
            disp.textContent=dispValue;
            prevNumber=dispValue;
    }
}
btns.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        addElement(btn.textContent);
    })
})