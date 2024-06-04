import { useFormState } from "./FormContext";
import UserProfileForm from "./steps/UserProfileForm";
import AddressInfoForm from "./steps/AddressInfoForm";
import PersonalInfoForm from "./steps/PersonalInfoForm";
import AdditionalPersonalInfoForm from "./steps/AdditionalPersonalInfoForm";
import PreferencesForm from "./steps/PreferencesForm";
import BusinessInfoForm from "./steps/BusinessInfoForm";

export function FormStep() {
    const { step, formData } = useFormState();

    switch (step) {
        case 1:
            return <PersonalInfoForm />;
        case 2:
            return <AddressInfoForm />;
        case 3:
            return <UserProfileForm />;
        case 4:
            if (formData.profileType === 'Personal')
                return <AdditionalPersonalInfoForm />;
            else return <BusinessInfoForm />;
        case 5:
            return <PreferencesForm />;
        default:
            return <PersonalInfoForm />;
    }
}