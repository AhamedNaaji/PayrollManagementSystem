// Real-time search
document.getElementById('searchInput').addEventListener('input', function () {
    const term = this.value.toLowerCase();
    const rows = document.querySelectorAll('#employeeTable tbody tr');
  
    rows.forEach(row => {
      const cells = row.getElementsByTagName('td');
      let match = false;
      for (let cell of cells) {
        if (cell.textContent.toLowerCase().includes(term)) {
          match = true;
          break;
        }
      }
      row.style.display = match ? '' : 'none';
    });
  });
  
  // Form validation
  document.getElementById('saveEmployeeBtn').addEventListener('click', function () {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const department = document.getElementById('department').value;
    const role = document.getElementById('role').value;
    const joiningDate = document.getElementById('joiningDate').value;
  
    // Validation
    if (!firstName || !lastName || !email || !phone || !department || !role || !joiningDate) {
      alert('Please fill all fields.');
      return;
    }
  
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Phone number must be 10 digits.');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Simulate adding new employee to table
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>EMP-003</td>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${department}</td>
      <td>${role}</td>
      <td><span class="badge bg-success">Active</span></td>
      <td>
        <button class="btn btn-sm btn-primary me-2">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </td>
    `;
  
    document.querySelector('#employeeTable tbody').appendChild(newRow);
  
    // Show success alert
    const alert = document.getElementById('successAlert');
    alert.classList.remove('d-none');
    setTimeout(() => alert.classList.add('d-none'), 3000);
  
    // Reset and close modal
    document.getElementById('employeeForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal')).hide();
  });

  // Real-time search
document.getElementById('searchInput').addEventListener('input', function () {
    const term = this.value.toLowerCase();
    const rows = document.querySelectorAll('#attendanceTable tbody tr');
  
    rows.forEach(row => {
      const cells = row.getElementsByTagName('td');
      let match = false;
      for (let cell of cells) {
        if (cell.textContent.toLowerCase().includes(term)) {
          match = true;
          break;
        }
      }
      row.style.display = match ? '' : 'none';
    });
  });
  
  // Form validation and submission
  document.getElementById('attendanceForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const date = document.getElementById('attendanceDate').value;
    const empId = document.getElementById('employeeId').value.trim();
    const status = document.getElementById('attendanceStatus').value;
    const timeIn = document.getElementById('timeIn').value;
    const timeOut = document.getElementById('timeOut').value;
  
    if (!date || !empId || !status || !timeIn || !timeOut) {
      alert('Please fill all fields.');
      return;
    }
  
    // Validate time
    const timeInDate = new Date(`2023-01-01T${timeIn}`);
    const timeOutDate = new Date(`2023-01-01T${timeOut}`);
  
    if (timeOutDate <= timeInDate) {
      alert('Time Out must be after Time In.');
      return;
    }
  
    // Calculate total hours
    const diffMs = timeOutDate - timeInDate;
    const hours = (diffMs / (1000 * 60 * 60)).toFixed(2);
  
    // Add new row to table
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${date}</td>
      <td>${empId}</td>
      <td>Employee Name</td>
      <td><span class="badge bg-${status === 'Present' ? 'success' : status === 'Leave' ? 'warning text-dark' : 'danger'}">${status}</span></td>
      <td>${timeIn}</td>
      <td>${timeOut}</td>
      <td>${hours}</td>
    `;
  
    document.querySelector('#attendanceTable tbody').appendChild(newRow);
  
    // Show success alert
    const alert = document.getElementById('successAlert');
    alert.classList.remove('d-none');
    setTimeout(() => alert.classList.add('d-none'), 3000);
  
    // Reset form
    document.getElementById('attendanceForm').reset();
  });

  // Sample employee data
