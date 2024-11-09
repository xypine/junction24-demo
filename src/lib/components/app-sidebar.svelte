<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { User } from '$lib/server/db/schema';
	import House from 'lucide-svelte/icons/house';
	import Inbox from 'lucide-svelte/icons/inbox';
	import SquarePen from 'lucide-svelte/icons/square-pen';
	import Settings from 'lucide-svelte/icons/settings';
	import UserIcon from 'lucide-svelte/icons/user';
	import type { SvelteComponentTyped } from 'svelte';

	import logo from '$lib/assets/pollytext.png';

	type NavItem = {
		title: string;
		url: string;
		icon: string;
		submenu?: NavItem[];
	};

	let { user }: { user: User | null } = $props();

	const navitems_left: NavItem[] = [
		{
			title: 'Home',
			url: '/',
			//@ts-ignore
			icon: House
		},
		{
			title: 'Discussions',
			url: '/discussions',
			//@ts-ignore
			icon: Inbox,
			submenu: [
				{
					title: 'New',
					url: '/discussions/new',
					icon: SquarePen
				}
			]
		}
	];
	const navitems_right: NavItem[] = [
		//@ts-ignore
		user
			? {
					title: 'You',
					url: '/user',
					icon: UserIcon
				}
			: {
					title: 'Authenticate',
					url: '/sms',
					icon: UserIcon
				}
	];
</script>

<Sidebar.Root variant="sidebar">
	<Sidebar.Header>
		<img src={logo} alt="Pol.ly text logo" />
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each navitems_right as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each navitems_left as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
									{#if item.submenu}
										<Sidebar.MenuSub>
											{#each item.submenu as subitem (subitem.title)}
												<Sidebar.MenuSubItem>
													<Sidebar.MenuSubButton>
														<a href={subitem.url} {...props}>
															<subitem.icon />
															<span>{subitem.title}</span></a
														>
													</Sidebar.MenuSubButton>
												</Sidebar.MenuSubItem>
											{/each}
										</Sidebar.MenuSub>
									{/if}
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
