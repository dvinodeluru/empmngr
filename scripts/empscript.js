//set service
let extHttp = new XMLHttpRequest();
//CRUD ACTIONS
let addItem, saveRow, viewRow, updateRow, deleteRow, closeModal, modal, empDataArray = [], updateIndex = -1, deleteRowIndex = -1,
saveDialog = document.querySelector('.savedialog'),
searchText = document.getElementById('searchBox'),
confDialog = document.querySelector('.confdialog');

addItem = document.getElementById('addItem');
modal = document.getElementById("modal");
saveRow = document.getElementById('saveItem');
deleteRow = document.getElementById('deleteItem');
closeModal = document.querySelectorAll('.closeDialog');

var empTable = {
    clearuielements: function () {
        var inputs = document.getElementsByClassName("form-control");
        for (i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
        updateIndex = -1;
    },
    loadData: function () {
        var self = this;
        document.getElementById("tablerows").innerHTML = "";
        if(localStorage.empData){           
            empDataArray = JSON.parse(localStorage.empData);           
            for(var i =0; i < empDataArray.length; i++){                
                self.prepTable(empDataArray[i].empId, empDataArray[i].FirstName,  empDataArray[i].LastName, empDataArray[i].Gender, empDataArray[i].Email, empDataArray[i].Phone, empDataArray[i].Status);
            }            
        }            
    },
    saveItem: function () {
        console.log("saveItem");        
        
        modal.classList.add("off");
        searchText.value = "";
        let empObj = {
            empId: Math.floor((Math.random() * 100) + 1),
            FirstName: document.getElementById('firstname').value,
            LastName: document.getElementById('lastname').value,
            Gender: document.getElementById('gender').value,
            Email: document.getElementById('email').value,
            Phone: document.getElementById('phone').value,
            Status: document.getElementById('emp-state').value
        };
        //update or new item
        (updateIndex === -1) ? empDataArray.push(empObj) : empDataArray.splice(updateIndex, 1, empObj);
        
        localStorage.empData = JSON.stringify(empDataArray);
        this.loadData();
        //this.prepTable(empDataArray.length, firstname, lastname, gender, email, phone, empstate);
        console.log("The data was saved.");
        
    },
    prepTable: function (empId, firstname, lastname, gender, email, phone, empstate) {
        var tableRows = document.getElementById("tablerows"), 
            table = document.getElementById("empTable"),
            newRow,
            self = this;

        if(empId !== -1){
            newRow = tableRows.insertRow();
            empstate === 'Inactive' ? newRow.className = 'inactive' : newRow.className = '';            
    
            newRow.insertCell(0).innerHTML = firstname;
            newRow.insertCell(1).innerHTML = lastname;
            newRow.insertCell(2).innerHTML = gender;
            newRow.insertCell(3).innerHTML = email;
            newRow.insertCell(4).innerHTML = phone;
            newRow.insertCell(5).innerHTML = empstate;
            // Delete only inactive items
            newRow.insertCell(6).innerHTML =  empstate === 'Inactive' ? "<div class='action-tool'><button type='button' class='btn btn-none viewItem' onclick='empTable.viewItem("+ empId +")'><i class='fa fa-file-o'></i></button><button type='button' class='btn btn-none updateItem' onclick='empTable.updateItem("+ empId +")'><i class='fa fa-pencil'></i></button><button type='button' class='btn btn-none deleteItem' onclick='empTable.deleteConfirmation("+ empId +")'><i class='fa fa-close'></i></button></div>"
                                                                        : "<div class='action-tool'><button type='button' class='btn btn-none viewItem' onclick='empTable.viewItem("+ empId +")'><i class='fa fa-file-o'></i></button><button type='button' class='btn btn-none updateItem' onclick='empTable.updateItem("+ empId +")'><i class='fa fa-pencil'></i></button><button type='button' disabled class='btn btn-none deleteItem' style='opacity:0.5; cursor: default;' onclick='empTable.deleteConfirmation("+ empId +")'><i class='fa fa-close'></i></button></div>"
        }else{
            //table.deleteRow(0);
        }
    },
    updateItem: function (selecEmpId) {
        console.log("UpdateItem");        
        modal.classList.remove("off");
        saveDialog.classList.remove("off");
        
        updateIndex = _.findIndex(empDataArray, { empId: selecEmpId });
        var empObj = empDataArray[updateIndex];
        
        document.getElementById("firstname").value = empObj.FirstName;
        document.getElementById("lastname").value = empObj.LastName;
        document.getElementById("gender").value = empObj.Gender;
        document.getElementById("email").value = empObj.Email;
        document.getElementById("phone").value = empObj.Phone;
        document.getElementById("emp-state").value = empObj.Status;
    },
    deleteConfirmation: function (empID) {
        console.log("deleteItem");        
        
        modal.classList.remove("off");
        saveDialog.classList.add("off");
        confDialog.classList.remove("off");
        deleteRowIndex = _.findIndex(empDataArray, { empId: empID });
    },
    deleteRow: function () {        
        if(deleteRowIndex > -1){
            //var confDialog = document.querySelector('.confdialog');
            modal.classList.add("off");
            confDialog.classList.add("off");
            empDataArray.splice(deleteRowIndex, 1);            
            localStorage.empData = JSON.stringify(empDataArray);
            searchText.value === "" ? this.loadData() : this.searchResult()
            deleteRowIndex = -1;
        }        
    },
    viewItem: function (selecEmpId) {
        console.log("viewItem");        
        modal.classList.remove("off");
        saveDialog.classList.remove("off"); 
              
        var empObj = empDataArray[_.findIndex(empDataArray, { empId: selecEmpId })];
        document.getElementById("firstname").value = empObj.FirstName;
        document.getElementById("lastname").value = empObj.LastName;
        document.getElementById("gender").value = empObj.Gender;
        document.getElementById("email").value = empObj.Email;
        document.getElementById("phone").value = empObj.Phone;
        document.getElementById("emp-state").value = empObj.Status;
    },
    
    // function for dynamic sorting
    applySorting: function(key, order = 'asc'){        
        empDataArray.sort(this.compareValues(key, order));
        /*empDataArray.sort(function(a, b){
            var nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1
            else if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
        });*/
        localStorage.empData = JSON.stringify(empDataArray);
        empDataArray = [];
        this.loadData();
    },
    
    compareValues: function (key, order) {
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0; 
            }        
            const varA = (typeof a[key] === 'string') ? 
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ? 
                b[key].toUpperCase() : b[key];
        
            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    },

    searchResult: function(){
        var searchResult, self = this;
        
        searchResult = _.filter(empDataArray, function(obj){
            return obj.FirstName === searchText.value || obj.Gender === searchText.value || obj.Status === searchText.value || obj.LastName === searchText.value;
        })
        if(searchResult.length > 0){
            document.getElementById("tablerows").innerHTML = "";
            for(var i =0; i < searchResult.length; i++){                
                self.prepTable(searchResult[i].empId, searchResult[i].FirstName,  searchResult[i].LastName, searchResult[i].Gender, searchResult[i].Email, searchResult[i].Phone, searchResult[i].Status);
            }
        }else if(searchText.value === ""){
            self.loadData();
        }else{
            alert('no matching records');
            //searchText = "";
            //self.loadData();

        }        
    }
}
window.onload = function () {
    empTable.loadData();    
}

//MODAL Dialog Actions
addItem.addEventListener('click', () => {
    modal.classList.remove("off");
    saveDialog.classList.remove("off");
    empTable.clearuielements();
});

for (let i = 0; i < closeModal.length; i++) {    
    closeModal[i].addEventListener('click', () => {
        modal.classList.add("off");
        confDialog.classList.add("off");
        saveDialog.classList.add("off");
    });
}
saveRow.addEventListener('click', () => {
    empTable.saveItem();
});

deleteRow.addEventListener('click', () => {
    empTable.deleteRow();
});
