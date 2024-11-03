<script setup>
import { ref, reactive, computed } from 'vue'
import { sendEmail } from '@/Services/emailService'
import FormInput from '@/components/ContactForms/FormInput.vue'
import FormTextarea from '@/components/ContactForms/FormTextarea.vue'

const title = 'Contact Form'
const showForm = true
const successMessage = ref('')

const initialContactForm = {
  name: '',
  subject: '',
  email: '',
  message: '',
  file: null,
}

const initialtouched = {
  name: '',
  subject: '',
  email: '',
  message: '',
}

const contactForm = reactive({ ...initialContactForm })
const touched = reactive({ ...initialtouched })

function setTouched(field) {
  touched[field] = true
}

const errors = reactive({
  name: computed(() =>
    !contactForm.name && touched.name ? 'Name is required' : '',
  ),
  subject: computed(() =>
    !contactForm.subject && touched.subject ? 'Subject is required' : '',
  ),
  email: computed(() => {
    if (touched.email) {
      if (!contactForm.email) return 'Email is required'
      if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(contactForm.email))
        return 'Please provide a valid email address'
    }
    return ''
  }),
  message: computed(() =>
    !contactForm.message && touched.message ? 'Message is required' : '',
  ),
})

const isFormValid = computed(() => {
  const allFieldsTouched = Object.values(touched).every(t => t)
  const noErros = !Object.values(errors).some(e => e)

  return allFieldsTouched && noErros
})

function onFileSelected($event) {
  contactForm.file = $event.target.files[0]
}

function resetForm() {
  setTimeout(() => {
    successMessage.value = ''
    showForm.value = true
    Object.assign(contactForm, initialContactFrom)
    Object.assign(touched, initialtouched)
  }, 5000)
}

async function onSubmit() {
  if (isFormValid) {
    const formData = new FormData()
    formData.append('name', contactForm.name)
    formData.append('subject', contactForm.subject)
    formData.append('email', contactForm.email)
    formData.append('message', contactForm.message)
    if (contactForm.file) {
      formData.append('file', contactForm.file, contactForm.file.name)
    }

    try {
      const response = await sendEmail(formData)
      if (response.status === 200) {
        showForm.value = false
        successMessage.value = response.data.message
        showForm.value = false
        resetForm()
      } else {
        console.error('Failed to send email:', error)
      }
    } catch (error) {
      console.error('Error to send email:', error)
    }
  } else {
    console.log('Form is not valid')
  }
}
</script>

<template>
  <div class="contact-form">
    <div class="row">
      <form
        v-if="showForm"
        @submit.prevent="onSubmit"
        enctype="multipart/form-data"
      >
        <h2>{{ title }}</h2>

        <FormInput
          label="Name"
          v-model="contactForm.name"
          :error="errors.name"
          placeholder="Name"
          @Input="() => setTouched('name')"
        />

        <FormInput
          label="Subject"
          v-model="contactForm.subject"
          :error="errors.subject"
          placeholder="Subject"
          @Input="() => setTouched('subject')"
        />

        <FormInput
          type="email"
          label="Email"
          v-model="contactForm.email"
          :error="errors.email"
          placeholder="youremail@example.com"
          @Input="() => setTouched('email')"
        />

        <FormInput
          label="Message"
          v-model="contactForm.message"
          :error="errors.message"
          rows="4"
          @Input="() => setTouched('message')"
        />

        <div class="form-group">
          <label for="file">Attachment (PDF, JPG, PNG only)</label>
          <input
            type="file"
            class="form-control"
            id="file"
            @change="onFileSelected"
            accept=".pdf, .jpg, .jpeg, .png"
          />
        </div>

        <div>
          <button type="submit" class="btn-primary" :disabled="!isFormValid">
            Send Request
          </button>
        </div>
      </form>
      <div v-if="!showForm" class="alert-success">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-form {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: no-repeat center center;
  background-image: url('/src/assets/img/Santa.jpg');
  background-size: 900px auto;
  overflow: hidden;
  margin: 0;
}

.row {
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

h2 {
  color: #213c18;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  font-family: 'Cinzel', serif;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 0.2rem 0 1rem 0;
  border: 1px solid #213c18;
  border-radius: 8px;
  font-size: 1rem;
}

.btn-primary {
  background-color: #880c0c;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #7b0a0a;
}

.alert-success {
  margin-top: 2rem;
}
</style>
