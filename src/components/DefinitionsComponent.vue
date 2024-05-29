<template>
  <div class="flex justify-center gap-10 py-12 mb-12">
    <DefinitionCard>
        <template v-slot:vocabulary>
            <h2 class="font-bold text-2xl mb-2">FURU (Bambara)</h2>
        </template>
        <template v-slot:kind>
            <p class="font-bold">nom masculin</p>
        </template>
        <template v-slot:translate>
            <p>mariage (fr), marriage (en), hiijay (sg)</p>
        </template>
    </DefinitionCard>

    <DefinitionCard>
        <template v-slot:vocabulary>
            <h2 class="font-bold text-2xl mb-2">DIYA (Bambara)</h2>
        </template>
        <template v-slot:kind>
            <p class="font-bold">nom masculin</p>
        </template>
        <template v-slot:translate>
            <p>plaisir (fr), pleasure (en), biniibay (sg)</p>
        </template>
    </DefinitionCard>

    <DefinitionCard>
        <template v-slot:vocabulary>
            <h2 class="font-bold text-2xl mb-2">MAGNON (Soninké)</h2>
        </template>
        <template v-slot:kind>
            <p class="font-bold">nom féminin</p>
        </template>
        <template v-slot:translate>
            <p>jeune mariée (fr), kogno mousso (bm), new bride (en), woyhiiji (sg)</p>
        </template>
    </DefinitionCard>
  </div>
</template>

<script>
    import DefinitionCard from './DefinitionCard.vue';

    export default {
        name: 'DefinitionsComponent',
        components: {
            DefinitionCard
        }
    };
</script>