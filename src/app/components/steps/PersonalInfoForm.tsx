'use client'

import { useForm } from "react-hook-form";
import { useFormState } from "../FormContext";

import clsx from 'clsx'
import { Field, Label } from '@headlessui/react'

type IFormValues = {
    fullName: string,
    email: string,
    phoneNumber: string,
};

export default function PersonalInfoForm() {
    const { onHandleNext, setFormData, formData } = useFormState();
    const { register, handleSubmit, formState: { isValid } } = useForm<IFormValues>({
        defaultValues: formData,
        mode: 'onChange'
    });

    function onHandleFormSubmit(data: IFormValues) {
        setFormData(prevFormData => ({ ...prevFormData, ...data }));
        onHandleNext();
    }

    return (
        <form onSubmit={handleSubmit(onHandleFormSubmit)} className="h-dvh">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-extrabold dark:text-white">Información personal</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Por favor completa los siguientes campos.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <Field className="sm:col-span-4">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="fullName">Nombre completo</Label>
                            <div className="mt-2">
                                <input
                                    type='text'
                                    id='fullName'
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...register("fullName")}
                                    required
                                    pattern="[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+ [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$"
                                />
                            </div>
                        </Field>

                        <Field className="sm:col-span-4">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">Correo electronico</Label>
                            <div className="mt-2">
                                <input
                                    type='email'
                                    id='email'
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...register("email")}
                                    required
                                />
                            </div>
                        </Field>

                        <Field className="sm:col-span-4">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="phoneNumber">Teléfono</Label>
                            <div className="mt-2">
                                <input
                                    type='text'
                                    id='phoneNumber'
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...register("phoneNumber")}
                                    required
                                    pattern="[0-9]+$"
                                />
                            </div>
                        </Field>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className={
                        clsx('rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                            //    !isValid && 'opacity-50 cursor-not-allowed'
                        )
                    }
                    disabled={!isValid}
                >
                    Continuar
                </button>
            </div>
        </form>
    )
}