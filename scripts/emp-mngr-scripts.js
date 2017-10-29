
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
    let firstName = document.getElementById('firstname').value, 
        lastName = document.getElementById('lastname').value 
        gender = document.getElementById('gender').value, 
        email = document.getElementById('email').value, 
        phone = document.getElementById('phone').value, 
        status = document.getElementById('emp-state').value,
        tblemp = document.getElementById('empTable');
        

var empuser = JSON.parse(empuser);  //parse the JSON
empuser.employees.push({        //add the employee
    firstname:firstName,
    lastname:lastName,
    gender:gender,
    email:email,
    phone:phone,
    status:status
});
empuser = JSON.stringify(empuser);  //reserialize to JSON


});
