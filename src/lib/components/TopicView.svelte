<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
    let title = "This is title";
    let description = "This is description";
    const data = {
    id: 1111,
    created_at: "10:20",
    updated_at: "10:21",
    creator_id: 2222,
    share_slug: "testisivu",
    topic: "wopic",
    description: "aaa",
    participants_can_submit_comments: true,
    show_explanations: true,
    prompt_subscription: true,
    show_unapproved_comments: true,
}
</script>

<Card.Root class="w-10/12">
    <Card.Header>
        <Card.Title>{data.topic}</Card.Title>
    </Card.Header>
    <Card.Content>
        <p>{data.description}</p>
    </Card.Content>
</Card.Root>



<style>
    .padd{
        padding-left: 5px;
        padding-right: 5px;
    }
</style>