
"use client";
import React, { useEffect } from 'react';
import HeadingDescription from './HeadingDescription';
import Lookup from '@/app/_data/Lookup';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
// import { useUser } from '@/hooks/useUser';
import { useUser } from '@clerk/nextjs';
// import SignInButton from '@/components/SignInButton';
import { SignInButton } from '@clerk/nextjs';
// import { Link } from 'lucide-react';
import Link from 'next/link';

function PricingModel({ formData }) {
    const { user } = useUser();
    useEffect(() => {
        if (formData?.title && typeof window !== 'undefined') {
            localStorage.setItem('formData', JSON.stringify(formData));
        }
    }, [formData]);
  
    return (
        <div>
            <HeadingDescription
                title={Lookup.LogoPricingModelTitle}
                description={Lookup.LogoPricingModelDesc}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {Lookup.pricingOption.map((pricing, index) => (
                    <div
                        className="flex flex-col items-center p-5 border rounded-xl mt-5"
                        key={index}
                    >
                        <Image
                            src={pricing.icon}
                            alt={pricing.title}
                            width={60}
                            height={60}
                        />
                        <h2 className='font-medium text-xl'>{pricing.title}</h2>
                        <div>
                            {pricing.features.map((feature, featureIndex) => (
                                <h2 className='text-lg mt-3' key={featureIndex}>{feature}</h2>
                            ))}
                        </div>
                        {user ?
                        <Link href={'/generate-logo?type='+pricing.title}>
                            <Button className="mt-5">{pricing.button}</Button> 
                            </Link> 
                            : 
                            <SignInButton mode='modal' forceRedirectUrl={'/generate-logo?type='+pricing.title}>
                                <Button className="mt-5">{pricing.button}</Button>
                            </SignInButton>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PricingModel;