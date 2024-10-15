# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Job Board Portal Application

DB Design :

users :

1. Patient:

Development :

1. Frontend :

   - Initial Layout

     - Header
     - Side bar
     - Main content
     - Footer

1) - Pages

1.  This is all about the patient flow of the application

    - The patient have register first then only they can login
    - Register

      - Full Name: string
        -Email: string
        -Phone Number: number
        -Password: string
        -Confirm Password: string
        -Date of Birth:
        -Gender: string
        -Address: string
        -Street Address: string
        -City :strinf
        -State: string
        -Zip Code: number
        -Medical History (optional): A brief summary or checkbox to ask if the patient has any pre-existing conditions (can be filled later by the doctor). : string

    - In Login page we have four Nav bars

      - Home (only visible after login)
      - About
      - Contact
      - Guildelines

    - Login Page:
      -Email
      -Password
      - It will check the login details in database if it correct then
        - Store the JWT token in localstorage
        - decode the userRole and decode the user Id
    - Logout
      - Remove the token from the local storage

2) Now patient loggined succesfully then

- He can have access to Home page

  - For Emergency (button)
  - Book Appointment

  - This is very important, Here the patient will book the appontment.

  - This is Patient booking form which contains all the field

    - id: unique Id (string)
    - fullName: string
    - dateOfBirth: date
    - phoneNumber: string
    - email: email
    - address: address
    - doctorId: unique Id for doctor
    - appointmentType:
    - status: approval,appointment closed
    - doctorRole: role of the doctor
    - patientId: unique id

  - This appointment will go to the admin and admin will assign the doctor

  - Once booked the appointment patient can view the stats of there application

    - Approved/close appointment
    - Cancel
    - Reschedule the Appointment

  - Patient can view all the doctor
    - Name
    - Email
    - Phone Number
    - specialist in

Admin:

     - Register (No need of Medical history field)
     - Login
     - Store Jwt token in local storage

     Access based on the role(Admin)
     - Admin can view all the doctor and patient, They can create a new user, edit a user and if they
     want they can delete the user

     -Admin can see all the appointments and he can assight the doctor for the patient

     -Admin can see all the records of the patient


     No acess
     - Admin don't have the access to edit or create the records for the patient

- Doctor

  - Here we have four types of dcotor

    - General
    - Cataracts
    - Glaucoma
    - Macular Degeneration

  - Access

    - doctor have the access to view the appointment and he can change the status of the appointment and he can rescheudle the appointment.

    - Now docor approved the appointment.

    - Once the appointment closed the he have to create the recode of the doctor and he have the access to edit the appointment

    - Doctor can view all the patient and he can edit it

  - No Access

    - Doctor will not able to create a patient, edit a patient and delete a patient
    - Admin can change the access for patient record to view

Application Overview
This application is built for managing patient appointments in an eye hospital with role-based access for patients, doctors, and admins. Each role has different permissions, ensuring a smooth and secure operation.

Below is a detailed breakdown of the key features and access control for each role: Patient, Admin, and Doctor.

1. Patient
   Development:
   1.1. Frontend Structure:
   Initial Layout:
   Header: Displays navigation options.
   Sidebar: Provides quick access to various functionalities (visible based on login).
   Main Content: Displays dynamic content based on the patient's actions (e.g., booking appointments).
   Footer: Contains general information or links.
   1.2. Pages:
   Registration Page:

Patients need to register first to access the system.
Registration Fields:
Full Name
Email
Phone Number
Password and Confirm Password
Date of Birth
Gender
Address
Street Address
City
State
Zip Code
Medical History (optional): A brief summary or checkbox for pre-existing conditions.
Login Page:

Login Fields:
Email
Password
Upon successful login:
The JWT token is stored in localStorage.
User Role and User ID are decoded from the token.
Logout:
Clears the token from localStorage.
Navigation Bar (after login):

Home: Accessible only after login.
About
Contact
Guidelines
1.3. Patient Flow After Login:
Home Page:

Emergency Button: Quick emergency action.

Book Appointment: Main functionality for patients.

Appointment Booking Form:
Patient ID (unique)
Full Name
Date of Birth
Phone Number
Email
Address
Doctor ID (selected during booking)
Appointment Type (consultation, surgery, etc.)
Status (pending, approved, closed)
Doctor Specialization (e.g., Cataracts)
Patient ID (unique)
Appointment Status: Patients can check the status of their booked appointments:

Approved: The appointment is confirmed.
Closed: The appointment has been completed.
Cancel: Patients can cancel the appointment.
Reschedule: Patients can change the appointment date/time.
View Doctors:

Patients can view a list of available doctors with:
Name
Email
Phone Number
Specialization (e.g., Cataracts, Glaucoma). 2. Admin
2.1. Access Control:
Admins can log in and manage the entire system.
Access:
View all doctors and patients.
Create, edit, and delete user accounts (doctors, patients, or other admins).
View all patient appointments and assign doctors to each appointment.
View all patient records.
Generate reports and analyze appointments.
No Access:
Admins cannot edit or create the medical records of patients.
Admins do not have access to change patient medical data (only doctors can do that). 3. Doctor
3.1. Doctor Types:
General
Cataracts
Glaucoma
Macular Degeneration
3.2. Access Control:
Access:

Doctors can view appointments assigned to them.
They can approve or reschedule appointments.
After the appointment is completed, doctors can close the appointment and create medical records.
Doctors can view the patient's details and edit appointment statuses.
Create Medical Records:

After completing an appointment, doctors can add the patient's medical records (including treatments, diagnosis, etc.).
Edit Appointment:

Doctors can reschedule appointments or change the status (approved, closed, pending).
No Access:

Doctors cannot create, edit, or delete patient profiles.
Doctors do not have access to administrative functionalities such as user management.
Admins can control a doctor's access to view certain patient data.
Additional Features
Role-Based Access Control:

The entire system is built around role-based access to ensure that each user (Patient, Doctor, Admin) has access only to what is relevant to their role.
Patients can only see and book appointments, while doctors manage appointments and medical records. Admins handle system-wide management but have no access to direct medical data.
JWT Authentication:

Token-based authentication ensures secure access to the application.
JWT tokens are stored in localStorage and decoded for identifying user roles and IDs.
