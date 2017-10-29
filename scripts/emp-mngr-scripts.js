
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

closeModal = document.querySelectorAll('.closeDialog');
addRow.addEventListener('click',()=>{
    modal.classList.remove("off");
    
})
for (let i = 0; i < closeModal.length; i ++) {    
    closeModal[i].addEventListener('click',()=>{
        modal.classList.add("off");
    });
}


saveItem.addEventListener('click',()=>{
    let firstName = document.getElementById('firstname').value, 
        lastName = document.getElementById('lastname').value 
        gender = document.getElementById('gender').value, 
        email = document.getElementById('email').value, 
        phone = document.getElementById('phone').value, 
        status = document.getElementById('emp-state').value,
        tblemp = document.getElementById('empTable');        

        let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", "json/emp-record.json", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({ firstname:firstName,
            lastname:lastName,
            gender:gender,
            email:email,
            phone:phone,
            status:status}));
            modal.classList.add("off");
       /* extHttp.open("POST", "json/emp-record.json", true);
   var empuser = JSON.parse(empuser);  //parse the JSON
    empuser.push({        //add the employee
        firstname:firstName,
        lastname:lastName,
        gender:gender,
        email:email,
        phone:phone,
        status:status
    });
    empuser = JSON.stringify(empuser);  //reserialize to JSON*/
});


