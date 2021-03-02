import Vue from 'vue'

export default {
    setSession(key, value) {
        localStorage[key] = JSON.stringify(value)
    },
    getSession(key) {
        return localStorage[key] ? JSON.parse(localStorage[key]) : ''
    },
}

export const eventBus = new Vue()