<template>
    <div
        v-for="(account, index) in accounts"
        :key="account.id"
        class="">
        <!-- Метка -->
        <input
            class=""
            placeholder="Метки"
            :value="account.labels.map(l => l.text).join('; ')"
        />

        <!-- Тип записи -->
        <select
            class=""
            v-model="account.type"
        >
            <option value="Локальная">Локальная</option>
            <option value="LDAP">LDAP</option>
        </select>

        <!-- Логин -->
        <input
            class=""
            placeholder="Логин"
            v-model="account.login"
        />

        <!-- Пароль -->
        <input
            v-if="account.type === 'Локальная'"
            type="password"
            class=""
            placeholder="Пароль"
            v-model="account.password"
        />

        <!-- Удаление -->
        <button @click="removeAccount(account.id)" class="">🗑️</button>
    </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/useAccountsStore'
import type { Account } from '@/types/Account'

const { accounts, removeAccount } = useAccountsStore()

</script>