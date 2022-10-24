import React from 'react';
import { axios_instance_apiMeraki } from "../../../utils/meraki/axios"
import { useRouter } from 'next/router'

const Networks = (props) => {
    const { organizationId, organizationName, networks } = props
    const router = useRouter()
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

                                            Retour</button>

                                        <button onClick={() => router.push(`/meraki/alerts/configuration?organizationId=${organizationId}&organizationName=${organizationName}&networkId=${networks[0].id}`)} className="btn btn-primary">Configuration</button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="table w-full">
                                            <thead>
                                                <tr>
                                                    <th>Liste des networks</th>
                                                    <th>Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {networks.map((network, index) => {
                                                    return <tr key={"mapNetworks_" + index}>
                                                        <th>{index + 1}</th>
                                                        <td>{network.name}</td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
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
    const { organizationId, organizationName } = context.query;

    const networks = await axios_instance_apiMeraki.get(`/organizations/${organizationId}/networks`).then(response => { return response.data });

    return {
        props: {
            organizationId: organizationId,
            organizationName: organizationName,
            networks: networks || []
        }, // will be passed to the page component as props
    }
}

export default Networks;