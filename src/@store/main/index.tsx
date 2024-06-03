import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface IMainState {
  formData: IFormData,
  updated: boolean
}

interface IFormData {
  fullName: string,
  email: string,
  phoneNumber: string,
  username: string,
  password: string,
  confirmPassword: string,
  profileType: string,
  streetAddress: string,
  city: string,
  postalCode: string,
  country: string,
  birthDate: string,
  gender: string,
  notifications: boolean,
  howHeard: string,
  termsAgreed: boolean,
  companyName: string,
  companySize: string,
  rolInCompany: string,
}


const initialForm: IMainState = {
  formData: {
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    profileType: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
    birthDate: "",
    gender: "",
    notifications: false,
    howHeard: "",
    termsAgreed: false,
    companyName: "",
    companySize: "",
    rolInCompany: "",
  },
  updated: false,
};

const initialState: IMainState = initialForm;

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<IFormData>) => {
      state.formData = action.payload;
      state.updated = true;
    },
    resetFormData: (state) => {
      state = initialForm;
    },
  },
});

export const { updateFormData, resetFormData } = mainSlice.actions;

export default mainSlice.reducer;
