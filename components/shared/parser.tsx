import parse from 'html-react-parser';

export default function Parser({ content }: { content: string }) {
	return (
		<div className='prose-p:text-gray-200 !flex-1 prose-img:w-full prose-img:object-contain prose-strong:text-gray-200 prose-h2:font-semibold prose-h2:text-lg text-sm prose-ul:text-gray-200 prose-li:text-gray-200 prose-code:text-inherit prose-a:text-blue-600 prose-p:my-0 py-1 prose-p:max-h-96 overflow-x-hidden'>
			{parse(content)}
		</div>
	);
}
