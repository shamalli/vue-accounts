<template>
    <div
        v-for="(account) in accounts"
        :key="account.id"
        class="">
        <!-- Метка -->
        <input
            class=""
            :class="{ 'error-border': account.errors?.labels }"
            placeholder="Метки"
            @blur="onLabelBlur(account, $event.target.value)"
            :value="account.labels.map(l => l.text).join('; ')"
        />

        <!-- Тип записи -->
        <select 
            class=""
            v-model="account.type"
            @change="validate(account)"
        >
            <option value="Локальная">Локальная</option>
            <option value="LDAP">LDAP</option>
        </select>

        <!-- Логин -->
        <input
            class=""
            :class="{ 'error-border': account.errors?.login }"
            placeholder="Логин"
            v-model="account.login"
            @change="validate(account)"
        />

        <!-- Пароль -->
        <input
            v-if="account.type === 'Локальная'"
            type="password"
            class=""
            :class="{ 'error-border': account.errors?.password }"
            placeholder="Пароль"
            v-model="account.password"
            @change="validate(account)"
        />

        <!-- Удаление -->
        <button @click="removeAccount(account.id)" class="">🗑️</button>
    </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/useAccountsStore'
import type { Account } from '@/types/Account'

const { accounts, removeAccount } = useAccountsStore()

function onLabelBlur(account: Account, value: string) {
    console.log(value);

    account.labels = value
    .split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .map(text => ({ text }))

    validate(account)
}

function validate(account: Account) {
    account.errors = {}

    if (!account.login || account.login.length > 100) {
        account.errors.login = true
    }

    if (account.type === 'Локальная') {
        if (!account.password || account.password.length > 100) {
            account.errors.password = true
        }
    } else {
        account.password = null
    }

    if (account.labels.some(label => label.text.length > 50)) {
        account.errors.labels = true
    }
}
</script>

<style scoped>
.error-border {
  border: 1px solid red;
}
</style>