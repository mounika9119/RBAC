// Open User Modal
function openUserModal() {
  document.getElementById("userModal").style.display = "block";
}

// Close User Modal
function closeUserModal() {
  document.getElementById("userModal").style.display = "none";
}

// Open Role Modal
function openRoleModal() {
  document.getElementById("roleModal").style.display = "block";
}

// Close Role Modal
function closeRoleModal() {
  document.getElementById("roleModal").style.display = "none";
}

document
  .getElementById("closeUserModal")
  .addEventListener("click", closeUserModal);
document
  .getElementById("closeRoleModal")
  .addEventListener("click", closeRoleModal);
