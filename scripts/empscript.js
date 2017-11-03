//set service
let extHttp = new XMLHttpRequest();
//CRUD ACTIONS
let addRow, saveItem, viewRow, updateRow, deleteRow, closeModal, modal;
addRow = document.getElementById('addItem');
modal = document.getElementById("modal");
saveItem = document.getElementById('saveItem');
var empTable = {
    clearuielements: function () {
        var inputs = document.getElementsByClassName("form-control");
        for (i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    },
    loadData: function(){
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
    },
    modalui:function(){
        empTable.clearuielements();
        modal.classList.remove("off");
        
    },
    saveItem:function(){
        
    },
    updateItem:function(){

    },
    deleteItem:function(){

    },
    viewItem:function(){

    },
}

empTable.loadData();
//MODAL Dialog Actions
addRow.addEventListener('click',()=>{
    empTable.modalui();    
});

closeModal = document.querySelectorAll('.closeDialog');
for (let i = 0; i < closeModal.length; i ++) {    
    closeModal[i].addEventListener('click',()=>{
        modal.classList.add("off");
    });
}