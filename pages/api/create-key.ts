// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CreateApiKeyRequest } from 'aws-sdk/clients/apigateway'
import type { NextApiRequest, NextApiResponse } from 'next'
const AWS = require('aws-sdk')
import { getSession } from 'next-auth/client'

type Data = {
    name: string
}

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_DNRM,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DNRM,
    },
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'POST') {
        return res.status(400).send({
            message: 'Should be POST request',
        })
    }

    const session = await getSession({ req })

    if (!session || session?.user?.email != 'daniel@medina.com') {
        res.status(403).send({
            status: 403,
            message: 'Unauthorised',
        })
        return
    }

    const AWS = require('aws-sdk')

    AWS.config.region = 'us-east-1'

    const apigateway = new AWS.APIGateway()
    let key

    let params: CreateApiKeyRequest = {
        name: 'Test',
        description: 'Test API Key',
        enabled: true,
        stageKeys: [
            {
                restApiId: 'zhhh6msy84',
                stageName: 'default',
            },
        ],
    }

    try {
        apigateway.createApiKey(params, (err: any, data: any) => {
            if (err) {
                res.status(500).send({
                    status: 500,
                    message: 'Internal server error',
                })
                return
            } else {
                key = data

                apigateway.createUsagePlanKey(
                    {
                        usagePlanId: 'c0ms8z',
                        keyId: key.id,
                        keyType: 'API_KEY',
                    },
                    (err: any, data: any) => {
                        if (err) {
                            res.status(500).send({
                                status: 500,
                                message: 'Internal server error',
                            })
                            return
                        } else {
                            res.status(200).send({
                                status: 200,
                                message: 'Key created successfully',
                                key: data,
                            })
                            return
                        }
                    }
                )
            }
        })
    } catch (e) {
        console.log('Creation failed')
    }
}
