<template>
  <div class="panel">
    <h1 class="title">个人设置</h1>

    <section class="card">
      <header class="card-head"><h2>账户信息</h2></header>
      <div class="row">
        <div>
          <div class="label">邮箱</div>
          <div class="value">{{ user.email || '-' }}</div>
        </div>
      </div>
      <div class="row">
        <div>
          <div class="label">密码</div>
          <div class="value mono">••••••••</div>
        </div>
        <button class="ghost" @click="openPassword">修改</button>
      </div>
    </section>

    <section class="card">
      <header class="card-head"><h2>安全与隐私</h2></header>
      <label class="switch-row">
        <input type="checkbox" v-model="storeIp" />
        <span>记录请求与错误日志 IP</span>
      </label>
      <p class="hint">
        对本账号所有 Key 生效，默认关闭。开启后，在调用与错误记录中保存来源 IP；关闭后，新请求的记录不再保存 IP。已有记录不变，平台运行与安全日志不受影响。
      </p>
    </section>

    <section class="card">
      <header class="card-head"><h2>账号操作</h2></header>
      <div class="row">
        <div>
          <div class="label">退出登录</div>
          <div class="value small">退出后需要重新邮箱验证码登录</div>
        </div>
        <button class="danger" @click="$emit('logout')">退出登录</button>
      </div>
    </section>

    <div class="mask" v-if="changing" @click.self="closePassword">
      <div class="modal">
        <h2>修改密码</h2>
        <label><span>原密码</span><input v-model="oldPassword" type="password" autocomplete="current-password" /></label>
        <label><span>新密码</span><input v-model="newPassword" type="password" autocomplete="new-password" placeholder="8-64 位" /></label>
        <label><span>确认新密码</span><input v-model="confirmPassword" type="password" autocomplete="new-password" /></label>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
        <div class="modal-actions">
          <button class="ghost" @click="closePassword">取消</button>
          <button class="primary" :disabled="saving" @click="submit">{{ saving ? '保存中…' : '保存' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Settings.js"></script>
