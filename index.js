

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js"
import { getDatabase, 
         ref, 
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js"

const firebaseConfig = {
    databaseURL : "https://leads-tracker-app-ed3a7-default-rtdb.firebaseio.com/"
    
}


const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads2")





const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")






function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot){
    if(snapshot.exists()){

        // storing the key/values from the database into the variable becomes an object
        const snapshotvalues = snapshot.val() 

        //storing only the values from th keys as an array into the variable
        const leads = Object.values(snapshotvalues)
        render(leads)
       
    }
})


deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
   
})

inputBtn.addEventListener("click", function() {
    let newValue = "http://" + inputEl.value
    push(referenceInDB, newValue)
    inputEl.value = ""
    
})