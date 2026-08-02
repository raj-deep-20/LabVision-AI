# LabVision AI

LabVision AI is a clinical imaging workspace for managing patients, samples, microscopy image uploads, AI-assisted malaria screening, and report generation. It combines a React + TypeScript frontend with a FastAPI backend and a TensorFlow/Keras CNN model to support a lightweight end-to-end laboratory workflow.

## Why this project exists

The goal of LabVision AI is to reduce the friction in microscopy-based clinical workflows by keeping the most important steps in one application:

- register and authenticate technicians and doctors securely
- manage patients and samples
- upload microscopy images linked to a sample
- run AI-assisted prediction on blood smear images
- generate downloadable reports
- present the workflow through a clean, mobile-friendly interface

The UI keeps a dark, modern clinical look while the backend focuses on secure API access, relational persistence, and model-driven inference.

## Key Features

- **Landing page for new visitors** with hero section, navigation, about section, workflow overview, and clear Sign in / Register calls to action.
- **Authentication system** with user registration, login, and token-based protected access.
- **Patient management** to create, list, update, and delete patient records.
- **Sample management** to create, list, update, and delete laboratory samples.
- **Image upload flow** to attach microscopy images to a sample.
- **AI prediction endpoint** that runs inference on uploaded images.
- **PDF report generation** for prediction results.
- **Protected dashboard workspace** for authenticated users.
- **Responsive layout** designed to work on mobile and desktop.
- **Reusable frontend components** such as navbar, sidebar, protected routes, loader, and layout shell.

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS 4
- Framer Motion
- React Helmet Async
- Axios
- Chart.js and react-chartjs-2
- React Hot Toast
- React Icons

### Backend
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- python-jose for JWT handling
- Passlib and bcrypt for password hashing
- python-multipart for file uploads
- OpenCV headless for image processing
- Pillow and NumPy for image handling
- ReportLab for PDF report generation
- TensorFlow/Keras for CNN inference

### Data and Storage
- PostgreSQL via SQLAlchemy and psycopg2-binary
- Local upload and report folders for generated files during development

## Architecture Overview

```mermaid
flowchart LR
    U[User] --> F[React Frontend]
    F -->|REST API + JWT| B[FastAPI Backend]
    B --> DB[(PostgreSQL)]
    B --> IMG[Uploaded Microscopy Images]
    B --> M[TensorFlow CNN Model\ntrained_model.h5]
    B --> P[PDF Report Generator]
    M --> B
    P --> B
```

### Main Layers

- **Frontend**: handles navigation, forms, dashboard pages, and responsive presentation.
- **API layer**: exposes authentication, patients, samples, images, predictions, and reports endpoints.
- **Service layer**: contains business logic for auth, uploads, predictions, and report creation.
- **Data layer**: uses SQLAlchemy models and database sessions for persistence.
- **ML layer**: loads the trained CNN model and performs image-based inference.

## Machine Learning Model

LabVision AI includes a pre-trained CNN model stored at `backend/app/ml/trained_model.h5`.

### What the model does
- accepts a microscopy image after preprocessing
- runs CNN-based inference through TensorFlow/Keras
- returns a prediction result and confidence score
- supports malaria screening workflows from uploaded blood smear images

### ML pipeline
- image upload through the backend API
- preprocessing before inference
- model prediction through the saved Keras model
- confidence calculation and result packaging
- optional PDF report generation from the prediction result

## Backend Modules

### Authentication
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

Authentication uses JWT bearer tokens and password hashing.

### Patients
- `POST /patients/`
- `GET /patients/`
- `GET /patients/{patient_id}`
- `PUT /patients/{patient_id}`
- `DELETE /patients/{patient_id}`

### Samples
- `POST /samples/`
- `GET /samples/`
- `GET /samples/{sample_id}`
- `PUT /samples/{sample_id}`
- `DELETE /samples/{sample_id}`

### Images
- `POST /images/upload/{sample_id}`

### Predictions
- `POST /predictions/{image_id}`

### Reports
- `GET /reports/{prediction_id}`

## Frontend Pages

- **Home**: public landing page with hero, features, and CTA buttons.
- **Login**: sign-in form.
- **Register**: account creation form.
- **Dashboard**: protected workspace overview.
- **Patients**: patient management UI.
- **Samples**: sample management UI.
- **Upload**: microscopy image upload UI.
- **Prediction**: AI prediction view.
- **Reports**: report download and history view.

## Project Structure

```text
LabVision AI/
├── backend/
│   ├── app/
│   │   ├── api/        # FastAPI route handlers
│   │   ├── core/       # Config, DB, auth dependencies
│   │   ├── ml/         # CNN model, labels, inference helpers
│   │   ├── models/     # SQLAlchemy models
│   │   ├── schemas/    # Pydantic request/response schemas
│   │   └── services/   # Business logic and integrations
│   ├── requirements.txt
│   └── test_db.py
├── frontend/
│   ├── src/
│   │   ├── components/ # Layout, navbar, sidebar, route guards
│   │   ├── context/    # Auth context
│   │   ├── pages/      # Screens
│   │   └── services/   # API client
│   └── package.json
└── README.md
```

## Setup

### Prerequisites
- Python 3.11.9 
- Node.js 18 or newer
- PostgreSQL database
- A `.env` file for backend secrets and database configuration

### Backend Environment Variables
Create `backend/.env` with values similar to the following:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/labvision
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Backend Installation
From the project root:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Installation
From the project root:

```bash
cd frontend
npm install
```

## Execution

### Run the backend

```bash
cd backend
.venv\Scripts\activate
uvicorn app.main:app --reload
```

The backend will be available at `http://127.0.0.1:8000`.

### Run the frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Build and Validation

### Frontend

```bash
cd frontend
npm run build
npm run lint
```

### Backend

```bash
cd backend
python -m py_compile app/main.py
```

If you have database credentials configured, you can also run the backend smoke checks through the app startup path.

## Integrations

- **Frontend to backend API** through Axios and React Router.
- **JWT bearer authentication** for protected routes.
- **Database persistence** through SQLAlchemy and PostgreSQL.
- **Image upload and preprocessing** through FastAPI, Pillow, NumPy, and OpenCV.
- **AI inference** through TensorFlow/Keras and the stored CNN model.
- **PDF report generation** through ReportLab.
- **CORS configuration** for local frontend development and the deployed web origin already present in the backend configuration.

## Deployment

- The frontend is deployed on Vercel.
- The backend is deployed on Render.
- Frontend API calls are handled via a centralized Axios instance, while backend CORS middleware is configured to  permit cross-origin requests from authorized client domains.
## License

No license file is currently included in the repository.
