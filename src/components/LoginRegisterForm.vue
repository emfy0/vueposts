<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCurrentUserStore } from '@/stores/CurrentUser'
  import { showNotify } from 'vant';

  const router = useRouter()

  const props = defineProps({
    puprose: String
  })

  const username = ref('')
  const password = ref('')

  let errors = ref({
    username: '',
    password: ''
  })

  const currentUserStore = useCurrentUserStore()

  async function submit() {
    let response = await fetch(`/api/v1/users/${props.puprose.toLocaleLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    let result = await response.json()

    if (result?.user) {
      currentUserStore.currentUser = result.user
      router.push('/')
    } else {
      if (result.validation_errors) {
        console.log(result.validation_errors)
        errors.value = result.validation_errors
      }

      showNotify({
        type: 'danger',
        message: 'Invalid username or password'
      })
    }
  }

  function takeFirst(errors) {
    if (errors) {
      return errors[0]
    } else {
      return ''
    }
  }
</script>

<template>
  <van-row justify="center">
    <van-col span="8">
      <h1>{{ puprose }}</h1>

      <van-form @submit="submit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="Username"
            label="Username"
            placeholder="Username"
            :error-message="takeFirst(errors['username'])"
            :rules="[{ required: true, message: 'Username is required' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="Password"
            :error-message="takeFirst(errors['password'])"
            label="Password"
            placeholder="Password"
            :rules="[{ required: true, message: 'Password is required' }]"
          />
        </van-cell-group>

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            {{ puprose }}
          </van-button>
        </div>
      </van-form>
    </van-col>
  </van-row>
</template>

<style scoped>
</style>
