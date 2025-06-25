# DynamicFormBuilder

This project was generated with version Angular 17.1.1.

## Project Overview

Dynamic Form Builder is an Angular-based application with two main sections:

- **Admin Panel**: Allows admins to create and save dynamic forms.
- **User Panel**: Allows users to fill and submit the saved forms.

Form data is managed using NgRx Store, saved in localStorage, and optionally persisted with JSON Server.

---

## Admin Panel (Form Builder)

- Developed using Angular Material UI.
- Supports the following input types:
  - Text, Textarea, Date, Dropdown (Select), Radio buttons, and Checkboxes.
- Each field can be configured:
  - Label, Placeholder, Help text, Required validation, and Options (for select/radio/checkbox).
- Forms are saved in ``NgRx`` Store and localStorage.
- Validations are applied based on the field settings.

---

## User Panel (Form Submission)

- Lists available form templates.
- Users can select and fill any saved form.
- Required fields are validated dynamically.
- On submission, entered values are shown and stored locally.

---

## Authentication

- Simple Auth Service with username/password authentication using JSON Server:

```json
"users": [
  {"id": 1, "email": "admin@deltaCapital", "password": "admin123", "role": "admin"},
  {"id": 2, "email": "user@deltaCapital", "password": "user123", "role": "user"}
]
```
- Login validation via JSON server.
- Auth token stored in localStorage.

---

## Testing

- Unit tests provided for:
  - Authentication Service.
  - Form submission logic.
- Execute tests via Karma (`ng test`).

---

## Development Setup

### Install Dependencies
```bash
npm install
```

### Run Development Server

```bash
ng serve
```

Open the app in your browser: [http://localhost:4200/](http://localhost:4200/)

### JSON Server Setup

To simulate a backend using JSON Server:
```bash
npm install -g json-server
```

Start JSON server:
```bash
json-server --watch db.json --port 3000
```

Server available at [http://localhost:3000](http://localhost:3000)

---
