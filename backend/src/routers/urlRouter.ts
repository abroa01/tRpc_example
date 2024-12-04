import { z } from 'zod'
import { trpc } from '../context.ts'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const urlRouter = trpc.router({

    getShortUrl : trpc.procedure
                                .input(z.string())
                                .query(async ({ input }) => {
                                    const url = await prisma.url.findUnique({
                                        where:{
                                            shortUrl: input
                                        }
                                    })

                                    if(!url){
                                        throw new Error('Url not found') 
                                    }
                                    return url.originalurl


                                }),

    createShorturl: trpc.procedure
                                .input(z.object({url: z.string().url()}))
                                .mutation(async ({ input }) =>{
                                    const shortUrl  = Math.random().toString(36).substring(2,8);
                                    await prisma.url.create({
                                        data: {
                                            originalurl: input.url,
                                            shortUrl
                                        }
                                    })
                                    return shortUrl

                                })                                

})

export type UrlRouter =  typeof urlRouter;