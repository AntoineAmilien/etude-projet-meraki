
export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'GET':
            try {
                console.log("API WEBHOOK MERAKI call : " + req)
                res.status(201).json({ success: true, message: "La configuration a bien été modifiée." })
            } catch (error) {
                console.error(error)
                res.status(500).json({ success: false, message: "Une erreur c'est produite pendant la modification de la configuration." })
            }

            break;
    }

    return;
}
