<template>
    <div>
        <h1>介紹頁</h1>
        <button @click="handleRouter">跳躍到 user</button>
    </div>
</template>
<script>
    export default {
        methods: {
            handleRouter () {
                this.$router.push('/user/123');
            }
        }
    }
</script>