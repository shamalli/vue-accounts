import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Account } from '@/types/Account'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  function loadFromLocalStorage() {
    const data = localStorage.getItem('accounts')
    if (data) {
      accounts.value = JSON.parse(data)
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  function addAccount() {
    const newAccount: Account = {
      id: crypto.randomUUID(),
      labels: [],
      type: 'Локальная',
      login: '',
      password: ''
    }
    accounts.value.push(newAccount)

    console.log(newAccount);
  }

  function removeAccount(id: string) {
    
    console.log(id);
    console.log(accounts.value);

  }

  watch(accounts, saveToLocalStorage, { deep: true })
  loadFromLocalStorage()

  return { accounts, addAccount, removeAccount }
})
