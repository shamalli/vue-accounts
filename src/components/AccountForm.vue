<template>
  <div>
    <h2 class="">Учетные записи</h2>
    <button @click="addAccount" class="">+</button>
    <p class="">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </p>

    <AccountItem
      v-for="(account) in accounts"
      :key="account.id"
      :account="account"
    />
  </div>
</template>

<script setup lang="ts">
import AccountItem from '../components/AccountItem.vue'
import { useAccountsStore } from '@/stores/useAccountsStore'

const { accounts, addAccount } = useAccountsStore()

</script>

