<template>
  <div class="page">
    <header class="nav">
      <div class="nav-inner">
        <a class="brand" href="#" @click.prevent="goPlaza">
          <span class="logo">325</span>
          <span class="brand-name">325聚合模型</span>
        </a>
        <nav class="links">
          <a :class="{ active: view === 'plaza' }" href="#" @click.prevent="goPlaza">模型广场</a>
          <a href="#pricing">价格说明</a>
          <a href="#/docs">接入文档</a>
          <a class="cta" href="#" @click.prevent="goConsole">控制台</a>
        </nav>
        <div class="auth">
          <template v-if="user">
            <span class="email">{{ user.email || user.nickname }}</span>
            <button class="auth-btn" @click="doLogout">退出</button>
          </template>
          <template v-else>
            <button class="auth-btn" @click="openAuth('login')">登录</button>
            <button class="auth-btn primary" @click="openAuth('register')">注册</button>
          </template>
        </div>
      </div>
    </header>

    <template v-if="view === 'plaza'">
      <section class="hero">
        <h1>模型广场</h1>
        <p class="sub">一个 Key 调用文本、图像、视频、音频、向量模型，按量计费，无需分开申请。</p>
        <div class="stats">
          <div><b>{{ total }}</b><span>个模型</span></div>
          <div><b>{{ capabilities.length }}</b><span>类能力</span></div>
          <div><b>按量</b><span>计费方式</span></div>
        </div>
      </section>

      <section class="filters">
        <div class="tabs">
          <button :class="['tab', { active: capability === '' }]" @click="changeCapability('')">全部</button>
          <button
            v-for="item in capabilities"
            :key="item.key"
            :class="['tab', { active: capability === item.key }]"
            @click="changeCapability(item.key)"
          >{{ item.label }}</button>
        </div>
        <div class="tools">
          <input v-model="keyword" class="search" placeholder="搜索模型名，如 gpt、qwen、video" />
        </div>
      </section>

      <section class="grid" v-if="!loading && !error && visible.length">
        <a
          v-for="model in visible"
          :key="model.modelId"
          class="card-link"
          :href="`#/models/${encodeURIComponent(model.modelId)}`"
        >
          <ModelCard :model="model" />
        </a>
      </section>

      <section v-else-if="loading" class="state">加载中…</section>

      <section v-else-if="error" class="state error">
        <div>{{ error }}</div>
        <button class="retry" @click="load">重试</button>
      </section>

      <section v-else class="state">没有匹配的模型</section>

      <section class="pager" v-if="!error && total > pageSize">
        <button :disabled="pageNum <= 1" @click="goPage(pageNum - 1)">上一页</button>
        <span>第 {{ pageNum }} / {{ totalPages }} 页</span>
        <button :disabled="pageNum >= totalPages" @click="goPage(pageNum + 1)">下一页</button>
      </section>

      <footer class="footer">
        <div>325聚合模型 · 统一模型接入与按量计费</div>
        <div class="muted">
          价格请进入模型详情查看 ·
          <a href="#/sitemap">网站地图</a>
        </div>
      </footer>
    </template>

    <Console v-else-if="view === 'console'" :user="user" :model-count="total" :models="models" @back="goPlaza" @logout="doLogout" />

    <Sitemap v-else-if="view === 'sitemap'" />

    <Docs v-else-if="view === 'docs'" />

    <ModelDetail v-else-if="view === 'detail'" :model-id="modelId" />

    <AuthModal
      :visible="authVisible"
      :initial-tab="authTab"
      @close="authVisible = false"
      @success="handleAuthSuccess"
    />
  </div>
</template>

<script src="./App.js"></script>
