'use client'

import { useForm } from "react-hook-form";
import { Field, Label, } from '@headlessui/react'
import { useFormState } from "../FormContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

type IFormValues = {
    companyName: string,
    companySize: string,
    rolInCompany: string,
};

export default function BusinessInfoForm() {
    const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();
    const { register, handleSubmit, formState: { isValid }, setValue } = useForm<IFormValues>({
        defaultValues: formData,
        mode: 'onChange'
    });


    const sizeOptions = [
        {
            name: '1-10',
            active: true,
        },
        {
            name: '11-50',
            active: true,
        },
        {
            name: '51-200',
            active: true,
        },
        {
            name: '201-500',
            active: true,
        },
        {
            name: '500+',
            active: true,
        },
    ]

    function onHandleFormSubmit(data: IFormValues) {
        setFormData(prevFormData => ({ ...prevFormData, ...data }));
        onHandleNext();
    }
    return (
        <form onSubmit={handleSubmit(onHandleFormSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-extrabold dark:text-white">Información del negocio</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Por favor completa los siguientes campos.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <Field className="sm:col-span-4">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="fullName">Nombre de la compañía</Label>
                            <div className="mt-2">
                                <input
                                    type='text'
                                    id='fullName'
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...register("companyName")}
                                    required
                                />
                            </div>
                        </Field>

                        
                        <Field className="col-span-full">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Tamaño de la compañía</legend>
                            {
                                sizeOptions.map(size =>
                                    size.active ?
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id={size.name}
                                                key={size.name}
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                value={size.name}
                                                {...register("companySize")}
                                                required
                                            />
                                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="profileType">{size.name}</Label>
                                        </div>
                                        : null
                                )
                            }
                        </Field>

                        <Field className="sm:col-span-4">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="fullName">Rol en la compañía</Label>
                            <div className="mt-2">
                                <input
                                    type='text'
                                    id='fullName'
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...register("rolInCompany")}
                                    required
                                />
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
