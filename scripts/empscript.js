//set service
let extHttp = new XMLHttpRequest();
//CRUD ACTIONS
let addItem, saveRow, viewRow, updateRow, deleteRow, closeModal, modal;
addItem = document.getElementById('addItem');
modal = document.getElementById("modal");
saveRow = document.getElementById('saveItem');
closeModal = document.querySelectorAll('.closeDialog');

var empTable = {
    clearuielements: function () {
        var inputs = document.getElementsByClassName("form-control");
        for (i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    },
    loadData: function () {
        extHttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let restHttp = JSON.parse(this.responseText),
                    $empuser = restHttp.empuser,
                    htmlElm = "";
                htmlElm += "<thead><tr><th>First Name</th><th>Last Name</th><th>Gender</th><th>Email</th><th>Phone</th><th>State</th><th>Actions</th></tr></thead>";
                htmlElm += "<tbody>";
                for (let i = 0; i < $empuser.length; i++) {
                    if ($empuser[i].state == "Active") {
                        htmlElm += "<tr><td>" + $empuser[i].firstname + "</td><td>" + $empuser[i].lastname + "</td><td>" + $empuser[i].gender + " </td><td>" + $empuser[i].email + " </td><td>" + $empuser[i].phone + " </td><td>" + $empuser[i].state + "</td><td><div class='action-tool'><button class='btn btn-none viewItem'><i class='fa fa-file-o'></i></button><button class='btn btn-none updateItem'><i class='fa fa-pencil'></i></button><button class='btn btn-none deleteItem'><i class='fa fa-close'></i></button></div></td></tr>";
                    } else {
                        htmlElm += "<tr class='inactive'><td>" + $empuser[i].firstname + "</td><td>" + $empuser[i].lastname + "</td><td>" + $empuser[i].gender + " </td><td>" + $empuser[i].email + " </td><td>" + $empuser[i].phone + " </td><td>" + $empuser[i].state + "</td><td><div class='action-tool'><button type='button' class='btn btn-none viewItem'><i class='fa fa-file-o'></i></button><button type='button' class='btn btn-none updateItem'><i class='fa fa-pencil'></i></button><button type='button' class='btn btn-none deleteItem'><i class='fa fa-close'></i></button></div></td></tr>";
                    }
                }
                htmlElm += "</tbody>";
                document.getElementById('empTable').innerHTML = htmlElm;
            } else {
                document.getElementById('empTable').innerHTML = "No Records Found";
            }
        };
        extHttp.open("GET", "json/emp-record.json", true);
        extHttp.send();
    },
    saveItem: function () {
        console.log("saveItem");
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var gender = document.getElementById("gender").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var empstate = document.getElementById("emp-state").value;

        prepTable(firstname,lastname,gender,email,phone,empstate);
        
        modal.classList.add("off");

        let empItems = JSON.stringify({
            FirstName: document.getElementById('firstname').value,
            LastName: document.getElementById('lastname').value,
            Gender: document.getElementById('gender').value,
            Email: document.getElementById('email').value,
            Phone: document.getElementById('phone').value,
            Status: document.getElementById('emp-state').value
        });
        empresource.push(empItems);
        localStorage.setItem("json/emp-record.json", JSON.stringify(empresource));
        console.log("The data was saved.");
        
    },
    prepTable: function (firstname,lastname,gender,email,phone,empstate) {
        var empTable = document.getElementById("empTable");
        var row = empTable.insertRow();

        var firstnamecell = row.insertCell(0);
        var lastnamecell = row.insertCell(1);
        var gendercell = row.insertCell(2);
        var emailcell = row.insertCell(3);
        var phonecell = row.insertCell(4);
        var empstatecell = row.insertCell(5);
        var actioncell = row.insertCell(6);

        firstnamecell.innerHTML = firstname;
        lastnamecell.innerHTML = lastname;
        gendercell.innerHTML = gender;
        emailcell.innerHTML = email;
        phonecell.innerHTML = phone;
        empstatecell.innerHTML = empstate;
        actioncell.innerHTML =  "<div class='action-tool'><button type='button' class='btn btn-none viewItem'><i class='fa fa-file-o'></i></button><button type='button' class='btn btn-none updateItem'><i class='fa fa-pencil'></i></button><button type='button' class='btn btn-none deleteItem'><i class='fa fa-close'></i></button></div>";

    },
    updateItem: function () {
        console.log("UpdateItem");
    },
    deleteItem: function () {
        console.log("deleteItem");
        var saveDialog = document.querySelector('.savedialog');
        var confDialog = document.querySelector('.confdialog');
        modal.classList.remove("off");
        saveDialog.classList.add("off");
        confDialog.classList.remove("off");
    },
    viewItem: function () {
        console.log("viewItem");
    }
}
window.onload = function () {
    empTable.loadData();
    viewRow = document.querySelectorAll('.viewItem');
    updateRow = document.querySelectorAll('.updateItem');
    deleteRow = document.querySelectorAll('.deleteItem');

    for (let i = 0; i < viewRow.length; i++) {
        viewRow[i].addEventListener('click', (e) => {
            empTable.viewItem();
        });
    }
    for (let i = 0; i < updateRow.length; i++) {
        updateRow[i].addEventListener('click', (e) => {
            empTable.updateItem();
        });
    }
    for (let i = 0; i < deleteRow.length; i++) {
        deleteRow[i].addEventListener('click', (e) => {
            empTable.deleteItem();
        });
    }
}



//MODAL Dialog Actions
addItem.addEventListener('click', () => {
    modal.classList.remove("off");
    empTable.clearuielements();
});

for (let i = 0; i < closeModal.length; i++) {
    closeModal[i].addEventListener('click', () => {
        modal.classList.add("off");
    });
}
saveRow.addEventListener('click', () => {
    empTable.saveItem();
});