"use strict";

/*Variabler*/
let toDoEl = document.getElementById("newtodo");
let toDoBtnEl = document.getElementById("newtodobutton");
let clearbtnEl = document.getElementById("clearbutton");
let messageEl = document.getElementById("message");
let sectionEl = document.getElementById("todolist");

/*Eventlisteners*/

toDoEl.addEventListener("keydown", checkItemText, false);
toDoBtnEl.addEventListener("click", addItem, false);
clearbtnEl.addEventListener("click", clearStorage, false);

window.onload = loadStorage, init;

/*omladdning/onload */

function init() {
    toDoBtnEl.disabled = true;  //Inaktiver knappen från start
}

/*Kontrollera textlängd*/

function checkItemText() {

    let checkText = toDoEl.value;

    if (checkText.length < 4) {
        messageEl.innerHTML = "Ange minst 5 tecken";
        toDoBtnEl.disabled = true;                      //Knappen ska bara fungera om texten är 5 tecken eller mer

    } else {
        messageEl.innerHTML = "";
        toDoBtnEl.disabled = false;
    }
}

/*Lägg till i listan och skapa en ny section för varje text och lagra i storage */

function addItem() {
    let inputToDoEl = toDoEl.value;

    //Kontroll om input är tomt
    if (inputToDoEl != "") {

        //Skapa ny section
        let newSectionEL = document.createElement("section");      //Variabel med nyskapat element, section
        newSectionEL.textContent = inputToDoEl;                 //Lägg till texten från input-texten i det nya elementet
        sectionEl.appendChild(newSectionEL);                    //Lägg till till sectionen till sectionEl (todolilstan)    

        //Leta rätt på parent och lägg till i DOM

        let myEl = document.getElementById("todolist");
        myEl.appendChild(newSectionEL);

        //Händelsehanterar som tar bort texten, både från skärmen och i storage, vid klick
        newSectionEL.addEventListener("click", function (e) {
            e.target.remove();
            storeItem();

        });

        storeItem();
    }
}

/*Spara i storage*/
function storeItem() {

    let inputItemEl = document.querySelectorAll("#todolist section");  //Hämta texten från to-do listan
    let toDoArr = [];                                                  //Skapa en array

    for (let i = 0; i < inputItemEl.length; i++) {          //Loopar genom arrayen
        toDoArr.push(inputItemEl[i].innerHTML);
    }

    //Konverterar till JSON-sträng och lagra till storage

    let jsonStr = JSON.stringify(toDoArr);

    try {
        localStorage.setItem("sectionData", jsonStr);
        toDoEl.value = "";                                  //Töm input efter varje lyckad lagring
    } catch (error) {                                       //Ommlagringen misslyckas skrivs ett error-meddelande ut                
        alert("Lagringen misslyckades" + error.message);
    }

}


/*Läs in från web-storage, skapa en array från JSON, tom om det inte finns något innehåll.*/
function loadStorage() {
    let storedData = JSON.parse(localStorage.getItem("sectionData") ?? "[]");

    for (let i = 0; i < storedData.length; i++) {                   //Loopa igenom arrayen
        let newSectionEL = document.createElement("section");
        let newText = document.createTextNode(storedData[i]);
        newSectionEL.appendChild(newText);

        sectionEl.appendChild(newSectionEL);     //Lägger till i todo-listan

        //Händelsehanterar som tar bort texten vid klick och sparar ändringen
        newSectionEL.addEventListener("click", function (e) {
            e.target.remove();

            storeItem();
        });
    }
}

//Radera från listan och storage genom rensa-knappen
function clearStorage() {
    localStorage.clear();
    sectionEl.innerHTML = "";
}
