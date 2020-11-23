import fs from 'fs';
import html from 'remark-html';
import path from 'path';
import matter from 'gray-matter';
import { PostMetaData } from '../lib/types';
import remark from 'remark';

const postsDirectory = path.join(process.cwd(), 'src/pages/posts');

const getAllPostIds = (): Array<{
    params: { id: string };
}> => {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
};

const getPostData = async (id: string) => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
};

const getSortedPostsData = (): Array<PostMetaData> => {
    // /posts/ 配下のファイル名を取得
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // idを取得するために`.md`を削除
        const id = fileName.replace(/\.md$/, '');

        // 文字列としてmarkdown読み込む
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // gray-matter を使用してメタデータを取得
        const matterResult = matter(fileContents);

        // idとメタデータを返却
        return {
            id,
            ...(matterResult.data as { date: string; title: string }),
        };
    });

    // 日付でポストをソート
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
};

export { getAllPostIds, getPostData, getSortedPostsData };
