import { axios_instance_apiMeraki } from "../../../../utils/meraki/axios";
export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                var { organizationId, putObjects } = req.body

                if (!putObjects, !organizationId) {
                    res.status(400).json({ sucess: false, message: "Données invalides." })
                    return;
                }

                const putDataForApi =
                {
                    defaultDestinations: {
                        emails: [
                        ],
                        allAdmins: true,
                        snmp: false,
                        httpServerIds: []
                    },
                    alerts: putObjects

                }

                const networks = await axios_instance_apiMeraki.get(`/organizations/${organizationId}/networks`).then(response => { return response.data });

                for await (const network of networks) {
                    await axios_instance_apiMeraki.put(`/networks/${network.id}/alerts/settings`, putDataForApi)
                        .then(response => { return response.data })
                }

                res.status(201).json({ success: true, message: "La configuration a bien été modifiée." })
            } catch (error) {
                res.status(500).json({ success: false, message: "Une erreur c'est produite pendant la modification de la configuration." })
            }

            break;
    }

    return;
}
