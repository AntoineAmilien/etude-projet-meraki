import React, { useState } from 'react';
import { axios_instance_apiMeraki } from "../../../utils/meraki/axios"
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import Spinner from "react-spinners/PacmanLoader";

const Configuration = (props) => {
    const { organizationId, organizationName, alertsConfiguration } = props;
    const router = useRouter()
    const [message, setMessage] = useState(null)
    const [displaySpinner, setDisplaySpinner] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmitConfiguration = async data => {
        try {
            setDisplaySpinner(true)
            const baseObject = {
                type: "applianceDown",
                enabled: data.applianceDown,
                alertDestinations: {
                    emails: [],
                    snmp: false,
                    allAdmins: false,
                    httpServerIds: []
                },
                filters: {
                    timeout: 5,
                }
            }

            await axios.post("/api/meraki/alerts/configuration", { "organizationId": organizationId, "putObjects": [baseObject] })
                .catch(_error => setMessage({ type: "error", message: "Une erreur c'est produite." }))
            setDisplaySpinner(false)
            setMessage({ type: "success", message: "La nouvelle configuration a bien été prise en compte." })
        } catch (_error) {
            setMessage({ type: "error", message: "Une erreur c'est produite." })
            setDisplaySpinner(false)
        }

    };

    return (
        <div>
            <div>
                <div className="relative">
                    <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                        <div className="blur-[106px] h-56 bg-gradient-to-br from-[#9333EA] to-purple-500 dark:from-blue-700"></div>
                        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                    </div>
                    <>
                        <div className="relative pt-12 ml-auto p-8">
                            <div className="card w-full bg-base-100 shadow-xl">

                                <div className="card-body">
                                    <h2 className="card-title"> Configuration des networks</h2>
                                    <p>Organisation selectionnée : {organizationName}</p>

                                    <div className="card-actions justify-end">
                                        <button onClick={() => router.back()} className="btn btn-outline gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                            </svg>
                                            Retour
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitConfiguration)}>
                                        <div className="flex flex-col w-full border-opacity-50">
                                            <div className="divider">Network-wide</div>
                                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
                                                <ul>
                                                    <li>
                                                        <div className="form-control">
                                                            <label className="label cursor-pointer">
                                                                <input type="checkbox" className="toggle toggle-primary" {...register("applianceDown", { value: alertsConfiguration.alerts.filter(el => { return el.type === "applianceDown" })[0].enabled })} />
                                                                <span className="ml-4 label-text">A security appliance goes offline for 5 minutes</span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="divider">Wireless</div>
                                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center">...</div>
                                            <div className="divider">Security appliance</div>
                                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center">...</div>
                                            <div className="divider">Switch</div>
                                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center">...</div>
                                        </div>
                                        <div className="flex mt-4 justify-end">
                                            <div>
                                                {displaySpinner === false ? <>
                                                    <input type="submit" className="btn btn-primary" value="Sauvegarder cette configuration" />
                                                    {message && <p className={message.type == "success" ? "text-green-500" : "text-red-500"}>{message.message}</p>}
                                                </> : <div className='flex mr-10'>
                                                    <p className='text-neutral mr-5'>Merci de patienter quelques instants : </p>
                                                    <Spinner color="#570DF8" size={10} />
                                                </div>}

                                            </div>
                                        </div>
                                    </form>



                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>

        </div >
    );
};

export async function getServerSideProps(context) {
    const { organizationId, organizationName, networkId } = context.query;

    const alertsConfiguration = await axios_instance_apiMeraki.get(`/networks/${networkId}/alerts/settings`).then(response => { return response.data });

    return {
        props: {
            organizationId: organizationId,
            organizationName: organizationName,
            networkId: networkId,
            alertsConfiguration: alertsConfiguration || []
        }, // will be passed to the page component as props
    }
}


export default Configuration;
