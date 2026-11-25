<template>
  <div class="panel">
    <section class="head">
      <div class="heading">
        <h1>令牌管理</h1>
        <span class="badge">模型均由官方 API Key 接入</span>
      </div>
      <button class="primary" @click="openCreate" :disabled="tokens.length >= 10 || loading">+ 创建令牌</button>
      <p class="desc">
        管理你的 API 令牌 —— 每个令牌对应一把钥匙，失效可随时撤销（单账号最多 10 个，当前 {{ tokens.length }}）。
      </p>
    </section>

    <section class="list" v-if="!loading && !error && tokens.length">
      <table>
        <thead>
          <tr><th>名称</th><th>令牌</th><th>创建时间</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="token in tokens" :key="token.id">
            <td>{{ token.name }}</td>
            <td class="mono">{{ mask(token.tokenPrefix) }}</td>
            <td>{{ formatTime(token.createTime) }}</td>
            <td class="ops">
              <button class="danger" :disabled="deleting === token.id" @click="remove(token.id)">
                {{ deleting === token.id ? '删除中…' : '删除' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="empty" v-else-if="loading">加载中…</section>

    <section class="empty" v-else-if="error">
      <div class="empty-title">加载失败</div>
      <div class="empty-desc">{{ error }}</div>
      <button class="primary" @click="load">重试</button>
    </section>

    <section class="empty" v-else>
      <div class="empty-icon">⌘</div>
      <div class="empty-title">暂无令牌</div>
      <div class="empty-desc">创建第一个 API 令牌，用于鉴权调用</div>
      <button class="primary" @click="openCreate">+ 创建令牌</button>
    </section>

    <section class="cards">
      <article class="card">
        <div class="card-head">
          <span class="icon">📘</span>
          <div>
            <h2>Agent 接入</h2>
            <p>将编辑器插件 Continue 接入中转 API（以 Cursor 为例）</p>
          </div>
        </div>
      </article>

      <article class="card">
        <div class="card-head">
          <span class="icon">⚙️</span>
          <div>
            <h2>Codex CLI 接入</h2>
            <p>将 Codex CLI 接入中转 API</p>
          </div>
        </div>
      </article>

      <article class="card">
        <div class="card-head">
          <span class="icon">✳️</span>
          <div>
            <h2>Claude Code CLI 接入</h2>
            <p>将 Claude Code CLI 接入中转 API</p>
          </div>
        </div>
      </article>
    </section>

    <p class="note">令牌明文只在创建成功时显示一次，请立即保存。</p>

    <div class="mask" v-if="creating" @click.self="creating = false">
      <div class="modal">
        <h2>创建令牌</h2>
        <label>
          <span>名称</span>
          <input v-model.trim="name" placeholder="例如：我的应用" @keyup.enter="create" />
        </label>
        <p v-if="createError" class="error">{{ createError }}</p>
        <div class="modal-actions">
          <button class="ghost" @click="creating = false">取消</button>
          <button class="primary" :disabled="saving" @click="create">{{ saving ? '创建中…' : '创建' }}</button>
        </div>
      </div>
    </div>

    <div class="mask" v-if="newToken" @click.self="newToken = null">
      <div class="modal">
        <h2>令牌创建成功</h2>
        <p class="tip">复制并保存，关闭后无法再次查看。</p>
        <div class="plain">{{ newToken }}</div>
        <div class="modal-actions">
          <button class="ghost" @click="copyNew">{{ copiedNew ? '已复制' : '复制令牌' }}</button>
          <button class="primary" @click="newToken = null">我已保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Tokens.js"></script>
