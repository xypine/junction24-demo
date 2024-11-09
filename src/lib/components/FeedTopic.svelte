<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from "./ui/button";
	import { Input } from "./ui/input";
	import { Label } from "./ui/label";
    let title = "This is title";
    let description = "This is description";
</script>

<Card.Root class="w-10/12">
    <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
    </Card.Header>
    <Card.Content>
        <p>{description}</p>
    </Card.Content>
    <Card.Footer class ="footer">
        <div class="button padd">
            <Button type="submit"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRodW1icy11cCI+PHBhdGggZD0iTTcgMTB2MTIiLz48cGF0aCBkPSJNMTUgNS44OCAxNCAxMGg1LjgzYTIgMiAwIDAgMSAxLjkyIDIuNTZsLTIuMzMgOEEyIDIgMCAwIDEgMTcuNSAyMkg0YTIgMiAwIDAgMS0yLTJ2LThhMiAyIDAgMCAxIDItMmgyLjc2YTIgMiAwIDAgMCAxLjc5LTEuMTFMMTIgMmEzLjEzIDMuMTMgMCAwIDEgMyAzLjg4WiIvPjwvc3ZnPg==" alt=""></Button>
        </div>
        <div class="button padd">
            <Button type="submit"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNxdWFyZS1taW51cyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB4PSIzIiB5PSIzIiByeD0iMiIvPjxwYXRoIGQ9Ik04IDEyaDgiLz48L3N2Zz4=" alt=""></Button>
        </div>
        <div class="button padd">
            <Button type="submit"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRodW1icy1kb3duIj48cGF0aCBkPSJNMTcgMTRWMiIvPjxwYXRoIGQ9Ik05IDE4LjEyIDEwIDE0SDQuMTdhMiAyIDAgMCAxLTEuOTItMi41NmwyLjMzLThBMiAyIDAgMCAxIDYuNSAySDIwYTIgMiAwIDAgMSAyIDJ2OGEyIDIgMCAwIDEtMiAyaC0yLjc2YTIgMiAwIDAgMC0xLjc5IDEuMTFMMTIgMjJhMy4xMyAzLjEzIDAgMCAxLTMtMy44OFoiLz48L3N2Zz4=" alt=""></Button>
        </div>
    </Card.Footer>
</Card.Root>


<style>
    .padd{
        padding-left: 5px;
        padding-right: 5px;
    }
</style>