'use client'

import { useForm } from "react-hook-form";
import { useFormState } from "../FormContext";
import {  Button, Field, Input, Label } from '@headlessui/react'
import {  useState } from "react";

type IFormValues = {
    username: string,
    password: string,
    confirmPassword: string,
    profileType: string,
};

export default function UserProfileForm() {
    const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();
    const { register, handleSubmit, formState: { isValid } } = useForm<IFormValues>({
        defaultValues: formData,
        mode: 'onChange'
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(formData.confirmPassword);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const textFieldPassword = register('password', { required: true })
    const textFieldConfirmPassword = register('confirmPassword', { required: true })


    const accountTypes = [
        {
            name: 'Personal',
            active: true,
        },
        {
            name: 'Business',
            active: true,
        },

    ]
    function onHandleFormSubmit(data: IFormValues) {
        setFormData(prevFormData => ({ ...prevFormData, ...data }));
        onHandleNext();
    }


    const handlePasswordChange = (e: any) => {
        const pwd = e.target.value;
        setPassword(pwd);

        if (confirmPassword && pwd !== confirmPassword) {
            setConfirmPasswordError('Las contraseñas no coinciden.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e: any) => {
        const confirmPwd = e.target.value;
        setConfirmPassword(confirmPwd);
        if (confirmPwd !== password) {
            setConfirmPasswordError('Las contraseñas no coinciden.');
        } else {
            setConfirmPasswordError('');
        }
    };

    function onHandleFormBack(data: IFormValues) {
        setFormData(prevFormData => ({ ...prevFormData, ...data }));
        onHandleBack();
    }
    return (
        <form onSubmit={handleSubmit(onHandleFormSubmit)} className="h-dvh">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-extrabold dark:text-white">Detalles de la cuenta</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Por favor completa los siguientes campos.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <Field className="sm:col-span-4">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="username">Usuario</Label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">monoma.io/</span>
                                    <Input
                                        type="text"
                                        id="username"
                                        className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                        placeholder="usuario..."
                                        {...register('username')}
                                        required
                                        pattern=".{3,}"
                                    />
                                </div>
                            </div>
                        </Field>

                        <Field className="sm:col-span-4">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">Contraseña</Label>
                            <div className="mt-2">
                                <Input
                                    type='password'
                                    id='password'
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...textFieldPassword}
                                    onChange={(e) => {
                                        textFieldPassword.onChange(e);
                                        handlePasswordChange(e);
                                    }}
                                    autoComplete="password"
                                    pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
                                />
                            </div>
                        </Field>
                        <Field className="sm:col-span-4">
                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="confirmPassword">Confirmar contraseña</Label>
                            <div className="mt-2">
                                <Input
                                    type='password'
                                    id='confirmPassword'
                                    className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                    {...textFieldConfirmPassword}
                                    onChange={(e) => {
                                        textFieldConfirmPassword.onChange(e);
                                        handleConfirmPasswordChange(e);
                                    }}
                                    autoComplete="password"
                                    required
                                    pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
                                />
                                {confirmPasswordError && <p className="text-red-500 text-xs italic">{confirmPasswordError}</p>}
                            </div>
                        </Field>


                        <Field className="col-span-full">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Perfil de usuario</legend>
                            {
                                accountTypes.map(type =>
                                    type.active ?
                                        <div className="flex items-center gap-x-3" key={type.name}>
                                            <Input
                                                id={type.name}                                                
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                value={type.name}
                                                {...register("profileType")}
                                                required
                                            />
                                            <Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="profileType">{type.name}</Label>
                                        </div>
                                        : null
                                )
                            }
                        </Field>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleSubmit(onHandleFormBack)}>
                    Regresar
                </Button>
                <Button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={!isValid || !!confirmPasswordError}
                >
                    Continuar
                </Button>
            </div>
        </form >
    )
}
