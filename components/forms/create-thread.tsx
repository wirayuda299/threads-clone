'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { createThread } from '@/lib/actions/thread.action';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

const formSchema = z.object({
	caption: z.string(),
});

export default function ThreadForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { caption: '' },
	});
	const [pending, setPending] = useState(false);

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			setPending(true);
			await createThread(
				data.caption,
				'thread',
				window.location.pathname,
				undefined
			);
		} catch (e) {
			if (e instanceof Error) {
				toast({
					title: e.message,
					variant: 'destructive',
				});
			}
		} finally {
			setPending(false);
		}
	};

	return (
		<section className='h-full w-full overflow-y-auto px-7 pb-32 pt-7'>
			<h1 className='py-5 text-2xl font-semibold'>Create Thread</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='h-full w-full space-y-8'
				>
					<FormField
						control={form.control}
						name='caption'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Editor
										apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
										initialValue=''
										onEditorChange={(content) => field.onChange(content)}
										init={{
											advcode_inline: true,
											xss_sanitization: true,
											branding: false,
											height: 500,
											menubar: false,
											plugins: [
												'advlist',
												'autolink',
												'lists',
												'link',
												'image',
												'codesample',
												'charmap',
												'preview',
												'anchor',
												'searchreplace',
												'visualblocks',
												'code',
												'fullscreen',
												'insertdatetime',
												'media',
												'table',
												'code',
												'help',
											],
											codesample_languages: [
												{ text: 'HTML/XML', value: 'markup' },
												{ text: 'JavaScript', value: 'javascript' },
												{ text: 'CSS', value: 'css' },
												{ text: 'PHP', value: 'php' },
												{ text: 'Ruby', value: 'ruby' },
												{ text: 'Python', value: 'python' },
												{ text: 'Java', value: 'java' },
												{ text: 'C', value: 'c' },
												{ text: 'C#', value: 'csharp' },
												{ text: 'C++', value: 'cpp' },
											],

											toolbar:
												'Write preview CodeOfConduct |' +
												'bold italic underline strikethrough forecolor codesample link image alignleft aligncenter alignright alignjustify bullist numlist |',
											content_style: `
                    body { 
                      font-family:Helvetica,Arial,sans-serif; font-size:16px; 
                      background-color:#121417;
                      color:#fff !important;
                     }`,
										}}
									/>
								</FormControl>
								<FormMessage className='dark:text-red-500' />
							</FormItem>
						)}
					/>
					<Button
						disabled={pending}
						type='submit'
						className='w-full bg-primary-500'
					>
						{pending ? 'Uploading...' : 'Publish'}
					</Button>
				</form>
			</Form>
		</section>
	);
}