const employees = {
    "EMP-001": { name: "John Doe", department: "HR" },
    "EMP-002": { name: "Jane Smith", department: "IT" },
    "EMP-003": { name: "Mike Johnson", department: "Finance" }
  };
  
  // Autofill employee details
  document.getElementById("employeeId").addEventListener("input", function () {
    const empId = this.value.trim();
    const employee = employees[empId];
    if (employee) {
      document.getElementById("employeeName").value = employee.name;
      document.getElementById("employeeDepartment").value = employee.department;
    } else {
      document.getElementById("employeeName").value = "";
      document.getElementById("employeeDepartment").value = "";
    }
  });
  
  // Form validation and submission
  document.getElementById("leaveForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const empId = document.getElementById("employeeId").value.trim();
    const name = document.getElementById("employeeName").value;
    const dept = document.getElementById("employeeDepartment").value;
    const date = document.getElementById("leaveDate").value;
    const type = document.getElementById("leaveType").value;
    const reason = document.getElementById("reason").value.trim();
  
    if (!empId || !name || !dept || !date || !type || !reason) {
      alert("Please fill all fields.");
      return;
    }
  
    // Add new leave request
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>LV-${Date.now().toString().slice(-3)}</td>
      <td>${name}</td>
      <td>${empId}</td>
      <td>${dept}</td>
      <td>${date}</td>
      <td>${type}</td>
      <td><span class="badge bg-warning text-dark">Pending</span></td>
      <td>
        <button class="btn btn-sm btn-success me-1 approve-btn">Approve</button>
        <button class="btn btn-sm btn-danger reject-btn">Reject</button>
      </td>
    `;
  
    document.querySelector("#leaveTable tbody").appendChild(newRow);
    updatePendingRequests();
  
    // Show success alert
    const alert = document.getElementById("successAlert");
    alert.classList.remove("d-none");
    setTimeout(() => alert.classList.add("d-none"), 3000);
  
    // Reset form
    document.getElementById("leaveForm").reset();
    document.getElementById("employeeName").value = "";
    document.getElementById("employeeDepartment").value = "";
  });
  
  // Real-time search filter
  document.getElementById("searchInput").addEventListener("input", function () {
    const term = this.value.toLowerCase();
    const rows = document.querySelectorAll("#leaveTable tbody tr");
  
    rows.forEach(row => {
      const cells = row.getElementsByTagName("td");
      let match = false;
      for (let cell of cells) {
        if (cell.textContent.toLowerCase().includes(term)) {
          match = true;
          break;
        }
      }
      row.style.display = match ? "" : "none";
    });
  });
  
  // Approve/Reject buttons
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("approve-btn")) {
      const row = e.target.closest("tr");
      const statusCell = row.querySelector("td:nth-child(7)");
      statusCell.innerHTML = '<span class="badge bg-success">Approved</span>';
      e.target.classList.replace("btn-success", "btn-secondary");
      e.target.textContent = "Approved";
      e.target.disabled = true;
      e.target.closest("td").querySelector(".reject-btn").disabled = true;
      showSuccessAlert();
      updatePendingRequests();
    }
  
    if (e.target.classList.contains("reject-btn")) {
      const row = e.target.closest("tr");
      const statusCell = row.querySelector("td:nth-child(7)");
      statusCell.innerHTML = '<span class="badge bg-danger">Rejected</span>';
      e.target.classList.replace("btn-danger", "btn-secondary");
      e.target.textContent = "Rejected";
      e.target.disabled = true;
      e.target.closest("td").querySelector(".approve-btn").disabled = true;
      showSuccessAlert();
      updatePendingRequests();
    }
  });
  
  // Update Pending Leave Requests Card
  function updatePendingRequests() {
    const pendingItems = document.querySelectorAll("#leaveTable tbody tr td:nth-child(7) .badge-warning");
    const listGroup = document.getElementById("pendingRequests");
    listGroup.innerHTML = "";
  
    pendingItems.forEach(cell => {
      const row = cell.closest("tr");
      const name = row.querySelector("td:nth-child(2)").textContent;
      const date = row.querySelector("td:nth-child(5)").textContent;
      const type = row.querySelector("td:nth-child(6)").textContent;
  
      const item = document.createElement("div");
      item.className = "list-group-item d-flex justify-content-between align-items-center";
      item.innerHTML = `
        <div>
          <strong>${name}</strong><br>
          <small>${type} Leave on ${date}</small>
        </div>
        <div>
          <button class="btn btn-sm btn-success me-1 approve-btn">Approve</button>
          <button class="btn btn-sm btn-danger reject-btn">Reject</button>
        </div>
      `;
  
      listGroup.appendChild(item);
    });
  
    // Attach event listeners to buttons in the card
    listGroup.querySelectorAll(".approve-btn, .reject-btn").forEach(btn => {
      btn.addEventListener("click", function (e) {
        const parent = e.target.closest(".list-group-item");
        const name = parent.querySelector("strong").textContent;
        const tableRow = Array.from(document.querySelectorAll("#leaveTable tbody tr")).find(row => 
          row.querySelector("td:nth-child(2)").textContent === name
        );
        if (tableRow) {
          if (e.target.classList.contains("approve-btn")) {
            const statusCell = tableRow.querySelector("td:nth-child(7)");
            statusCell.innerHTML = '<span class="badge bg-success">Approved</span>';
            tableRow.querySelector(".approve-btn").classList.replace("btn-success", "btn-secondary");
            tableRow.querySelector(".approve-btn").textContent = "Approved";
            tableRow.querySelector(".approve-btn").disabled = true;
            tableRow.querySelector(".reject-btn").disabled = true;
          } else {
            const statusCell = tableRow.querySelector("td:nth-child(7)");
            statusCell.innerHTML = '<span class="badge bg-danger">Rejected</span>';
            tableRow.querySelector(".reject-btn").classList.replace("btn-danger", "btn-secondary");
            tableRow.querySelector(".reject-btn").textContent = "Rejected";
            tableRow.querySelector(".reject-btn").disabled = true;
            tableRow.querySelector(".approve-btn").disabled = true;
          }
          showSuccessAlert();
          updatePendingRequests();
        }
      });
    });
  }
  
  // Success alert
  function showSuccessAlert() {
    const alert = document.getElementById("successAlert");
    alert.classList.remove("d-none");
    setTimeout(() => alert.classList.add("d-none"), 3000);
  }
  
  // Initial call
  updatePendingRequests();

  // Sample employee data
const employees = {
    "EMP-001": { name: "John Doe", department: "HR", base: 5000 },
    "EMP-002": { name: "Jane Smith", department: "IT", base: 5500 },
    "EMP-003": { name: "Mike Johnson", department: "Finance", base: 6000 }
  };
  
  // Autofill employee details
  document.getElementById("employeeId").addEventListener("input", function () {
    const empId = this.value.trim();
    const employee = employees[empId];
    if (employee) {
      document.getElementById("employeeName").value = employee.name;
      document.getElementById("department").value = employee.department;
      document.getElementById("baseSalary").value = employee.base;
    } else {
      document.getElementById("employeeName").value = "";
      document.getElementById("department").value = "";
      document.getElementById("baseSalary").value = "";
    }
  });
  
  // Calculate total pay
  document.getElementById("calculateBtn").addEventListener("click", function () {
    const base = parseFloat(document.getElementById("baseSalary").value) || 0;
    const allowances = parseFloat(document.getElementById("allowances").value) || 0;
    const deductions = parseFloat(document.getElementById("deductions").value) || 0;
    const bonuses = parseFloat(document.getElementById("bonuses").value) || 0;
  
    const total = base + allowances + bonuses - deductions;
    document.getElementById("totalPay").value = total.toFixed(2);
  });
  
  // Form submission
  document.getElementById("payrollForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const empId = document.getElementById("employeeId").value.trim();
    const name = document.getElementById("employeeName").value;
    const dept = document.getElementById("department").value;
    const month = document.getElementById("payrollMonth").value;
    const base = document.getElementById("baseSalary").value;
    const allowances = document.getElementById("allowances").value;
    const deductions = document.getElementById("deductions").value;
    const bonuses = document.getElementById("bonuses").value;
    const total = document.getElementById("totalPay").value;
  
    if (!empId || !name || !dept || !month || !base || !allowances || !deductions || !bonuses || !total) {
      alert("Please fill all fields.");
      return;
    }
  
    // Add new payroll entry
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>PY-${Date.now().toString().slice(-3)}</td>
      <td>${name}</td>
      <td>${empId}</td>
      <td>${dept}</td>
      <td>$${base}</td>
      <td>$${allowances}</td>
      <td>$${deductions}</td>
      <td>$${bonuses}</td>
      <td>$${total}</td>
    `;
  
    document.querySelector("#payrollTable tbody").appendChild(newRow);
  
    // Show success alert
    const alert = document.getElementById("successAlert");
    alert.classList.remove("d-none");
    setTimeout(() => alert.classList.add("d-none"), 3000);
  
    // Reset form
    document.getElementById("payrollForm").reset();
    document.getElementById("employeeName").value = "";
    document.getElementById("department").value = "";
    document.getElementById("baseSalary").value = "";
    document.getElementById("totalPay").value = "";
  });
  
  // Real-time search filter
  document.getElementById("searchInput").addEventListener("input", function () {
    const term = this.value.toLowerCase();
    const rows = document.querySelectorAll("#payrollTable tbody tr");
  
    rows.forEach(row => {
      const cells = row.getElementsByTagName("td");
      let match = false;
      for (let cell of cells) {
        if (cell.textContent.toLowerCase().includes(term)) {
          match = true;
          break;
        }
      }
      row.style.display = match ? "" : "none";
    });
  });
  
  // Report form submission
  document.getElementById("reportForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Payroll report generated successfully!");
  });

  document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
  
    const form = this;
    const successMsg = document.getElementById("successMessage");
    const errorMsg = document.getElementById("errorMessage");
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    // Reset previous messages
    successMsg.classList.add("d-none");
    errorMsg.classList.add("d-none");
  
    let isValid = true;
  
    // Validate all fields using Bootstrap's built-in validation
    if (!form.checkValidity()) {
      isValid = false;
    }
  
    // Email format validation
    const emailInput = document.getElementById("email");
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailInput.classList.add("is-invalid");
      isValid = false;
    } else {
      emailInput.classList.remove("is-invalid");
    }
  
    // Phone number validation (10+ digits)
    const phoneInput = document.getElementById("phone");
    const phone = phoneInput.value.replace(/\D/g, "");
    if (phone.length < 10) {
      phoneInput.classList.add("is-invalid");
      isValid = false;
    } else {
      phoneInput.classList.remove("is-invalid");
    }
  
    // Password match validation
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");
    if (password !== confirmPassword) {
      confirmInput.classList.add("is-invalid");
      isValid = false;
    } else {
      confirmInput.classList.remove("is-invalid");
    }
  
    form.classList.add("was-validated");
  
    if (isValid) {
      successMsg.classList.remove("d-none");
      form.reset();
      form.classList.remove("was-validated");
    } else {
      errorMsg.classList.remove("d-none");
    }
  });

  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
  
    const form = this;
    const successMsg = document.getElementById("successMessage");
    const errorMsg = document.getElementById("errorMessage");
  
    // Reset previous messages
    successMsg.classList.add("d-none");
    errorMsg.classList.add("d-none");
  
    let isValid = true;
  
    // Validate all fields using Bootstrap's built-in validation
    if (!form.checkValidity()) {
      isValid = false;
    }
  
    form.classList.add("was-validated");
  
    if (isValid) {
      successMsg.classList.remove("d-none");
      // Simulate redirect after 2 seconds
      setTimeout(() => {
        // window.location.href = "dashboard.html"; // Uncomment for actual redirect
        alert("Redirecting to dashboard...");
      }, 2000);
    } else {
      errorMsg.classList.remove("d-none");
    }
  });