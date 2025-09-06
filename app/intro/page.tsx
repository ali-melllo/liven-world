"use client"

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import { FlickeringGrid } from '@/components/magicui/flickering-grid';

export default function Page() {

    const { t } = useLanguage();
    const router = useRouter();

    return (
        <div className="h-dvh flex flex-col p-5 pt-10 items-center w-full justify-between">
            <div className="space-y-4 flex flex-col items-center">
                <p className="text-muted-foreground text-sm text-center leading-relaxed">{t("welcomeIntro")}</p>
            </div>


            <motion.div
                className=" h-48 flex items-center justify-center pointer-events-none"
                style={{ opacity: 1, scale: 1 }}
            >
                <FlickeringGrid
                    className="absolute inset-0 z-0 [mask-image:radial-gradient(150px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
                    squareSize={5}
                    gridGap={6}
                    color="#f97316"
                    maxOpacity={0.8}
                    flickerChance={0.1}
                // height={800}
                // width={800}
                />
                <div className="absolute h-20 w-full top-0 bg-gradient-to-b from-background to-transparent" />
                <div className="absolute h-20 w-full bottom-0 bg-gradient-to-t from-background to-transparent" />

                <h2
                    className="text-5xl md:text-8xl z-50 lg:text-9xl font-extrabold bg-gradient-to-br from-primary to-primary/75 bg-clip-text text-transparent"
                    style={{
                        textShadow: "4px 4px 10px rgba(0,0,0,0.3)",
                    }}
                >
                    {t("introTitle")}
                </h2>



            </motion.div>

            <div className='flex flex-col gap-y-3'>
                <Button
                    className="w-full text-white bg-orange-500 hover:bg-orange-600 rounded-full !py-6"
                    onClick={() => { router.push('/onboarding') }}>
                    {t("signUp")}
                </Button>
                <Button
                    className="w-full bg-muted hover:bg-transparent text-black rounded-full !py-6"
                    onClick={() => { router.push('/signin') }}>
                    {t("logIn")}
                </Button>
                <p className="text-muted-foreground text-sm text-center leading-relaxed">{t("introRule")}</p>
            </div>

        </div>
    )
}
