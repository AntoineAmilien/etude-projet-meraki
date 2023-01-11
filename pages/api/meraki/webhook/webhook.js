import { axios_instance_nxoSMTP } from "../../../../utils/meraki/axios";

export default async function handler(req, res) {
    const { method, body } = req;
    console.log("method = " + method);
    switch (method) {
        case 'POST':
            try {
                console.log("API WEBHOOK MERAKI call body: " + JSON.stringify(body))

                const objetMail = {
                    "auth_key": "MsFzurfZmN", //token de dev
                    "to": "antoine.amilien@nxo.eu",
                    "subject": `[MERAKI ALERTE] ${body.organizationName} sur le site : ${body.networkName} `,
                    "content": [{
                        "type": "HEAD",
                        "title": `[MERAKI ALERTE] ${body.organizationName} sur le site : ${body.networkName} `,
                        "message": ""
                    },
                    {
                        "type": "BODY",
                        "title": "Contenu de l'alerte : ",
                        "message": `${JSON.stringify(body)}`
                    },
                    {
                        "type": "BODY",
                        "title": "le titre du body 2",
                        "message": "le message du body 2",
                        "buttonMessage": "button body 2",
                        "buttonLink": "https://google.com"
                    },
                    {
                        "type": "CONTACT",
                        "telephone": "0612121212",
                        "mail": "foo@bar.qux"
                    }
                    ],
                    "template": "BASE"
                };

                await axios_instance_nxoSMTP.post('', objetMail, {})
                    .then(function (response) {
                        console.log("reponse deu axios qui push le mail : " + response);
                    })

                res.status(201).json({ success: true, message: "Retour de l'api meraki" })
            } catch (error) {
                console.error(error)
                res.status(500).json({ success: false, message: "Une erreur c'est produite pendant le traitement du signal webhook meraki " + error })
            }
            break;
    }

    return;
}
