<template>
  <div class="sitemap">
    <header class="head">
      <h1>网站地图</h1>
      <p>325聚合模型全部页面与模型索引，便于用户与搜索引擎浏览。</p>
    </header>

    <section class="block">
      <h2>主要页面</h2>
      <ul class="links">
        <li><a href="#/">模型广场</a></li>
        <li><a href="#/sitemap">网站地图</a></li>
        <li><a href="#/console">控制台</a></li>
      </ul>
    </section>

    <section class="block">
      <h2>按能力分类</h2>
      <ul class="links">
        <li v-for="item in capabilities" :key="item.key">
          <a :href="`#/?capability=${item.key}`">{{ item.label }}（{{ item.count }}）</a>
        </li>
        <li v-if="!capabilities.length" class="muted">暂无分类</li>
      </ul>
    </section>

    <section class="block">
      <h2>模型索引（{{ models.length }}）</h2>
      <div class="groups">
        <div v-for="group in groups" :key="group.key" class="group">
          <h3>{{ group.label }}</h3>
          <ul class="links">
            <li v-for="model in group.models" :key="model.modelId">
              <a :href="`#/models/${encodeURIComponent(model.modelId)}`">{{ model.modelId }}</a>
            </li>
          </ul>
        </div>
      </div>
      <p v-if="loading" class="muted">加载中…</p>
      <p v-else-if="error" class="muted">{{ error }}</p>
    </section>

    <footer class="foot">
      <a href="#/">← 返回模型广场</a>
    </footer>
  </div>
</template>

<script src="./Sitemap.js"></script>
