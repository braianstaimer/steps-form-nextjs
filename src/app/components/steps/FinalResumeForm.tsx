'use client'

import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import clsx from 'clsx'

type IFormValues = {
    notifications: boolean,
    howHeard: string,
    termsAgreed: boolean,
};

import { useAppDispatch, useAppSelector } from "@/@store";
import { resetFormData } from "@/@store/main";
import { Button } from "@headlessui/react";


export default function FinalResumeForm() {
    const { handleSubmit, } = useForm<IFormValues>();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const formDataState = useAppSelector((state) => state.main.formData);
    const formDataUpdatedState = useAppSelector((state) => state.main.updated);


    function onHandleFormSubmit(data: IFormValues) {
        dispatch(resetFormData());
        router.push('/');
    }

    return (
        <form onSubmit={handleSubmit(onHandleFormSubmit)} className={clsx(!formDataUpdatedState && "h-dvh")}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    {
                        !formDataUpdatedState
                            ?
                            <div id="toast-warning" className="flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                                    </svg>
                                    <span className="sr-only">Warning icon</span>
                                </div>
                                <div className="ms-3 text-sm font-normal">Primero debe completar el formulario.</div>
                                <Button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                                    <span className="sr-only">Close</span>
                                </Button>
                            </div>
                            :
                            <>
                                <div id="toast-success" className="flex items-center w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        <span className="sr-only">Check icon</span>
                                    </div>
                                    <div className="ms-3 text-sm font-normal">El formulario se ha enviado correctamente, acá te dejamos el resumen de la información.</div>
                                    <Button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                                        <span className="sr-only">Close</span>
                                    </Button>
                                </div>
                                <br />

                                <h2 className="text-2xl font-extrabold dark:text-white">Información personal</h2>
                                <p className="my-4 text-gray-500"><b>Nombre completo:</b> {formDataState.fullName}</p>
                                <p className="my-4 text-gray-500"><b>Correo electrónico:</b> {formDataState.email}</p>
                                <p className="my-4 text-gray-500"><b>Teléfono:</b> {formDataState.phoneNumber}</p>
                                <br />
                                <h2 className="text-2xl font-extrabold dark:text-white">Dirección</h2>
                                <p className="my-4 text-gray-500"><b>Dirección:</b> {formDataState.streetAddress}</p>
                                <p className="my-4 text-gray-500"><b>Ciudad:</b> {formDataState.city}</p>
                                <p className="my-4 text-gray-500"><b>Código postal:</b> {formDataState.postalCode}</p>
                                <p className="my-4 text-gray-500"><b>País:</b> {formDataState.country}</p>
                                <br />
                                <h2 className="text-2xl font-extrabold dark:text-white">Detalles de la cuenta</h2>
                                <p className="my-4 text-gray-500"><b>Usuario:</b> {formDataState.username}</p>
                                <p className="my-4 text-gray-500"><b>Contraseña:</b> {formDataState.password}</p>
                                <p className="my-4 text-gray-500"><b>Confirmar contraseña:</b> {formDataState.confirmPassword}</p>
                                <p className="my-4 text-gray-500"><b>Perfil de usuario:</b> {formDataState.profileType}</p>
                                <br />
                                <h2 className="text-2xl font-extrabold dark:text-white">Detalles de la cuenta</h2>
                                <p className="my-4 text-gray-500"><b>Usuario:</b> {formDataState.username}</p>
                                <p className="my-4 text-gray-500"><b>Contraseña:</b> {formDataState.password}</p>
                                <p className="my-4 text-gray-500"><b>Confirmar contraseña:</b> {formDataState.confirmPassword}</p>
                                <p className="my-4 text-gray-500"><b>Perfil de usuario:</b> {formDataState.profileType}</p>
                                <br />
                                {formDataState.profileType === 'Personal'
                                    ? <>
                                        <h2 className="text-2xl font-extrabold dark:text-white">Información personal adicional</h2>
                                        <p className="my-4 text-gray-500"><b>Fecha de nacimiento:</b> {formDataState.birthDate}</p>
                                        <p className="my-4 text-gray-500"><b>Género:</b> {formDataState.gender}</p>
                                    </>
                                    : <>
                                        <h2 className="text-2xl font-extrabold dark:text-white">Información de Negocios</h2>
                                        <p className="my-4 text-gray-500"><b>Nombre de la compañía:</b> {formDataState.companyName}</p>
                                        <p className="my-4 text-gray-500"><b>Tamaño de la compañía:</b> {formDataState.companySize}</p>
                                        <p className="my-4 text-gray-500"><b>Rol en la compañía:</b> {formDataState.rolInCompany}</p>
                                    </>}
                                <br />
                                <h2 className="text-2xl font-extrabold dark:text-white">Preferencias</h2>
                                <p className="my-4 text-gray-500"><b>¿Le gustaría recibir notificaciones por correo electrónico?:</b> {formDataState.notifications ? 'Sí' : 'No'}</p>
                                <p className="my-4 text-gray-500"><b>¿Cómo se enteró de nuestro servicio?:</b> {formDataState.howHeard}</p>
                                <p className="my-4 text-gray-500"><b>Estoy de acuerdo con los términos y condiciones:</b> {formDataState.termsAgreed ? 'Sí' : 'No'}</p>
                            </>
                    }

                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Enviar nuevo formuario
                </Button>
            </div>
        </form>
    )
}
