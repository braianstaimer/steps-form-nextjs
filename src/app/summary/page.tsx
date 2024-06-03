'use client'

import {
  Disclosure,
} from '@headlessui/react'
import { FormProvider } from '../components/FormContext'
import FinalResumeForm from '../components/steps/FinalResumeForm'
import ReduxProvider from "@/@store/redux-provider";


export default function Summary() {

  return (
    <ReduxProvider>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
              </div>
            </div>
          </div>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Formulario de registro</h1>
          </div>
        </header>
        <main>
          <div className=" mx-auto p-2 max-w-7xl py-6 sm:px-6 lg:px-8">
            <FormProvider>
              <FinalResumeForm />
            </FormProvider>
          </div>
        </main>
      </div>
      </ReduxProvider>
  )
}
