import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface IFormContent {
    onHandleNext: () => void;
    onHandleBack: () => void;
    onHandleRestart: () => void;
    step: number;
    formData: IFormData;
    setFormData: Dispatch<SetStateAction<IFormData>>;
}

const FormContext = createContext<IFormContent>({

    onHandleNext: () => { },
    onHandleBack: () => { },
    onHandleRestart: () => { },
    step: 1,
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
    setFormData: () => { },
});

interface IProps {
    children: ReactNode;
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

const initialForm: IFormData = {
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
};

export function FormProvider({ children }: IProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<IFormData>(initialForm);

    function onHandleNext() {
        setStep((prevStep) => prevStep + 1);
    }
    function onHandleBack() {
        setStep((prevStep) => prevStep - 1);
    }
    function onHandleRestart() {
        setFormData(initialForm);
        setStep(1);
    }

    return <FormContext.Provider value={{ onHandleBack, onHandleNext, step, formData, setFormData, onHandleRestart }}>{children}</FormContext.Provider>
}

export function useFormState() {
    return useContext(FormContext);
}