
# SFWE-403 Pharmacy Management System

This is the **SFWE-403 Pharmacy Management System** project. The system is designed to manage prescriptions, medications, patients, and inventory for a pharmacy.

## Project Structure

```plaintext
SFWE-403-Pharmacy-Management-System
├── .codesandbox
├── .gitignore
├── .vscode
├── animations
├── node_modules
├── package-lock.json
├── package.json
├── pages
├── project_structure.txt
├── public
│   ├── favicon.ico
│   ├── images
│   │   └── login.jpg
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── sfwe403
│   ├── .classpath
│   ├── .gitignore
│   ├── .vscode
│   │   └── settings.json
│   ├── bin
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── _5guys
│   │   │   └── resources
│   │   └── test
│   │       └── java
│   ├── launch.json
│   ├── pom.xml
│   ├── README.md
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── _5guys
│   │   │   │           ├── Application.java
│   │   │   │           ├── config
│   │   │   │           │   └── CorsConfig.java
│   │   │   │           ├── constant
│   │   │   │           │   └── Constant.java
│   │   │   │           ├── domain
│   │   │   │           │   ├── Account.java
│   │   │   │           │   ├── ActivityLog.java
│   │   │   │           │   ├── Insurance.java
│   │   │   │           │   ├── InventoryLog.java
│   │   │   │           │   ├── InventoryUpdateResponse.java
│   │   │   │           │   ├── Log.java
│   │   │   │           │   ├── Medication.java
│   │   │   │           │   ├── Patient.java
│   │   │   │           │   ├── Prescription.java
│   │   │   │           │   ├── PrescriptionMedication.java
│   │   │   │           │   ├── Stock.java
│   │   │   │           │   └── TransactionLog.java
│   │   │   │           ├── repo
│   │   │   │           │   ├── AccountRepo.java
│   │   │   │           │   ├── InventoryRepo.java
│   │   │   │           │   ├── LogRepo.java
│   │   │   │           │   ├── PatientRepo.java
│   │   │   │           │   ├── PrescriptionMedicationRepo.java
│   │   │   │           │   └── PrescriptionRepo.java
│   │   │   │           ├── resource
│   │   │   │           │   ├── AccountResource.java
│   │   │   │           │   ├── InventoryResource.java
│   │   │   │           │   ├── LogResource.java
│   │   │   │           │   ├── PatientResource.java
│   │   │   │           │   ├── PrescriptionMedicationResource.java
│   │   │   │           │   └── PrescriptionResource.java
│   │   │   │           └── service
│   │   │   │               ├── AccountService.java
│   │   │   │               ├── InventoryService.java
│   │   │   │               ├── LogService.java
│   │   │   │               ├── NotificationService.java
│   │   │   │               ├── PatientService.java
│   │   │   │               ├── PrescriptionMedicationService.java
│   │   │   │               └── PrescriptionService.java
│   │   │   └── resources
│   │   │       ├── application.yml
│   │   │       └── contacts.html
│   └── target
│       ├── classes
│       │   ├── application.yml
│       │   ├── contacts.html
│       │   └── com
│       │       └── _5guys
│       │           ├── Application.class
│       │           ├── config
│       │           ├── constant
│       │           ├── domain
│       │           ├── repo
│       │           ├── resource
│       │           └── service
│       ├── generated-sources
│       ├── generated-test-sources
│       ├── maven-archiver
│       ├── maven-status
│       ├── sfwe403-1.0-SNAPSHOT.jar
│       ├── sfwe403-1.0-SNAPSHOT.jar.original
│       └── test-classes
├── src
└── styles
```

## Overview

This project is a comprehensive system for managing medication prescriptions, inventories, and patient data, with integrated logging and notification services. It includes functionalities for managing accounts, prescriptions, medications, activity logs, and notifications for expiring medications.

## Setup and Configuration

1. **Dependencies**:
   - Spring Boot
   - Spring Data JPA
   - Hibernate (for database interactions)
   - Lombok (for reducing boilerplate code)
   - Jakarta Transaction API (for transaction management)
   
2. **Database**:
   - This project uses JPA repositories for persistence, and it requires a configured database to store patient, prescription, inventory, and log data.

3. **Running the Backend Application**:
   - Navigate to the root directory of the backend project (`sfwe403`).
   - Run the following command to start the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```
   - Once the application is running, it can be accessed via the embedded web server (e.g., Tomcat) at `http://localhost:8080`.

