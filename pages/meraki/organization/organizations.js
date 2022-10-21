import React, { useState } from 'react';
import { axios_instance_apiMeraki } from "../../../utils/meraki/axios"
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const Organizations = (props) => {
    const { organizations } = props
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        router.push(`/meraki/network/${data.organisationId}`)
    }

    return (
        <div>
            <div class="relative">
                <div aria-hidden="true" class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                    <div class="blur-[106px] h-56 bg-gradient-to-br from-[#9333EA] to-purple-500 dark:from-blue-700"></div>
                    <div class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                </div>
                <>
                    <div class="relative pt-36 ml-auto">
                        <div class="lg:w-2/3 text-center mx-auto">
                            <h1 class="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Administration des configurations <span class="text-primary dark:text-white">pour les équipements CISCO MERAKI</span></h1>
                            <p class="mt-8 text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>


                            <form onSubmit={handleSubmit(onSubmit)} class="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                                <div class="form-control w-full max-w-xs">
                                    <select {...register("organisationId", { required: true, message: "Merci de selectioner une organisation." })} class="select select-bordered">
                                        <option disabled selected value="">Organisation</option>
                                        {organizations.map((organization, index) => {
                                            return <option value={organization.id} key={"organizationOption_" + index}>{organization.name}</option>
                                        })}
                                    </select>
                                    {errors.organisationId && errors.organisationId.type === "required" && <label class="label">
                                        <span class="label-text-alt text-red-600">Merci de selectionner une organisation.</span>
                                    </label>}
                                </div>
                                <button type="submit" class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">Administrer</button>
                            </form>

                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const organizations = await axios_instance_apiMeraki.get("/organizations").then(response => { return response.data });
    console.log("organizations = " + JSON.stringify(organizations))
    return {
        props: {
            organizations: organizations
        }, // will be passed to the page component as props
    }
}


export default Organizations;