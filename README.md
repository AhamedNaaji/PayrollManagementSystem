Payroll Management System
Overview
The Payroll Management System is a web-based application designed to streamline employee management, attendance tracking, leave requests, and salary processing. This system provides role-based dashboards for Admins, HR Managers, and Employees, ensuring efficient workflows and data security.

Features
- Role-Based Access:- Admins: Manage employees, attendance, leaves, payroll, and system reports.
- HR Managers: Oversee employee records, approve leave requests, and process salaries.
- Employees: View personal attendance, request leaves, and download payslips.

- Modules:- Dashboard with key metrics.
- Employee Management (CRUD operations for employees).
- Attendance Tracking (mark and view attendance records).
- Leave Management (apply and approve leaves).
- Salary Processing (calculate payroll and generate payslips).



Technologies Used
- Frontend:- HTML, CSS, and Bootstrap for responsive design.

- Backend:- Java for logic and data processing.

- Database:- MySQL for storing employee, attendance, leave, and payroll data.



Installation
Follow these steps to set up the Payroll Management System:
- Clone the Repository:git clone https://github.com/your-username/payroll-management-system.git
- Backend Setup:- Install Java (JDK 17 or later).
- Import the backend project into your preferred IDE (e.g., IntelliJ IDEA or Eclipse).
- Configure the database connection in application.properties:spring.datasource.url=jdbc:mysql://localhost:3306/PayrollSystem
spring.datasource.username=root
spring.datasource.password=your_password


- Database Setup:- Start MySQL server.
- Import the SQL file located at database/queries.sql to create tables and sample data.

- Frontend Setup:- Open the frontend/ folder.
- Use any local server (e.g., XAMPP) to host the frontend pages.

- Run the Application:- Start the backend server.
- Access the system via http://localhost:8080/.



Usage
- Login:- Admin, HR Manager, or Employee logs in to access their dashboard.

- Modules:- Navigate to Employee Management, Attendance, Leave, or Salary modules.

- Data Processing:- Admins and HR Managers process payroll and manage employee-related data.



Contributing
Contributions are welcome! Please follow these steps:
- Fork the repository.
- Create a new branch (git checkout -b feature-name).
- Make changes and commit (git commit -m "Description").
- Push to your branch (git push origin feature-name).
- Open a Pull Request.



