import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface Data {
    dataAbout?: AboutProps | null;
    siteConfig?: SiteConfig | null;
    currentImages?: CurrentImages | null;
}

export interface AboutProps {
    name: string,
    title: string,
    experience: string,
    description: string,
    achievements: Array<string>,
    motto: string
}

export interface NavItem {
    label: string;
    href: string;
}

export interface ContactInfo {
    phone: string;
    phoneFormatted: string;
    email: string;
    address: string;
    addressShort: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    workingHours: string;
    workingHoursDetailed: {
        weekdays: string;
        weekend: string;
    };
    metro?: string;
    parking?: string;
}

export interface SocialLinks {
    telegram: string;
    whatsapp: string;
    instagram: string;
    vk: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    duration: number;
    price: number;
    benefits: string[];
}

export interface SpecialOfferConsultation {
    enabled: boolean;
    title: string;
    description: string;
    duration: number;
    price?: number;
}

export interface SpecialOfferPackage {
    id: string;
    enabled: boolean;
    title: string;
    description: string;
    sessions: number;
    serviceId: string;
    originalPrice: number;
    discountPrice: number;
    discount: number;
    savings: number;
}

export interface SpecialOffers {
    enabled: boolean;
    consultation: SpecialOfferConsultation;
    packages: SpecialOfferPackage[];
}

export interface AdvantageItem {
    title: string;
    description: string;
    icon: string;
}

export interface TestimonialItem {
    name: string;
    rating: number;
    text: string;
    date: string;
}

export interface SeoInfo {
    keywords: string[];
    ogImage: string;
}

export interface SiteConfig {
    name: string;
    fullName: string;
    description: string;
    navItems: NavItem[];
    contact: ContactInfo;
    social: SocialLinks;
    services: ServiceItem[];
    specialOffers: SpecialOffers;
    advantages: AdvantageItem[];
    testimonials: TestimonialItem[];
    seo: SeoInfo;
    images: CurrentImages;
    about: AboutProps
}

export type AdminConfig = SiteConfig & {
    about: AboutProps;
};

export interface CurrentImages {
    'about-bg'?: string;
    'advantages-bg'?: string;
    diploma?: string;
    'master-photo'?: string;
}
