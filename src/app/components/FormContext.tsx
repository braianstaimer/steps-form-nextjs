import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


import useAxios from '@/@hooks/useAxios';;


const { callService } = useAxios();
interface IFormContent {
    onHandleNext: () => void;
    onHandleBack: () => void;
    onHandleRestart: () => void;
    step: number;
    formData: IFormData;
    setFormData: Dispatch<SetStateAction<IFormData>>;
    onHandleSubmit: () => Promise<boolean>;
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
    onHandleSubmit: async () => false,
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
        console.log('step: ', step);
        setStep((prevStep) => prevStep + 1);
    }
    function onHandleBack() {
        setStep((prevStep) => prevStep - 1);
    }
    function onHandleRestart() {
        setFormData(initialForm);
        setStep(1);
    }


    async function onHandleSubmit(): Promise<boolean> {
        try {
            let personalEndpoint = 'https://run.mocky.io/v3/892bc38b-c7e2-4432-a478-2eac4df57942';
            let businessEndpoint = 'https://run.mocky.io/v3/e1724715-51d4-4ed2-b20f-cd3c59659e47';
            let url;
            let data = null;
            if (formData.profileType === 'Personal') url = personalEndpoint;
            else url = businessEndpoint;

            data = await callService({ url: url, }).post(formData);

            if (data.status === 'success') return true;
            else return false;
        } catch (err) {
            return false;
        }
    }

    return <FormContext.Provider value={{ onHandleBack, onHandleNext, step, formData, setFormData, onHandleSubmit, onHandleRestart }}>{children}</FormContext.Provider>
}

export function useFormState() {
    return useContext(FormContext);
}