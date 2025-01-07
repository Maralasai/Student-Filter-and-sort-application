const students = [
    { id: 1, name: 'Janu', english: 50, maths: 86, science: 77, social_science: 89 },
    { id: 2, name: 'Tanu', english: 75, maths: 96, science: 67, social_science: 91 },
    { id: 3, name: 'Tara', english: 90, maths: 35, science: 86, social_science: 100 },
    { id: 4, name: 'Glen', english: 79, maths: 68, science: 77, social_science: 68 },
    { id: 5, name: 'Zara', english: 80, maths: 85, science: 96, social_science: 68 }
];

function loadTable(data) {
    const tbody = document.querySelector("#student-table tbody");
    tbody.innerHTML = "";
    data.forEach(student => {
        const row = document.createElement("tr");
        Object.values(student).forEach(val => {
            const cell = document.createElement("td");
            cell.textContent = val;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

function filterStudents() {
    const subject = document.getElementById("subject").value; 
    const filterType = document.querySelector("input[name='filter']:checked").value; 
    const value1 = parseInt(document.getElementById("value1").value, 10); 
    const value2 = parseInt(document.getElementById("value2").value, 10); 
    
    let filteredStudents;

    // Check filter type and apply conditions
    if (filterType === "above" && !isNaN(value1)) {
        filteredStudents = students.filter(student => student[subject] > value1);
    } else if (filterType === "below" && !isNaN(value1)) {
        filteredStudents = students.filter(student => student[subject] < value1);
    } else if (filterType === "between" && !isNaN(value1) && !isNaN(value2)) {
        filteredStudents = students.filter(student => student[subject] >= value1 && student[subject] <= value2);
    } else {
        alert("Please enter valid input values.");
        return;
    }

    highlightRows(filteredStudents);
    loadTable(filteredStudents);
}
function highlightRows(filteredStudents) {
    const rows = document.querySelectorAll("#student-table tbody tr");
    rows.forEach(row => row.classList.remove("highlight")); 

    filteredStudents.forEach(student => {
        const rowIndex = students.findIndex(s => s.id === student.id); 
        if (rowIndex >= 0) {
            rows[rowIndex].classList.add("highlight"); 
        }
    });
}


function clearFilter() {
    document.getElementById("value1").value = "";
    document.getElementById("value2").value = "";
    document.querySelectorAll("input[type='radio']")[0].checked = true;
    loadTable(students);
}

document.getElementById("filter-btn").addEventListener("click", filterStudents);
document.getElementById("clear-btn").addEventListener("click", clearFilter);

document.querySelector("input[value='between']").addEventListener("change", () => {
    document.getElementById("value2").style.display = "inline";
});
document.querySelector("input:not([value='between'])").addEventListener("change", () => {
    document.getElementById("value2").style.display = "none";
});

// Initial load
loadTable(students);
