"use client"

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Page() {

    const { t } = useLanguage();
    const router = useRouter();

    return (
        <div className="h-screen flex flex-col p-5 items-center w-full justify-between">
            <div className="space-y-4 flex flex-col items-center">
                <h1 className="text-2xl font-bold">{t("introTitle")}</h1>
                <p className="text-muted-foreground text-sm text-center leading-relaxed">{t("welcomeIntro")}</p>
            </div>


            <div className='flex flex-col gap-y-3'>
                <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-black rounded-full !py-6"
                    onClick={() => {router.push('/onboarding')}}>
                    {t("signUp")}
                </Button>
                <Button
                    className="w-full bg-gray-100 hover:bg-orange-600 text-black rounded-full !py-6"
                    onClick={() => { router.push('/signin')}}>
                    {t("logIn")}
                </Button>
                <p className="text-muted-foreground text-sm text-center leading-relaxed">{t("introRule")}</p>
            </div>

        </div>
    )
}
