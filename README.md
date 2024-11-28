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


---

## Descriptions of Java Files

### `Application.java`
This is the main entry point for the Spring Boot application. It starts the application and configures the base packages to scan for components.

### `config/CorsConfig.java`
Configures Cross-Origin Resource Sharing (CORS) settings to allow or restrict access from different origins.

### `constant/Constant.java`
This file holds any constant values used across the system, like status codes, error messages, etc.

### `domain/` (Entities)
These classes represent the core data entities in the application:

- **Account.java**: Defines an account entity representing users in the system (e.g., Manager, Pharmacist).
- **ActivityLog.java**: Logs activities such as system events, actions performed, etc.
- **Insurance.java**: Stores insurance information linked to patients.
- **InventoryLog.java**: Records inventory updates and logs.
- **InventoryUpdateResponse.java**: Defines the response structure for inventory updates.
- **Log.java**: Abstract log class that other logs (Activity, Transaction, etc.) inherit from.
- **Medication.java**: Represents a medication, including its details such as name, quantity, and stock level.
- **Patient.java**: Represents a patient, including their personal and medical information.
- **Prescription.java**: Represents a prescription, linking patients to medications.
- **PrescriptionMedication.java**: A join table that associates medications with prescriptions, including the quantity prescribed.
- **Stock.java**: Represents stock inventory related to medications.
- **TransactionLog.java**: Records transactions within the system such as inventory changes.

### `repo/` (Repositories)
These interfaces extend `JpaRepository` and provide CRUD operations for the domain entities:

- **AccountRepo.java**: Repository interface for `Account` entities.
- **InventoryRepo.java**: Repository interface for `Medication` entities and related inventory.
- **LogRepo.java**: Repository interface for `Log` entities.
- **PatientRepo.java**: Repository interface for `Patient` entities.
- **PrescriptionMedicationRepo.java**: Repository interface for `PrescriptionMedication` entities.
- **PrescriptionRepo.java**: Repository interface for `Prescription` entities.

### `resource/` (Controllers)
These classes define the REST APIs for interacting with the system:

- **AccountResource.java**: Provides endpoints for managing user accounts.
- **InventoryResource.java**: Provides endpoints for managing medications and inventory.
- **LogResource.java**: Provides endpoints for accessing system logs.
- **PatientResource.java**: Provides endpoints for managing patient information.
- **PrescriptionMedicationResource.java**: Provides endpoints for managing prescription medications.
- **PrescriptionResource.java**: Provides endpoints for managing prescriptions.

### `service/` (Services)
These classes handle the business logic and interact with the repositories:

- **AccountService.java**: Manages account-related operations.
- **InventoryService.java**: Manages inventory-related operations, including stock updates and queries.
- **LogService.java**: Handles logging functionality and fetches log entries.
- **NotificationService.java**: Sends notifications to managers about important events like expiring medications.
- **PatientService.java**: Manages patient records.
- **PrescriptionMedicationService.java**: Manages prescription medications and their associations with prescriptions.
- **PrescriptionService.java**: Handles prescription creation, updates, and the filling process.

---

## How It Works

1. **Account Management**: The `AccountService` and `AccountResource` provide functionality to manage user accounts and roles. Managers and other users can be added, modified, and deleted.

2. **Inventory Management**: The `InventoryService` and `InventoryResource` handle the medications' inventory, including adding, updating, and removing medications.

3. **Prescription Management**: The `PrescriptionService` and `PrescriptionResource` handle prescription creation, viewing, and status updates. It also handles the process of filling prescriptions by checking stock availability.

4. **Notification System**: The `NotificationService` notifies managers about expiring or low-stock medications.

5. **Logging**: The `LogService` and `LogResource` manage activity logs, inventory logs, and transaction logs. These logs provide insight into the system's operations.

6. **Patient Management**: The `PatientService` and `PatientResource` manage patient records, including their personal and medical details.

---

## Running the Application

To run the application locally, use the following command:

