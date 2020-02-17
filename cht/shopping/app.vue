<template>
    <div>
        <div class="header">
            <router-link to="/list" class="header-title">電商網站範例</router-link>
            <div class="header-menu">
                <router-link to="/cart" class="header-menu-cart">
                    購物車
                    <span v-if="cartList.length">{{ cartList.length }}</span>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        computed: {
            cartList () {
                return this.$store.state.cartList;
            }
        }
    }
</script>