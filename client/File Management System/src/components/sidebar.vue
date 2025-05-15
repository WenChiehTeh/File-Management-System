<template>
    <aside class="sidebar">
        <div class="sidebarHeader">
            <h1>My Notes</h1>
        </div>

        <div class-="addBtnDiv">
            <button class="addNoteBtn" @click="$emit('addNote')">+</button>
        </div>

        <div v-for="(group, label) in groupedNotes" :key="label" class="notes">
            <h2>{{ label }}</h2>
            <noteCard v-for="note in group" :key="note.id" :note="note" @click="$emit('select', note)" @delete="$emit('delete', note.id)"/>
        </div>
    </aside>
</template>

<script setup>
import noteCard from './card.vue'
import { computed } from 'vue'

const props = defineProps({ notes: Array })

const groupedNotes = computed(() => {
    const groups = { 'Today': [], 'This Week': [], 'This Month': [] }
    const now = new Date()

    props.notes.forEach(note => {
        const noteDate = new Date(note.createdat)
        const isSameDay = now.toDateString() === noteDate.toDateString()
        if (isSameDay) {
        groups['Today'].push(note)
        } else {
        const daysDiff = (now - noteDate) / (1000 * 60 * 60 * 24)
        if (daysDiff < 7) {
            groups['This Week'].push(note)
        } else {
            groups['This Month'].push(note)
        }
        }
    })

    console.log(groups)
    return groups
})

</script>

<style scoped>
    * {
        color: #FAF9F6;
        background-color: #3B7097;
    }

    aside {
        min-height: 90vh;
        width: 25vw;
        max-width: 25vw;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        padding: 20px;
        overflow-y: auto;
        transition: all 0.3s ease;
    }

    h1, h2 {
        text-align: left;
        font-family: "Inter";
    }

    h1 {
        margin: 5px 0px;
    }

    h2 {
        font-size: 1.25rem;
        font-weight: 450
    }

    .sidebarHeader {
        margin: 20px 10px;
    }

    .addBtnDiv {
        height: 17%;
    }
    
    .addNoteBtn{
        width: 90px;
        margin: 0px 10%;
        border-radius: 100%;
        border: none;
        background-color: #56A7E3;
        transition: background-color 0.3s ease;
        font-size: 30px;
        font-weight: 800;
        position: absolute;
        top: 92%;
        left: 12%;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        text-align: center;
    }

    .addNoteBtn:hover {
        background-color: #1885d8;
    }
    
    .notes {
        margin: 30px 10px;
    }

    @media (max-width: 768px) {
        .sidebar {
            width: 100%;
            height: 100vh;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            transform: translateX(-80%);
            padding: 16px;
        }

        .sidebar.open {
            transform: translateX(0);
        }
    }
</style>