4. **Running the Frontend Application**:
   - Navigate to the `sfwe403-frontend` directory.
   - Install the required dependencies using npm:
     ```bash
     npm install
     ```
   - After the dependencies are installed, start the frontend server with the following command:
     ```bash
     npm start
     ```
   - The frontend application will be accessible at `http://localhost:3000`.

5. **Accessing the Application**:
   - With both the backend and frontend servers running, you can access the full application through your browser at `http://localhost:3000`.

## File Descriptions

### `Application.java`
- **Purpose**: The main entry point for the Spring Boot application.
- **Key Features**:
  - Annotated with `@SpringBootApplication` to initialize the application.
  - Configured with `@EntityScan` and `@EnableJpaRepositories` to automatically scan for entities and repositories in the `com._5guys` package.
  - Runs the Spring Boot application on startup.

### `CorsConfig.java`
- **Purpose**: Configures Cross-Origin Resource Sharing (CORS) settings for the application to allow or restrict client-side communication with the backend from different origins.

### `Constant.java`
- **Purpose**: Defines constants used throughout the application, such as error codes, status messages, and other configuration values.

### Domain Models
- **Purpose**: Contains entity classes for the application's core data model. These classes are mapped to database tables via JPA.
  - **`Account.java`**: Represents a user account in the system, including user-specific details.
  - **`ActivityLog.java`**: Represents a log entry for activities performed in the system.
  - **`Insurance.java`**: Represents an insurance plan or details linked to patients.
  - **`InventoryLog.java`**: Represents logs related to inventory changes, including stock updates and medication inventory.
  - **`InventoryUpdateResponse.java`**: Represents a response object for inventory update operations.
  - **`Log.java`**: Represents general logging of operations or events in the system.
  - **`Medication.java`**: Represents medication records, including names, dosage, and related information.
  - **`Patient.java`**: Represents a patient’s details, including personal information and medical history.
  - **`Prescription.java`**: Represents a prescription, including the doctor’s instructions for medications.
  - **`PrescriptionMedication.java`**: Represents the relationship between prescriptions and medications.
  - **`Stock.java`**: Represents the stock levels of medications in the inventory.
  - **`TransactionLog.java`**: Represents a log entry of transaction-based activities like prescription fills.

### Repositories
- **Purpose**: Contains repository interfaces for managing entity persistence, extending Spring Data JPA's `JpaRepository`.
  - **`AccountRepo.java`**: Repository interface for managing `Account` entities.
  - **`InventoryRepo.java`**: Repository interface for managing `InventoryLog` entities.
  - **`LogRepo.java`**: Repository interface for managing `Log` entities.
  - **`PatientRepo.java`**: Repository interface for managing `Patient` entities.
  - **`PrescriptionMedicationRepo.java`**: Repository interface for managing `PrescriptionMedication` entities.
  - **`PrescriptionRepo.java`**: Repository interface for managing `Prescription` entities.

### Resources
- **Purpose**: Contains RESTful resource classes for handling HTTP requests related to the entities. Each resource class corresponds to a specific domain entity.
  - **`AccountResource.java`**: Exposes APIs for managing `Account` entities.
  - **`InventoryResource.java`**: Exposes APIs for managing `InventoryLog` entities.
  - **`LogResource.java`**: Exposes APIs for managing `Log` entities.
  - **`PatientResource.java`**: Exposes APIs for managing `Patient` entities.
  - **`PrescriptionMedicationResource.java`**: Exposes APIs for managing `PrescriptionMedication` entities.
  - **`PrescriptionResource.java`**: Exposes APIs for managing `Prescription` entities.

### Services
- **Purpose**: Contains business logic related to entities, managing operations like creating, updating, and retrieving entities.
  - **`AccountService.java`**: Service class that handles business logic for `Account` entities.
  - **`InventoryService.java`**: Service class that handles business logic for `InventoryLog` entities.
  - **`LogService.java`**: Service class that handles business logic for `Log` entries, including activity and transaction logs.
  - **`NotificationService.java`**: Service class for managing notifications, specifically for notifying managers of expiring medications.
  - **`PatientService.java`**: Service class that handles business logic for `Patient` entities.
  - **`PrescriptionMedicationService.java`**: Service class for managing business logic related to `PrescriptionMedication` entities.
  - **`PrescriptionService.java`**: Service class that handles business logic for `Prescription` entities.

### Animations
- **Purpose**: Contains files related to animations in the application.
  - **`pharmacy_animation.json`**: A JSON file containing animation data for pharmacy-related UI elements, likely used for transitions or effects in the user interface.

