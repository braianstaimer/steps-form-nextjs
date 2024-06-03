import useAxios from "@/@hooks/useAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface IMainState {
  formData: IFormData,
  updated: boolean,
  processing: boolean,
  hasError: boolean
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
  processing: false,
  hasError: false,
};

const initialState: IMainState = initialForm;


export const sendFormDataAction = createAsyncThunk(
  'forms/create',
  async (body: any) => {

    const { callService } = useAxios();
    return await callService({
      url: body.url,
    }).post(body.data);
  }
);

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

  extraReducers: (builder) => {

    /* SHORTEN PASTE */
    builder.addCase(sendFormDataAction.pending, (state) => {
      state.processing = true;
    });
    builder.addCase(sendFormDataAction.rejected, (state) => {
      state.processing = false;
      state.hasError = true;
    });
    builder.addCase(sendFormDataAction.fulfilled, (state) => {
      state.processing = false;
    });
  },
});

export const { updateFormData, resetFormData } = mainSlice.actions;

export default mainSlice.reducer;
