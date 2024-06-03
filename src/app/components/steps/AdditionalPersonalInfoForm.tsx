'use client'

import { useForm } from "react-hook-form";
import { Field, Label, } from '@headlessui/react'
import { useFormState } from "../FormContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

type IFormValues = {
    birthDate: string,
    gender: string,
};

export default function AdditionalPersonalInfoForm() {
    const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();
    const { register, handleSubmit, formState: { isValid }, setValue } = useForm<IFormValues>({
        defaultValues: formData,
        mode: 'onChange'
    });
    const [startDate, setStartDate] = useState(formData.birthDate ? new Date(formData.birthDate) : null);
    const textFieldBirthDate = register('birthDate', { required: true })


    const genres = [
        {
            name: 'Masculino',
            active: true,
        },
        {
            name: 'Femenino',
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
                    <h2 className="text-2xl font-extrabold dark:text-white">Información personal adicional</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Por favor completa los siguientes campos.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <Field className="sm:col-span-4">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="birthDate">Fecha de nacimiento</Label>
                            <div className="mt-2 ">
                                <div className="relative max-w-sm">
                                    <DatePicker
                                        selected={startDate}
                                        {...textFieldBirthDate}
                                        id="birthDate"
                                        onChange={(e: any) => {
                                            setValue('birthDate', e.toDateString())
                                            setStartDate(e)
                                        }}
                                    />

                                </div>
                            </div>
                        </Field>

                        <Field className="sm:col-span-4">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="gender">Género</Label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    {...register("gender")}
                                    required
                                >
                                    {genres.map(genre => genre.active ? <option key={genre.name}>{genre.name}</option> : null)}
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
