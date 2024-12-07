let users = JSON.parse(localStorage.getItem("users")) || [];
let roles = JSON.parse(localStorage.getItem("roles")) || [];

const userTable = document
  .getElementById("userTable")
  .getElementsByTagName("tbody")[0];
const roleTable = document
  .getElementById("roleTable")
  .getElementsByTagName("tbody")[0];

// Render Users
function renderUsers() {
  userTable.innerHTML = ""; // Clear the table
  users.forEach((user, index) => {
    const row = userTable.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="edit-btn" data-id="${index}">Edit</button>
        <button class="delete-btn" data-id="${index}">Delete</button>
      </td>
    `;
  });
}

// Render Roles
function renderRoles() {
  roleTable.innerHTML = ""; // Clear the table
  roles.forEach((role, index) => {
    const row = roleTable.insertRow();
    row.innerHTML = `
      <td>${role.name}</td>
      <td>${role.permissions.join(", ")}</td>
      <td>
        <button class="edit-role-btn" data-id="${index}">Edit</button>
        <button class="delete-role-btn" data-id="${index}">Delete</button>
      </td>
    `;
  });
}

// Add User
document.getElementById("addUserBtn").addEventListener("click", () => {
  openUserModal();
  document.getElementById("modalUserTitle").textContent = "Add User";
  document.getElementById("userForm").reset();
  currentUserIndex = null; // New user
});

// Edit User
userTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-btn")) {
    const userId = event.target.getAttribute("data-id");
    const user = users[userId];
    openUserModal();
    document.getElementById("modalUserTitle").textContent = "Edit User";
    document.getElementById("userName").value = user.name;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userRole").value = user.role;
    currentUserIndex = userId;
  }
});

// Save User (Add/Edit)
document.getElementById("userForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const role = document.getElementById("userRole").value;

  if (currentUserIndex !== null) {
    users[currentUserIndex] = { name, email, role };
  } else {
    users.push({ name, email, role });
  }

  localStorage.setItem("users", JSON.stringify(users));
  closeUserModal();
  renderUsers();
});

// Delete User
userTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const userId = event.target.getAttribute("data-id");
    users.splice(userId, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
  }
});

// Add Role
document.getElementById("addRoleBtn").addEventListener("click", () => {
  openRoleModal();
  document.getElementById("modalRoleTitle").textContent = "Add Role";
  document.getElementById("roleForm").reset();
  currentRoleIndex = null; // New role
});

// Edit Role
roleTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-role-btn")) {
    const roleId = event.target.getAttribute("data-id");
    const role = roles[roleId];
    openRoleModal();
    document.getElementById("modalRoleTitle").textContent = "Edit Role";
    document.getElementById("roleName").value = role.name;
    document.getElementById("rolePermissions").value =
      role.permissions.join(", ");
    currentRoleIndex = roleId;
  }
});

// Save Role (Add/Edit)
document.getElementById("roleForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("roleName").value;
  const permissions = document
    .getElementById("rolePermissions")
    .value.split(",")
    .map((p) => p.trim());

  if (currentRoleIndex !== null) {
    roles[currentRoleIndex] = { name, permissions };
  } else {
    roles.push({ name, permissions });
  }

  localStorage.setItem("roles", JSON.stringify(roles));
  closeRoleModal();
  renderRoles();
});

// Delete Role
roleTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-role-btn")) {
    const roleId = event.target.getAttribute("data-id");
    roles.splice(roleId, 1);
    localStorage.setItem("roles", JSON.stringify(roles));
    renderRoles();
  }
});

// Modal Logic
function openUserModal() {
  document.getElementById("userModal").style.display = "block";
}

function closeUserModal() {
  document.getElementById("userModal").style.display = "none";
}

function openRoleModal() {
  document.getElementById("roleModal").style.display = "block";
}

function closeRoleModal() {
  document.getElementById("roleModal").style.display = "none";
}

document
  .getElementById("closeUserModal")
  .addEventListener("click", closeUserModal);
document
  .getElementById("closeRoleModal")
  .addEventListener("click", closeRoleModal);

// Initial Render
renderUsers();
renderRoles();
