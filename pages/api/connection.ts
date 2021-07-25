import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!process.env.AWS_ACCESS_KEY_ID_DNRM || !process.env.AWS_SECRET_ACCESS_KEY_ID_DNRM) {
        res.status(200).send({
            result: false,
        })
    } else {
        res.status(200).send({
            result: true,
        })
    }
}
