
export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                console.log("API WEBHOOK MERAKI call : " + JSON.stringify(req))
                res.status(201).json({ success: true, message: "Retour de l'api meraki" })
            } catch (error) {
                console.error(error)
                res.status(500).json({ success: false, message: "Une erreur c'est produite pendant le traitement du signal webhook meraki" })
            }

            break;
    }

    return;
}
