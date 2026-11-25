<template>
  <div class="mask" v-if="visible" @click.self="$emit('close')">
    <div class="modal">
      <button class="close" @click="$emit('close')">×</button>

      <h2>{{ tab === 'login' ? '登录 325聚合模型' : '注册 325聚合模型' }}</h2>

      <div class="tabs">
        <button :class="['tab', { active: tab === 'login' }]" @click="switchTab('login')">登录</button>
        <button :class="['tab', { active: tab === 'register' }]" @click="switchTab('register')">注册</button>
      </div>

      <form @submit.prevent="submit">
        <label>
          <span>邮箱</span>
          <input v-model.trim="email" type="email" placeholder="you@example.com" autocomplete="email" />
        </label>

        <label>
          <span>密码</span>
          <input
            v-model="password"
            type="password"
            :placeholder="tab === 'register' ? '至少 8 位' : '请输入密码'"
            autocomplete="current-password"
          />
        </label>

        <label v-if="tab === 'register'">
          <span>邮箱验证码</span>
          <div class="code-row">
            <input v-model.trim="code" placeholder="6 位验证码" autocomplete="one-time-code" />
            <button type="button" class="send" :disabled="counting || sending" @click="handleSendCode">
              {{ counting ? `${countdown}s` : (sending ? '发送中…' : '发送验证码') }}
            </button>
          </div>
        </label>

        <p v-if="error" class="error">{{ error }}</p>

        <button class="submit" type="submit" :disabled="loading">
          {{ loading ? '处理中…' : (tab === 'login' ? '登录' : '注册并登录') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script src="./AuthModal.js"></script>
