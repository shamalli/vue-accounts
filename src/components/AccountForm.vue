<template>
  <div>
    <h2 class="">Учетные записи</h2>
    <button @click="addAccount" class="">+</button>
    <p class="">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </p>

    <AccountItem />
  </div>
</template>

<script setup lang="ts">
import AccountItem from '../components/AccountItem.vue'
import { useAccountsStore } from '@/stores/useAccountsStore'
import type { Account } from '@/types/Account'

const { accounts, addAccount, removeAccount } = useAccountsStore()

</script>

