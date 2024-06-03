'use client'

import { useForm } from "react-hook-form";
import { useFormState } from "../FormContext";

import { Field, Label } from '@headlessui/react'

type IFormValues = {
    streetAddress: string,
    city: string,
    postalCode: string,
    country: string,
};

export default function AddressInfoForm() {
    const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();
    const { register, handleSubmit, formState: { isValid } } = useForm<IFormValues>({
        defaultValues: formData,
        mode: 'onChange'
    });


    const countries = [
        {
            name: 'Estados Unidos',
            active: true,
        },
        {
            name: 'México',
            active: true,
        },
        {
            name: 'Canada',
            active: true,
        },
        {
            name: 'Japón',
            active: false,
        },
        {
            name: 'Guatemala',
            active: true,
        },
    ]

    function onHandleFormSubmit(data: IFormValues) {
        setFormData(prevFormData => ({ ...prevFormData, ...data }));
        onHandleNext();
    }
    return (
        <form onSubmit={handleSubmit(onHandleFormSubmit)} className="h-dvh">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-extrabold dark:text-white">Información de la dirección</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Por favor completa los siguientes campos.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <Field className="col-span-full">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="street-address">Dirección</Label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="street-address"
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...register("streetAddress")}
                                    required
                                />
                            </div>
                        </Field>
                        <Field className="sm:col-span-3 sm:col-start-1">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="city">Ciudad</Label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="city"
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...register("city")}
                                    required
                                />
                            </div>
                        </Field>
                        <Field className="sm:col-span-3 ">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="postalCode">Código postal</Label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="postalCode"
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...register("postalCode")}
                                    required
                                    pattern="[0-9]+$"
                                />
                            </div>
                        </Field>
                        <Field className="sm:col-span-3 ">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="country">País</Label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...register("country")}
                                    required
                                >
                                    {countries.map(country => country.active ? <option key={country.name}>{country.name}</option> : null)}
                                </select>
                            </div>
                        </Field>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={onHandleBack}>
                    Regresar
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={!isValid}
                >
                    Continuar
                </button>
            </div>
        </form >
    )
}
