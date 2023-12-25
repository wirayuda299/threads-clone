import parse from 'html-react-parser';

export default function Parser({ content }: { content: string }) {
	return (
		<div className='!flex-1 overflow-x-hidden py-1 text-sm prose-h2:text-lg prose-h2:font-semibold prose-p:my-0 prose-p:max-h-96 prose-p:text-gray-200 prose-a:text-blue-600 prose-strong:text-gray-200 prose-code:text-inherit prose-ul:text-gray-200 prose-li:text-gray-200 prose-img:w-full prose-img:object-contain'>
			{parse(content)}
		</div>
	);
}
