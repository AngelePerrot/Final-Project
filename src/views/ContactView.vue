<script setup>
import { ref, reactive, computed } from 'vue'
import { sendEmail } from '@/helpers/emailService'
import FormInput from '@/components/ContactForms/FormInput.vue'
import FormTextarea from '@/components/ContactForms/FormTextarea.vue'

const title = 'Contact Form'
const showForm = ref(true)
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
    Object.assign(contactForm, initialContactForm)
    Object.assign(touched, initialtouched)
  }, 5000)
}

async function onSubmit() {
  if (isFormValid.value) {
    try {
      const formData = {
        name: contactForm.name,
        email: contactForm.email,
        subject: contactForm.subject,
        message: contactForm.message,
      }

      console.log('Sending email with data:', formData)

      const { success, response } = await sendEmail(formData)
      console.log('Email response:', response)

      if (success) {
        successMessage.value =
          'Thank you! Your message has been sent successfully.'
        showForm.value = false
        resetForm()
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Detailed error:', error)
      alert(`Error sending email: ${error.message}`)
    }
  } else {
    alert('Please fill in all required fields correctly.')
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
        <div class="success-icon">🎄</div>
        {{ successMessage }}
        <div class="snow"></div>
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
  padding: 2rem;
  color: #2c5530;
  font-family: 'Great Vibes', cursive;
  font-size: 1.8rem;
  text-align: center;
  position: relative;
  animation: fadeIn 0.5s ease-in;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 245, 245, 0.95)
  );
  border-radius: 15px;
  border: 2px solid #c41e3a;
  box-shadow: 0 4px 15px rgba(196, 30, 58, 0.15);
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.snow {
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-image: radial-gradient(
      2px 2px at 20px 30px,
      #fff,
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 50px 160px, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 90px 40px, #fff, rgba(0, 0, 0, 0));
  background-size: 200px 200px;
  animation: snow 4s linear infinite;
}

@keyframes snow {
  0% {
    background-position:
      0px 0px,
      0px 0px,
      0px 0px,
      0px 0px;
  }
  100% {
    background-position:
      200px 200px,
      100px 200px,
      -100px 200px,
      -200px 200px;
  }
}
</style>
