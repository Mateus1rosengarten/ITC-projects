let fibo = document.getElementById("xelement");
let fiboOf = document.getElementById("yelement");
let button = document.getElementById("button1");
let checkBox = document.getElementById("myCheckbox")
const myLoader = document.getElementById("loader");
const my2Loader = document.getElementById("loader2");
const messageErrorBigger50 = document.getElementById("message-error");
const ulPlace = document.getElementById("calculations-results");



button.addEventListener('click', checkingCheckBox);
checkBox.addEventListener('change', checkingCheckBox);

window.onload = () => {
  getCalculationList('http://localhost:5050/getFibonacciResults');
}



function checkingCheckBox() {
  if (checkBox.checked == true) {
    fiboByServer();
  }

  else {
    fiboByFunction();
  }
}



function fibonacciCalculator(number) {
  let sum = 0;
  let previous = 0;
  let next = 1;
  for (let i = 0; i < number; i++) {
    sum = previous + next;
    previous = next;
    next = sum;

  }
  return previous;
}


function fiboByFunction() {
  let fiboValue = document.getElementById("xelement").value;
  if (fiboValue < 0) {
    fiboOf.innerHTML = 'Server error: please insert a positive number ';
    fiboOf.setAttribute("style", "color:#D9534F; font-size:16px; text-decoration:none; font-weight:400; top:163px;")
  }
  else if (fiboValue == "") {
    fiboOf.innerHTML = '';

  }
  else {
    fibonacciCalculator()
    stylizingBackFiboOf()
    fiboOf.innerHTML = fibonacciCalculator(fibo.value);
  }
}


function fiboByServer(event) {
  let fiboValue = document.getElementById("xelement").value;
  if (fiboValue == "") {
    fiboOf.innerHTML = '';



  }
  else if (fiboValue > 50) {

    dontGetData();
    makingCheckBoxDisapear();
    setTimeout(() => {
      location.reload()
    }, "3000")
  }
  else {
    messageErrorBigger50.style.display = "none";
    getData(`http://localhost:5050/fibonacci/${fiboValue}`);
  }
}



function getData(url) {
  showLoader();
  fetch(url)
    .then((resp) => {
      if (resp.status !== 200) {
        resp.text().then((result) => {
          hideLoader();
          ShowErrorInput42();

          fiboOf.innerHTML = `Server error: ${result}`;
        }
        )
      }
      else {
        resp.json().then((result) => {

          hideLoader();
          stylizingBackFiboOf();


          let returned = result.result;
          fiboOf.innerHTML = returned;

          showResultLoader();
          setTimeout(() => {
            hideResultLoader()
            location.reload()
          }, "2500")

        })
      }
    })
}



function dontGetData() {
  messageErrorBigger50.style.display = "block";
  messageErrorBigger50.classList.add("input-error");
  fibo.style.color = "#D9534F";
  fibo.style.border = "solid #D9534F";
  fiboOf.innerText = " ";
}

function showLoader() {
  myLoader.style.display = "block";
  fiboOf.innerText = " ";
}

function hideLoader() {
  myLoader.style.display = "none";
}

function showResultLoader() {
  my2Loader.style.display = "block";
  ulPlace.setAttribute("style", "display:none;");
}

function hideResultLoader() {
  my2Loader.style.display = "none";
}


function ShowErrorInput42() {

  fiboOf.classList.add("msgErrorfor42")
  fiboOf.setAttribute("style", "font-size: 16px; font-weight: 400; text-decoration: none; top: 163px");
  fibo.style.color = "black";
  fibo.style.border = "1px solid silver";
}



function stylizingBackFiboOf() {

  fiboOf.setAttribute("style", "color: black; top: 160px; line-height:normal;");
  fibo.style.color = "black";
  fibo.style.border = "1px solid silver";
}

function makingCheckBoxDisapear() {

  let checkBoxText = document.getElementById("checktext")
  checkBox.style.display = "none";
  checkBoxText.style.display = "none";
}


function getCalculationList(url) {

  fetch(url)
    .then((resp) => {
      resp.json()
        .then((result) => {
          for (let i in result.results) {
            const object = result.results[i];
            printOnScreen(ulPlace, object)
          }
        })
    })
}




function printOnScreen(container, objectData) {

  const timeNow = new Date(objectData.createdDate);
  var myTime = timeNow.toString();

  const myList = document.createElement("li")
  const myHr = document.createElement("hr")
  ulPlace.appendChild(myList);
  ulPlace.appendChild(myHr);
  myList.classList.add("stylingResultsList");
  myHr.classList.add("stylingMyHr");
  myList.innerHTML += `The Fibonnaci Of <strong>${objectData.number}</strong> is <strong>${objectData.result}</strong>. Calculated at: ${myTime}`;
}
