//set service
let extHttp = new XMLHttpRequest();
//CRUD ACTIONS
let addItem, saveRow, viewRow, updateRow, deleteRow, closeModal, modal;
addItem = document.getElementById('addItem');
modal = document.getElementById("modal");
saveRow = document.getElementById('saveItem');
closeModal = document.querySelectorAll('.closeDialog');
viewRow = document.querySelectorAll('.viewItem');
updateRow = document.querySelectorAll('.updateItem');
deleteRow = document.querySelectorAll('.deleteItem');
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
    saveItem:function(){
        console.log("saveItem");
    },
    updateItem:function(){
        console.log("UpdateItem");
    },
    deleteItem:function(){
        console.log("deleteItem");
    },
    viewItem:function(){
        console.log("viewItem");
    },
}

empTable.loadData();
//MODAL Dialog Actions
addItem.addEventListener('click',()=>{    
        modal.classList.remove("off");
        empTable.clearuielements();      
});
for (let i = 0; i < closeModal.length; i ++) { 
    closeModal[i].addEventListener('click',()=>{
        modal.classList.add("off");
    });
}
saveRow.addEventListener('click',()=>{empTable.saveItem(); });
[].forEach(viewRow,function(){

});
for (let i = 0; i < viewRow.length; i ++) {  
    viewRow[i].addEventListener('click',(e)=>{empTable.viewItem(); });
}
for (let i = 0; i < updateRow.length; i ++) {  
    updateRow[i].addEventListener('click',(e)=>{empTable.updateItem(); }); 
}
for (let i = 0; i < deleteRow.length; i ++) {  
    deleteRow[i].addEventListener('click',(e)=>{empTable.deleteItem(); });
} 

