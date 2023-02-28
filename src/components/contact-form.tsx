import {Turnstile} from '@marsidev/react-turnstile';
import {useState} from 'react';
import toast from 'react-hot-toast';

export function ContactForm() {
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	if (submitted) {
		return (
			<div className="text-center">
				<h2 className="text-2xl font-bold">Thanks!</h2>
				<p className="text-black/80">I'll get back to you as soon as possible.</p>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-1">
				<h2 className="font-title text-lg font-bold">Let's talk</h2>
				<p>Drop me a message with the form below, I'll get back to the emails that are not spam...</p>
			</div>

			<form
				onSubmit={async event => {
					event.preventDefault();

					const values = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());

					setLoading(true);

					const promise = fetch('/api/contact', {
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify(values),
						method: 'POST',
					});

					await toast
						.promise(promise, {
							success: 'Success!',
							loading: 'Sending...',
							error: (error: Error) => error?.message ?? 'Something went wrong...',
						})
						.then(async () => {
							setSubmitted(true);
						})
						.catch(() => null)
						.finally(() => {
							setLoading(false);
						});
				}}
				method="POST"
				action="/api/contact"
				className="space-y-2 [&>label]:block [&_input]:rounded-md [&_textarea]:rounded-md"
			>
				<label htmlFor="email">
					<input type="email" name="email" id="email" required placeholder="me@mtheman.org" className="w-full" />
				</label>

				<label htmlFor="body">
					<textarea id="body" name="body" rows={5} required placeholder="Your message" className="w-full resize-y" />
				</label>

				<Turnstile
					options={{responseFieldName: 'turnstile'}}
					style={{display: 'none'}}
					siteKey="6Ld9D7skAAAAAOs1QoJg_zKF2vYVwol1zy6rtyJl"
				/>

				<button
					disabled={loading}
					type="submit"
					className="relative float-right w-1/2 overflow-hidden rounded-md bg-black p-2 text-white"
				>
					Send
					{loading && (
						<span className="absolute inset-0 flex items-center justify-center bg-black">
							<span className="h-4 w-4 animate-spin rounded-[50%] border-2 border-white/0 border-l-white border-t-white" />
						</span>
					)}
				</button>
			</form>
		</>
	);
}
