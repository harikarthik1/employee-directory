let employees = [...initialEmployees];
let currentPage = 1;
let itemsPerPage = 10;
let editMode = false;

// DOM references
const employeeList = document.getElementById("employeeList");
const paginationControls = document.getElementById("paginationControls");
const searchInput = document.getElementById("searchInput");
const sortBy = document.getElementById("sortBy");
const itemsPerPageSelect = document.getElementById("itemsPerPage");
const formModal = document.getElementById("formModal");
const form = document.getElementById("employeeForm");
const formError = document.getElementById("formError");

form.addEventListener("submit", saveEmployee);
searchInput.addEventListener("input", renderEmployees);
sortBy.addEventListener("change", renderEmployees);
itemsPerPageSelect.addEventListener("change", (e) => {
  itemsPerPage = parseInt(e.target.value);
  currentPage = 1;
  renderEmployees();
});

function openForm() {
  form.reset();
  document.getElementById("employeeId").value = "";
  formError.textContent = "";
  editMode = false;
  formModal.style.display = "block";
}

function closeForm() {
  formModal.style.display = "none";
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;
  editMode = true;

  document.getElementById("employeeId").value = emp.id;
  document.getElementById("firstName").value = emp.firstName;
  document.getElementById("lastName").value = emp.lastName;
  document.getElementById("email").value = emp.email;
  document.getElementById("department").value = emp.department;
  document.getElementById("role").value = emp.role;

  formError.textContent = "";
  formModal.style.display = "block";
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees = employees.filter(e => e.id !== id);
    renderEmployees();
  }
}

function saveEmployee(e) {
  e.preventDefault();

  const id = document.getElementById("employeeId").value;
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value.trim();
  const role = document.getElementById("role").value.trim();

  if (!firstName || !lastName || !email || !department || !role || !validateEmail(email)) {
    formError.textContent = "Please fill all fields correctly.";
    return;
  }

  if (editMode) {
    const index = employees.findIndex(e => e.id === Number(id));
    employees[index] = { id: Number(id), firstName, lastName, email, department, role };
  } else {
    const newId = Date.now();
    employees.push({ id: newId, firstName, lastName, email, department, role });
  }

  closeForm();
  renderEmployees();
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function getFilteredSortedEmployees() {
  let filtered = [...employees];

  const search = searchInput.value.toLowerCase();
  if (search) {
    filtered = filtered.filter(emp =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search)
    );
  }

  const sortField = sortBy.value;
  if (sortField) {
    filtered.sort((a, b) => a[sortField].localeCompare(b[sortField]));
  }

  return filtered;
}

function renderEmployees() {
  const filtered = getFilteredSortedEmployees();
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  currentPage = Math.min(currentPage, totalPages || 1);

  const start = (currentPage - 1) * itemsPerPage;
  const pageData = filtered.slice(start, start + itemsPerPage);

  employeeList.innerHTML = "";

  if (pageData.length === 0) {
    employeeList.innerHTML = "<p>No employees found.</p>";
    paginationControls.innerHTML = "";
    return;
  }

  pageData.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <p><strong>${emp.firstName} ${emp.lastName}</strong></p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    employeeList.appendChild(card);
  });

  renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
  paginationControls.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.onclick = () => {
      currentPage = i;
      renderEmployees();
    };
    paginationControls.appendChild(btn);
  }
}

// Click outside modal to close
window.onclick = function(event) {
  if (event.target === formModal) {
    closeForm();
  }
};

// Initial render
renderEmployees();
