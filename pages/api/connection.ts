import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_ACCESS_KEY_ID) {
        res.status(200).send({
            result: false,
        })
    } else {
        res.status(200).send({
            result: true,
        })
    }
}
