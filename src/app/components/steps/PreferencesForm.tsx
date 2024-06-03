'use client'

import { useForm } from "react-hook-form";
import { Button, Field, Input, Label } from '@headlessui/react'
import { useFormState } from "../FormContext";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "@/@store";
import { sendFormDataAction, updateFormData } from "@/@store/main";

type IFormValues = {
    notifications: boolean,
    howHeard: string,
    termsAgreed: boolean,
};

export default function PreferencesForm() {
    const { onHandleBack, setFormData, formData } = useFormState();
    const { register, handleSubmit, formState: { isValid } } = useForm<IFormValues>({
        defaultValues: formData
    });
    const router = useRouter();
    const dispatch = useAppDispatch();
    const formDataUpdatedState = useAppSelector((state) => state.main.updated);
    const formDataErrorState = useAppSelector((state) => state.main.hasError);


    const [confirmSubmitError, setConfirmSubmitError] = useState('');


    useEffect(() => {
        if (formDataUpdatedState) router.push('/summary');
    }, [formDataUpdatedState, router]);

    useEffect(() => {
        if (formDataErrorState) setConfirmSubmitError('Ha ocurrido un error, por favor revisa que la información esté correcta, he intente de nuevo');
    }, [formDataErrorState]);

    async function onHandleFormSubmit(data: IFormValues) {
        setConfirmSubmitError('');

        let personalEndpoint = 'https://run.mocky.io/v3/892bc38b-c7e2-4432-a478-2eac4df57942';
        let businessEndpoint = 'https://run.mocky.io/v3/e1724715-51d4-4ed2-b20f-cd3c59659e47';
        let url;
        if (formData.profileType === 'Personal') url = personalEndpoint;
        else url = businessEndpoint;

        dispatch(sendFormDataAction({ url, data: { ...formData, ...data } }));
        dispatch(updateFormData({ ...formData, ...data }));
    }


    const servicesOptions = [
        {
            name: 'Anuncios online',
            active: true,
        },
        {
            name: 'Referencia de amigos',
            active: true,
        },
        {
            name: 'Redes sociales',
            active: true,
        },
        {
            name: 'Otros',
            active: true,
        },
    ]
    function onHandleFormBack(data: IFormValues) {
        onHandleBack();
        setFormData(prevFormData => ({
            ...prevFormData, ...data,
        }));
    }

    return (
        <form onSubmit={handleSubmit(onHandleFormSubmit)} className="h-dvh">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <h2 className="text-2xl font-extrabold dark:text-white">Preferencias</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Por favor completa los siguientes campos.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <Field className="col-span-full">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Notificaciones</legend>
                            <div className="flex items-center gap-x-3">
                                <Input
                                    id="notifications"
                                    type="checkbox"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    {...register("notifications")}
                                />
                                <Label className="block text-sm font-medium leading-6 text-gray-900 ml-2" htmlFor="notifications">¿Le gustaría recibir notificaciones por correo electrónico?</Label>
                            </div>
                        </Field>
                        <Field className="col-span-full">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">¿Cómo se enteró de nuestro servicio?</legend>
                            {
                                servicesOptions.map((option, index) =>
                                    option.active ?
                                        <div className="flex items-center gap-x-3" key={index}>
                                            <Input
                                                id={option.name}
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                value={option.name}
                                                {...register("howHeard")}
                                                required
                                            />
                                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="howHeard">{option.name}</Label>
                                        </div>
                                        : null
                                )
                            }
                        </Field>

                        <Field className="col-span-full">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Terminos y condiciones</legend>
                            <div className="flex items-center gap-x-3">
                                <Input
                                    id="termsAgreed"
                                    type="checkbox"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    {...register("termsAgreed")}
                                    required
                                />
                                <Label className="block text-sm font-medium leading-6 text-gray-900 ml-2" htmlFor="termsAgreed">Estoy de acuerdo con los términos y condiciones</Label>
                            </div>
                        </Field>
                    </div>
                </div>
                {confirmSubmitError && <p className="my-4 text-red-500">{confirmSubmitError}</p>}
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleSubmit(onHandleFormBack)}>
                    Regresar
                </Button>
                <Button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Enviar
                </Button>
            </div>
        </form >
    )
}
