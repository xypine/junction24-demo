<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { User } from "$lib/server/db/schema";
  import House from "lucide-svelte/icons/house";
  import Inbox from "lucide-svelte/icons/inbox";
  import Settings from "lucide-svelte/icons/settings";
  import UserIcon from "lucide-svelte/icons/user";
	import type { SvelteComponentTyped } from "svelte";
	type NavItem = {
		title: string,
		url: string,
    icon: string
	};

  let { user }: { user: User | null } = $props();

	const navitems_left: NavItem[] = [
		{
			title: "Home",
			url: "/",
      //@ts-ignore
      icon: House,
		},
		{
			title: "Conversations",
			url: "/conversations",
      //@ts-ignore
      icon: Inbox
		},
	];
	const navitems_right: NavItem[] = [
    //@ts-ignore
		user ? {
			title: "You",
			url: "/user",
      icon: UserIcon
		} : {
			title: "Authenticate",
			url: "/sms",
      icon: UserIcon
		}
	];
</script>
 
<Sidebar.Root variant="sidebar">
  <Sidebar.Header>
    <h1>Polly</h1>
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
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
