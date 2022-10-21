import React from 'react';
import { axios_instance_apiMeraki } from "../../../utils/meraki/axios"

const Networks = (props) => {
    const { networks } = props
    return (
        <div>
            {networks.map((network, index) => {
                return <button type="button" key={"mapNetworks_" + index}>
                    {network.name}
                </button>
            })}
        </div>
    );
};

export async function getServerSideProps(context) {
    const { organizationId } = context.query;
    const networks = await axios_instance_apiMeraki.get(`/organizations/${organizationId}/networks`).then(response => { return response.data });

    console.log("networks = " + JSON.stringify(networks))

    return {
        props: {
            networks: networks || []
        }, // will be passed to the page component as props
    }
}


export default Networks;