import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface Data {
    dataAbout?: AboutProps | null,
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

export interface CurrentImages {
    'about-bg'?: string;
    diploma?: string;
    'master-photo'?: string;
}
