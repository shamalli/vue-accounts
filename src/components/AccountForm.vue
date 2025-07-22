<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Учетные записи</h2>
    <button @click="addAccount" class="mb-4 px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer">+</button>
    <p class="text-sm text-gray-600 mb-2">
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

