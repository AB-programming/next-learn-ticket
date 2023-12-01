import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

interface UserRequest {
    userId: string;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const {userId} = (await request.json()) as UserRequest;

        if (!userId) {
            return NextResponse.json({
                message: "Bad Request"
            }, {status: 400});
        }

        let user = await prisma.user.findUnique({
            where: {
                userId: userId
            }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    userId: userId
                }
            })
        }

        return NextResponse.json({
            user
        }, {status: 200});
    } catch (e) {
        console.error("🚀 ~ file: route.ts:13 ~ POST ~ e:", e);
        return NextResponse.json(
            {
                message: "Internal Error",
            },
            { status: 500 }
        );
    }
}
