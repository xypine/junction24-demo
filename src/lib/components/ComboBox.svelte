<script lang="ts">
 import Check from "lucide-svelte/icons/check";
 import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
 import { tick } from "svelte";
 import * as Command from "$lib/components/ui/command/index.js";
 import * as Popover from "$lib/components/ui/popover/index.js";
 import { Button } from "$lib/components/ui/button/index.js";
 import { cn } from "$lib/utils.js";
 import { type Municipality, municipalities } from "@/municipalities";
 
 let { placeholder, value = $bindable(undefined) }: { placeholder: string, value: Municipality | undefined } = $props();
 
 let open = $state(false);
 let triggerRef = $state<HTMLButtonElement>(null!);
 
 const selectedValue = $derived(
   value
 );
 
 // We want to refocus the trigger button when the user selects
 // an item from the list so users can continue navigating the
 // rest of the form with the keyboard.
 function closeAndFocusTrigger() {
  open = false;
  tick().then(() => {
   triggerRef.focus();
  });
 }
</script>
 
<Popover.Root bind:open>
 <Popover.Trigger bind:ref={triggerRef}>
  {#snippet child({ props })}
   <Button
    variant="outline"
    class="w-[200px] justify-between"
    {...props}
    role="combobox"
    aria-expanded={open}
   >
    {selectedValue || placeholder}
    <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
   </Button>
  {/snippet}
 </Popover.Trigger>
 <Popover.Content class="w-[200px] p-0">
  <Command.Root>
   <Command.Input placeholder="Search municipality..." />
   <Command.List>
    <Command.Empty>Not found.</Command.Empty>
    <Command.Group>
     {#each municipalities as option}
      <Command.Item
       value={option}
       onSelect={() => {
        value = option;
        closeAndFocusTrigger();
       }}
      >
       <Check
        class={cn(
         "mr-2 size-4",
         value !== option && "text-transparent"
        )}
       />
       {option}
      </Command.Item>
     {/each}
    </Command.Group>
   </Command.List>
  </Command.Root>
 </Popover.Content>
</Popover.Root>
