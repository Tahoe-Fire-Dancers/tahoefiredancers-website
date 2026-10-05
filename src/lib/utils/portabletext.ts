type Span = {
	_key?: string;
	_type: 'span';
	text: string;
	marks?: string[];
};

type MarkDef = {
	_key: string;
	_type: string;
	href?: string;
};

type Block = {
	_key?: string;
	_type: string;
	style?: string;
	children?: Span[];
	listItem?: string;
	level?: number;
	markDefs?: MarkDef[];
	asset?: { url?: string };
	url?: string;
	alt?: string;
};

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function renderChildren(children: Span[], markDefs: MarkDef[]): string {
	return (children || [])
		.map((child) => {
			if (child._type !== 'span') return '';
			let text = escapeHtml(child.text || '');

			if (child.marks && child.marks.length > 0) {
				for (const mark of [...child.marks].reverse()) {
					const markDef = markDefs.find((m) => m._key === mark);
					if (markDef) {
						if (markDef._type === 'link') {
							text = `<a href="${escapeHtml(markDef.href || '')}" class="text-torange hover:underline" target="_blank" rel="noopener noreferrer">${text}</a>`;
						}
					} else {
						switch (mark) {
							case 'strong':
								text = `<strong>${text}</strong>`;
								break;
							case 'em':
								text = `<em>${text}</em>`;
								break;
							case 'underline':
								text = `<u>${text}</u>`;
								break;
							case 'code':
								text = `<code class="bg-base-300 px-1 rounded text-sm">${text}</code>`;
								break;
							case 'strike-through':
								text = `<s>${text}</s>`;
								break;
						}
					}
				}
			}

			return text;
		})
		.join('');
}

export function blocksToHtml(blocks: Block[] | null | undefined): string {
	if (!blocks || !Array.isArray(blocks)) return '';

	const result: string[] = [];
	let inList = false;
	let listType = '';

	for (const block of blocks) {
		if (block._type !== 'block') {
			if (inList) {
				result.push(listType === 'bullet' ? '</ul>' : '</ol>');
				inList = false;
			}
			if (block._type === 'image' && block.asset?.url) {
				result.push(
					`<img src="${escapeHtml(block.asset.url)}" alt="${escapeHtml(block.alt || '')}" class="rounded-lg my-4 max-w-full" />`
				);
			}
			continue;
		}

		const children = renderChildren(block.children || [], block.markDefs || []);

		if (block.listItem) {
			if (!inList || listType !== block.listItem) {
				if (inList) result.push(listType === 'bullet' ? '</ul>' : '</ol>');
				listType = block.listItem;
				inList = true;
				result.push(
					block.listItem === 'bullet'
						? '<ul class="list-disc ml-6 mb-3">'
						: '<ol class="list-decimal ml-6 mb-3">'
				);
			}
			result.push(`<li class="mb-1">${children}</li>`);
		} else {
			if (inList) {
				result.push(listType === 'bullet' ? '</ul>' : '</ol>');
				inList = false;
			}

			switch (block.style) {
				case 'h1':
					result.push(`<h1 class="text-4xl font-bold text-torange mt-6 mb-3">${children}</h1>`);
					break;
				case 'h2':
					result.push(`<h2 class="text-3xl font-bold text-torange mt-5 mb-2">${children}</h2>`);
					break;
				case 'h3':
					result.push(
						`<h3 class="text-2xl font-semibold text-torange mt-4 mb-2">${children}</h3>`
					);
					break;
				case 'h4':
					result.push(`<h4 class="text-xl font-semibold mt-3 mb-1">${children}</h4>`);
					break;
				case 'h5':
					result.push(`<h5 class="text-lg font-semibold mt-3 mb-1">${children}</h5>`);
					break;
				case 'h6':
					result.push(`<h6 class="text-base font-semibold mt-2 mb-1">${children}</h6>`);
					break;
				case 'blockquote':
					result.push(
						`<blockquote class="border-l-4 border-torange pl-4 italic my-3 text-gray-300">${children}</blockquote>`
					);
					break;
				default:
					if (children.trim()) {
						result.push(`<p class="mb-3 leading-relaxed">${children}</p>`);
					}
					break;
			}
		}
	}

	if (inList) {
		result.push(listType === 'bullet' ? '</ul>' : '</ol>');
	}

	return result.join('\n');
}
