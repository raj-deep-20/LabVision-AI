export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role?: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export type PatientRecord = {
  patient_code: string;
  patient_id?: string;
  name: string;
  age: number;
  gender: string;
  blood_group: string;
  phone: string;
  doctor: string;
  visit_date: string;
  created_at?: string;
};

export type SampleRecord = {
  sample_code: string;
  patient_code: string;
  sample_type: string;
  status: string;
  collection_date: string;
  remarks?: string | null;
  created_at?: string;
};

export type ImageRecord = {
  sample_code: string;
  image_name: string;
  image_path: string;
};

export type PredictionRecord = {
  sample_code: string;
  disease: string;
  confidence: number;
  image_quality: string;
  rbc_count: number;
  wbc_count: number;
  platelet_count: number;
};

export type PatientCreatePayload = {
  name: string;
  age: number;
  gender: string;
  blood_group: string;
  phone: string;
  doctor: string;
  visit_date: string;
};

export type SampleCreatePayload = {
  patient_code: string;
  sample_type: string;
  collection_date: string;
  remarks?: string | null;
};
