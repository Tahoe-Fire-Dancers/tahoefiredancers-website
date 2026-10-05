<script lang="ts">
	const email = 'claire@tahoefiredancers.org';
	const phone = '+5303913009';

	let formEmail = $state('');
	let formPhone = $state('');
	let formMessage = $state('');
	let submitted = $state(false);
	let alreadySubmitted = $state(false);

	function formatPhone(value: string): string {
		const digits = value.replace(/\D/g, '').slice(0, 10);
		if (digits.length > 6) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
		if (digits.length > 3) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
		if (digits.length > 0) return `(${digits}`;
		return '';
	}

	function handlePhoneInput(e: Event) {
		const input = e.target as HTMLInputElement;
		formPhone = formatPhone(input.value);
		input.value = formPhone;
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (localStorage.getItem('TFCFormSent') === 'true') {
			alreadySubmitted = true;
			return;
		}
		localStorage.setItem('TFCFormSent', 'true');
		submitted = true;
		formEmail = '';
		formPhone = '';
		formMessage = '';
	}
</script>

<div class="w-full p-4 text-twhite text-center shadow-sm sm:p-8">
	<h5 class="mb-2 text-3xl font-bold">Claire Nightingale</h5>
	<div class="mb-5 text-xl sm:text-lg">
		<ul class="list-none">
			<li>
				<a href={`mailto:${email}`} class="hover:text-tteal">Email: {email}</a>
			</li>
			<li>
				<a href={`tel:${phone}`} class="hover:text-tteal">Phone: {phone}</a>
			</li>
		</ul>
	</div>
</div>

<div class="w-full flex justify-center">
	<div class="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 max-w-md bg-white shadow-lg rounded-lg p-6">
		<h5 class="mb-4 text-lg font-semibold text-black uppercase text-center">Contact Us</h5>
		<div class="divider divider-warning"></div>

		{#if alreadySubmitted}
			<div class="alert alert-warning text-black">
				You have already submitted a form. Please wait 24 hours before submitting again.
			</div>
		{:else if submitted}
			<div class="alert alert-success text-black">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				Form Submitted Successfully! We'll be in touch soon.
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label for="contact_email" class="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
					<input
						id="contact_email"
						type="email"
						bind:value={formEmail}
						class="block w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
						placeholder="name@company.com"
						required
					/>
				</div>

				<div>
					<label for="contact_phone" class="block mb-2 text-sm font-medium text-gray-900">Phone</label>
					<input
						id="contact_phone"
						type="tel"
						value={formPhone}
						oninput={handlePhoneInput}
						class="block w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
						placeholder="(123) 456-7890"
						required
					/>
				</div>

				<div>
					<label for="contact_message" class="block mb-2 text-sm font-medium text-gray-900">Your Message</label>
					<textarea
						id="contact_message"
						rows="4"
						bind:value={formMessage}
						class="block w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Your message..."
						required
					></textarea>
				</div>

				<button
					type="submit"
					class="w-full mt-4 text-white bg-torange hover:bg-tteal font-medium rounded-lg text-sm px-5 py-2.5"
				>
					Send Message
				</button>
			</form>
		{/if}
	</div>
</div>
