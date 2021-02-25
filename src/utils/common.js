import Vue from 'vue'

export default {
    setSession(key, value) {
        sessionStorage[key] = JSON.stringify(value)
    },
    getSession(key) {
        return sessionStorage[key] ? JSON.parse(sessionStorage[key]) : ''
    },
}

export const eventBus = new Vue()