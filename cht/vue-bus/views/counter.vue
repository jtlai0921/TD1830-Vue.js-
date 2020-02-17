<template>
    <div>
        {{ number }}
        <button @click="handleAddRandom">隨機增加</button>
    </div>
</template>
<script>
    export default {
        props: {
            number: {
                type: Number
            }
        },
        methods: {
            handleAddRandom () {
                // 隨機取得 1-100 中的數
                const num = Math.floor(Math.random () * 100 + 1);
                this.$bus.emit('add', num);
            }
        }
    };
</script>