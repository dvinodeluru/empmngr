"use strict";
// Intiate JSON DATA
function jsonInit(){
    let extHttp = new XMLHttpRequest();
    extHttp.onreadystatechange = function() {  
           if (this.readyState == 4 && this.status == 200) {    
                 let restHttp = JSON.parse(this.responseText), $empuser = restHttp.empuser, 
                  htmlElm = "";    
                  htmlElm += "<thead><tr><th>First Name</th><th>Last Name</th><th>Gender</th><th>Email</th><th>Phone</th><th>State</th><th>Actions</th></tr></thead>";
                  htmlElm += "<tbody>";
                 for (let i = 0; i < $empuser.length; i++) {
                     if($empuser[i].state == "Active"){
                        htmlElm += "<tr><td>" + $empuser[i].firstname + "</td><td>" + $empuser[i].lastname + "</td><td>"+ $empuser[i].gender + " </td><td>"+ $empuser[i].email + " </td><td>"+ $empuser[i].phone + " </td><td>"+ $empuser[i].state + "</td><td><div class='action-tool'><button class='btn btn-none viewItem'><i class='fa fa-file-o'></i></button><button class='btn btn-none updateItem'><i class='fa fa-pencil'></i></button><button class='btn btn-none deleteItem'><i class='fa fa-close'></i></button></div></td></tr>";     
                    }else{
                        htmlElm += "<tr class='inactive'><td>" + $empuser[i].firstname + "</td><td>" + $empuser[i].lastname + "</td><td>"+ $empuser[i].gender + " </td><td>"+ $empuser[i].email + " </td><td>"+ $empuser[i].phone + " </td><td>"+ $empuser[i].state + "</td><td><div class='action-tool'><button class='btn btn-none viewItem'><i class='fa fa-file-o'></i></button><button class='btn btn-none updateItem'><i class='fa fa-pencil'></i></button><button class='btn btn-none deleteItem'><i class='fa fa-close'></i></button></div></td></tr>";     
                    }
                }   
                  htmlElm += "</tbody>";
                  document.getElementById('empTable').innerHTML = htmlElm;                   
          }else{
            document.getElementById('empTable').innerHTML = "No Records Found";  
          }
    };
    extHttp.open("GET", "json/emp-record.json", true);
    extHttp.send();
}jsonInit();

//CRUD ACTIONS
let addRow, saveItem, viewRow, updateRow, deleteRow, closeModal, modal;
addRow = document.getElementById('addItem');
modal = document.getElementById("modal");
saveItem = document.getElementById('saveItem');

//MODAL Dialog Actions
addRow.addEventListener('click',()=>{
    modal.classList.remove("off");    
});

closeModal = document.querySelectorAll('.closeDialog');
for (let i = 0; i < closeModal.length; i ++) {    
    closeModal[i].addEventListener('click',()=>{
        modal.classList.add("off");
    });
}

var operation = "A"; //"A"=Adding; "E"=Editing
var selected_index = -1; //Index of the selected list item
var empresource = localStorage.getItem("empresource");//Retrieve the stored data
empresource = JSON.parse(empresource); //Converts string to object
if(empresource == null) //If there is no data, initialize an empty array
    empresource = [];

// SAVE TO JSON
saveItem.addEventListener('click',()=>{
    let empItem = JSON.stringify({
        FirstName : document.getElementById('firstname').value, 
        LastName : document.getElementById('lastname').value,
        Gender : document.getElementById('gender').value, 
        Email : document.getElementById('email').value, 
        Phone : document.getElementById('phone').value, 
        Status : document.getElementById('emp-state').value
        
    });
    empresource.push(client);
	localStorage.setItem("json/emp-record.json", JSON.stringify(empresource));
	console.log("The data was saved.");	
    modal.classList.add("off");
    return true;      
});
// UPDATE/EDIT TABLE ROW.
updateRow = document.querySelectorAll('.updateItem');
for (let i = 0; i < updateRow.length; i ++){   
    updateRow[i].addEventListener('click',(e)=>{
        console.log('Update button');
        /*modal.classList.remove("off");  
        operation = "E";
        selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
        var cli = JSON.parse(tbClients[selected_index]);
        document.getElementById('firstname').value = cli.firstname,
        document.getElementById('lastname').value = cli.lastname,
        document.getElementById('gender').value = cli.gender, 
        document.getElementById('email').value = cli.email, 
        document.getElementById('phone').value = cli.phone, 
        document.getElementById('emp-state').value = cli.state  */       
    });
}
// VIEW TABLE ROW.asf
viewRow = document.querySelectorAll('.viewItem');
for (let i = 0; i < viewRow.length; i ++){
    viewRow[i].addEventListener('click', ()=>{
        console.log('View Record');
    });
}
// DELETE TABLE ROW.
deleteRow = document.querySelectorAll('.deleteItem');
for (let i = 0; i < deleteRow.length; i ++){
    deleteRow[i].addEventListener('click',()=> {
        console.log('Delete Record');
    });
}