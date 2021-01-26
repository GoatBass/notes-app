import Note from './Notes.js'

const app = Vue.createApp({
    data(){
        return {
            notes: [],
            title: '',
            description: '',
            showForm: false,
            showNotes: true,
        }
    },
    created(){
        console.log('Created!')
        this.getAllNotesFromDB()
    },
    methods: {
        getAllNotesFromDB(){
            Note.fetchAll((data) => {
                this.notes = data
            })
        },

        showAddForm(){
            this.showForm = true
            this.showNotes = false
        },

        returnToNotes(){
            this.showForm = !this.showForm
            this.showNotes = !this.showNotes
        },

        addNote(){
            if(!this.title || !this.description){
                alert('Some of the fields are empty! Please fill them!')
                return 
            }
            const note = new Note(this.title, this.description)
            note.save(() => {
                this.getAllNotesFromDB()
            })
            this.showForm = !this.showForm
            this.showNotes = !this.showNotes
        }
    }
})

app.mount('#app')