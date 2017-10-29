
//EMP JSON COLLECTION
var empTable = document.getElementById("empTable");

var totalColumns = Object.keys(emp-user[0]).length;
var columnNames = [];
columnNames = Object.keys(emp-user[0]);

var extHttp = new XMLHttpRequest();
extHttp.onreadystatechange = function() {  
       if (this.readyState == 4 && this.status == 200) {    
             var restHttp = JSON.parse(this.responseText), allpets = restHttp.groupPets, 
              htmlElm = "";    
             for (var i = 0; i < emp-user.length; i++) {
                    var row = empTable.insertRow(-1); 
                    columnNames.forEach(function(){
                        var cell = row.insertCell(-1);
                        cell.innerHTML = emp-user[i][columnName];
                    });                        
              }                 
      }
};
extHttp.error("Connection Failed");
extHttp.open("GET", "emp-record.json", true);
extHttp.send();


//CRUD ACTIONS
let addRow, saveItem, viewRow, updateRow, deleteRow, closeModal, modal;
addRow = document.getElementById('addItem');
modal = document.getElementById("modal");
saveItem = document.getElementById('saveItem');

closeModal = document.querySelectorAll('.closeDialog');
addRow.addEventListener('click',()=>{
    modal.classList.remove("off");
    
})
for (let i = 0; i < closeModal.length; i ++) {    
    closeModal[i].addEventListener('click',()=>{
        modal.classList.add("off");;
    });
}

saveItem.addEventListener('click',()=>{
    let firstname = document.getElementById('firstname').value, 
        lastname = document.getElementById('lastname').value 
        gender = document.getElementById('gender').value, 
        email = document.getElementById('email').value, 
        phone = document.getElementById('phone').value, 
        status = document.getElementById('emp-state').value,
        tblemp = document.getElementById('empTable');
});
