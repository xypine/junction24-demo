<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from "./ui/button";
</script>

<Card.Root class="w-10/12 bg-transparent shadow-none">
    <Card.Content class="flex justify-evenly">
        <div class="button flex-1">
            <Button type="submit" class="w-full"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRodW1icy11cCI+PHBhdGggZD0iTTcgMTB2MTIiLz48cGF0aCBkPSJNMTUgNS44OCAxNCAxMGg1LjgzYTIgMiAwIDAgMSAxLjkyIDIuNTZsLTIuMzMgOEEyIDIgMCAwIDEgMTcuNSAyMkg0YTIgMiAwIDAgMS0yLTJ2LThhMiAyIDAgMCAxIDItMmgyLjc2YTIgMiAwIDAgMCAxLjc5LTEuMTFMMTIgMmEzLjEzIDMuMTMgMCAwIDEgMyAzLjg4WiIvPjwvc3ZnPg==" alt=""></Button>
        </div>
        <div class="button flex-1">
            <Button type="submit" class="w-full" variant="secondary"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNxdWFyZS1taW51cyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB4PSIzIiB5PSIzIiByeD0iMiIvPjxwYXRoIGQ9Ik04IDEyaDgiLz48L3N2Zz4=" alt=""></Button>
        </div>
        <div class="button flex-1">
            <Button type="submit" class="w-full" variant="destructive"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRodW1icy1kb3duIj48cGF0aCBkPSJNMTcgMTRWMiIvPjxwYXRoIGQ9Ik05IDE4LjEyIDEwIDE0SDQuMTdhMiAyIDAgMCAxLTEuOTItMi41NmwyLjMzLThBMiAyIDAgMCAxIDYuNSAySDIwYTIgMiAwIDAgMSAyIDJ2OGEyIDIgMCAwIDEtMiAyaC0yLjc2YTIgMiAwIDAgMC0xLjc5IDEuMTFMMTIgMjJhMy4xMyAzLjEzIDAgMCAxLTMtMy44OFoiLz48L3N2Zz4=" alt=""></Button>
        </div>
    </Card.Content>
</Card.Root>
