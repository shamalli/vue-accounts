<template>
    <div class="flex gap-2 mb-3 odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
        <!-- Метка -->
        <input
            class="border p-2 rounded w-1/4"
            :class="{ 'border-pink-500': account.errors?.labels }"
            placeholder="Метки"
            @blur="onLabelBlur(account, $event)"
            :value="account.labels.map(l => l.text).join('; ')"
        />

        <!-- Тип записи -->
        <select 
            class="border p-2 rounded w-1/6"
            v-model="account.type"
            @change="validate(account)"
        >
            <option value="Локальная">Локальная</option>
            <option value="LDAP">LDAP</option>
        </select>

        <!-- Логин -->
        <input
            class="border p-2 rounded w-1/4"
            :class="{
                'border-pink-500': account.errors?.login,
                'w-2/4': account.type !== 'Локальная'
            }"
            placeholder="Логин"
            v-model="account.login"
            @change="validate(account)"
        />

        <!-- Пароль -->
        <input
            v-if="account.type === 'Локальная'"
            type="password"
            class="border p-2 rounded w-1/4"
            :class="{ 'border-pink-500': account.errors?.password }"
            placeholder="Пароль"
            v-model="account.password"
            @change="validate(account)"
        />

        <!-- Удаление -->
        <button @click="removeAccount(account.id)" class="text-red-500 text-xl cursor-pointer">🗑️</button>
    </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/useAccountsStore'
import type { Account } from '@/types/Account'
import type { PropType } from 'vue'

const { removeAccount } = useAccountsStore()

defineProps({
    account: {
        type: Object as PropType<Account>,
        required: true
    }
})

function onLabelBlur(account: Account, event: FocusEvent) {
    if (event.target instanceof HTMLInputElement) {
        const value = event.target.value

        account.labels = value
        .split(';')
        .map(s => s.trim())
        .filter(Boolean)
        .map(text => ({ text }))

        validate(account)
    }
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

    let labelsLength = 0;
    for (const l of account.labels) {
        labelsLength += l.text.length;
    }
    if (labelsLength > 50) {
        account.errors.labels = true
    }
}
</script>