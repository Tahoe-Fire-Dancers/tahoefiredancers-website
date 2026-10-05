<script lang="ts">
	let submitted = $state(false);
	let submitting = $state(false);

	let businessName = $state('');
	let email = $state('');
	let firstName = $state('');
	let lastName = $state('');
	let phone = $state('');
	let startDate = $state('');
	let endDate = $state('');
	let performers = $state('');
	let showType = $state('Dancing');
	let budget = $state('');
	let notes = $state('');

	function formatPhone(value: string): string {
		const digits = value.replace(/\D/g, '').slice(0, 10);
		if (digits.length > 6) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
		if (digits.length > 3) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
		if (digits.length > 0) return `(${digits}`;
		return '';
	}

	function handlePhoneInput(e: Event) {
		const input = e.target as HTMLInputElement;
		phone = formatPhone(input.value);
		input.value = phone;
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitting = true;
		setTimeout(() => {
			submitting = false;
			submitted = true;
		}, 600);
	}
</script>

<div class="max-w-screen-xl sm:px-4 py-8 sm:mx-auto text-twhite shadow-inner w-full">
	{#if submitted}
		<div class="alert alert-success text-black text-center p-8 rounded-lg max-w-lg mx-auto">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
			<h3 class="text-xl font-bold mb-2">Thank you for your inquiry!</h3>
			<p>We'll get back to you shortly about your booking request.</p>
		</div>
	{:else}
		<form onsubmit={handleSubmit} class="text-white">
			<!-- Business Name -->
			<div class="relative z-0 w-full mb-6 group">
				<label for="business_name" class="block mb-2 text-sm font-medium">Business Name</label>
				<input
					type="text"
					id="business_name"
					bind:value={businessName}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					placeholder="Business Name"
					required
				/>
			</div>

			<!-- Email -->
			<div class="relative z-0 w-full mb-6 group">
				<label for="email" class="block mb-2 text-sm font-medium">Your Email</label>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
						</svg>
					</div>
					<input
						type="email"
						id="email"
						bind:value={email}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
						placeholder="email@address.com"
					/>
				</div>
			</div>

			<!-- First / Last Name -->
			<div class="grid md:grid-cols-2 md:gap-6">
				<div class="relative z-0 w-full mb-6 group">
					<label for="first_name" class="block mb-2 text-sm font-medium">First Name</label>
					<input
						id="first_name"
						type="text"
						bind:value={firstName}
						class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
				<div class="relative z-0 w-full mb-6 group">
					<label for="last_name" class="block mb-2 text-sm font-medium">Last Name</label>
					<input
						id="last_name"
						type="text"
						bind:value={lastName}
						class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
			</div>

			<!-- Phone / Dates -->
			<div class="grid md:grid-cols-3 md:gap-6">
				<div class="relative z-0 w-full mb-6 group">
					<label for="booking_phone" class="block mb-2 text-sm font-medium">Phone number</label>
					<input
						id="booking_phone"
						type="tel"
						value={phone}
						oninput={handlePhoneInput}
						class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
						placeholder="(123) 456-7890"
						required
					/>
				</div>
				<div class="relative z-0 w-full mb-6 group">
					<label for="start_date" class="block mb-2 text-sm font-medium">Start Date</label>
					<input
						id="start_date"
						type="date"
						bind:value={startDate}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					/>
				</div>
				<div class="relative z-0 w-full mb-6 group">
					<label for="end_date" class="block mb-2 text-sm font-medium">End Date</label>
					<input
						id="end_date"
						type="date"
						bind:value={endDate}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					/>
				</div>
			</div>

			<!-- Performers / Show Type / Budget -->
			<div class="grid md:grid-cols-3 md:gap-6 pt-4 pb-6">
				<div>
					<label for="performers" class="block mb-2 text-sm font-medium text-white"># of Performers</label>
					<input
						id="performers"
						type="number"
						bind:value={performers}
						class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
						required
						min="1"
					/>
				</div>
				<div class="mt-6 md:mt-0">
					<label for="show_type" class="block mb-2 text-sm font-medium text-white">Fire show types</label>
					<select
						id="show_type"
						bind:value={showType}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					>
						<option>Dancing</option>
						<option>Sword Swallowing</option>
						<option>Burlesque</option>
						<option>Clowns</option>
						<option>Shock and Awe</option>
					</select>
				</div>
				<div>
					<label for="budget" class="block mb-2 text-sm font-medium text-white">Budget</label>
					<input
						id="budget"
						type="text"
						bind:value={budget}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="$"
					/>
				</div>
			</div>

			<!-- Notes -->
			<div class="mb-6">
				<label for="notes" class="block mb-2 text-sm font-medium text-white">Anything Else</label>
				<textarea
					id="notes"
					rows="4"
					bind:value={notes}
					class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Leave a comment..."
				></textarea>
			</div>

			<div class="py-4">
				<button
					type="submit"
					disabled={submitting}
					class="text-white bg-torange hover:bg-tblue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{submitting ? 'Sending...' : 'Submit'}
				</button>
			</div>
		</form>
	{/if}
</div>
