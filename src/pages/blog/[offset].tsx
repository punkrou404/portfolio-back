import React from 'react';
import { Pagination } from '~/components/pagination';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import Card from '~/components/card';
import PageHead from '~/components/page-head';
import { Content } from '~/pages/api/blogs';

const PER_PAGE = 5;

interface BlogOffsetInput {
    blog: Content[];
    totalCount: number;
    offset: number;
}

type blogOffsetPaths = `/blog/${number}`;

/**
 * Returns an array of serial numbers of integer values ​​starting with START and ending with END
 * @param {number} start
 * @param {number} end
 * @returns {number[]} serial numbers
 */
const range = (start, end) => {
    return [...Array(end - start + 1)].map((_, i) => start + i);
};

const BlogOffset = ({ blog, totalCount, offset }: BlogOffsetInput): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: `/blog/${String(offset)}`,
        },
        {
            id: 3,
            text: String(offset),
        },
    ]);

    return (
        <div>
            <PageHead
                subtitle={`Blog page.${offset}`}
                description={`Blog list`}
                image={``}
                url={``}
            />
            <Pagination totalCount={totalCount} />
            {blog.map((content) => (
                <Card props={content} key={content.id} />
            ))}
            <Pagination totalCount={totalCount} />
        </div>
    );
};

export const getStaticProps = async (context: {
    params: { offset: number };
}): Promise<{
    props: BlogOffsetInput;
}> => {
    const offset = context.params.offset;
    const res = await fetch(
        `${process.env.MYDOMAIN_BASEURL}/api/blogs?${new URLSearchParams({
            offset: String(offset),
        })}`,
        {
            method: 'GET',
        }
    );
    const json = await res.json();

    return {
        props: {
            blog: json.contents,
            totalCount: json.totalCount,
            offset,
        },
    };
};

export const getStaticPaths = async (): Promise<{
    paths: blogOffsetPaths[];
    fallback: boolean;
}> => {
    const res = await fetch(`${process.env.MYDOMAIN_BASEURL}/api/blogs`, {
        method: 'GET',
    });
    const json = await res.json();

    const paths = range(1, Math.ceil(json.totalCount / PER_PAGE)).map(
        (offset) => `/blog/${offset}` as blogOffsetPaths
    );

    return { paths, fallback: false };
};

export default BlogOffset;