### Components
- **Purpose**: Contains React component files used to build different parts of the user interface.
  - **`Layout.js`**: A component that provides the general layout structure for the application, likely including navigation, headers, and footers.
  - **`SignOutButton.js`**: A button component that handles the user sign-out functionality, likely invoking an authentication service to log the user out.

### Context
- **Purpose**: Contains React context files for managing global state across the application.
  - **`PendingAccountsContext.js`**: A context provider that likely manages and provides the state related to pending user accounts, such as approval or status.

### Pages
- **Purpose**: Contains React component files for individual pages or views in the application.
  - **`ActivityLog.js`**: A page that displays a log of activities performed in the system.
  - **`AddCustomer.js`**: A page that allows users to add new customer details to the system.
  - **`AddMedication.js`**: A page where users can add new medication records to the system.
  - **`FinancialReportPage.js`**: A page displaying financial reports, likely summarizing transactions or financial activities.
  - **`Forgot.js`**: A page for handling the "forgot password" functionality.
  - **`GenerateReportPage.js`**: A page that allows users to generate reports based on the data in the system.
  - **`HomePage.js`**: The landing or home page of the application.
  - **`InventoryReportPage.js`**: A page for displaying inventory-related reports.
  - **`ManagePrescriptions.js`**: A page that allows users to manage prescriptions in the system.
  - **`ManageRoles.js`**: A page for managing user roles and permissions within the system.
  - **`MedicationSpecifics.js`**: A page that displays detailed information about a specific medication.
  - **`OrderConfirmationPage.js`**: A page that confirms an order has been placed, likely showing order details.
  - **`OrderMedicine.js`**: A page for ordering medications from the pharmacy system.
  - **`PrescriptionSpecifics.js`**: A page that displays details about a specific prescription.
  - **`Signup.js`**: A page that handles the user registration or sign-up process.
  - **`TransactionPage.js`**: A page that displays transaction-related information and activities.
  - **`UnlockAccounts.js`**: A page for unlocking or enabling user accounts that may have been locked or disabled.
  - **`ViewCustomers.js`**: A page that allows users to view customer information.
  - **`ViewInventory.js`**: A page that displays the current inventory of medications in the system.

### Styles
- **Purpose**: Contains CSS and JS files related to styling the application.
  - **`ExcelTableStyles.css`**: A CSS file containing styles for displaying tables, possibly for exporting or viewing Excel-style data.
  - **`HomePageStyles.js`**: A JavaScript file that contains styles specific to the `HomePage` component, using JavaScript-based styling solutions (like styled-components).
  - **`LayoutStyles.css`**: A CSS file containing styles for the general layout, including grids, spacing, or other layout-related styling.
  - **`LoginFormStyles.js`**: A JavaScript file with styles specific to the login form, using JavaScript-based styling solutions.
  - **`ManageRolesStyles.js`**: A JavaScript file containing styles specific to the `ManageRoles` page.
  - **`PageStyles.js`**: A JavaScript file containing common styles used across different pages of the application.
  - **`ReportTableStyles.css`**: A CSS file with styles for displaying report tables, likely used on pages that generate or view reports.
  - **`TextboxAlignment.css`**: A CSS file that likely contains styles for aligning textboxes and form inputs across the application.

### Root Files
- **Purpose**: Contains the main entry point and global files for the React application.
  - **`App.css`**: The CSS file that contains global styles for the `App.js` component.
  - **`App.js`**: The main entry JavaScript file for the application that likely contains the root component and routing logic.
  - **`App.test.js`**: A test file for `App.js`, used for unit testing and verifying the functionality of the root application component.
  - **`Forgot.js`**: A page for handling the "forgot password" functionality (duplicate, as it also appears under `pages`).
  - **`GlobalStyles.js`**: A JavaScript file that defines global styles to be applied across the application, possibly using styled-components or similar libraries.
  - **`Header.js`**: A component that renders the header for the application, likely containing navigation links or branding.
  - **`index.css`**: A global CSS file applied throughout the entire application.
  - **`index.js`**: The entry point for the React application that renders the root component (`App.js`) and manages application-wide settings.
  - **`Login.js`**: A page or component for handling user login functionality.
  - **`logo.svg`**: An SVG file that likely contains the logo for the application, used in headers or other branding areas.
  - **`project_structure.txt`**: A text file that likely describes the structure of the project or provides an overview of the application’s folder hierarchy.
  - **`UserService.js`**: A service file that likely manages user-related functionality, such as authentication, profile updates, or user data retrieval.
