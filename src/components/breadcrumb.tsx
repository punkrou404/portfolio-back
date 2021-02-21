import React, { FC } from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
    id: number;
    text: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: string;
}

type BreadcrumbItemE = string | JSX.Element;

const Breadcrumb: FC<BreadcrumbProps> = ({ items, separator = '>' }) => {
    return (
        <>
            {items
                .map((item: BreadcrumbItem) =>
                    item.href != null ? (
                        <span key={item.text} className="active:text-blue-600 hover:bg-blue-300">
                            <Link href={item.href}>{item.text}</Link>
                        </span>
                    ) : (
                        <span key={item.text}>{item.text}</span>
                    )
                )
                .reduce((p: BreadcrumbItemE[], c) => {
                    return p.length === 0 ? [c] : [...p, ` ${separator} `, c];
                }, [])}
        </>
    );
};

export default Breadcrumb;
